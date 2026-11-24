import { utils } from '@start9labs/start-sdk'
import { apiKeyFile } from '../fileModels/apiKey'
import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const shareApiKey = sdk.setupOnInit(async (effects) => {
  let apiKey = await store.read((s) => s.apiKey).const(effects)
  if (!apiKey) {
    apiKey = utils.getDefaultString({ charset: 'a-f,0-9', len: 32 })
    await store.merge(effects, { apiKey }, { allowWriteAfterConst: true })
  }
  await apiKeyFile.write(effects, apiKey)
})
