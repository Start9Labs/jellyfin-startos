import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_10_10_7_2 = VersionInfo.of({
  version: '10.10.7:2-alpha.0',
  releaseNotes: 'Updated for StartOS 0.4.0',
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
