#!/bin/sh

set -e

# Get the architecture of the host
ARCH=$(uname -m)
MEDIA=$(yq -e '.mediasources' /jellyfin/main/start9/config.yaml)

while [ ! -f /jellyfin/main/start9/config.yaml ]; do
    sleep 1
done

echo "File /jellyfin/main/start9/config.yaml has been created."

# Set environment variables depending on config
if [[ $MEDIA == *"filebrowser"* ]]; then 
  FILEBROWSER=true
else
  FILEBROWSER=false
fi

if [[ $MEDIA == *"nextcloud"* ]]; then 
  NEXTCLOUD=true
else
  NEXTCLOUD=false
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

# Run Jellyfin with appropriate options based on the architecture
# if [ "$ARCH" = "aarch64" ]; then
exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg
# elif [ "$ARCH" = "x86_64" ]; then
#   exec ./jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/lib/jellyfin-ffmpeg/ffmpeg
# else
#   echo "Unsupported architecture: $ARCH"
#   exit 1
# fi
