FROM jellyfin/jellyfin:10.11.8

# TODO: revert this workaround once jellyfin/jellyfin#15148 is fixed upstream
# and the bundled libe_sqlite3.so no longer uses SSE4.1. At that point,
# delete this Dockerfile and switch the manifest's image source back to
# `dockerTag: 'jellyfin/jellyfin:<version>'`.
#
# Why this exists: 10.11.x's bundled libe_sqlite3.so uses SSE4.1 instructions
# and SIGILLs on CPUs without SSE4.1 (pre-2008 Intel, pre-Bulldozer AMD,
# original Atom). The 10.10.7 build predates the SQLite optimization that
# triggers it. Multi-arch: COPY --from pulls the matching arch; harmless on
# aarch64.
COPY --from=jellyfin/jellyfin:10.10.7 /jellyfin/libe_sqlite3.so /jellyfin/libe_sqlite3.so
