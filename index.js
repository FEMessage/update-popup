/**
 * @typedef {import('./utils').PathLike} PathLike
 * @typedef {import('./utils').obj} obj
 */

/**
 * @typedef {{
 *  publicPath?: string
 *  inject?: boolean
 *  envKey?: string
 *  versionFileName?: string
 * }} UpdatePopupOptions
 */

const fs = require('fs-extra')
const _get = require('lodash.get')
const {
  resolveWebpackEntry,
  replaceStr,
  correctPath,
  resolve,
  join,
  resolveApp
} = require('./utils')

/** @type {(filePath: PathLike) => string} */
const readFile = filePath => fs.readFileSync(filePath, 'utf8')

const NAME = 'femessage-update-popup'

class UpdatePopup {
  /** @param {UpdatePopupOptions} options */
  constructor(options) {
    this.options = Object.assign(
      {
        publicPath: '',
        inject: true, // 自动注入到 webpack.entry
        envKey: 'UPDATE_POPUP_VERSION',
        versionFileName: 'update_popup_version.txt'
      },
      options
    )

    this.version = process.env[this.options.envKey] || '1.0.0'
  }

  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    // common
    if (process.env.NODE_ENV !== 'production') return
    // v4
    if (_get(compiler, 'options.mode') !== 'production') return

    // 修改 webpack 入口文件
    if (this.options.inject) {
      compiler.options.entry = resolveWebpackEntry(compiler.options.entry, {
        NAME,
        filePath: resolveApp('main.js')
      })
    }

    // 先生成写入版本号的文件到 app
    compiler.hooks.beforeRun.tap(NAME, () => {
      // 清空缓存文件夹
      fs.emptyDirSync(resolveApp())

      const publicPath =
        _get(this, 'options.publicPath') ||
        _get(compiler, 'options.output.publicPath', '')

      this.generateFile(
        resolveApp('main.js'),
        readFile(resolve('src', 'main.js')),
        {
          VERSION_FILE_PATH: correctPath(
            publicPath,
            this.options.versionFileName
          )
        }
      )
    })

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const outputPath = _get(compiler, 'outputPath', '')

      // 版本号文件
      fs.outputFileSync(
        join(outputPath, this.options.versionFileName),
        this.version
      )
    })
  }

  /** @type {(dest: PathLike, content: string, extraReplacement: obj) => void} */
  generateFile(dest = '', content = '', extraReplacement = {}) {
    fs.outputFileSync(
      dest,
      replaceStr(content, {
        envKey: this.options.envKey,
        currentVersion: this.version,
        ...extraReplacement
      })
    )
  }
}

module.exports = UpdatePopup
