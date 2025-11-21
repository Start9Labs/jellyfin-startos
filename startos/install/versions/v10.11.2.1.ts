import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_10_11_2_1 = VersionInfo.of({
  version: '10.11.2:1-alpha.1',
  releaseNotes: `\
  Updated for StartOS 0.4.0`,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
