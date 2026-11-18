import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:5',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later. Fixes the server error when uploading or downloading subtitles: they are now saved in Jellyfin’s own data, because the media folders are read-only.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. Corrige el error del servidor al subir o descargar subtítulos: ahora se guardan en los datos propios de Jellyfin, porque las carpetas de medios son de solo lectura.',
    de_DE:
      'Erfordert StartOS 0.4.2 oder neuer. Behebt den Serverfehler beim Hochladen oder Herunterladen von Untertiteln: Sie werden jetzt in Jellyfins eigenen Daten gespeichert, da die Medienordner schreibgeschützt sind.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Naprawia błąd serwera przy przesyłaniu lub pobieraniu napisów: są teraz zapisywane we własnych danych Jellyfin, ponieważ foldery multimediów są tylko do odczytu.',
    fr_FR:
      'Nécessite StartOS 0.4.2 ou une version ultérieure. Corrige l’erreur serveur lors de l’envoi ou du téléchargement de sous-titres : ils sont désormais enregistrés dans les données propres de Jellyfin, car les dossiers multimédias sont en lecture seule.',
  },
  migrations: {},
})
