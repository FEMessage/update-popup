# update-popup

[![Build Status](https://badgen.net/travis/FEMessage/update-popup/master)](https://travis-ci.com/FEMessage/update-popup)
[![NPM Download](https://badgen.net/npm/dm/@femessage/update-popup)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM Version](https://badge.fury.io/js/%40femessage%2Fupdate-popup.svg)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM License](https://badgen.net/npm/license/@femessage/update-popup)](https://github.com/FEMessage/update-popup/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/update-popup/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

<p align="center">
  <img src="https://user-images.githubusercontent.com/19513289/140611646-63c88598-5186-433e-bab0-70011ac08504.gif" />
</p>

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Options](#options)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

检测当前运行的应用是否是最新版本，如若不是，则提醒刷新以使用新版本。

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

这里显示默认值及其介绍。

````ts
UpdatePopup({
  // 与 vite 的 `publicDir` 和 webpack 的 `publicPath` 相似.
  publicBasePath: '',

  // 环境变量的 key
  // 例如：`process.env.UPDATE_POPUP_VERSION = 1.0.0`
  envKey: 'UPDATE_POPUP_VERSION',

  // 生成 `update_popup_version.txt` 到输出目录
  versionFileName: 'update_popup_version.txt',

  // 生成版本号的方式
  // `auto`:
  // 使用当前时间戳，看上去会是这个样子 `1603184005919.0.0`
  // 因此第一个值总是会大于上一次的值
  //
  // `env`:
  // 你需要设置一个环境变量 `UPDATE_POPUP_VERSION`
  // 当需要迭代更新时，修改这个值大于当前值即可
  // ```.env
  // UPDATE_POPUP_VERSION = 1.0.0
  // 例如： `1.0.1`, `1.0.0.1.1`
  // ```
  versionType: 'auto'

  // 弹出框信息文本
  popupMessage: '发现新版本可用',

  // 弹出框刷新按钮文本
  popupActionText: '刷新'
})
````

## 从 `v1.1.3` 迁移

`src/main.js`

```diff
- import '@femessage/update-popup/app/main'
+ import '@update-popup'
```

`xxx.config.js` 请参照 [Install](#install).

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
    <td align="center"><a href="https://evila.me/"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Tests">⚠️</a> <a href="#ideas-evillt" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/FEMessage/update-popup/commits?author=evillt" title="Documentation">📖</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td>
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
