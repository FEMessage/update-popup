// This file will cheat as virtual js file

import 'vercel-toast/dist/vercel-toast.css'
import {createToast} from 'vercel-toast'
import {compareVersion} from './helpers/compareVersion'

main()

function main() {
  // 当前应用版本
  const currentVersion = '{{currentVersion}}'
  // 上次页面离开时间 ms
  let lastSeenMS = 0
  // 弹出框是否显示
  let popupFlag = false
  // 一秒 ms
  const OneSecondMS = 1000

  // 每小时检测新版本
  const {startInterval, stopInterval} = createInterval(
    fetchVersion,
    OneSecondMS * 60 * 60,
    {immediateCallback: true}
  )

  checker()

  document.addEventListener('visibilitychange', checker)

  function showRefreshPopup() {
    popupFlag = true

    stopInterval()

    // 延后 1 秒显示以使得没有那么唐突
    setTimeout(() => {
      createToast('{{popupMessage}}', {
        action: {
          text: '{{popupActionText}}',
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
      // 离开时记录时间
      lastSeenMS = Date.now()
      stopInterval()
    } else {
      const currentMS = Date.now()

      // 防止 10 秒内频繁切换次页面
      if (currentMS - lastSeenMS > OneSecondMS * 10) {
        startInterval()
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

// inspired by vueuse's `useIntervalFn`
function createInterval(
  cb: Function,
  interval: number = 1000,
  options: {immediateCallback?: boolean} = {}
) {
  let timer: number | null = null
  const {immediateCallback = true} = options

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function startInterval() {
    if (immediateCallback) {
      cb()
    }
    clean()
    timer = setInterval(cb, interval)
  }

  function stopInterval() {
    clean()
  }

  return {
    startInterval,
    stopInterval
  }
}
