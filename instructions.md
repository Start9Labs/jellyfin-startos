# Jellyfin

## Documentation

- [Jellyfin documentation](https://jellyfin.org/docs/) — the upstream administrator and user guide covering libraries, clients, transcoding, and plugins.

## What you get on StartOS

- A **Web UI** interface that serves the Jellyfin web client and acts as the endpoint your Jellyfin mobile, TV, and desktop apps connect to.
- Read-only access to media stored on **File Browser** and/or **Nextcloud**, mounted at `/mnt/filebrowser` and `/mnt/nextcloud` inside Jellyfin. Jellyfin does not read arbitrary filesystem paths on StartOS — your media lives in one of those two services.

## Getting set up

Jellyfin posts a critical **Select Media Sources** task after install. You can't start the service until it's done.

1. Install **File Browser**, **Nextcloud**, or both, and upload your media to them.
2. Run the **Select Media Sources** task and tick the source(s) you uploaded media to. At least one must be selected.
3. Start Jellyfin and open the **Web UI** interface. Complete the upstream first-run wizard (create the admin user, set preferences).
4. In the wizard's library step, point each library at `/mnt/filebrowser` and/or `/mnt/nextcloud/data/<user>/files` — the read-only mount(s) for the source(s) you selected.

## Using Jellyfin

### Web UI

The **Web UI** interface is the Jellyfin web client. After the first-run wizard it becomes your day-to-day server admin and playback surface — users, libraries, playback settings, transcoding, plugin management, and remote access all live there. Point your Jellyfin client apps at the same address.

### Actions

- **Select Media Sources** — change which of File Browser and Nextcloud Jellyfin reads from. Changing sources updates Jellyfin's dependencies; if you remove a source, also remove or repoint any Jellyfin libraries that referenced its mount point.
- **Plugins** — toggle the bundled **Chromecast** (cast to Chromecast devices) and **YouTube Trailers** (auto-load movie trailers) plugins. All other plugins are managed inside the Jellyfin Web UI's plugin catalog.

## Limitations

- **No arbitrary media paths.** Jellyfin can only read media from File Browser and/or Nextcloud on StartOS — not from arbitrary host directories.
- **Media is read-only.** Jellyfin cannot modify or delete files in `/mnt/filebrowser` or `/mnt/nextcloud`; manage your media in the source service.
- **No hardware transcoding.** GPU acceleration is not available; transcoding is CPU-only.
