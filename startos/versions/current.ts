import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:3',
  releaseNotes: {
    en_US: 'Fixes library scans that could stop near the end and never finish.',
    es_ES:
      'Corrige los escaneos de la biblioteca que podían detenerse cerca del final y no terminar nunca.',
    de_DE:
      'Behebt Bibliotheksscans, die kurz vor dem Ende stehen bleiben und nie fertig werden konnten.',
    pl_PL:
      'Naprawia skanowanie biblioteki, które mogło zatrzymać się pod koniec i nigdy nie zakończyć.',
    fr_FR:
      'Corrige les analyses de la bibliothèque qui pouvaient s’arrêter vers la fin et ne jamais se terminer.',
  },
  migrations: {},
})
