import { ConfigSpec } from './spec'
import { WrapperData } from '../../wrapperData'
import { Read } from 'start-sdk/lib/config/setupConfig'
import { jellyfinConfig } from './file-models/config.json'

/**
 * This function executes on config get
 *
 * Use this function to gather data from various files and assemble into a valid config to display to the user
 */
export const read: Read<WrapperData, ConfigSpec> = async ({effects, utils}) => {
  let data = await utils.readFile(jellyfinConfig);
  if (!data) {
    throw new Error("Config is null!");
  };

  let chromecastBool: boolean;
  let trailersBool: boolean;

  data.plugins.includes("chromecastPlayer/plugin")? chromecastBool = true : chromecastBool = false;
  data.plugins.includes("syncPlay/plugin")? trailersBool = true : trailersBool = false;

  const configMediaSources = (await utils.getOwnWrapperData('/config').once()).mediasources;

  return {
    mediasources: configMediaSources,
    chromecast: chromecastBool,
    trailers: trailersBool,
  }
}
