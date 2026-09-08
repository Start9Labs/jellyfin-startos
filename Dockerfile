FROM jellyfin/jellyfin:12.0.20260908-012347

# Retain 10.10.7 until jellyfin/jellyfin#15148 ships an SSE4.1-free library.
# COPY --from selects the matching architecture.
COPY --from=jellyfin/jellyfin:10.10.7 /jellyfin/libe_sqlite3.so /jellyfin/libe_sqlite3.so
