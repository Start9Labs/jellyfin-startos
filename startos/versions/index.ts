import { VersionGraph } from '@start9labs/start-sdk'
import { v_10_11_8_1 } from './v10.11.8.1'
import { v_10_11_8_2 } from './v10.11.8.2'

export const versionGraph = VersionGraph.of({
  current: v_10_11_8_2,
  other: [v_10_11_8_1],
})
