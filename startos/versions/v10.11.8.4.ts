import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson, defaultPlugins } from '../fileModels/config.json'
import { store, type StoreType } from '../fileModels/store.json'

export const v_10_11_8_4 = VersionInfo.of({
  version: '10.11.8:4',
  releaseNotes: {
    en_US: '**Internal**\n\n- Bump @start9labs/start-sdk to 1.5.0.',
    es_ES: '**Interno**\n\n- Actualiza @start9labs/start-sdk a 1.5.0.',
    de_DE: '**Intern**\n\n- @start9labs/start-sdk auf 1.5.0 aktualisiert.',
    pl_PL: '**Wewnętrzne**\n\n- Aktualizacja @start9labs/start-sdk do 1.5.0.',
    fr_FR: '**Interne**\n\n- Mise à jour de @start9labs/start-sdk vers 1.5.0.',
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
