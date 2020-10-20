/**
 * @typedef {string} PathLike
 * @typedef {{[k:string]: any}} obj
 */

const path = require('path')
const url = require('url')
const pupa = require('./pupa')

exports.join = path.join

/** @type {(...dir: PathLike[]) => PathLike} */
const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)
exports.resolve = resolve

/** @type {(...dir: PathLike[]) => PathLike} */
exports.resolveApp = (...dir) => resolve('app', ...dir)

// https://webpack.js.org/configuration/entry-context/#entry
/** @type {(webpackEntry: any | obj, opts: obj) => obj} */
exports.resolveWebpackEntry = (webpackEntry, opts = {}) => {
  if (isObject(webpackEntry)) {
    return {
      ...webpackEntry,
      [opts.NAME]: opts.filePath,
    }
  }

  if (Array.isArray(webpackEntry)) {
    return [...webpackEntry, opts.filePath]
  }

  if (isString(webpackEntry)) {
    return [webpackEntry, opts.filePath]
  }

  // 其他方式，如 promise, function 则调整为类似于默认的情况，webpack 会自己处理动态入口
  return {
    // 默认 main
    main: webpackEntry,
    [opts.NAME]: opts.filePath,
  }
}

/**
 * @type {(content: string, replaceStrMap: {[k: string]: string}) => string}
 */
exports.replaceStr = (content, replaceStrMap = {}) => {
  return pupa(content, replaceStrMap)
}

/**
 * @type {(publicPath: PathLike, ...args: Array<PathLike>) => PathLike}
 */
exports.correctPath = (publicPath, ...args) => {
  let p = path.join(publicPath, ...args)

  if (publicPath.startsWith('http') || publicPath.startsWith('//')) {
    p = url.resolve(publicPath, ...args)
  }

  return p
}

function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]'
}
