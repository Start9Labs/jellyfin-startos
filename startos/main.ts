import { manifest as filebrowserManifest } from 'filebrowser-quantum-startos/startos/manifest'
import { manifest as nextcloudManifest } from 'nextcloud-startos/startos/manifest'
import { manifest as nextexplorerManifest } from 'nextexplorer-startos/startos/manifest'
import { existsSync } from 'fs'
import { rename } from 'fs/promises'
import {
  libraryNames,
  libraryOptionsXml,
} from './fileModels/libraryOptions.xml'
import { networkXml } from './fileModels/network.xml'
import { store } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { apiKeyName, stdoutLines } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Jellyfin!'))

  await networkXml.merge(effects, {})
  for (const library of await libraryNames()) {
    await libraryOptionsXml(library).merge(effects, {})
  }

  // Past the library.db migration, a leftover migrations.xml crash-loops Jellyfin: jellyfin/jellyfin#15388
  const migrationsXml = sdk.volumes.config.subpath('config/migrations.xml')
  if (
    existsSync(migrationsXml) &&
    !existsSync(sdk.volumes.config.subpath('data/library.db'))
  ) {
    await rename(migrationsXml, `${migrationsXml}.backup`)
  }

  let mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'config',
      subpath: null,
      mountpoint: '/config',
      readonly: false,
    })
    .mountVolume({
      volumeId: 'cache',
      subpath: null,
      mountpoint: '/cache',
      readonly: false,
    })
    .mountVolume({
      volumeId: 'config',
      subpath: 'config.json',
      mountpoint: '/jellyfin/jellyfin-web/config.json',
      readonly: true,
      type: 'file',
    })

  const stored = await store
    .read((s) => ({ mediaSources: s.mediaSources, apiKey: s.apiKey }))
    .const(effects)
  const mediaSources = stored?.mediaSources
  const apiKey = stored?.apiKey

  if (!mediaSources?.length) {
    throw new Error(i18n('No media sources'))
  }

  if (mediaSources.includes('nextexplorer')) {
    mounts = mounts.mountDependency<typeof nextexplorerManifest>({
      dependencyId: 'nextexplorer',
      volumeId: 'data',
      subpath: null,
      mountpoint: '/mnt/nextexplorer',
      readonly: true,
    })
  }

  if (mediaSources.includes('filebrowser')) {
    mounts = mounts.mountDependency<typeof filebrowserManifest>({
      dependencyId: 'filebrowser',
      volumeId: 'data',
      subpath: null,
      mountpoint: '/mnt/filebrowser',
      readonly: true,
    })
  }

  if (mediaSources.includes('nextcloud')) {
    mounts = mounts.mountDependency<typeof nextcloudManifest>({
      dependencyId: 'nextcloud',
      volumeId: 'nextcloud',
      subpath: 'data',
      mountpoint: '/mnt/nextcloud/data',
      readonly: true,
    })
  }

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'jellyfin' },
    mounts,
    'jellyfin-sub',
  )

  let startupComplete = false

  const daemons = sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      // The SDK calls fn on every respawn, so a restarted Jellyfin is not ready until it logs startup again.
      fn: async () => {
        startupComplete = false
        return {
          command: sdk.useEntrypoint(),
          onStdout: stdoutLines((line) => {
            if (line.includes('Main: Startup complete')) startupComplete = true
          }),
        }
      },
    },
    // Jellyfin binds before startup completes; readiness follows the startup log.
    ready: {
      gracePeriod: 42000,
      display: i18n('Server and Web UI'),
      fn: () =>
        startupComplete
          ? { result: 'success', message: i18n('Server and web UI are ready') }
          : {
              result: 'failure',
              message: i18n('Server or web UI unreachable'),
            },
    },
    requires: [],
  })

  if (!apiKey) return daemons

  // Jellyfin accepts a key added while it runs.
  return daemons.addOneshot('register-api-key', {
    subcontainer,
    exec: {
      command: [
        'sqlite3',
        '-cmd',
        '.timeout 30000',
        '/config/data/jellyfin.db',
        `INSERT INTO ApiKeys (DateCreated, DateLastActivity, Name, AccessToken) SELECT strftime('%Y-%m-%d %H:%M:%f', 'now'), strftime('%Y-%m-%d %H:%M:%f', 'now'), '${apiKeyName}', '${apiKey}' WHERE NOT EXISTS (SELECT 1 FROM ApiKeys WHERE AccessToken = '${apiKey}')`,
      ],
    },
    requires: ['primary'],
  })
})
