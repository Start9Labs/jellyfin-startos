import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson, defaultPlugins } from '../fileModels/config.json'
import { store, type StoreType } from '../fileModels/store.json'

export const current = VersionInfo.of({
  version: '10.11.11:0',
  releaseNotes: {
    en_US:
      'Updates Jellyfin to 10.11.11 (bugfixes and security patches). Internal updates (start-sdk 2.0.x).',
    es_ES:
      'Actualiza Jellyfin a 10.11.11 (correcciones de errores y parches de seguridad). Actualizaciones internas (start-sdk 2.0.x).',
    de_DE:
      'Aktualisiert Jellyfin auf 10.11.11 (Fehlerbehebungen und Sicherheitspatches). Interne Aktualisierungen (start-sdk 2.0.x).',
    pl_PL:
      'Aktualizuje Jellyfin do 10.11.11 (poprawki błędów i łatki bezpieczeństwa). Aktualizacje wewnętrzne (start-sdk 2.0.x).',
    fr_FR:
      'Met à jour Jellyfin vers 10.11.11 (corrections de bugs et correctifs de sécurité). Mises à jour internes (start-sdk 2.0.x).',
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
