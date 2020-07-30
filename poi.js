const UpdatePopup = require('.')

const NAME = 'femessage-update-popup'

exports.name = NAME

exports.apply = (api, opts = {}) => {
  api.hook('createWebpackChain', config => {
    config.plugin(NAME).use(UpdatePopup, [opts])
  })
}
