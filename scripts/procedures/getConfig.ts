// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the Embassy UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "mediasource": {
    "type": "list",
    "subtype": "union",
    "name": "Media Sources",
    "description": "List of Media Sources to use with Jellyfin",
    "range": "[1,*)",
    "default": [
      "nextcloud"
    ],
    "spec": {
      "type": "string",
      "display-as": "{{name}}",
      "unique-by": "name",
      "name": "Media Implementation",
      "tag": {
        "id": "type",
        "name": "Type",
        "description": "- Nextcloud\n- Filebrowser\n",
        "variant-names": {
          "nextcloud": "Nextcloud",
          "filebrowser": "Filebrowser"
        }
      },
      "default": "nextcloud",
      "variants": {
        "nextcloud": {
          "name": {
            "type": "string",
            "name": "Nextcloud",
            "description": "The name of the dependency media source",
            "default": "Embassy Nextcloud",
            "nullable": false
          }
        },
        "filebrowser": {
          "name": {
            "type": "string",
            "name": "Filebrowser",
            "description": "The name of the dependency media source",
            "default": "Embassy Filebrowser",
            "nullable": false
          }
        }
      }
    }
  },
  // "nextcloud": {
  //   "name": "Nextcloud",
  //   "description": "Access Nextcloud media within Jellyfin.",
  //   "type": "boolean",
  //   "default": true,
  // },
  // "filebrowser": {
  //   "name": "Filebrowser",
  //   "description": "Access Filebrowser media within Jellyfin.",
  //   "type": "boolean",
  //   "default": false,
  // },
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
