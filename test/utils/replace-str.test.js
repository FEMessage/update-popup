/// <reference types="jest" />
// 等同于 `utils/pupa.js` 测试

const {replaceStr} = require('../../utils')

describe('替换字符串', () => {
  test('替换双花括号 {{xxx}}', () => {
    expect(
      replaceStr('# Hello {{name}}, {{state}}', {
        name: 'update-popup',
        state: 'working great!'
      })
    ).toBe(`# Hello update-popup, working great!`)
  })

  test('跳过替换单花括号 {xxx}', () => {
    expect(
      replaceStr('# Hello {name}, {state}', {
        name: 'gorgeours',
        state: `s'up?`
      })
    ).toBe('# Hello {name}, {state}')
  })

  test('单双花括号同时存在，只替换双花括号', () => {
    expect(
      replaceStr('# Hello {{name}}, {state}', {
        name: 'El Primo',
        state: 'smash them up!'
      })
    ).toBe('# Hello El Primo, {state}')
  })
})
