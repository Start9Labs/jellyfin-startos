import { setupManifest } from 'start-sdk/lib/manifest'
import { actionsMetadata } from './procedures/actions'

/**
 * In this function you define static properties of the service
 */
export const manifest = setupManifest({
  id: "jellyfin",
  title: "Jellyfin",
  version: "10.8.10",
  releaseNotes: "Update upstream to 10.8.10 [Release Notes](https://github.com/jellyfin/jellyfin/releases/tag/v10.8.10)",
  license: "gpl",
  replaces: Array<string>(),
  wrapperRepo: "https://github.com/Start9Labs/jellyfin-wrapper",
  upstreamRepo: "https://github.com/jellyfin/jellyfin",
  supportSite: "https://jellyfin.org/docs/",
  marketingSite: "https://jellyfin.org",
  donationUrl: "https://opencollective.com/jellyfin/donate",
  "description": {
    "short": "The Free Software Media System",
    "long": "Jellyfin is a Free Software Media System that puts you in control of managing and streaming your media. It is an alternative to the proprietary Emby and Plex, to provide media from a dedicated server to end-user devices via multiple apps.\n"
  },
  assets: {
    license: "LICENSE",
    icon: "assets/icon.png",
    instructions: "assets/instructions.md"
  },
  containers: {
    main: {
      image: 'main',
      mounts: {
        main: "/jellyfin/main",
        filebrowser: "/mnt/filebrowser",
        nextcloud: "/mnt/nextcloud",
        cache: "/cache",
        config: "/config"
      }
    },
  },
  volumes: {
    main: 'data',
    filebrowser: 'pointer',
    nextcloud: 'pointer',
    cache: 'data',
    config: 'data',
  },
  dependencies: {
    filebrowser: {
      version: "^2.14.1.1",
      description: "Used to get media from File Browser",
      requirement: {
        type: "opt-in",
        how: "Can alternatively use Nextcloud for file storage"
      }
    },
    nextcloud: {
      version: "^25.0.2",
      description: "Used to get media from Nextcloud",
      requirement: {
        type: "opt-in",
        how: "Can alternatively use Filebrowser for file storage"
      }
    }
  },
  actions: actionsMetadata,
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
})

export type Manifest = typeof manifest
