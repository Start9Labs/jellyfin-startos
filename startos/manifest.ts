import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'
import { currentContainer } from './install/versions'

const BUILD = process.env.BUILD || ''

const architectures =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

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
  volumes: ['main'],
  images: {
    jellyfin: {
      source: {
        dockerTag: currentContainer,
      },
      arch: architectures
    } as SDKImageInputSpec,
  },
  hardwareRequirements: { arch: architectures},
  alerts: {},
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
