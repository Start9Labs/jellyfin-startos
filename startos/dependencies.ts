import { T } from '@start9labs/start-sdk'
import { store } from './fileModels/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const mediaSources =
    (await store.read((s) => s.mediaSources).const(effects)) || []

  const deps: T.CurrentDependenciesResult<any> = {}

  if (mediaSources.includes('filebrowser')) {
    deps['filebrowser'] = {
      kind: 'exists',
      versionRange: '>=2.61.0:0-beta.0',
    }
  }

  if (mediaSources.includes('nextcloud')) {
    deps['nextcloud'] = {
      kind: 'exists',
      versionRange: '>=32.0.6:0-beta.0',
    }
  }

  return deps
})
