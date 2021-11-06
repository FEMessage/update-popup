// nuxt doesn't work for now

import {Options} from './types'
import unplugin from '.'

export default function(this: any, options: Options) {
  // install webpack plugin
  this.extendBuild((config: any, {isClient}: any) => {
    config.plugins = config.plugins || []
    if (isClient) {
      config.plugins.unshift(unplugin.webpack(options))
    }
  })

  // install vite plugin
  this.nuxt.hook('vite:extend', async (vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })
}
