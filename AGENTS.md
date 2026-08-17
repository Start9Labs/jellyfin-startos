# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Keep the media mounts `readonly: true`.** That flag, not a convention, is what guarantees Jellyfin cannot alter a library it does not own.
- **The Plugins action must add and remove only the entries it manages.** `config.json`'s plugin list also holds Jellyfin's own defaults; rewriting the array wholesale would drop them.
- **Adding a media source means editing four places in step:** the enum in `startos/fileModels/store.json.ts`, the multiselect values in `startos/actions/mediaSources.ts`, the mount branch in `startos/main.ts`, and the dependency branch in `startos/dependencies.ts` — plus manifest metadata for the new dependency.
- **`network.xml`'s `KnownProxies` is re-asserted on every start**, because Jellyfin must trust the reverse proxy to see real client addresses. Nothing else in that file is modelled, so the rest round-trips.
- **The `main` volume is retained solely for the migration path.** Don't reuse it for new data, and don't drop it from the manifest.
