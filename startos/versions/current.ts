import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.1:1',
  releaseNotes: {
    en_US: `Jellyfin can now read media from **NextExplorer**, the recommended file server, mounted at \`/mnt/nextexplorer\`. Select it under **Select Media Sources**; FileBrowser Quantum and Nextcloud remain available.

Updated Jellyfin to 12.1.

- Improves database migration backup integrity and memory use, and cleans invalid data before upgrades.
- Preserves library items, active scans, and TV guide data when filesystem or download operations fail.
- Fixes playback, transcoding, subtitles, Vulkan tone mapping, trickplay, SyncPlay, collections, and alternate episode versions.
- Revoking a device's access now logs out its existing sessions.
- Create a full backup before updating.

[Full release notes](https://github.com/jellyfin/jellyfin/releases/tag/v12.1)`,
    es_ES: `Jellyfin ahora puede leer medios desde **NextExplorer**, el servidor de archivos recomendado, montado en \`/mnt/nextexplorer\`. Selecciónalo en **Seleccionar fuentes de medios**; FileBrowser Quantum y Nextcloud siguen disponibles.

Jellyfin actualizado a 12.1.

- Mejora la integridad de las copias de seguridad y el uso de memoria durante la migración de la base de datos, y limpia los datos no válidos antes de las actualizaciones.
- Conserva los elementos de la biblioteca, los análisis activos y los datos de la guía de TV cuando fallan las operaciones del sistema de archivos o las descargas.
- Corrige la reproducción, la transcodificación, los subtítulos, el mapeo de tonos Vulkan, Trickplay, SyncPlay, las colecciones y las versiones alternativas de episodios.
- Revocar el acceso de un dispositivo ahora cierra sus sesiones existentes.
- Crea una copia de seguridad completa antes de actualizar.

[Notas de la versión completas](https://github.com/jellyfin/jellyfin/releases/tag/v12.1)`,
    de_DE: `Jellyfin kann Medien jetzt aus **NextExplorer** lesen, dem empfohlenen Dateiserver, eingebunden unter \`/mnt/nextexplorer\`. Wählen Sie ihn unter **Medienquellen auswählen**; FileBrowser Quantum und Nextcloud bleiben verfügbar.

Jellyfin auf 12.1 aktualisiert.

- Verbessert die Integrität von Sicherungen und den Speicherbedarf bei Datenbankmigrationen und bereinigt ungültige Daten vor Aktualisierungen.
- Bewahrt Bibliothekseinträge, aktive Scans und TV-Programmdaten, wenn Dateisystem- oder Downloadvorgänge fehlschlagen.
- Behebt Fehler bei Wiedergabe, Transkodierung, Untertiteln, Vulkan-Tonemapping, Trickplay, SyncPlay, Sammlungen und alternativen Episodenversionen.
- Das Entziehen des Gerätezugriffs meldet jetzt bestehende Sitzungen des Geräts ab.
- Erstelle vor der Aktualisierung eine vollständige Sicherung.

[Vollständige Versionshinweise](https://github.com/jellyfin/jellyfin/releases/tag/v12.1)`,
    pl_PL: `Jellyfin może teraz odczytywać multimedia z **NextExplorer**, zalecanego serwera plików, zamontowanego w \`/mnt/nextexplorer\`. Wybierz go w **Wybierz źródła mediów**; FileBrowser Quantum i Nextcloud pozostają dostępne.

Zaktualizowano Jellyfin do wersji 12.1.

- Poprawiono integralność kopii zapasowych i zużycie pamięci podczas migracji bazy danych oraz czyszczenie nieprawidłowych danych przed aktualizacjami.
- Elementy biblioteki, aktywne skanowania i dane przewodnika telewizyjnego są zachowywane po nieudanych operacjach systemu plików lub pobierania.
- Naprawiono odtwarzanie, transkodowanie, napisy, mapowanie tonów Vulkan, Trickplay, SyncPlay, kolekcje i alternatywne wersje odcinków.
- Cofnięcie dostępu urządzenia wylogowuje teraz jego istniejące sesje.
- Przed aktualizacją utwórz pełną kopię zapasową.

[Pełne informacje o wydaniu](https://github.com/jellyfin/jellyfin/releases/tag/v12.1)`,
    fr_FR: `Jellyfin peut désormais lire les médias depuis **NextExplorer**, le serveur de fichiers recommandé, monté sur \`/mnt/nextexplorer\`. Sélectionnez-le dans **Sélectionner les sources de médias** ; FileBrowser Quantum et Nextcloud restent disponibles.

Jellyfin mis à jour vers la version 12.1.

- Améliore l'intégrité des sauvegardes et l'utilisation de la mémoire lors des migrations de base de données, et nettoie les données non valides avant les mises à jour.
- Préserve les éléments de la médiathèque, les analyses actives et les données du guide TV lorsque des opérations sur le système de fichiers ou des téléchargements échouent.
- Corrige la lecture, le transcodage, les sous-titres, le mappage des tons Vulkan, Trickplay, SyncPlay, les collections et les versions alternatives d'épisodes.
- La révocation de l'accès d'un appareil déconnecte désormais ses sessions existantes.
- Créez une sauvegarde complète avant la mise à jour.

[Notes de version complètes](https://github.com/jellyfin/jellyfin/releases/tag/v12.1)`,
  },
  migrations: {},
})
