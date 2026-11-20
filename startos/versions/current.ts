import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '12.4:6',
  releaseNotes: {
    en_US:
      'Publishes an API key that other services on this server, such as Unmanic, use to ask Jellyfin to rescan its libraries. It appears in Jellyfin’s API Keys list as “StartOS”.',
    es_ES:
      'Publica una clave de API que otros servicios de este servidor, como Unmanic, usan para pedir a Jellyfin que vuelva a escanear sus bibliotecas. Aparece en la lista de claves de API de Jellyfin como «StartOS».',
    de_DE:
      'Veröffentlicht einen API-Schlüssel, mit dem andere Dienste auf diesem Server, etwa Unmanic, Jellyfin zum erneuten Scannen seiner Bibliotheken auffordern. Er erscheint in Jellyfins Liste der API-Schlüssel als „StartOS“.',
    pl_PL:
      'Udostępnia klucz API, którego inne usługi na tym serwerze, takie jak Unmanic, używają, aby poprosić Jellyfin o ponowne przeskanowanie bibliotek. Pojawia się na liście kluczy API Jellyfin jako „StartOS”.',
    fr_FR:
      'Publie une clé d’API que d’autres services de ce serveur, comme Unmanic, utilisent pour demander à Jellyfin de réanalyser ses bibliothèques. Elle apparaît dans la liste des clés d’API de Jellyfin sous le nom « StartOS ».',
  },
  migrations: {},
})
