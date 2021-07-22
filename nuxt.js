const UpdatePopup = require('.')

/** @typedef {any} NuxtModule */
/** @type {(this: NuxtModule, options: object) => void}
 *  https://nuxtjs.org/docs/2.x/directory-structure/modules#register-custom-webpack-loaders
 */
export default function nuxtUpdatePopup(options) {
  this.extendBuild((config, { isClient }) => {
    if (isClient) config.plugins.push(new UpdatePopup(options))
  })
}
