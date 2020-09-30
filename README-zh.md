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

检测当前运行的应用是否是最新版本，如若不是，则提醒刷新以使用新版本。

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @femessage/update-popup
```

[⬆ Back to Top](#table-of-contents)

## Usage

你需要通过环境变量 `UPDATE_POPUP_VERSION` 来传入版本号，后续每次迭代更新只需要修改比当前大的版本号即可。

环境变量

```bash
# .env
UPDATE_POPUP_VERSION=1.0.0 # 如果有必要，可以支持更多位数。如：1.0.0.1，1.0.0.1.1
```

工程配置文件

```js
// nuxt.config.js
const config = {
  modules: ['@femessage/update-popup/nuxt', {options}]
}

// vue.config.js 或者 poi.config.js
const UpdatePopup = require('@femessage/update-popup')
const config = {
  chainWebpack: config => {
    config.plugin('femessage-update-popup').use(UpdatePopup, [{options}])
  }
}
```

就这么简单！

[⬆ Back to Top](#table-of-contents)

## Options

### options.publicPath

- Type: `string`
- Default: `webpackConfig.output.publicPath`
- Reference: [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)

使用独立的 publicPath，一般情况下不需要设置此参数。

[⬆ Back to Top](#table-of-contents)

### options.inject

- Type: `boolean`
- Default: `true`

是否自动添加到 webpack 入口文件，一般情况下不需要设置此参数。  
如果设置为 `false` 需要手动将 `@femessage/update-popup/app/main` 注入到你的代码中。  
何时需要设置此参数请参阅 [Notice.QianKun（乾坤）](#qiankun乾坤)。

### options.envKey

- Type: `string`
- Default: `'UPDATE_POPUP_VERSION'`

指定获取环境变量的 key 。e.g. `process.env.UPDATE_POPUP_VERSION=1.0.0`

### options.versionFileName

- Type: `string`
- Default: `'update_popup_version.txt'`

版本号文件名。

## Notice

### QianKun（乾坤）

此插件会自动生成一个普通的 js 文件并添加到 webpack 入口文件中，  
但由于子应用的入口文件需要 **[导出生命周期钩子](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AF%BC%E5%87%BA%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)** 的要求，  
因此需要禁止自动添加入口文件，则做如下的调整：

#### 在子应用中使用

调整工程配置文件

```diff
# nuxt.config.js
const config = {
-  modules: ['@femessage/update-popup/nuxt']
+  modules: [['@femessage/update-popup/nuxt'], { inject: false }]
}

# vue.config.js 或者 poi.config.js
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [{
+     inject: false
    }])
  }
}
```

最后在你的**子应用**入口文件添加

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
