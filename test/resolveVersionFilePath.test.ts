import {
  resolveVersionFilePath
} from '../src/utils/resolveVersionFilePath'

describe('测试路径拼接', () => {
  test('`/` 开头', () => {
    expect(resolveVersionFilePath('/single-slash.com', 'assets')).toBe(
      '/single-slash.com/assets'
    )
  })

  test('应保留 `//` 开头', () => {
    expect(resolveVersionFilePath('//double-slash.com', 'main.js')).toBe(
      '//double-slash.com/main.js'
    )
  })

  test('无任何 `/` 开头', () => {
    expect(resolveVersionFilePath('no-slash.com', 'index.html')).toBe(
      'no-slash.com/index.html'
    )
  })

  test('http 开头', () => {
    expect(resolveVersionFilePath('http://no-slash.com', 'index.html')).toBe(
      'http://no-slash.com/index.html'
    )
  })

  test('https 开头', () => {
    expect(resolveVersionFilePath('https://no-slash.com', 'index.html')).toBe(
      'https://no-slash.com/index.html'
    )
  })

  test('// 开头', () => {
    expect(resolveVersionFilePath('//no-slash.com', 'index.html')).toBe(
      '//no-slash.com/index.html'
    )
  })
})
