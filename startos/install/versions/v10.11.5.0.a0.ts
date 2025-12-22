import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../../fileModels/config.json'
import { configDefaults } from '../../utils'
import { store, StoreType } from '../../fileModels/store.json'

const version = '10.11.5:0-alpha.0'
export const upstream = version.split(':')[0]

export const v_10_11_5_0_a0 = VersionInfo.of({
  version,
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml:
        | {
            mediasources: typeof StoreType.mediaSources
            chromecast: boolean
            trailers: boolean
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await store.write(effects, {
          mediaSources: configYaml.mediasources || [],
        })

        const plugins = configDefaults.plugins
        if (configYaml.chromecast) plugins.push('chromecast')
        if (configYaml.trailers) plugins.push('trailers')

        await configJson.write(effects, {
          ...configDefaults,
          plugins,
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
