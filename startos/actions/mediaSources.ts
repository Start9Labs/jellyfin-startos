import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  mediaSources: Value.multiselect({
    name: 'Media Sources',
    values: {
      nextcloud: 'Nextcloud',
      filebrowser: 'File Browser',
    },
    default: ['nextcloud'],
    minLength: 1,
  }),
})

export const mediaSources = sdk.Action.withInput(
  // id
  'media-sources',

  // metadata
  async ({ effects }) => ({
    name: 'Select Media Sources',
    description: 'Service(s) Jellyfin uses to access media',
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
