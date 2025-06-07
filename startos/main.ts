import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'
import { store } from './fileModels/store.json'
import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Jellyfin!')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  let mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/config',
      readonly: false,
    })
    .mountVolume({
      mountpoint: '/jellyfin/jellyfin-web/config.json',
      readonly: false,
      subpath: 'config.json',
      volumeId: 'main',
      type: 'file',
    })

  const mediaSources =
    (await store.read((s) => s.mediaSources).const(effects)) || []

  if (mediaSources.includes('filebrowser')) {
    mounts = mounts.mountDependency<typeof filebrowserManifest>({
      dependencyId: 'filebrowser',
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/filebrowser',
      readonly: true,
    })
  }

  // @TODO import nextcloud-startos for type safety
  if (mediaSources.includes('nextcloud')) {
    mounts = mounts.mountDependency({
      dependencyId: 'nextcloud',
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/nextcloud',
      readonly: true,
    })
  }

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const additionalChecks: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */

  return sdk.Daemons.of(effects, started, additionalChecks).addDaemon(
    'primary',
    {
      subcontainer: await sdk.SubContainer.of(
        effects,
        { imageId: 'jellyfin' },
        mounts,
        'jellyfin-sub',
      ),
      exec: {
        command: [
          'jellyfin/jellyfin',
          '--ffmpeg',
          '/usr/lib/jellyfin-ffmpeg/ffmpeg',
        ],
      },
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: [],
    },
  )
})
