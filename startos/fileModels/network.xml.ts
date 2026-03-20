import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const knownProxiesSchema = z.object({
  string: z.literal('10.0.3.1').array().catch(['10.0.3.1']),
})

const networkConfigSchema = z.object({
  KnownProxies: knownProxiesSchema.catch(() => knownProxiesSchema.parse({})),
})

const shape = z.object({
  NetworkConfiguration: networkConfigSchema.catch(() =>
    networkConfigSchema.parse({}),
  ),
})

export const networkXml = FileHelper.xml(
  {
    base: sdk.volumes.config,
    subpath: 'network.xml',
  },
  shape,
  {
    parser: {
      isArray: (name) => name === 'string',
    },
  },
)
