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
  'File Browser': 8,
  'Nextcloud': 9,
  'Select Media Sources': 10,
  'Service(s) Jellyfin uses to access media': 11,
  'Chromecast': 12,
  'Chromecast plugin to allow casting to other devices.': 13,
  'Youtube trailers': 14,
  'Auto-load movie trailers from YouTube.': 15,
  'Plugins': 16,
  'Select which plugins to enable': 17,
  'Select where Jellyfin media are stored': 18,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
