import { matches, FileHelper } from '@start9labs/start-sdk'
import { configDefaults } from '../utils'

const { object, array, string, boolean } = matches

const shape = object({
  includeCorsCredentials: boolean.onMismatch(
    configDefaults.includeCorsCredentials,
  ),
  multiserver: boolean.onMismatch(configDefaults.multiserver),
  themes: array(
    object({
      name: string,
      id: string,
      color: string,
      default: boolean.optional(),
    }),
  ).onMismatch(configDefaults.themes),
  menuLinks: array.onMismatch(configDefaults.menuLinks),
  servers: array.onMismatch(configDefaults.servers),
  plugins: array(string).onMismatch(configDefaults.plugins),
})

export const configJson = FileHelper.json(
  '/media/startos/volumes/main/config.json',
  shape,
)
