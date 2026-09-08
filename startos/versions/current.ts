import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { configJson } from '../fileModels/config.json'

export const current = VersionInfo.of({
  version: '12.0:0',
  releaseNotes: {
    en_US: `Updated Jellyfin to 12.0.

- Adds alternate episode versions, a still-watching prompt, extensible search and similarity providers, faster database queries, Live TV and subtitle fixes, expanded book support, FFmpeg 8.1, and security hardening.
- Fixes the Plugins action so enabling YouTube trailers activates the correct web plugin.
- Before updating, create a full backup and remove repository-installed plugins. Database changes prevent downgrade without a full restore.
- After updating, reinstall only compatible plugins and run the required full library scan. The first scan may take substantially longer than usual.

[Full release notes](https://github.com/jellyfin/jellyfin/releases/tag/v12.0)`,
    es_ES: `Jellyfin actualizado a 12.0.

- Añade versiones alternativas de episodios, un aviso para confirmar que sigues viendo, proveedores ampliables de búsqueda y similitud, consultas de base de datos más rápidas, correcciones de TV en directo y subtítulos, compatibilidad ampliada con libros, FFmpeg 8.1 y mejoras de seguridad.
- Corrige la acción Plugins para que al habilitar los tráilers de YouTube se active el plugin web correcto.
- Antes de actualizar, crea una copia de seguridad completa y elimina los plugins instalados desde repositorios. Los cambios en la base de datos impiden volver a una versión anterior sin una restauración completa.
- Después de actualizar, reinstala únicamente plugins compatibles y ejecuta el análisis completo obligatorio de la biblioteca. El primer análisis puede tardar bastante más de lo habitual.

[Notas de la versión completas](https://github.com/jellyfin/jellyfin/releases/tag/v12.0)`,
    de_DE: `Jellyfin auf 12.0 aktualisiert.

- Fügt alternative Episodenversionen, eine „Noch dabei?“-Abfrage, erweiterbare Such- und Ähnlichkeitsanbieter, schnellere Datenbankabfragen, Korrekturen für Live-TV und Untertitel, erweiterte Buchunterstützung, FFmpeg 8.1 und Sicherheitsverbesserungen hinzu.
- Korrigiert die Aktion „Plugins“, sodass das Aktivieren von YouTube-Trailern das richtige Web-Plugin einschaltet.
- Erstelle vor dem Update eine vollständige Sicherung und entferne aus Repositorys installierte Plugins. Die Datenbankänderungen verhindern ein Downgrade ohne vollständige Wiederherstellung.
- Installiere nach dem Update nur kompatible Plugins neu und führe den erforderlichen vollständigen Bibliotheksscan aus. Der erste Scan kann deutlich länger als üblich dauern.

[Vollständige Versionshinweise](https://github.com/jellyfin/jellyfin/releases/tag/v12.0)`,
    pl_PL: `Zaktualizowano Jellyfin do wersji 12.0.

- Dodano alternatywne wersje odcinków, monit „Nadal oglądasz?”, rozszerzalnych dostawców wyszukiwania i podobieństwa, szybsze zapytania do bazy danych, poprawki telewizji na żywo i napisów, rozszerzoną obsługę książek, FFmpeg 8.1 oraz zabezpieczenia.
- Naprawiono akcję Wtyczki, aby włączenie zwiastunów z YouTube aktywowało właściwą wtyczkę internetową.
- Przed aktualizacją utwórz pełną kopię zapasową i usuń wtyczki zainstalowane z repozytoriów. Zmiany w bazie danych uniemożliwiają powrót do starszej wersji bez pełnego przywrócenia.
- Po aktualizacji zainstaluj ponownie tylko zgodne wtyczki i wykonaj wymagane pełne skanowanie biblioteki. Pierwsze skanowanie może potrwać znacznie dłużej niż zwykle.

[Pełne informacje o wydaniu](https://github.com/jellyfin/jellyfin/releases/tag/v12.0)`,
    fr_FR: `Jellyfin mis à jour vers la version 12.0.

- Ajoute les versions alternatives d'épisodes, une invite « Toujours en train de regarder ? », des fournisseurs extensibles de recherche et de similarité, des requêtes de base de données plus rapides, des correctifs pour la TV en direct et les sous-titres, une meilleure prise en charge des livres, FFmpeg 8.1 et des améliorations de sécurité.
- Corrige l'action Plugins afin que l'activation des bandes-annonces YouTube active le bon plugin web.
- Avant la mise à jour, créez une sauvegarde complète et supprimez les plugins installés depuis des dépôts. Les modifications de la base de données empêchent tout retour à une version antérieure sans restauration complète.
- Après la mise à jour, réinstallez uniquement les plugins compatibles et lancez l'analyse complète obligatoire de la bibliothèque. La première analyse peut prendre beaucoup plus de temps que d'habitude.

[Notes de version complètes](https://github.com/jellyfin/jellyfin/releases/tag/v12.0)`,
  },
  migrations: {
    up: async ({ effects }) => {
      const plugins =
        (await configJson.read((config) => config.plugins).once()) || []
      const nextPlugins = new Set(plugins)
      if (nextPlugins.delete('trailers')) {
        nextPlugins.add('youtubePlayer/plugin')
      }
      nextPlugins.add('stillWatching/plugin')
      await configJson.merge(effects, { plugins: Array.from(nextPlugins) })
    },
    down: IMPOSSIBLE,
  },
})
