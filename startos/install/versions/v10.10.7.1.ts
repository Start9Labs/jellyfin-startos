import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { load } from 'js-yaml'
import { configJson } from '../../fileModels/config.json'
import { configDefaults } from '../../utils'
import { store, StoreType } from '../../fileModels/store.json'

export const v_10_10_7_1 = VersionInfo.of({
  version: '10.10.7:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile(
          '/media/startos/volumes/main/start9/config.yaml',
          'utf-8',
        ),
      ) as
        | {
            mediasources: typeof StoreType.mediaSources
            chromecast: boolean
            trailers: boolean
          }
        | undefined

      await store.write(effects, {
        mediaSources: configYaml?.mediasources || [],
      })

      const plugins = configDefaults.plugins
      if (configYaml?.chromecast) plugins.push('chromecast')
      if (configYaml?.trailers) plugins.push('trailers')

      await configJson.write(effects, {
        ...configDefaults,
        plugins,
      })

      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
