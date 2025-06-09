import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'jellyfin',
  title: 'Jellyfin',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/jellyfin-startos',
  upstreamRepo: 'https://github.com/jellyfin/jellyfin',
  supportSite: 'https://jellyfin.org/docs/',
  marketingSite: 'https://jellyfin.org',
  donationUrl: 'https://opencollective.com/jellyfin/donate',
  description: {
    short: 'The Free Software Media System',
    long: 'Jellyfin is a free and open source media server that enables you to organize, manage, and stream your personal media collection to any device. It serves as a community-driven alternative to proprietary platforms like Emby and Plex, offering full control over your media without tracking or licensing restrictions.',
  },
  volumes: ['main'],
  images: {
    jellyfin: {
      source: {
        dockerTag: 'jellyfin/jellyfin:10.10.7',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {},
  dependencies: {
    filebrowser: {
      description: 'Used to get media from File Browser',
      optional: true,
      s9pk: 'https://github.com/Start9Labs/filebrowser-startos/releases/download/v2.32.0/filebrowser_040_alpha.s9pk',
    },
    nextcloud: {
      description: 'Used to get media from Nextcloud',
      optional: true,
      // TODO update me
      s9pk: 'https://github.com/Start9Labs/nextcloud-startos/releases/download/v29.0.14.1/nextcloudV2.s9pk',
    },
  },
})
