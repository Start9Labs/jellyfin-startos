import { mediaSources } from '../actions/mediaSources'
import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

export const taskSelectMediaSources = sdk.setupOnInit(async (effects) => {
  if (!(await store.read((s) => s.mediaSources).const(effects))?.length) {
    await sdk.action.createOwnTask(effects, mediaSources, 'critical', {
      reason: i18n('Select where Jellyfin media are stored'),
    })
  }
})
