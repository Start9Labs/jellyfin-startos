import { setupAutoConfig } from '@start9labs/start-sdk/lib/autoconfig/setupAutoConfig'
import { ConfigSpec } from './config/spec'
import { WrapperData } from '../wrapperData'
import { Manifest } from '../manifest'

/**
 * In this function, you establish rules for auto configuring service dependencies
 *
 * See Hello Moon for an example
 */
export const autoConfig = setupAutoConfig<
  WrapperData,
  ConfigSpec,
  Manifest,
  {}
>({})
