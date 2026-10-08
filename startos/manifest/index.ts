import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'jellyfin',
  title: 'Jellyfin',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/jellyfin-startos',
  upstreamRepo: 'https://github.com/jellyfin/jellyfin',
  marketingUrl: 'https://jellyfin.org',
  donationUrl: 'https://opencollective.com/jellyfin/donate',
  description: i18n.description,
  volumes: ['startos', 'cache', 'config', 'main'],
  images: {
    jellyfin: {
      source: {
        dockerBuild: {},
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
