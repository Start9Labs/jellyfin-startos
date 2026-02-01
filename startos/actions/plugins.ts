import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  chromecast: Value.toggle({
    name: i18n('Chromecast'),
    default: false,
    description: i18n('Chromecast plugin to allow casting to other devices.'),
  }),
  trailers: Value.toggle({
    name: i18n('Youtube trailers'),
    default: false,
    description: i18n('Auto-load movie trailers from YouTube.'),
  }),
})

export const plugins = sdk.Action.withInput(
  // id
  'plugins',

  // metadata
  async ({ effects }) => ({
    name: i18n('Plugins'),
    description: i18n('Select which plugins to enable'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const plugins =
      (await configJson.read((c) => c.plugins).const(effects)) || []
    return {
      chromecast: plugins.includes('chromecastPlayer/plugin'),
      trailers: plugins.includes('trailers'),
    }
  },

  // the execution function
  async ({ effects, input }) => {
    const plugins = new Set(
      (await configJson.read((c) => c.plugins).const(effects)) || [],
    )
    input.chromecast
      ? plugins.add('chromecastPlayer/plugin')
      : plugins.delete('chromecastPlayer/plugin')
    input.trailers ? plugins.add('trailers') : plugins.delete('trailers')
    await configJson.merge(effects, { plugins: Array.from(plugins) })
  },
)
