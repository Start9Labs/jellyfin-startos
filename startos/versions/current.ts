import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.2:0',
  releaseNotes: {
    en_US: `Updated Jellyfin to 12.2.

- Fixes hangs when reading malformed FLAC files and keeps library items when media paths cannot be resolved.
- Fixes MKV remux playback, graphical subtitles, stereo downmixing, and low-bitrate video quality.
- Improves Next Up, playlists, library preferences, metadata, and database migration reliability.
- Updates internal packaging dependencies, including start-sdk to 3.0.4.
- Create a full backup before updating.

[Full release notes](https://github.com/jellyfin/jellyfin/releases/tag/v12.2)`,
    es_ES: `Jellyfin actualizado a 12.2.

- Corrige bloqueos al leer archivos FLAC malformados y conserva los elementos de la biblioteca cuando no se pueden resolver las rutas de medios.
- Corrige la reproducción de MKV remultiplexados, los subtítulos gráficos, la mezcla a estéreo y la calidad de vídeo a bajas tasas de bits.
- Mejora los próximos episodios, las listas de reproducción, las preferencias de biblioteca, los metadatos y la fiabilidad de las migraciones de base de datos.
- Actualiza las dependencias internas del paquete, incluido start-sdk a 3.0.4.
- Crea una copia de seguridad completa antes de actualizar.

[Notas de la versión completas](https://github.com/jellyfin/jellyfin/releases/tag/v12.2)`,
    de_DE: `Jellyfin auf 12.2 aktualisiert.

- Behebt Hänger beim Lesen fehlerhafter FLAC-Dateien und bewahrt Bibliothekseinträge, wenn Medienpfade nicht aufgelöst werden können.
- Behebt Fehler bei der Wiedergabe umgemuxter MKV-Dateien, grafischen Untertiteln, Stereo-Downmix und der Videoqualität bei niedrigen Bitraten.
- Verbessert nächste Episoden, Wiedergabelisten, Bibliothekseinstellungen, Metadaten und die Zuverlässigkeit von Datenbankmigrationen.
- Aktualisiert interne Paketabhängigkeiten, einschließlich start-sdk auf 3.0.4.
- Erstelle vor der Aktualisierung eine vollständige Sicherung.

[Vollständige Versionshinweise](https://github.com/jellyfin/jellyfin/releases/tag/v12.2)`,
    pl_PL: `Zaktualizowano Jellyfin do wersji 12.2.

- Naprawiono zawieszanie się podczas odczytu nieprawidłowych plików FLAC i zachowano elementy biblioteki, gdy nie można rozpoznać ścieżek do mediów.
- Naprawiono odtwarzanie przepakowanych plików MKV, napisy graficzne, miksowanie do stereo i jakość wideo przy niskich przepływnościach.
- Ulepszono następne odcinki, listy odtwarzania, preferencje bibliotek, metadane i niezawodność migracji bazy danych.
- Zaktualizowano wewnętrzne zależności pakietu, w tym start-sdk do wersji 3.0.4.
- Przed aktualizacją utwórz pełną kopię zapasową.

[Pełne informacje o wydaniu](https://github.com/jellyfin/jellyfin/releases/tag/v12.2)`,
    fr_FR: `Jellyfin mis à jour vers la version 12.2.

- Corrige les blocages lors de la lecture de fichiers FLAC malformés et conserve les éléments de la médiathèque lorsque les chemins des médias ne peuvent pas être résolus.
- Corrige la lecture des MKV remultiplexés, les sous-titres graphiques, le mixage en stéréo et la qualité vidéo à faible débit.
- Améliore les prochains épisodes, les listes de lecture, les préférences des médiathèques, les métadonnées et la fiabilité des migrations de base de données.
- Met à jour les dépendances internes du paquet, dont start-sdk vers la version 3.0.4.
- Créez une sauvegarde complète avant la mise à jour.

[Notes de version complètes](https://github.com/jellyfin/jellyfin/releases/tag/v12.2)`,
  },
  migrations: {},
})
