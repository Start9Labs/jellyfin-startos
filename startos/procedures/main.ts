import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { checkPortListening } from '@start9labs/start-sdk/lib/health/checkFns'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { NetworkInterfaceBuilder } from '@start9labs/start-sdk/lib/mainFn/NetworkInterfaceBuilder'
import { setupMain } from '@start9labs/start-sdk/lib/mainFn'
import exportInterfaces from '@start9labs/start-sdk/lib/mainFn/exportInterfaces'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { WrapperData } from '../wrapperData'
import { spawn } from 'child_process';

export const main: ExpectedExports.main = setupMain<WrapperData>(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */
    await effects.console.info('Starting Jellyfin')

    async function replaceInFile(filename: string, search: string, replace: string): Promise<void> {
      // Use the spawn function to execute the sed command
      const sed = spawn('sed', ['-i', `s/${search}/${replace}/g`, filename]);
    
      // Handle any errors that occur during the execution of the command
      sed.on('error', (err) => {
        console.error(`Failed to replace ${search} with ${replace} in ${filename}:`, err);
        throw err;
      });
    
      // Log the output of the command to the console
      sed.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
    
      // Log any errors that occur during the execution of the command to the console
      sed.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    
      // Wait for the command to complete
      await new Promise<void>((resolve) => {
        sed.on('close', (code) => {
          console.log(`sed process exited with code ${code}`);
          resolve();
        });
      });
    }

    const jellyfinConfig = (await utils.getOwnWrapperData('/config').once());

    let nextcloud: boolean;
    let filebrowser: boolean;

    jellyfinConfig.mediasources.includes("nextcloud")? nextcloud = true : nextcloud = false;
    jellyfinConfig.mediasources.includes("filebrowser")? filebrowser = true : filebrowser = false;

    const filepath = "/jellyfin/jellyfin-web/main.jellyfin.bundle.js";
    const srcFolderCode = 'for(var s=0,l=r\.length;s<l;s++){var c=r\[s\];a+=O("File"===c\.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c\.Type,c\.Path,c\.Name)}'
    let modifiedSrcFolderCode: string;

    if (filebrowser && nextcloud) {
      modifiedSrcFolderCode = 'for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
    } else if (filebrowser) {
      modifiedSrcFolderCode = 'for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main","/mnt/nextcloud"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
    } else {
      modifiedSrcFolderCode = 'for(var s=0,l=r.length;s<l;s++){var c=r[s];if(["/config","/cache","/","/jellyfin/main","/mnt/filebrowser"].includes(c.Path)){continue;}a+=O("File"===c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory",c.Type,c.Path,c.Name)}'
    };

    replaceInFile(filepath, srcFolderCode, modifiedSrcFolderCode);

    /**
     * ======================== Interfaces ========================
     *
     * In this section, you will decide how the service will be exposed to the outside world
     *
     * Naming convention reference: https://developer.mozilla.org/en-US/docs/Web/API/Location
     */

    // ------------ Tor ------------

    // Find or generate a random Tor hostname by ID
    const torHostname1 = utils.torHostName('torHostname1')

    // Create a Tor host with the assigned port mapping
    const torHost1 = await torHostname1.bindTor(8096, 80)
    // Assign the Tor host a web protocol (e.g. "http", "ws")
    const torOrigin1 = torHost1.createOrigin('http')

    // ------------ LAN ------------

    // Create a LAN host with the assigned internal port
    const lanHost1 = await utils.bindLan(8096)
    // Assign the LAN host a web protocol (e.g. "https", "wss")
    const lanOrigins1 = lanHost1.createOrigins('https')

    // ------------ Interface ----------------

    // An interface is a grouping of addresses that expose the same resource (e.g. a UI or RPC API).
    // Addresses are different "routes" to the same destination

    // Define the Interface for user display and consumption
    const iFace = new NetworkInterfaceBuilder({
      effects,
      name: 'Web UI',
      id: 'webui',
      description: 'The web interface of Jellyfin',
      ui: true,
      basic: null,
      path: '',
      search: {},
    })

    // Choose which origins to attach to this interface. The resulting addresses will share the attributes of the interface (name, path, search, etc)
    const addressReceipt1 = await iFace.export([
      torOrigin1,
      ...lanOrigins1.ip,
      lanOrigins1.local,
    ])

    // Export all address receipts for all interfaces to obtain interface receipt
    const interfaceReceipt = exportInterfaces(addressReceipt1)

    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define additional health checks beyond those associated with daemons
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */
    return Daemons.of({
      effects,
      started,
      interfaceReceipt, // Provide the interfaceReceipt to prove it was completed
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('main', {
      command: './jellyfin/jellyfin --datadir /config --cachedir /cache --ffmpeg /usr/bin/ffmpeg', // The command to start the daemon
      ready: {
        display: 'Web Interface',
        // The function to run to determine the health status of the daemon
        fn: () =>
          checkPortListening(effects, 8096, {
            timeout: 10_000,
            successMessage: 'The Jellyfin web interface is ready',
            errorMessage: 'The Jellyfin web interface is not ready',
          }),
      },
      requires: [],
    })
  },
)
