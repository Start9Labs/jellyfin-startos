#!/bin/bash

set -e

# Set environment variables depending on config
MEDIA=$(yq '.mediasources' /jellyfin/main/start9/config.yaml)
FILEBROWSER=false
NEXTCLOUD=false
CHROMECAST=$(yq '.chromecast' /jellyfin/main/start9/config.yaml)
TRAILERS=$(yq '.trailers' /jellyfin/main/start9/config.yaml)


if [[ "$MEDIA" = *"filebrowser"* ]]; then 
  FILEBROWSER=true
fi

if [[ "$MEDIA" = *"nextcloud"* ]]; then 
  NEXTCLOUD=true
fi

# Hide media folders not in use
if [ "$FILEBROWSER" = true ] && [ "$NEXTCLOUD" = true ]; then
  FILEPATH="/jellyfin/jellyfin-web/main.jellyfin.bundle.js"
  SRC_FOLDER_CODE='for(var s=0,l=r\.length;s<l;s++){var c=r\[s\];a+=O("File"===c\.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c\.Type,c\.Path,c\.Name)}'
  MODIFIED_SRC_FOLDER_CODE='for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
  sed -i "s|$SRC_FOLDER_CODE|$MODIFIED_SRC_FOLDER_CODE|g" "$FILEPATH"
elif [ "$FILEBROWSER" = true ]; then
  FILEPATH="/jellyfin/jellyfin-web/main.jellyfin.bundle.js"
  SRC_FOLDER_CODE='for(var s=0,l=r\.length;s<l;s++){var c=r\[s\];a+=O("File"===c\.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c\.Type,c\.Path,c\.Name)}'
  MODIFIED_SRC_FOLDER_CODE='for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main","/mnt/nextcloud"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
  sed -i "s|$SRC_FOLDER_CODE|$MODIFIED_SRC_FOLDER_CODE|g" "$FILEPATH"
else
  FILEPATH="/jellyfin/jellyfin-web/main.jellyfin.bundle.js"
  SRC_FOLDER_CODE='for(var s=0,l=r\.length;s<l;s++){var c=r\[s\];a+=O("File"===c\.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c\.Type,c\.Path,c\.Name)}'
  MODIFIED_SRC_FOLDER_CODE='for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main","/mnt/filebrowser"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
  sed -i "s|$SRC_FOLDER_CODE|$MODIFIED_SRC_FOLDER_CODE|g" "$FILEPATH"
fi

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

exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/lib/jellyfin-ffmpeg/ffmpeg
