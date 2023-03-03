#!/bin/sh

set -e

exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg
