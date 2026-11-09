import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:1',
  releaseNotes: {
    en_US:
      "Requires StartOS 0.4.1 or later. Jellyfin now sees only Nextcloud's user files, not its configuration.",
    es_ES:
      'Requiere StartOS 0.4.1 o posterior. Jellyfin ahora solo ve los archivos de usuario de Nextcloud, no su configuración.',
    de_DE:
      'Erfordert StartOS 0.4.1 oder neuer. Jellyfin sieht jetzt nur noch die Benutzerdateien von Nextcloud, nicht dessen Konfiguration.',
    pl_PL:
      'Wymaga StartOS 0.4.1 lub nowszego. Jellyfin widzi teraz tylko pliki użytkowników Nextcloud, a nie jego konfigurację.',
    fr_FR:
      'Nécessite StartOS 0.4.1 ou une version ultérieure. Jellyfin ne voit désormais que les fichiers utilisateur de Nextcloud, et non sa configuration.',
  },
  migrations: {},
})
