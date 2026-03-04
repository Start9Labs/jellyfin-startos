import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'

export const initConfig = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  await configJson.merge(effects, {})
})
