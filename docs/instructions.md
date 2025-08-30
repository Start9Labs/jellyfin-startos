# Instructions for Jellyfin

## Getting Started

### Configuration

1. After installing Jellyfin and before being able to run it, you will be tasked with running the **Select Media Sources** action.
   
   Jellyfin supports **Nextcloud** and **File Browser** as media sources. This is where your media is uploaded and stored. Nothing will be stored within Jellyfin itself. You'll need to install either **Nextcloud** or **File Browser** separately.

1. Jellyfin accommodates extensions for both Chromecast and YouTubePlayer. Chromecast enables streaming, while YouTubePlayer automatically loads YouTube movie trailers that match media metadata. These extensions are deactivated by default. To activate these features, flip the corresponding switch to the **on** position and save the configuration.

1. **Start** Jellyfin. When the health check for the web interface is ready, launch the Jellyfin Web UI.

### Setup Process

1. When running Jellyfin for the first time, you will be presented with the setup process. You will be asked to choose an interface language, then set a username and password (we recommend saving this password in a password manager, such as Vaultwarden on your Start9 server).

1. **Add Media Libraries:**

   - Choose **Add Media Library** and specify the **Content Type** and **Display Name** for the new library. Click the `+` button next to **Folders** and select the directory where your media is stored. Jellyfin supports both Filebrowser at `/mnt/filebrowser` and Nextcloud at `/mnt/nextcloud`. One or both of these will be visible after making the configuration choice in the previous subsection.

   **Note:** Jellyfin is particular about how media volumes are structured, especially regarding the naming conventions of directories and files. It’s recommended to store your media in dedicated subdirectories within File Browser and/or Nextcloud, and select the full media path based on your chosen storage solution.

      - Let's assume you create a *Media* top level folder, then in that you create folders for *Movies*, *Shows*, *Music* etc.

      - If you are using NextCloud for your media storage, and you want to pull from the Movies folder, inside a Media folder, your path would be `/mnt/nextcloud/data/[username]/files/Media/Movies`. 
   
      - For Filebrowser, the path would simply be `/mnt/filebrowser/files/Media/Movies` for a folder called Movies, inside a Media folder.

      - **You will need to create this directory structure prior to adding media libraries in Jellyfin.**

      - Furthermore, when naming the media files, Jellyfin is also particular about file names, as they are used to fetch metadata from various online sources. For more information about directory and file naming conventions, please refer to the [Jellyfin docs](https://jellyfin.org/docs/general/server/media/shows). Even when not fetching metadata, file names and structure are still used to present library content.

   - After entering the full media file path, select **OK**. 

1. Repeat the process to add as many media libraries as needed. When you have added all the desired media libraries, click **Next**.

1. **Preferred Metadata Language:** Select your desired language and country (The country you selected provides additional information about the media). Click **Next**.

1. **Set up Remote Access:** If you expect to make this Jellyfin server accessible from outside your local network you can leave *All remote connections to this server* checked. Click **Next**, and then click **Finish**.

1. After clicking **Finish**, log in with your credentials from the earlier step.

   **IMPORTANT:** IF FILES ARE NOT SHOWING UP IN ONE OF YOUR LIBRARIES, DOUBLE CHECK THAT YOUR LIBRARIES DO NOT HAVE OVERLAPPING OR NESTED PATHS, i.e., `/mnt/filebrowser/files` and `/mnt/filebrowser/files/videos`.

   - By default, Jellyfin scans your files for metadata using The Movie Database (TMDb) and Open Media Database (OMDb). This metadata is then used to fetch media images and information (such as a summary, cast, etc.) displayed within the Jellyfin web app or other [client](https://jellyfin.org/downloads/clients). While these features make for a great interface and user experience, they can be disabled by unchecking the corresponding boxes. 

## Accessing Media from client devices
### Web Application - Web Browser

Accessing Jellyfin through a web browser is the simplest way to view media on a desktop or laptop. When logged in with an administrator account, you also gain access to a dashboard where you can add or remove user accounts, set age restrictions, and change other settings.

In a standard web browser, launch Jellyfin from the StartOS UI or access Jellyfin by typing the URL of the preferred interface into the address bar.

### Dedicated Apps
- [Mobile Apps](mobile-apps.md)
- [Desktop Apps](desktop-apps.md)
- [Other Devices](other-devices.md)


## GPU Acceleration for Video Transcoding

GPU acceleration is available for users to utilize on compatible hardware. Enable this feature to improve video transcoding performance.

1. Navigate to the **Administration Dashboard**.
2. Go to the **Playback** section.
3. Under **Transcoding**, choose the **Hardware acceleration** method compatible with your hardware.
   - For example, for Start9 Pure, select **Intel QuickSync (QSV)**.

