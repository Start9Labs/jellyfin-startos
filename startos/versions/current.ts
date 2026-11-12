import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:4',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later. Fixes Jellyfin occasionally staying in Starting after it had finished starting up.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. Corrige que Jellyfin a veces se quedara en Iniciando después de haber terminado de arrancar.',
    de_DE:
      'Erfordert StartOS 0.4.2 oder neuer. Behebt, dass Jellyfin gelegentlich auf Wird gestartet blieb, obwohl der Start abgeschlossen war.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Naprawia sytuację, w której Jellyfin czasem pozostawał w stanie Uruchamianie mimo zakończonego startu.',
    fr_FR:
      'Nécessite StartOS 0.4.2 ou une version ultérieure. Corrige Jellyfin qui restait parfois en Démarrage alors que son démarrage était terminé.',
  },
  migrations: {},
})
