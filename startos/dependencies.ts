import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { store } from './file-models/store.json'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const mediaSources =
    (await store.read((s) => s.mediaSources).const(effects)) || []

  const deps: T.CurrentDependenciesResult<any> = {}

  if (mediaSources.includes('filebrowser')) {
    deps['filebrowser'] = {
      kind: 'exists',
      versionRange: '>=1.0.0', // @TODO
    }
  }

  if (mediaSources.includes('nextcloud')) {
    deps['nextcloud'] = {
      kind: 'exists',
      versionRange: '>=1.0.0', // @TODO
    }
  }

  return deps
})
