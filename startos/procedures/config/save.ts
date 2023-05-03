import { ConfigSpec } from './spec'
import { WrapperData } from '../../wrapperData'
import { Save } from 'start-sdk/lib/config/setupConfig'
import { Manifest } from '../../manifest'
import { jellyfinConfig } from './file-models/config.json'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save: Save<WrapperData, ConfigSpec, Manifest> = async ({
  effects,
  utils,
  input,
  dependencies,
}) => {
  await utils.setOwnWrapperData('/config', input)
  let defaultPlugins: string[] = [
    "playAccessValidation/plugin",
    "experimentalWarnings/plugin",
    "htmlAudioPlayer/plugin",
    "htmlVideoPlayer/plugin",
    "photoPlayer/plugin",
    "comicsPlayer/plugin",
    "bookPlayer/plugin",
    "youtubePlayer/plugin",
    "backdropScreensaver/plugin",
    "pdfPlayer/plugin",
    "logoScreensaver/plugin",
    "sessionPlayer/plugin",
  ];

  const chromecastIndex = defaultPlugins.indexOf("chromecastPlayer/plugin");
  const trailersIndex = defaultPlugins.indexOf("syncPlay/plugin");

  if (input.chromecast) {
    if (chromecastIndex < 0) defaultPlugins.push("chromecastPlayer/plugin");
  } else {
    if (chromecastIndex > -1) defaultPlugins.splice(chromecastIndex, 1);
  }

  if (input.trailers) {
    if (trailersIndex < 0) defaultPlugins.push("syncPlay/plugin");
  } else {
    if (trailersIndex > -1) defaultPlugins.splice(trailersIndex, 1);
  }

  await jellyfinConfig.write(
    {
      includeCorsCredentials: false,
      multiserver: false,
      themes: [
        {
          "name": "Apple TV",
          "id": "appletv",
          "color": "#bcbcbc",
          "default": false,
        }, {
          "name": "Blue Radiance",
          "id": "blueradiance",
          "color": "#011432",
          "default": false,
        }, {
          "name": "Dark",
          "id": "dark",
          "color": "#202020",
          "default": true
        }, {
          "name": "Light",
          "id": "light",
          "color": "#303030",
          "default": false,
        }, {
          "name": "Purple Haze",
          "id": "purplehaze",
          "color": "#000420",
          "default": false,
        }, {
          "name": "WMC",
          "id": "wmc",
          "color": "#0c2450",
          "default": false,
        }
      ],
      servers: [],
      menuLinks: [],
      plugins: defaultPlugins,
    },
    effects,
  )

  // set dependencies
  if (input.mediasources.includes("filebrowser") && input.mediasources.includes("nextcloud")) {
    return effects.setDependencies(
      [
        dependencies.running('filebrowser'),
        dependencies.running('nextcloud')
      ])
  } else if (input.mediasources.includes("filebrowser")) {
    return effects.setDependencies([dependencies.running('filebrowser')])
  } else {
    return effects.setDependencies([dependencies.running('nextcloud')])
  }
}