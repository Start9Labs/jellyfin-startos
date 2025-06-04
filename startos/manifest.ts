import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'jellyfin',
  title: 'Jellyfin',
  license: 'mit',
  wrapperRepo: 'https://github.com/Start9Labs/jellyfin-startos',
  upstreamRepo: 'https://github.com/jellyfin/jellyfin',
  supportSite: 'https://jellyfin.org/docs/',
  marketingSite: 'https://jellyfin.org',
  donationUrl: 'https://opencollective.com/jellyfin/donate',
  description: {
    short: 'The Free Software Media System',
    long: 'Jellyfin is a Free Software Media System that puts you in control of managing and streaming your media. It is an alternative to the proprietary Emby and Plex, to provide media from a dedicated server to end-user devices via multiple apps.',
  },
  volumes: ['main'],
  images: {
    jellyfin: {
      source: {
        dockerTag: 'jellyfin/jellyfin:10.10.6',
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
      s9pk: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v28.1.0.0-alpha/bitcoind.s9pk',
    },
  },
})
