import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { store } from './fileModels/store.json'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const mediaSources =
    (await store.read((s) => s.mediaSources).const(effects)) || []

  const deps: T.CurrentDependenciesResult<any> = {}

  if (mediaSources.includes('filebrowser')) {
    deps['filebrowser'] = {
      kind: 'exists',
      versionRange: '^2.32.0:1',
    }
  }

  if (mediaSources.includes('nextcloud')) {
    deps['nextcloud'] = {
      kind: 'exists',
      versionRange: '^29.0.14:1',
    }
  }

  return deps
})
