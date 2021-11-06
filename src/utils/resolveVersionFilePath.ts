import path from 'path'
import url from 'url'
import {normalizePath} from '@rollup/pluginutils'

export function resolveVersionFilePath(publicBasePath: string, to: string) {
  if (/^((ht|f)tps?:)?\/\//.test(publicBasePath)) {
    // use this legacy API is for the `publicBasePath` starts from '//'
    return url.resolve(publicBasePath, to)
  }

  return normalizePath(path.join(publicBasePath, to))
}
