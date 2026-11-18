import { FileHelper, z } from '@start9labs/start-sdk'
import { readdir } from 'fs/promises'
import { sdk } from '../sdk'

const librariesDir = 'root/default'

// The media mounts are read-only, and Jellyfin saves subtitles only beside the media while this is true.
const libraryOptionsSchema = z.looseObject({
  SaveSubtitlesWithMedia: z.literal('false').catch('false'),
})

const shape = z.looseObject({
  LibraryOptions: libraryOptionsSchema.catch(() =>
    libraryOptionsSchema.parse({}),
  ),
})

export const libraryOptionsXml = (library: string) =>
  FileHelper.xml(
    {
      base: sdk.volumes.config,
      subpath: `${librariesDir}/${library}/options.xml`,
    },
    shape,
    {
      parser: {
        ignoreAttributes: false,
        ignoreDeclaration: true,
        parseTagValue: false,
      },
      builder: { ignoreAttributes: false, format: true },
    },
  )

export async function libraryNames() {
  const entries = await readdir(sdk.volumes.config.subpath(librariesDir), {
    withFileTypes: true,
  }).catch((e: NodeJS.ErrnoException) => {
    if (e.code === 'ENOENT') return []
    throw e
  })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}
