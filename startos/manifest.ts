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
  docsUrl:
    'https://github.com/Start9Labs/jellyfin-startos/blob/update/040/docs/README.md',
  description: {
    short: 'The Free Software Media System',
    long: 'Jellyfin is a free and open source media server that enables you to organize, manage, and stream your personal media collection to any device. It serves as a community-driven alternative to proprietary platforms like Emby and Plex, offering full control over your media without tracking or licensing restrictions.',
  },
  volumes: ['startos', 'cache', 'config', 'main'], // @TODO main only needed for migration
  images: {
    jellyfin: {
      source: {
        dockerTag: 'jellyfin/jellyfin:10.11.2',
      },
    },
  },
  dependencies: {
    filebrowser: {
      description: 'Used to get media from File Browser',
      optional: true,
      metadata: {
        title: 'File Browser',
        icon: 'https://raw.githubusercontent.com/Start9Labs/filebrowser-startos/refs/heads/master/icon.png',
      },
    },
    nextcloud: {
      description: 'Used to get media from Nextcloud',
      optional: true,
      metadata: {
        title: 'Nextcloud',
        icon: 'https://raw.githubusercontent.com/Start9Labs/nextcloud-startos/refs/heads/master/icon.png',
      },
    },
  },
})
