/**
 * 2017/11/28
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 判断是否是移动设备 127.0.0.1/ym ====>127.0.0.1/m/ym 跳转
 */
export function isMobile () {
  let ua = navigator.userAgent
  let UA = {
    Android: function () {
      return ua.match(/Android/i) ? true : false
    },
    BlackBerry: function () {
      return ua.match(/BlackBerry/i) ? true : false
    },
    IOS: function () {
      return ua.match(/iPhone|iPad|iPod/i) ? true : false
    },

    Windows: function () {
      return ua.match(/IEMobile/i) ? true : false
    },
    isMobile: function () {
      return UA.Android() || UA.BlackBerry() || UA.IOS() || UA.Windows()
    }
  }
  if (UA.isMobile()) {
    location.replace(location.href.replace(/\//, '/m/'))
  }
}
