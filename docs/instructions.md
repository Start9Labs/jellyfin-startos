# Instructions for Jellyfin

## Getting Started

### Configuration

1. After installing Jellyfin and before being able to run it, you will tasked with running the **Select Media Sources** Action.
   
   Jellyfin supports **Nextcloud** and **File Browser** as the Media Source. This is where you'll upload and store you media. Nothing will be stored within Jellyfin itself, and you'll need to install either **Nextcloud** or **File Browser** separately.

1. Jellyfin accommodates extensions for both Chromecast and YouTubePlayer. Chromecast enables streaming, while YouTubePlayer automatically loads YouTube movie trailers that match media metadata. These extensions are deactivated by default. To activate these features, flip the corresponding switch to the **on** position and save configuration.

1. **Start** Jellyfin. When the health check for the web interface is ready launch the Jellyfin Web UI.

### Setup Process

1. When running Jellyfin for the first time you will be presented with the setup process. You will be asked to choose an interface language then set a username and password (we recommend saving this password in a password manager, such as Vaultwarden on your Start9 server),

1. **Add Media Libraries:**

   - Choose **Add Media Library** and specify the **Content Type** and **Display Name** for the new library. Click the `+` button next to **Folders** and select the directory where your media is stored. Jellyfin supports both Filebrowser at `/mnt/filebrowser` and Nextcloud at `/mnt/nextcloud`. One or both of these will be visible after making the configuration choice in the previous subsection.

   **Note:** Jellyfin is particular about the file structure of media volumes, especially with naming conventions of directories/files. We suggest storing your media in a dedicated subdirectory within Filebrowser and/or Nextcloud, and selecting the full media path. What that is depends on your media storage solution:

      - Lets assume you create a *Media* top level folder, then in that you create folders for *Movies*, *Shows*, *Music* etc.

      - If you are using NextCloud for your media storage, and you want to pull from the Movies folder, inside a Media folder, your path would be `/mnt/nextcloud/data/[username]/files/Media/Movies`. 
   
      - For Filebrowser, the path would simply be `/mnt/filebrowser/files/Media/Movies` for a folder called Movies, inside a Media folder.

      - **You will need to go and create this directory structure prior to adding media libraries in Jellyfin.**

      - Furthermore, when naming the media files, Jellyfin is also particular about these since they are used to optionally fetch metadata for various online sources. For more information about directory and file naming conventions, please refer to the [Jellyfin docs](https://jellyfin.org/docs/general/server/media/shows). When not fetching meta data file names and structure are still used to present library content.

   - After entering the full media file path, select **OK**. 

1. Repeat the process to add as many media libraries as needed. When you have added all the desired media libraries, click **next**.

1. **Preferred Metadata Language:** Select your desired Language and Country (The Country selected is used to provide additional information about media). Click **Next**.

1. **Set up Remote Access:** If you expect to make this Jellyfin server accessible from outside you local network you can leave *All remote connections to this server* checked. Click **Next**, and then click **Finish**.

1. After clicking **Finish**, log in with your credentials from the earlier step.

   **IMPORTANT:** IF FILES ARE NOT SHOWING UP IN ONE OF YOUR LIBRARIES, DOUBLE CHECK THAT YOU DON'T HAVE ANY LIBRARIES WHOSE PATHS OVERLAP WITH OTHER NESTED LIBRARIES, i.e., `/mnt/filebrowser/files` and `/mnt/filebrowser/files/videos`.

   - By default, Jellyfin scans your files for metadata using The Movie Database (TMDb) and Open Media Database (OMDb). This metadata is then used to fetch media images and information (such as a summary, cast, etc.) displayed within the Jellyfin web app or other [client](https://jellyfin.org/downloads/clients). While these features make for a great interface and user experience, they can be disabled by unchecking the corresponding boxes. 

## Accessing Media from client devices
### Web Application - Web Browser

Access through a web browser is the simplest way to view media on a desktop or laptop. When logged in with an administrator account, it also allows you access to an administrator dashboard to add & remove user accounts and set age registrictions, and change other settings.

In a standard web browser, launch Jellyfin from the StartOS UI or access Jellyfin by typing the URL of the prefered interface into the address bar.

### Dedicated Apps
- [Mobile Apps](mobile-apps.md)
- [Desktop Apps](desktop-apps.md)
- [Other Devices](other-devices.md)


## GPU Acceleration for Video Transcoding

Starting from version 10.8.12 and up, GPU acceleration is now available for users to utilize on compatible hardware. Enable this feature to enhance your video transcoding experience.

1. Navigate to the **Administration Dashboard**.
2. Go to the **Playback** section.
3. Under **Transcoding**, choose the **Hardware acceleration** method compatible with your hardware.
   - For example, for Start9 Pure, select **Intel QuickSync (QSV)**.

