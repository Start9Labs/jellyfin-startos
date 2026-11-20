import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  apiKey: z
    .string()
    .regex(/^[0-9a-f]{32}$/)
    .optional()
    .catch(undefined),
  mediaSources: z
    .array(z.enum(['nextexplorer', 'filebrowser', 'nextcloud']))
    .catch([]),
})

export const store = FileHelper.json(
  {
    base: sdk.volumes.startos,
    subpath: '/store.json',
  },
  shape,
)

export type StoreType = z.infer<typeof shape>
