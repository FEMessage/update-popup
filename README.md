# update-popup

[![Build Status](https://badgen.net/travis/FEMessage/update-popup/master)](https://travis-ci.com/FEMessage/update-popup)
[![NPM Download](https://badgen.net/npm/dm/@femessage/update-popup)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM Version](https://badge.fury.io/js/%40femessage%2Fupdate-popup.svg)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM License](https://badgen.net/npm/license/@femessage/update-popup)](https://github.com/FEMessage/update-popup/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/update-popup/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

![](https://user-images.githubusercontent.com/53422750/88611099-eb654b00-d0ba-11ea-89b9-ca92afc1078c.gif)

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Notice](#notice)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

Check if the current application is the latest version. If not, it reminds you to reload the current page.

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @femessage/update-popup
```

[⬆ Back to Top](#table-of-contents)

## Usage

You need to set environment variables `UPDATE_POPUP_VERSION`, when iteratively updating, modify the variables greater than current value.

Environment variables

```bash
# .env
UPDATE_POPUP_VERSION=1.0.0 # Support more. e.g.: 1.0.0.1, 1.0.0.1.1
```

Project configuration file

```js
// nuxt.config.js
const config = {
  modules: ['@femessage/update-popup/nuxt', {options}],
}

// vue.config.js or poi.config.js
const UpdatePopup = require('@femessage/update-popup')
const config = {
  chainWebpack: (config) => {
    config.plugin('femessage-update-popup').use(UpdatePopup, [{options}])
  },
}
```

It's so easy.

[⬆ Back to Top](#table-of-contents)

## Options

### options.publicPath

- Type: `string`
- Default: `webpackConfig.output.publicPath`
- Reference: [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)

Use publicPath setting

[⬆ Back to Top](#table-of-contents)

### options.inject

- Type: `boolean`
- Default: `true`

Does it need to be automatically added to the webpack entry file?
If set `false` Need to manually `@femessage/update-popup/app/main` Inject it into your code.
When to set this parameter, see [Notice.QianKun](#qiankun)。

### options.envKey

- Type: `string`
- Default: `'UPDATE_POPUP_VERSION'`

Key of the environment variable. e.g. `process.env.UPDATE_POPUP_VERSION=1.0.0`

### options.versionFileName

- Type: `string`
- Default: `'update_popup_version.txt'`

Version filename.

## Notice

### QianKun

This plugin automatically generates a common js file and adds it to the webpack entry file,
however, due to the requirement to **[export lifecycle hooks](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AF%BC%E5%87%BA%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)** for the sub-application's entry file.  
It is necessary to disable the automatic addition of entry files, with the following adjustments:

#### Use in sub-applications

Adjust the project configuration file

```diff
# nuxt.config.js
const config = {
-  modules: ['@femessage/update-popup/nuxt']
+  modules: [['@femessage/update-popup/nuxt'], { inject: false }]
}

# vue.config.js or poi.config.js
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [{
+     inject: false
    }])
  }
}
```

Add an entry file in your **Sub-application** at last

```diff
+ import '@femessage/update-popup/app/main'
```

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://evila.me/"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt=""/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Tests">⚠️</a> <a href="#ideas-evillt" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Documentation">📖</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://4ark.me"><img src="https://avatars0.githubusercontent.com/u/27952659?v=4" width="100px;" alt=""/><br /><sub><b>4Ark</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/commits?author=gd4Ark" title="Documentation">📖</a> <a href="#translation-gd4Ark" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
