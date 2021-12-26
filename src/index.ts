import {createUnplugin} from 'unplugin'
import {Options} from './types'
import {pupa} from './utils/pupa'
import path from 'path'
import {writeFile, readFile} from './utils/fs'
import {name} from '../package.json'
import {resolveVersionFilePath} from './utils/resolveVersionFilePath'

export default createUnplugin<Options>((options = {}) => {
  const virtualModuleId = '@update-popup'
  // @see https://vitejs.dev/guide/api-plugin.html#conventions
  // Internally, plugins that use virtual modules should prefix the module ID with \0 while resolving the id, a convention from the rollup ecosystem.
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const {
    envKey = 'UPDATE_POPUP_VERSION',
    versionFileName = 'update_popup_version.txt',
    versionType = 'auto',
    popupMessage = '发现新版本可用',
    popupActionText = '刷新',
  } = options
  let {publicBasePath = ''} = options

  const currentVersion =
    versionType === 'auto'
      ? `${Date.now()}.0.0`
      : process.env[envKey] || '0.1.0'

  const writeVersionFile = (file: string) => {
    return writeFile(path.join(file, versionFileName), currentVersion)
  }

  return {
    name,
    enforce: 'post',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }

      return null
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const code = await readFile(path.join(__dirname, 'snippet.mjs'))

        return pupa(code, {
          envKey,
          currentVersion,
          versionFilePath: resolveVersionFilePath(
            publicBasePath,
            versionFileName
          ),
          popupMessage,
          popupActionText,
        })
      }
    },

    webpack(compiler) {
      publicBasePath =
        publicBasePath || (compiler.options.output.publicPath as string) || ''

      const p = compiler.options.output.path
      if (!p) return
      //@see https://github.com/unjs/unplugin/issues/37
      compiler.hooks.done.tapPromise(name, () => {
        return writeVersionFile(p)
      })
    },

    vite: {
      configResolved(resolvedConfig) {
        publicBasePath = publicBasePath || resolvedConfig.base
      },
      async writeBundle(options) {
        const p = options.dir
        if (!p) return
        await writeVersionFile(p)
      },
    },
  }
})
