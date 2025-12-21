import { sdk } from './sdk'
import { uiPort } from './utils'
import { store } from './fileModels/store.json'
import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { manifest as nextcloudManifest } from 'nextcloud-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('[i] Starting Jellyfin!')

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
    throw new Error('No media sources')
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

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'jellyfin' },
    mounts,
    'jellyfin-sub',
  )

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint(),
    },
    ready: {
      display: 'Web Interface',
      fn: () =>
        // @TODO grep logs for "Main: Startup complete"
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://localhost:${uiPort}/health`,
          {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          },
        ),
    },
    requires: [],
  })
})
