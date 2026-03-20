import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson, defaultPlugins } from '../../fileModels/config.json'
import { store, type StoreType } from '../../fileModels/store.json'

export const v_10_11_6_2_b2 = VersionInfo.of({
  version: '10.11.6:2-beta.2',
  releaseNotes: {
    en_US: 'Update to StartOS SDK beta.60',
    es_ES: 'Actualización a StartOS SDK beta.60',
    de_DE: 'Update auf StartOS SDK beta.60',
    pl_PL: 'Aktualizacja do StartOS SDK beta.60',
    fr_FR: 'Mise à jour vers StartOS SDK beta.60',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml:
        | {
            mediasources: StoreType['mediaSources']
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

        const plugins = [...defaultPlugins]
        if (configYaml.chromecast) plugins.push('chromecast')
        if (configYaml.trailers) plugins.push('trailers')

        await configJson.merge(effects, { plugins })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
