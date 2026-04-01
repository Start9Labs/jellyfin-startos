import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'

export const initConfig = sdk.setupOnInit(async (effects) => {
  await configJson.merge(effects, {})
})
