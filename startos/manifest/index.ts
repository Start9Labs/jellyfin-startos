import { setupManifest } from '@start9labs/start-sdk'
import { upstream } from '../install/versions'
import i18n from './i18n'

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
  description: i18n.description,
  volumes: ['startos', 'cache', 'config', 'main'], // @TODO main only needed for migration
  images: {
    jellyfin: {
      source: {
        dockerTag: `jellyfin/jellyfin:${upstream}`,
      },
      arch: ['x86_64', 'aarch64'],
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
