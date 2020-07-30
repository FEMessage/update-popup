/// <reference types="jest" />

const {resolveWebpackEntry, resolveApp} = require('../../utils')

const options = {
  NAME: 'femessage-update-popup',
  filePath: resolveApp('main.js')
}

describe('处理 webpack 入口', () => {
  test('多入口-obj', () => {
    expect(resolveWebpackEntry({app: 'src/index.js'}, options)).toEqual({
      app: 'src/index.js',
      [options.NAME]: resolveApp('main.js')
    })
  })

  test('多入口-array', () => {
    expect(
      resolveWebpackEntry(['src/index.js', 'src/mini-app.js'], options)
    ).toEqual(['src/index.js', 'src/mini-app.js', resolveApp('main.js')])
  })

  test('单入口-string', () => {
    expect(resolveWebpackEntry('src/index.js', options)).toEqual([
      'src/index.js',
      resolveApp('main.js')
    ])
  })

  test('默认', () => {
    expect(resolveWebpackEntry({main: 'src/index.js'}, options)).toEqual({
      main: 'src/index.js',
      [options.NAME]: resolveApp('main.js')
    })
  })
})
