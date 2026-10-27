import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:0',
  releaseNotes: {
    en_US:
      'Updated Jellyfin to 12.4, a runtime-only hotfix updating .NET to 10.0.14. Updated start-sdk to 3.1.1. Create a full backup before updating. Full release notes: https://github.com/jellyfin/jellyfin/releases/tag/v12.4',
    es_ES:
      'Jellyfin actualizado a 12.4, una corrección limitada al entorno de ejecución que actualiza .NET a 10.0.14. start-sdk actualizado a 3.1.1. Crea una copia de seguridad completa antes de actualizar. Notas de la versión completas: https://github.com/jellyfin/jellyfin/releases/tag/v12.4',
    de_DE:
      'Jellyfin auf 12.4 aktualisiert, ein Hotfix ausschließlich für die Laufzeitumgebung mit .NET 10.0.14. start-sdk auf 3.1.1 aktualisiert. Erstelle vor der Aktualisierung eine vollständige Sicherung. Vollständige Versionshinweise: https://github.com/jellyfin/jellyfin/releases/tag/v12.4',
    pl_PL:
      'Zaktualizowano Jellyfin do wersji 12.4, poprawki ograniczonej do aktualizacji środowiska .NET do wersji 10.0.14. Zaktualizowano start-sdk do wersji 3.1.1. Przed aktualizacją utwórz pełną kopię zapasową. Pełne informacje o wydaniu: https://github.com/jellyfin/jellyfin/releases/tag/v12.4',
    fr_FR:
      'Jellyfin mis à jour vers la version 12.4, un correctif limité à la mise à jour de l’environnement .NET vers 10.0.14. start-sdk mis à jour vers la version 3.1.1. Créez une sauvegarde complète avant la mise à jour. Notes de version complètes : https://github.com/jellyfin/jellyfin/releases/tag/v12.4',
  },
  migrations: {},
})
