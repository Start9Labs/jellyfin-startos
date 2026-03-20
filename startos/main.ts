import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { manifest as nextcloudManifest } from 'nextcloud-startos/startos/manifest'
import { networkXml } from './fileModels/network.xml'
import { store } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting Jellyfin!'))

  await networkXml.merge(effects, {})

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

  const mediaSources = await store.read((s) => s.mediaSources).const(effects)

  if (!mediaSources) {
    throw new Error(i18n('No media sources'))
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
      subpath: null,
      mountpoint: '/mnt/nextcloud',
      readonly: true,
    })
  }

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */

  let startupComplete = false

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'jellyfin' },
      mounts,
      'jellyfin-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      onStdout: (chunk) => {
        const text = Buffer.isBuffer(chunk)
          ? chunk.toString('utf8')
          : String(chunk)

        console.log(text)

        const search = 'Main: Startup complete'
        if (text.includes(search)) {
          startupComplete = true
        }
      },
    },
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
})
