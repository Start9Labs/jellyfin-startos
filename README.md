<p align="center">
  <img src="icon.svg" alt="Jellyfin Logo" width="21%">
</p>

# Jellyfin on StartOS

> Everything not listed in this document should behave the same as upstream
> Jellyfin. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Jellyfin](https://github.com/jellyfin/jellyfin) is a media server. This package does not store media of its own: it mounts another service's files read-only, so the library lives wherever you already keep it.

- **Upstream repo:** <https://github.com/jellyfin/jellyfin>
- **Wrapper repo:** <https://github.com/Start9Labs/jellyfin-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The image is upstream's with a single file replaced, and one subcontainer runs the service.

| Property      | Value                                                             |
| ------------- | ----------------------------------------------------------------- |
| Image         | Built from `Dockerfile`, `FROM jellyfin/jellyfin`                 |
| Architectures | x86_64, aarch64                                                   |
| Entrypoint    | Upstream default                                                  |
| Subcontainer  | `jellyfin-sub` — the `primary` daemon, and the one to `attach` to |

The one modification: the bundled SQLite native library is replaced with the one from an earlier upstream release. The current build uses SSE4.1 instructions and crashes with an illegal-instruction fault on CPUs that lack them — pre-2008 Intel, pre-Bulldozer AMD, the original Atom. The Dockerfile is a workaround for an open upstream issue and is meant to be deleted once that is fixed.

## Volume and Data Layout

Four volumes are declared, three of which are in use — and none of them holds media.

| Volume    | Mount Point                                    | Purpose                                              |
| --------- | ---------------------------------------------- | ---------------------------------------------------- |
| `config`  | `/config`; web `config.json` mounted read-only | Jellyfin's configuration, its database, and metadata |
| `cache`   | `/cache`                                       | Transcoding and image cache                          |
| `startos` | — (host side)                                  | `store.json`; never mounted into the container       |
| `main`    | — (unused)                                     | Retained only for the migration path                 |

The web-client configuration is stored at `/config/config.json` and bind-mounted read-only over Jellyfin's bundled `/jellyfin/jellyfin-web/config.json`. StartOS can update the backing file, but Jellyfin cannot overwrite it.

A `config/migrations.xml` left behind on a dataset whose library database has already been migrated (no `data/library.db`) is renamed to `migrations.xml.backup` before each start. Jellyfin refuses to boot with one present, and the rename is what it does itself after a successful conversion.

Media arrives from another service as a read-only mount — `/mnt/filebrowser`, `/mnt/nextcloud`, or both — chosen in [Select Media Sources](#actions).

## File Models

Three models: two of Jellyfin's own files, and the package's state.

| File                         | Format | Modelled                | Written by                         |
| ---------------------------- | ------ | ----------------------- | ---------------------------------- |
| `/config/config/network.xml` | XML    | Yes — `FileHelper.xml`  | Every start                        |
| `/config/config.json`        | JSON   | Yes — `FileHelper.json` | Every init, and the Plugins action |
| `store.json`                 | JSON   | Yes — `FileHelper.json` | The Select Media Sources action    |

### network.xml

Jellyfin reads this file at `/config/config/network.xml`.

**Enforced, on every start:** `KnownProxies` is pinned to the StartOS bridge address. Jellyfin sits behind a reverse proxy and needs to trust it to see the real client address; a hand edit is replaced at the next start.

Nothing else in the file is modelled, so the rest of Jellyfin's network settings round-trip untouched.

### config.json

The web client's configuration is stored at `/config/config.json` and mounted read-only over `/jellyfin/jellyfin-web/config.json`. The Plugins action updates the backing file, and an open web client picks up the change when reloaded. `plugins` adds and removes only the two managed entries, leaving the rest of the list alone. Themes, menu links, and the server list are defaulted only if absent.

### store.json

`mediaSources` alone: which services are mounted in. It lives on its own volume, away from Jellyfin's data, and drives both the mount set and the dependency set.

## Dependencies

Both are optional, and at least one must be selected for the service to run.

| Dependency          | Kind     | Health checks | Mount                         | Why                   |
| ------------------- | -------- | ------------- | ----------------------------- | --------------------- |
| FileBrowser Quantum | `exists` | none          | `/mnt/filebrowser`, read-only | Where the media lives |
| Nextcloud           | `exists` | none          | `/mnt/nextcloud`, read-only   | Where the media lives |

Only the volume is needed, so neither service has to be running for Jellyfin to start and read it.

The mounts are `readonly: true`, so Jellyfin cannot modify or delete anything in your library — it reads, transcodes into its own cache, and writes metadata to its own volume.

## Network Access and Interfaces

One interface, serving the web client and Jellyfin's API. Nothing is exported for dependent services.

| Interface | Id   | Type | Port | Description                |
| --------- | ---- | ---- | ---- | -------------------------- |
| Web UI    | `ui` | ui   | 8096 | The Jellyfin web interface |

The port is bound on the `main` MultiHost and is not masked.

## Installation and First-Run Flow

Install raises a `critical` task straight away: **Jellyfin will not start until a media source is selected**, because there would be nothing for it to serve. `main` refuses to run with none.

Once a source is chosen and the mount appears, the rest is Jellyfin's own first-run wizard — create the administrator, then add libraries pointing at paths under `/mnt/filebrowser` or `/mnt/nextcloud`.

## Actions

Two actions, both user-facing.

### Select Media Sources

Chooses which services are mounted in as media libraries. At least one must be selected.

- **What it changes:** `mediaSources` in `store.json`, and through it the package's mount set and dependency set.
- **Cost:** seconds, then a restart — mounts can only change when the container is recreated.
- **Repeat safety:** safe to re-run; the form is pre-filled and replaces the selection wholesale.
- **What happens next:** the storage appears at a fixed path. Nothing becomes a library until you point one at a folder under it in Jellyfin's own settings.

### Plugins

Toggles the two client plugins the package manages.

- **What it changes:** adds or removes those two entries in `config.json`'s plugin list, leaving every other entry untouched.
- **Cost:** seconds, then reload the web client; Jellyfin does not restart.
- **Repeat safety:** idempotent in both directions.

## Tasks

One task, raised at install, and it blocks the service until you clear it.

| Task                 | Severity   | Raised when                                | Cleared when    |
| -------------------- | ---------- | ------------------------------------------ | --------------- |
| Select Media Sources | `critical` | At init, while no media source is selected | The action runs |

`critical` because a Jellyfin with no library mounted has nothing to do, and `main` will not start without one.

## Health Checks

One check, and it reads Jellyfin's own startup log rather than probing the port.

| Check                         | Method                                                           | Grace Period |
| ----------------------------- | ---------------------------------------------------------------- | ------------ |
| `primary` "Server and Web UI" | Watches the daemon's output for Jellyfin's startup-complete line | 42 seconds   |

Jellyfin binds its port well before it is ready to serve, so a port check would report healthy during a startup that can take most of a minute. Watching for the line it prints when it is genuinely up avoids that.

One consequence worth knowing: the check tracks that line **within the current run**, so it reports a failure until the line appears, not a "starting" state — the grace period is what keeps a normal boot from looking like a fault.

## Backups and Restore

Three volumes are copied wholesale — `sdk.Backups.ofVolumes('startos', 'cache', 'config')`. No dump step and nothing excluded.

- **Included:** Jellyfin's database with accounts, libraries, watch state and metadata; the transcode cache; and the media-source selection.
- **Not included:** the media itself, which belongs to FileBrowser Quantum or Nextcloud and is covered by that service's backup.
- **Restore:** complete. The selected source must be installed for the service to start with its mount, and library paths resolve as before because the mount points are fixed.

## Limitations and Differences

1. **Jellyfin stores no media of its own.** A media source must be selected, and the service will not start without one.
2. **Media mounts are read-only.** Jellyfin cannot rename, move, or delete anything in your library.
3. **Changing the media source restarts the service**, because a container's mounts are fixed for its lifetime.
4. **Only two plugins are managed here.** Anything else is installed and configured inside Jellyfin.
5. **The bundled SQLite library is replaced** with an older upstream build, so the server runs on CPUs without SSE4.1. This is a temporary workaround for an upstream issue.
6. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: jellyfin
image: ./Dockerfile # FROM jellyfin/jellyfin, with the SQLite native library swapped
architectures:
  - x86_64
  - aarch64
subcontainers:
  - jellyfin-sub
volumes:
  config: /config
  cache: /cache
  startos: host side (store.json)
  main: unused (retained for the migration)
file_models:
  - /config/config/network.xml
  - /config/config.json # mounted read-only at /jellyfin/jellyfin-web/config.json
  - store.json
startos_managed_env_vars: []
dependencies: # optional, kind "exists"; mounted read-only when selected
  - filebrowser # /mnt/filebrowser
  - nextcloud # /mnt/nextcloud
interfaces:
  ui: { type: ui, port: 8096 }
actions:
  - media-sources
  - plugins
tasks:
  - { action: media-sources, severity: critical }
health_checks:
  - primary # displayed "Server and Web UI"; reads the startup log, not the port
```
