import fs from 'fs-extra'
import {normalizePath} from '@rollup/pluginutils'

export function writeFile(file: string, data: any) {
  return fs.outputFile(normalizePath(file), data)
}

export function readFile(file: string) {
  return fs.readFile(file, 'utf8')
}
