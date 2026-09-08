import { configJson, defaultPlugins } from '../fileModels/config.json'
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
    name: i18n('YouTube trailers'),
    default: false,
    description: i18n('Auto-load movie trailers from YouTube.'),
  }),
})

export const plugins = sdk.Action.withInput(
  'plugins',
  async () => ({
    name: i18n('Plugins'),
    description: i18n('Select which plugins to enable'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async () => {
    const plugins = (await configJson.read((c) => c.plugins).once()) || []
    return {
      chromecast: plugins.includes('chromecastPlayer/plugin'),
      trailers: plugins.includes('youtubePlayer/plugin'),
    }
  },
  async ({ effects, input }) => {
    const plugins = new Set(
      (await configJson.read((c) => c.plugins).once()) || defaultPlugins,
    )
    input.chromecast
      ? plugins.add('chromecastPlayer/plugin')
      : plugins.delete('chromecastPlayer/plugin')
    input.trailers
      ? plugins.add('youtubePlayer/plugin')
      : plugins.delete('youtubePlayer/plugin')
    await configJson.merge(effects, { plugins: Array.from(plugins) })
  },
)
