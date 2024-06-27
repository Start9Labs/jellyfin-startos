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
FILEPATH="/jellyfin/jellyfin-web/main.jellyfin.bundle.js"
SRC_FOLDER_CODE='for(var s=0,l=r\.length;s<l;s++){var u=r\[s\];o+=g("File"===u\.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",u\.Type,u.\Path,u\.Name)}'
MODIFIED_SRC_FOLDER_CODE='for(var s=0,l=r.length;s<l;s++){var u=r[s];if(["/config","/cache","/","/jellyfin/main"'

if [ "$FILEBROWSER" = true ] && [ "$NEXTCLOUD" = true ]; then
  MODIFIED_SRC_FOLDER_CODE+='].includes(u.Path)){continue;}o+=g("File"===u.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",u.Type,u.Path,u.Name)}'
elif [ "$FILEBROWSER" = true ]; then
  MODIFIED_SRC_FOLDER_CODE+=',"/mnt/nextcloud"].includes(u.Path)){continue;}o+=g("File"===u.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",u.Type,u.Path,u.Name)}'
else
  MODIFIED_SRC_FOLDER_CODE+=',"/mnt/filebrowser"].includes(u.Path)){continue;}o+=g("File"===u.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",u.Type,u.Path,u.Name)}'
fi

sed -i "s|$SRC_FOLDER_CODE|$MODIFIED_SRC_FOLDER_CODE|g" "$FILEPATH"

if [ "$CHROMECAST" = "true" ]; then
  if ! grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    yq '.plugins += ["chromecastPlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"chromecastPlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    yq 'del(.plugins[] | select(. == "chromecastPlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

if [ "$TRAILERS" = "true" ]; then
  if ! grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    yq '.plugins += ["youtubePlayer/plugin"]' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
else
  if grep -q '"youtubePlayer/plugin"' /jellyfin/jellyfin-web/config.json; then
    yq 'del(.plugins[] | select(. == "youtubePlayer/plugin"))' /jellyfin/jellyfin-web/config.json > temp.json && mv temp.json /jellyfin/jellyfin-web/config.json
  fi
fi

printf "\n\n [i] Starting Jellyfin ...\n\n"
exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/lib/jellyfin-ffmpeg/ffmpeg
