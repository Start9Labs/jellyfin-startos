# Updating the upstream version

Jellyfin is built from `./Dockerfile`, which `FROM`s `jellyfin/jellyfin:<version>` and overlays a workaround for [jellyfin/jellyfin#15148](https://github.com/jellyfin/jellyfin/issues/15148): Jellyfin's bundled `libe_sqlite3.so` uses SSE4.1 and SIGILLs on pre-2008 CPUs, so we copy the library from `jellyfin/jellyfin:10.10.7` over the top.

## Determining the upstream version

- **Jellyfin** — [`jellyfin/jellyfin`](https://github.com/jellyfin/jellyfin)

Fetch the latest released tag:

```sh
gh release view -R jellyfin/jellyfin --json tagName -q .tagName
```

The Dockerfile pins the timestamped image tag corresponding to the release rather than the mutable `X.Y` alias. Before updating it, verify that the timestamped tag and release alias resolve to the same multi-architecture manifest digest.

The current pin lives on the `FROM jellyfin/jellyfin:<version>` line in [`Dockerfile`](./Dockerfile). Compare its release component against the command's output to decide whether a bump is available.

Also track [jellyfin/jellyfin#15148](https://github.com/jellyfin/jellyfin/issues/15148): once it's fixed upstream, the `libe_sqlite3.so` workaround can be removed.

## Applying the bump

1. Bump the base `FROM jellyfin/jellyfin:<version>` line in `Dockerfile` to the release's timestamped image tag after verifying it matches the release alias's multi-architecture manifest digest.
2. Re-evaluate the `COPY --from=jellyfin/jellyfin:10.10.7 ...` line: once upstream ships a fix for #15148, delete the workaround entirely and switch the manifest's image source back to `dockerTag: 'jellyfin/jellyfin:<version>'`.
