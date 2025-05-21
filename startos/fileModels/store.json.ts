import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, arrayOf, anyOf, literal } = matches

const shape = object({
  mediaSources: arrayOf(
    anyOf(literal('filebrowser'), literal('nextcloud')),
  ).onMismatch([]),
})

export const store = FileHelper.json(
  { volumeId: 'main', subpath: '/store.json' },
  shape,
)

export const StoreType = shape._TYPE
