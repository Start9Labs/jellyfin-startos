import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  mediaSources: Value.multiselect({
    name: i18n('Media Sources'),
    values: {
      filebrowser: i18n('File Browser'),
      nextcloud: i18n('Nextcloud'),
    },
    default: ['filebrowser'],
    minLength: 1,
  }),
})

export const mediaSources = sdk.Action.withInput(
  // id
  'media-sources',

  // metadata
  async ({ effects }) => ({
    name: i18n('Select Media Sources'),
    description: i18n('Service(s) Jellyfin uses to access media'),
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
