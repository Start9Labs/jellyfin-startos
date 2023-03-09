// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the Embassy UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  // "mediastorage": {
  //   "type": "list",
  //   "subtype": "union",
  //   "name": "Media Storage",
  //   "description": "List of Media servers to use",
  //   "range": "[1,*)",
  //   "default": [
  //     "nextcloud"
  //   ],
  //   "spec": {
  //     "type": "string",
  //     "display-as": "{{name}}",
  //     "unique-by": "name",
  //     "name": "Media Storage",
  //     "tag": {
  //       "id": "type",
  //       "name": "Type",
  //       "description": "-Nextcloud\n-Filebrowser\n",
  //       "variant-names": {
  //         "nextcloud": "Nextcloud",
  //         "filebrowser": "Filebrowser",
  //       }
  //     }
  //   }
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
});
