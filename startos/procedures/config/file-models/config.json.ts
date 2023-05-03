import { matches } from 'start-sdk/lib'
import { FileHelper } from 'start-sdk/lib/util'

const { object, array, string, natural, anyOf, literal, boolean } = matches

const jsonShape = object({
  includeCorsCredentials: boolean,
  multiserver: boolean,
  themes: array(
    object({
      name: string,
      id: string,
      color: string,
      default: boolean.optional(),
    })
  ),
  menuLinks: array,
  servers: array,
  plugins: array(
    string
  )
})

export const jellyfinConfig = FileHelper.json('config.json', 'root', jsonShape)