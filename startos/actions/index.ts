import { sdk } from '../sdk'
import { mediaSources } from './mediaSources'
import { plugins } from './plugins'

export const actions = sdk.Actions.of()
  .addAction(mediaSources)
  .addAction(plugins)
