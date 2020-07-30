/// <reference types="jest" />

import {compareVersion} from '../../src/main'

const currentVersion = '1.1.0'

describe('测试版本号对比', () => {
  test('新版本 大于 旧版本', () => {
    expect(compareVersion('1.1.1', currentVersion)).toBe(true)
  })

  test('新版本 小于 旧版本', () => {
    expect(compareVersion('1.0.0', currentVersion)).toBe(false)
  })

  test('两版本相同', () => {
    expect(compareVersion(currentVersion, currentVersion)).toBe(false)
  })
})
