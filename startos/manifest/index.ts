import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'jellyfin',
  title: 'Jellyfin',
  license: 'MIT',
  packageRepo:
    'https://github.com/Start9Labs/jellyfin-startos',
  upstreamRepo: 'https://github.com/jellyfin/jellyfin',
  marketingUrl: 'https://jellyfin.org',
  docsUrls: ['https://jellyfin.org/docs/'],
  donationUrl: 'https://opencollective.com/jellyfin/donate',
  description: i18n.description,
  volumes: ['startos', 'cache', 'config', 'main'], // @TODO main only needed for migration
  images: {
    jellyfin: {
      source: {
        dockerTag: 'jellyfin/jellyfin:10.11.7',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    filebrowser: {
      description: i18n.filebrowserDescription,
      optional: true,
      metadata: {
        title: 'File Browser',
        icon: 'https://raw.githubusercontent.com/Start9Labs/filebrowser-startos/fbf1fefb51cca9731f2a9a9e6f790ca150aa9d04/icon.svg',
      },
    },
    nextcloud: {
      description: i18n.nextcloudDescription,
      optional: true,
      metadata: {
        title: 'Nextcloud',
        icon: 'https://raw.githubusercontent.com/Start9Labs/nextcloud-startos/f5025c524301aebe62d9a79ad720223b053e1bf2/icon.svg',
      },
    },
  },
})
