# update-popup

[![Build Status](https://badgen.net/travis/FEMessage/update-popup/master)](https://travis-ci.com/FEMessage/update-popup)
[![NPM Download](https://badgen.net/npm/dm/@femessage/update-popup)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM Version](https://badge.fury.io/js/%40femessage%2Fupdate-popup.svg)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM License](https://badgen.net/npm/license/@femessage/update-popup)](https://github.com/FEMessage/update-popup/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/update-popup/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

[中文文档](./README-zh.md)

<p align="center">
  <img src="https://user-images.githubusercontent.com/19513289/147315981-e64ac6ed-85d9-4c3c-ae18-cb066f25863c.gif" />
</p>

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Options](#options)
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

<details>
<summary>Vite</summary>

```ts
// src/main.js
import '@update-popup'

// vite.config.ts
import UpdatePopup from '@femessage/update-popup/vite'

export default defineConfig({
  plugins: [
    UpdatePopup({
      /* options */
    })
  ]
})
```

</details><br/>

<details>
<summary>Webpack</summary>

```ts
// src/main.js
import '@update-popup'

// webpack.config.ts
module.exports = {
  plugins: [
    require('@femessage/update-popup/webpack')({
      /* options */
    })
  ]
}
```

</details><br/>

<details>
<summary>Nuxt2</summary>

```ts
// plugins/update-popup.js
import '@update-popup'

// nuxt.config.ts
export default {
  plugins: [
    {
      src: '~/plugins/update-popup',
      mode: 'client'
    }
  ],
  buildModules: [
    [
      '@femessage/update-popup/nuxt',
      {
        /* options */
      }
    ]
  ]
}
```

</details><br/>

<details>
<summary>Vue CLI</summary>

```ts
// src/main.js
import '@update-popup'

// vue.config.ts
module.exports = {
  configureWebpack: {
    plugins: [
      require('@femessage/update-popup/webpack')({
        /* options */
      })
    ]
  }
}
```

</details><br/>

[⬆ Back to Top](#table-of-contents)

## Options

The following show the default values and description.

```ts
UpdatePopup({
  // Similar to `publicDir` in vite, `publicPath` in webpack.
  publicBasePath: '',

  // To make updated version code automaticly
  // Note：If true，the environment variable UPDATE_POPUP_VERSION doesn't work.
  auto: false,

  // Key of the environment variable.
  // e.g. `process.env.UPDATE_POPUP_VERSION = 1.0.0`
  envKey: 'UPDATE_POPUP_VERSION',

  // Generate `update_popup_version.txt` to dist.
  versionFileName: 'update_popup_version.txt',

  // The way of automatically generated version，values：
  // timestamp:
  // it was put in the first place to ensure that it would always be bigger than the previous version.
  // Note：this will lose the control of version semantics.
  versionType: 'timestamp',

  // Popup message
  popupMessage: '发现新版本可用',

  // Popup refresh action text
  popupActionText: '刷新'
})
```

[⬆ Back to Top](#table-of-contents)

## Migrate from `v1.1.3`

`src/main.js`

```diff
- import '@femessage/update-popup/app/main'
+ import '@update-popup'
```

`xxx.config.js` see [Install](#install).

```diff
UpdatePopup({
- publicPath: '/',
+ publicBasePath: '/',

- auto: true,
+ versionType: 'auto',

- inject: false,
})
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
    <td align="center"><a href="https://github.com/2nthony/"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>2nthony(formerly evillt)</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/commits?author=2nthony" title="Code">💻</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Tests">⚠️</a> <a href="#ideas-evillt" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Documentation">📖</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://4ark.me"><img src="https://avatars0.githubusercontent.com/u/27952659?v=4?s=100" width="100px;" alt=""/><br /><sub><b>4Ark</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/commits?author=gd4Ark" title="Documentation">📖</a> <a href="#translation-gd4Ark" title="Translation">🌍</a> <a href="https://github.com/FEMessage/update-popup/commits?author=gd4Ark" title="Code">💻</a> <a href="https://github.com/FEMessage/update-popup/issues?q=author%3Agd4Ark" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://aa"><img src="https://avatars.githubusercontent.com/u/10540920?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ynwshy</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/issues?q=author%3Aynwshy" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
