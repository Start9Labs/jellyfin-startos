#!/bin/sh

# exec tini jellyfin
exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg
