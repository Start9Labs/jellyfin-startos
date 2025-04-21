import { sdk } from './sdk'
import { exposedStore, intiStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { mediaSources } from './actions/mediaSources'

// **** Pre Install ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {})

// **** PostInstall ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.action.requestOwn(effects, mediaSources, 'critical', {
    reason: 'Select where Jellyfin media are stored',
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  intiStore,
  exposedStore,
)
