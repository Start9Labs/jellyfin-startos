#!/bin/sh

set -e

# CHROMECAST=$(grep -i 'chromecast' /jellyfin/main/start9/config.yaml | awk '{print $2}')
# TRAILERS=$(grep -i 'trailers' /jellyfin/main/start9/config.yaml | awk '{print $2}')

if [[ $( yq -e '.chromecast' /jellyfin/main/start9/config.yaml 2>/dev/null) == "true" ]]; then
  if ! grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq '.plugins |= .+ ["chromecastPlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq 'del(.plugins[] | select(. == "chromecastPlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

if [[ $( yq -e '.trailers' /jellyfin/main/start9/config.yaml 2>/dev/null) == "true" ]]; then
  if ! grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq '.plugins |= .+ ["youtubePlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    jq 'del(.plugins[] | select(. == "youtubePlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg
