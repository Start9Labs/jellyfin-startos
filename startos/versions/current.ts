import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.3:0',
  releaseNotes: {
    en_US:
      'Updated Jellyfin to 12.3. Fixes crashes while reading subtitles with unsupported encodings and probing streams without frame sizes, and improves TMDb matching. Create a full backup before updating. Full release notes: https://github.com/jellyfin/jellyfin/releases/tag/v12.3',
    es_ES:
      'Jellyfin actualizado a 12.3. Corrige cierres inesperados al leer subtítulos con codificaciones no compatibles y analizar flujos sin dimensiones de fotograma, y mejora las coincidencias de TMDb. Crea una copia de seguridad completa antes de actualizar. Notas de la versión completas: https://github.com/jellyfin/jellyfin/releases/tag/v12.3',
    de_DE:
      'Jellyfin auf 12.3 aktualisiert. Behebt Abstürze beim Lesen von Untertiteln mit nicht unterstützten Zeichenkodierungen und beim Analysieren von Streams ohne Bildgrößen und verbessert TMDb-Treffer. Erstelle vor der Aktualisierung eine vollständige Sicherung. Vollständige Versionshinweise: https://github.com/jellyfin/jellyfin/releases/tag/v12.3',
    pl_PL:
      'Zaktualizowano Jellyfin do wersji 12.3. Naprawiono awarie podczas odczytywania napisów z nieobsługiwanym kodowaniem i analizowania strumieni bez rozmiaru klatki oraz poprawiono dopasowania TMDb. Przed aktualizacją utwórz pełną kopię zapasową. Pełne informacje o wydaniu: https://github.com/jellyfin/jellyfin/releases/tag/v12.3',
    fr_FR:
      'Jellyfin mis à jour vers la version 12.3. Corrige les plantages lors de la lecture de sous-titres avec un encodage non pris en charge et de l’analyse de flux sans dimensions d’image, et améliore les correspondances TMDb. Créez une sauvegarde complète avant la mise à jour. Notes de version complètes : https://github.com/jellyfin/jellyfin/releases/tag/v12.3',
  },
  migrations: {},
})
