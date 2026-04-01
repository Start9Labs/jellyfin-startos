<p align="center">
  <img src="icon.svg" alt="Jellyfin Logo" width="21%">
</p>

# Jellyfin on StartOS

> **Upstream docs:** <https://jellyfin.org/docs/>
>
> Everything not listed in this document should behave the same as upstream
> Jellyfin. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Jellyfin](https://github.com/jellyfin/jellyfin) is a free software media system that puts you in control of managing and streaming your media. It's an open-source alternative to proprietary media servers with no premium licenses or hidden features.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `jellyfin/jellyfin` (upstream unmodified) |
| Architectures | x86_64, aarch64 |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `config` | `/config` | Jellyfin configuration and metadata |
| `cache` | `/cache` | Transcoding cache and temporary files |
| `startos` | — | StartOS-managed state |

**Media access:**

- `/mnt/filebrowser` — File Browser data (read-only)
- `/mnt/nextcloud` — Nextcloud data (read-only)

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Docker setup | Install from marketplace |
| Media paths | Configure any filesystem path | Select File Browser and/or Nextcloud |
| Initial setup | Create admin via web UI | Same as upstream |
| Library setup | Add media folders | Add `/mnt/filebrowser` or `/mnt/nextcloud` paths |

**First-run steps:**

1. Install File Browser and/or Nextcloud (if not already installed)
2. Upload media to File Browser or Nextcloud
3. Install Jellyfin from StartOS marketplace
4. Run "Select Media Sources" action to enable dependencies
5. Access web UI and complete setup wizard
6. Add library pointing to `/mnt/filebrowser` or `/mnt/nextcloud/data/{user}/files`

---

## Configuration Management

### Settings Managed via StartOS Actions

| Setting | Action | Description |
|---------|--------|-------------|
| Media Sources | Select Media Sources | Choose File Browser and/or Nextcloud |
| Plugins | Plugins | Enable Chromecast or YouTube trailers |

### Settings Managed via Jellyfin Web UI

All other Jellyfin settings are configured through the web interface:

- User management
- Library configuration
- Playback settings
- Transcoding options
- Network settings
- Plugin management (beyond StartOS-managed ones)

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 8096 | HTTP | Jellyfin web interface |

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

**Client apps:** Use any of the above URLs in Jellyfin mobile/TV apps.

---

## Actions (StartOS UI)

### Select Media Sources

| Property | Value |
|----------|-------|
| ID | `media-sources` |
| Name | Select Media Sources |
| Visibility | Enabled |
| Availability | Any status |
| Purpose | Choose which services provide media files |

**Options:**

- **File Browser** — Access media from File Browser's data volume
- **Nextcloud** — Access media from Nextcloud's data volume

At least one source must be selected.

### Plugins

| Property | Value |
|----------|-------|
| ID | `plugins` |
| Name | Plugins |
| Visibility | Enabled |
| Availability | Any status |
| Purpose | Toggle optional plugins |

**Available plugins:**

- **Chromecast** — Cast to Chromecast devices
- **YouTube Trailers** — Auto-load movie trailers from YouTube

---

## Dependencies

At least one dependency must be configured via the "Select Media Sources" action.

### File Browser

| Property | Value |
|----------|-------|
| Required | Optional |
| Version constraint | `>= 2.62.2` |
| Health checks | None |
| Mounted volumes | `data` → `/mnt/filebrowser` (read-only) |
| Purpose | Media source for movies, TV, music, photos |

### Nextcloud

| Property | Value |
|----------|-------|
| Required | Optional |
| Version constraint | `>= 32.0.7` |
| Health checks | None |
| Mounted volumes | `nextcloud` → `/mnt/nextcloud` (read-only) |
| Purpose | Media source for movies, TV, music, photos |

---

## Backups and Restore

**Included in backup:**

- `startos` volume — StartOS configuration
- `config` volume — Jellyfin settings, metadata, user data
- `cache` volume — Transcoding cache

**NOT included in backup:**

- Media files (stored in File Browser or Nextcloud)

**Restore behavior:**

- All settings, libraries, and user accounts restored
- Media libraries will scan to verify content

---

## Health Checks

| Check | Display Name | Method | Grace Period |
|-------|--------------|--------|--------------|
| Server | Server and Web UI | Log monitoring for "Startup complete" | 42 seconds |

**Messages:**

- Success: "Server and web UI are ready"
- Error: "Server or web UI unreachable"

---

## Limitations and Differences

1. **Media sources limited to StartOS services** — Can only access media from File Browser or Nextcloud (not arbitrary filesystem paths)
2. **No hardware transcoding** — GPU acceleration not available
3. **Selected plugins via action** — Chromecast and YouTube trailers managed via StartOS action
4. **Read-only media access** — Media files mounted read-only from source services

---

## What Is Unchanged from Upstream

- Full media server functionality
- All client app compatibility (web, mobile, TV, desktop)
- User management and permissions
- Library management (movies, TV, music, photos, books)
- Metadata fetching and organization
- Software transcoding
- Live TV and DVR (with tuner hardware)
- SyncPlay for watch parties
- All web UI features
- Plugin system (Jellyfin plugin repository)
- Remote access and streaming

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: jellyfin
image: jellyfin/jellyfin
architectures: [x86_64, aarch64]
volumes:
  config: /config
  cache: /cache
  startos: (StartOS state)
ports:
  ui: 8096
dependencies:
  filebrowser: optional (media source, >= 2.62.2)
  nextcloud: optional (media source, >= 32.0.7)
startos_managed_env_vars: none
media_mount_points:
  filebrowser: /mnt/filebrowser (read-only)
  nextcloud: /mnt/nextcloud (read-only)
actions:
  - media-sources (enabled, any)
  - plugins (enabled, any)
optional_plugins:
  - chromecastPlayer/plugin
  - trailers
default_plugins:
  - playAccessValidation/plugin
  - experimentalWarnings/plugin
  - htmlAudioPlayer/plugin
  - htmlVideoPlayer/plugin
  - photoPlayer/plugin
  - comicsPlayer/plugin
  - bookPlayer/plugin
  - backdropScreensaver/plugin
  - pdfPlayer/plugin
  - logoScreensaver/plugin
  - sessionPlayer/plugin
  - syncPlay/plugin
health_checks:
  - log_monitoring: "Main: Startup complete" (42s grace)
backup_volumes:
  - startos
  - cache
  - config
not_available:
  - Arbitrary media paths
  - Hardware transcoding (GPU)
  - Write access to media files
```
