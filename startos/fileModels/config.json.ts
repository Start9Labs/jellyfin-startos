import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const defaultThemes = [
  { name: 'Apple TV', id: 'appletv', color: '#bcbcbc' },
  { name: 'Blue Radiance', id: 'blueradiance', color: '#011432' },
  { name: 'Dark', id: 'dark', color: '#202020', default: true as const },
  { name: 'Light', id: 'light', color: '#303030' },
  { name: 'Purple Haze', id: 'purplehaze', color: '#000420' },
  { name: 'WMC', id: 'wmc', color: '#0c2450' },
]

export const defaultPlugins = [
  'playAccessValidation/plugin',
  'experimentalWarnings/plugin',
  'htmlAudioPlayer/plugin',
  'htmlVideoPlayer/plugin',
  'photoPlayer/plugin',
  'comicsPlayer/plugin',
  'bookPlayer/plugin',
  'backdropScreensaver/plugin',
  'pdfPlayer/plugin',
  'logoScreensaver/plugin',
  'sessionPlayer/plugin',
  'syncPlay/plugin',
]

const shape = z.object({
  includeCorsCredentials: z.boolean().catch(false),
  multiserver: z.boolean().catch(false),
  themes: z
    .array(
      z.object({
        name: z.string(),
        id: z.string(),
        color: z.string(),
        default: z.boolean().optional(),
      }),
    )
    .catch(defaultThemes),
  menuLinks: z.array(z.any()).catch([]),
  servers: z.array(z.any()).catch([]),
  plugins: z.array(z.string()).catch(defaultPlugins),
})

export const configJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: '/config.json',
  },
  shape,
)
