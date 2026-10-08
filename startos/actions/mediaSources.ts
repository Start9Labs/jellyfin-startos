import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  mediaSources: Value.multiselect({
    name: i18n('Media Sources'),
    description: i18n(
      "- NextExplorer: mounted at /mnt/nextexplorer, one folder per drive, such as /mnt/nextexplorer/Files\n- FileBrowser Quantum: mounted at /mnt/filebrowser\n- Nextcloud: mounted at /mnt/nextcloud; each user's files are in /mnt/nextcloud/data/{username}/files",
    ),
    values: {
      nextexplorer: i18n('NextExplorer'),
      filebrowser: i18n('FileBrowser Quantum'),
      nextcloud: i18n('Nextcloud'),
    },
    default: ['nextexplorer'],
    minLength: 1,
  }),
})

export const mediaSources = sdk.Action.withInput(
  // id
  'media-sources',

  // metadata
  async ({ effects }) => ({
    name: i18n('Select Media Sources'),
    description: i18n(
      'Choose which services Jellyfin reads media from. Each one is mounted read-only, and changing the selection restarts Jellyfin.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    mediaSources:
      (await store.read((s) => s.mediaSources).const(effects)) || [],
  }),

  // the execution function
  async ({ effects, input }) =>
    store.merge(effects, { mediaSources: input.mediaSources }),
)
