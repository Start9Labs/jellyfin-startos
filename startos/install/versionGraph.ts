import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { configJson } from '../fileModels/config.json'
import { configDefaults } from '../utils'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await configJson.write(effects, configDefaults)
  },
})
