const UpdatePopup = require('.')

/** @typedef {any} NuxtModule */
/** @type {(this: NuxtModule, options: object) => void} */
export default function nuxtUpdatePopup(options) {
  this.extendBuild(config => {
    config.plugins.push(new UpdatePopup(options))
  })
}
