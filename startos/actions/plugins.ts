import { configJson, defaultPlugins } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  chromecast: Value.toggle({
    name: i18n('Chromecast'),
    default: false,
    description: i18n(
      'Lets the web client cast to a Chromecast. Casting is offered only in Chromium-based browsers, such as Chrome.',
    ),
  }),
  trailers: Value.toggle({
    name: i18n('YouTube trailers'),
    default: false,
    description: i18n(
      'Lets the web client play trailers hosted on YouTube, in an embedded YouTube player. Playing one connects your browser to YouTube.',
    ),
  }),
})

export const plugins = sdk.Action.withInput(
  'plugins',
  async () => ({
    name: i18n('Plugins'),
    description: i18n(
      "Turn the web client's Chromecast and YouTube trailer plugins on or off. A change takes effect when the web client is reloaded.",
    ),
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
