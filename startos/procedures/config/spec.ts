/**
 * Here you define the config specification that will ultimately present to the user as validated form inputs
 *
 * Most form controls are available, including text, textarea, number, toggle, select, multiselect, list, color, datetime, object (a subform), and union (a conditional subform)
 */
import { Config } from '@start9labs/start-sdk/lib/config/builder/config'
import { List } from '@start9labs/start-sdk/lib/config/builder/list'
import { Value } from '@start9labs/start-sdk/lib/config/builder/value'
import { Variants } from '@start9labs/start-sdk/lib/config/builder/variants'

export const configSpec = Config.of({
  mediasources: Value.multiselect({
    name: "Media Sources",
    values: {
      nextcloud: "NextCloud",
      filebrowser: "File Browser",
    },
    default: ["nextcloud"],
    description: "Service(s) Jellyfin uses to access media",
    minLength: 1,
    maxLength: 2,
  }),
  chromecast: Value.toggle({
    name: "Chromecast",
    default: false,
    description: "Chromecast plugin to allow casting to other devices.",
  }),
  trailers: Value.toggle({
    name: "Youtube trailers",
    default: false,
    description: "Auto-load movie trailers from YouTube.",
  }),
})

export const matchconfigSpec = configSpec.validator
export type ConfigSpec = typeof matchconfigSpec._TYPE

