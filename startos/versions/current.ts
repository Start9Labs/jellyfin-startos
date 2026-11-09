import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:1',
  releaseNotes: {
    en_US:
      'Fixes library scans hanging when media probes produce large amounts of diagnostic output. Requires StartOS 0.4.1 or later. Updating restarts the full service; Jellyfin’s own restart button does not apply this fix.',
    es_ES:
      'Corrige los análisis de bibliotecas que se bloquean cuando las sondas de medios generan muchos mensajes de diagnóstico. Requiere StartOS 0.4.1 o posterior. La actualización reinicia el servicio completo; el botón de reinicio de Jellyfin no aplica esta corrección.',
    de_DE:
      'Behebt hängende Bibliotheksscans, wenn Medienprüfungen große Mengen an Diagnoseausgaben erzeugen. Erfordert StartOS 0.4.1 oder neuer. Das Update startet den gesamten Dienst neu; die Neustart-Schaltfläche von Jellyfin wendet diese Korrektur nicht an.',
    pl_PL:
      'Naprawia zawieszanie się skanowania bibliotek, gdy sondowanie multimediów generuje dużo komunikatów diagnostycznych. Wymaga StartOS 0.4.1 lub nowszego. Aktualizacja uruchamia ponownie całą usługę; przycisk ponownego uruchomienia w Jellyfin nie stosuje tej poprawki.',
    fr_FR:
      'Corrige le blocage des analyses de médiathèque lorsque les sondes multimédias produisent beaucoup de messages de diagnostic. Nécessite StartOS 0.4.1 ou ultérieur. La mise à jour redémarre le service complet ; le bouton de redémarrage de Jellyfin n’applique pas cette correction.',
  },
  migrations: {},
})
