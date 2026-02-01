import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, arrayOf, literals } = matches

const shape = object({
  mediaSources: arrayOf(literals('filebrowser', 'nextcloud')).onMismatch([]),
})

export const store = FileHelper.json(
  {
    base: sdk.volumes.startos,
    subpath: '/store.json',
  },
  shape,
)

export const StoreType = shape._TYPE
