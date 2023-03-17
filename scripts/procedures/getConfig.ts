// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the Embassy UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "mediasources": {
    "type": "list",
    "subtype": "enum",
    "name": "Media Sources",
    "description": "List of Media Sources to use with Jellyfin",
    "range": "[1,*)",
    "default": [
      "nextcloud"
    ],
    "spec": {
      values: ["nextcloud", "filebrowser"],
      "value-names": {
        "nextcloud": "NextCloud",
        "filebrowser": "File Browser"
      }
    }
  },
  "chromecast": {
    "name": "Chromecast",
    "description": "Chromecast plugin to allow casting to other devices.",
    "type": "boolean",
    "default": false,
  },
  "trailers": {
    "name": "Youtube trailers",
    "description": "Auto-load movie trailers from YouTube.",
    "type": "boolean",
    "default": false,
  },
} as T.ConfigSpec);
