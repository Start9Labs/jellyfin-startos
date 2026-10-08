export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Jellyfin!': 0,
  'No media sources': 1,
  'Server and Web UI': 2,
  'Server and web UI are ready': 3,
  'Server or web UI unreachable': 4,
  'Web UI': 5,
  'The web interface of Jellyfin': 6,
  'Media Sources': 7,
  'FileBrowser Quantum': 8,
  Nextcloud: 9,
  'Select Media Sources': 10,
  'Choose which services Jellyfin reads media from. Each one is mounted read-only, and changing the selection restarts Jellyfin.': 11,
  Chromecast: 12,
  'Lets the web client cast to a Chromecast. Casting is offered only in Chromium-based browsers, such as Chrome.': 13,
  'YouTube trailers': 14,
  'Lets the web client play trailers hosted on YouTube, in an embedded YouTube player. Playing one connects your browser to YouTube.': 15,
  Plugins: 16,
  "Turn the web client's Chromecast and YouTube trailer plugins on or off. A change takes effect when the web client is reloaded.": 17,
  'Select where Jellyfin media are stored': 18,
  NextExplorer: 19,
  "- NextExplorer: mounted at /mnt/nextexplorer, one folder per drive, such as /mnt/nextexplorer/Files\n- FileBrowser Quantum: mounted at /mnt/filebrowser\n- Nextcloud: mounted at /mnt/nextcloud; each user's files are in /mnt/nextcloud/data/{username}/files": 20,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
