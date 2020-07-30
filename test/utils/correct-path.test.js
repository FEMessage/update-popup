/// <reference types="jest" />

const {correctPath} = require('../../utils')

describe('测试路径拼接', () => {
  test('`/` 开头', () => {
    expect(correctPath('/single-slash.com', 'assets')).toBe(
      '/single-slash.com/assets'
    )
  })

  test('应保留 `//` 开头', () => {
    expect(correctPath('//double-slash.com', 'main.js')).toBe(
      '//double-slash.com/main.js'
    )
  })

  test('无任何 `/` 开头', () => {
    expect(correctPath('no-slash.com', 'index.html')).toBe(
      'no-slash.com/index.html'
    )
  })
})
