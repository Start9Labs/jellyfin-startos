import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.1:2',
  releaseNotes: {
    en_US: `- **Select Media Sources** lists each source with the path where its files appear inside Jellyfin.
- **Plugins** explains what the Chromecast and YouTube trailers plugins do, and that playing a YouTube trailer connects your browser to YouTube.`,
    es_ES: `- **Seleccionar fuentes de medios** muestra cada fuente con la ruta en la que aparecen sus archivos dentro de Jellyfin.
- **Plugins** explica qué hacen los plugins Chromecast y Tráilers de YouTube, y que reproducir un tráiler de YouTube conecta tu navegador con YouTube.`,
    de_DE: `- **Medienquellen auswählen** zeigt jede Quelle mit dem Pfad, unter dem ihre Dateien in Jellyfin erscheinen.
- **Plugins** erklärt, was die Plugins für Chromecast und YouTube-Trailer tun und dass sich Ihr Browser beim Abspielen eines YouTube-Trailers mit YouTube verbindet.`,
    pl_PL: `- **Wybierz źródła mediów** pokazuje każde źródło wraz ze ścieżką, pod którą jego pliki są widoczne w Jellyfin.
- **Pluginy** wyjaśnia, do czego służą wtyczki Chromecast i zwiastunów YouTube oraz że odtworzenie zwiastuna z YouTube łączy przeglądarkę z YouTube.`,
    fr_FR: `- **Sélectionner les sources de médias** indique pour chaque source le chemin où ses fichiers apparaissent dans Jellyfin.
- **Plugins** explique le rôle des plugins Chromecast et bandes-annonces YouTube, et que lire une bande-annonce YouTube connecte votre navigateur à YouTube.`,
  },
  migrations: {},
})
