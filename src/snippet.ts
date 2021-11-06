// @ts-nocheck
// This file will cheat as virtual js file

import 'vercel-toast/dist/vercel-toast.css'
import {
  createToast
} from 'vercel-toast'
import {
  compareVersion
} from './helpers/compareVersion'

main()

function main() {
  // 当前应用版本
  const currentVersion = '{{currentVersion}}'
  // 上次访问时间 ms
  let lastSeenMS = 0
  // 一秒 ms
  const OneSecondMS = 1000

  const {
    dispatch
  } = createInterval(fetchVersion)

  let popupFlag = false

  checker()

  document.addEventListener('visibilitychange', checker)

  function showRefreshPopup() {
    popupFlag = true

    dispatch('stopInterval')

    // 延后 1 秒显示以使得没有那么唐突
    setTimeout(() => {
      createToast('发现新版本可用', {
        action: {
          text: '刷新',
          callback: () => {
            window.location.reload()
          }
        }
      })
    }, OneSecondMS)
  }

  function checker() {
    if (popupFlag) return

    if (document.hidden) {
      // 离开时
      lastSeenMS = Date.now()
      dispatch('stopInterval')
    } else {
      const currentMS = Date.now()

      // 防止10秒之内频繁切换
      if (currentMS - lastSeenMS > OneSecondMS * 10) {
        dispatch('immediate')
        dispatch('startInterval', {
          interval: OneSecondMS * 60 * 60
        })
      }
    }
  }

  function fetchVersion() {
    fetch('{{versionFilePath}}?_=' + Date.now())
      .then(res => res.text())
      .then(version => {
        if (compareVersion((version || '').trim(), currentVersion)) {
          if (popupFlag) return
          showRefreshPopup()
        }
      })
  }
}

function createInterval(callback) {
  let interval

  const startInterval = data => {
    interval = setInterval(callback, data.interval)
  }
  const stopInterval = () => clearInterval(interval)

  const cmd = {
    immediate: callback,
    startInterval,
    stopInterval
  }

  const dispatch = (command, data = {}) => {
    const fn = cmd[command] || (() => {})
    fn(data)
  }

  return {
    interval,
    dispatch
  }
}
