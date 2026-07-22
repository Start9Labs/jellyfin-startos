import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_10_11_11_0 } from './v10.11.11_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_10_11_11_0],
})
