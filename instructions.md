# Instructions for Jellyfin

## Initial Setup

1. **Configuration:**

   - **Media Sources:** Nextcloud is the default media storage Jellyfin will use as a dependency for media. If you use Filebrowser to store media, you need to add this as a Media Source.

   - **Plugins:** Jellyfin accommodates extensions for both Chromecast and YouTubePlayer. Chromecast enables streaming, while YouTubePlayer automatically loads YouTube movie trailers that match media metadata. These extensions are deactivated by default. To activate these features, flip the corresponding switch to the **on** position and save configuration.

2. Launch the Jellyfin UI, select **Next**, and choose a username and password. We recommend saving this password in a password manager, such as Vaultwarden on your Start9 server. Press **Next**.

3. **Add a Media Library:**

   - Choose **Add Media Library** and specify the **Content Type** and **Display Name** for the new library. Click the `+` button next to **Folders** and select the directory where your media is stored. Jellyfin supports both Filebrowser at `/mnt/filebrowser` and Nextcloud at `/mnt/nextcloud`.

   **Note:** Jellyfin is particular about the file structure of media volumes, especially with naming conventions of directories/files. We suggest storing your media in a dedicated subdirectory within Filebrowser and/or Nextcloud, and selecting the full media path, i.e., `/mnt/nextcloud/embassy/files/Movies`. After entering the full media file path, select **Ok**. For more information about directory and file naming conventions, please refer to the [Jellyfin docs](https://jellyfin.org/docs/general/server/media/shows).

   **IMPORTANT:** IF FILES ARE NOT SHOWING UP IN ONE OF YOUR LIBRARIES, DOUBLE CHECK THAT YOU DON'T HAVE ANY LIBRARIES WHOSE PATHS OVERLAP WITH OTHER NESTED LIBRARIES, i.e., `/mnt/filebrowser` and `/mnt/filebrowser/videos`.

   - By default, Jellyfin scans your files for metadata using The Movie Database (TMDb) and Open Media Database (OMDb). This metadata is then used to fetch media images and information (such as a summary, cast, etc.) displayed within the Jellyfin web app or other [client](https://jellyfin.org/downloads/clients). While these features make for a great interface and user experience, they can be disabled by unchecking the corresponding boxes. Once your selections are complete for the media library being added, click **Ok**. Repeat the bullets under step 3 for as many media libraries as needed.

4. When you have added all the desired media libraries, click **next**.

5. **Preferred Metadata Language:** Select your desired Language and Country (The Country selected is used to provide additional information about media). Click **Next**.

6. **Set up Remote Access:** Both of these boxes can be left unchanged from the defaults as remote access from outside the Server's LAN is not supported by the OS at this time. Click **Next**, and then click **Finish**.

7. After clicking **Finish** in step 6, log in with your credentials from step 2.

## GPU Acceleration for Video Transcoding

Starting from version 10.8.12 and up, GPU acceleration is now available for users to utilize on compatible hardware. Feel free to enable this feature if you wish to enhance your video transcoding experience.

1. Navigate to the **Administration Dashboard**.
2. Go to the **Playback** section.
3. Under **Transcoding**, choose the **Hardware acceleration** method compatible with your hardware.
   - For example, for Start9 Pure, select **Intel QuickSync (QSV)**.

Enjoy the improved performance with GPU acceleration!