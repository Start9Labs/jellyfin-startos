FROM jellyfin/jellyfin:12.4.20261026-211555

# The base image's CA store is only as current as its last release.
RUN apt-get update \
 && apt-get install -y --no-install-recommends --only-upgrade ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Retain 10.10.7 until jellyfin/jellyfin#15148 ships an SSE4.1-free library.
# COPY --from selects the matching architecture.
COPY --from=jellyfin/jellyfin:10.10.7 /jellyfin/libe_sqlite3.so /jellyfin/libe_sqlite3.so
