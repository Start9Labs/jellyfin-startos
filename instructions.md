# Instructions for Jellyfin

## Initial Setup

1. Config - Nextcloud is the default media storage Jellyfin will use as a dependency for media. If you use Filebrowser to store media, you will need to add this as a Media Source. Jellyfin supports plugins for Chromecast, which requires downloading files from Google servers to support this functionality, as well as YoutubePlayer, which autoloads youtube movie trailers matching media metadata. These plugins have been disabled by default. If you would like to use these features, toggle the corresponding switch to 'on'. Save any Config changes.

2. Launch the Jellyfin UI, select 'Next', and choose a username and password. We recommend saving this password in a password manager, such as Vaultwarden on your Embassy. Press 'Next'.

3. Add a Media Library:

* Select 'Add Media Library' followed by the 'Content Type' and 'Display Name' for the library being added. Click the `+` button to the right of 'Folders' and choose the corresponding directory where your media is stored. Jellyfin can support both filebrowser `mnt/filebrowser` as well as nextcloud `mnt/nextcloud`.

    **Note** *Jellyfin is particular about the file structure of media volumes, especially with naming conventions of directories/files. We suggest storing your media in a dedicated subdirectory within filebrowser and/or nextcloud, and selecting the full media path i.e. `/mnt/nextcloud/embassy/files/Movies`. After entering the full media file path, select 'Ok'. For more information about directory and file naming conventions, please refer to the [Jellyfin docs](https://jellyfin.org/docs/general/server/media/shows)

* By default, Jellyfin will scan your files for metadata using The Movie Database (TMDb) and Open Media Database (OMDb). This metadata is then used to fetch media images and information (such as summary, cast, etc) which is then displayed within the Jellyfin web app or other [client](https://jellyfin.org/downloads/clients). While these features make for a great interface and user experience, they can be disabled by unchecking the corresponding boxes. Once your selections are complete for the media library being added, click 'Ok'. Repeat the bullets under step 3 for as many media libraries as needed.

4. When you have added all the desired media libraries, click 'next'.

5. Preferred Metadata Language - Select your desired Languange and Country (The Country selected is used to provide additional information about media). Click 'Next'.

6. Set up Remote Access - Both of these boxes can be left unchanged from the defaults as remote access from outside the Server's LAN is not supported by the OS at this time. Click 'Next', and then click 'Finish'.

7. After clicking 'Finish' in step 6, log in with your credentials from step 2.