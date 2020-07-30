import '@evillt/toast/dist/toast.css'
import {createToast} from '@evillt/toast'

main()

function main() {
  if (process.env.NODE_ENV !== 'production') return

  // 当前应用版本
  const currentVersion = '{{currentVersion}}'
  // 上次访问时间 ms
  let lastSeenMS = 0
  // 一秒 ms
  const OneSecondMS = 1000

  const {dispatch} = createInterval(fetchVersion)

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
        dispatch('startInterval', {interval: OneSecondMS * 60 * 60})
      }
    }
  }

  function fetchVersion() {
    fetch('{{VERSION_FILE_PATH}}' + '?_=' + Date.now())
      .then(res => res.text())
      .then(version => {
        if (compareVersion((version || '').trim(), currentVersion)) {
          if (popupFlag) return
          showRefreshPopup()
        }
      })
  }
}

/** @type {(newVersion: string, currentVersion: string) => boolean}*/
export function compareVersion(newVersion, currentVersion) {
  if (newVersion && currentVersion) {
    const n = newVersion.split('.')
    const c = currentVersion.split('.')

    for (let i = 0; i <= n.length; i++) {
      if (Number(n[i]) > Number(c[i])) return true
    }
  }

  return false
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

  return {interval, dispatch}
}
