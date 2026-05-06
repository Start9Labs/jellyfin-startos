import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson, defaultPlugins } from '../fileModels/config.json'
import { store, type StoreType } from '../fileModels/store.json'

export const v_10_11_8_3 = VersionInfo.of({
  version: '10.11.8:3',
  releaseNotes: {
    en_US:
      'Fix server crash on CPUs without SSE4.1 (pre-2008 Intel, pre-Bulldozer AMD, early Atom): swap libe_sqlite3.so for the build shipped in Jellyfin 10.10.7. See jellyfin/jellyfin#15148.',
    es_ES:
      'Corrige el cierre del servidor en CPU sin SSE4.1 (Intel anterior a 2008, AMD anterior a Bulldozer, Atom temprano): se sustituye libe_sqlite3.so por la versión incluida en Jellyfin 10.10.7. Véase jellyfin/jellyfin#15148.',
    de_DE:
      'Behebt den Serverabsturz auf CPUs ohne SSE4.1 (Intel vor 2008, AMD vor Bulldozer, frühe Atom): libe_sqlite3.so wird durch die Version aus Jellyfin 10.10.7 ersetzt. Siehe jellyfin/jellyfin#15148.',
    pl_PL:
      'Naprawia awarię serwera na procesorach bez SSE4.1 (Intel sprzed 2008, AMD sprzed Bulldozera, wczesne Atom): biblioteka libe_sqlite3.so zostaje zastąpiona wersją z Jellyfin 10.10.7. Zobacz jellyfin/jellyfin#15148.',
    fr_FR:
      "Corrige le plantage du serveur sur les CPU sans SSE4.1 (Intel pré-2008, AMD pré-Bulldozer, premiers Atom) : libe_sqlite3.so est remplacée par la version livrée dans Jellyfin 10.10.7. Voir jellyfin/jellyfin#15148.",
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
