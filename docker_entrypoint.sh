#!/bin/sh

set -e


while [ ! -f /jellyfin/main/start9/config.yaml ]; do
    sleep 1
done

echo "File /jellyfin/main/start9/config.yaml has been created."

CHROMECAST=$(grep -i 'chromecast' /jellyfin/main/start9/config.yaml | awk '{print $2}')
TRAILERS=$(grep -i 'trailers' /jellyfin/main/start9/config.yaml | awk '{print $2}')

if [ "$CHROMECAST" = "true" ]; then
  if ! grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq '.plugins |= .+ ["chromecastPlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq 'del(.plugins[] | select(. == "chromecastPlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

if [ "$TRAILERS" = "true" ]; then
  if ! grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq '.plugins |= .+ ["youtubePlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq 'del(.plugins[] | select(. == "youtubePlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

# exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg

# Get the architecture of the host
ARCH=$(uname -m)

# Run Jellyfin with appropriate options based on the architecture
if [ "$ARCH" = "arm64" ]; then
  exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg
elif [ "$ARCH" = "x86_64" ]; then
  exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/lib/jellyfin-ffmpeg/ffmpeg
else
  echo "Unsupported architecture: $ARCH"
  exit 1
fi
