/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 系统入口
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'common/stylus/index.styl'
import VCharts from 'v-charts'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VCharts)

router.beforeEach((to, from, next) => {
  let path = to.path.substr(1)
  let user = window.sessionStorage.getItem('user')
  if (path !== 'login') {
    if (!user) {
      next('/login')
      return false
    }
  } else {
    if (user) {
      next('/')
      return false
    }
  }
  iView.LoadingBar.start()
  next()
})
/*
Vue.prototype.format = function (oDate, format) {
  var date = {
    'M+': oDate.getMonth() + 1,
    'd+': oDate.getDate(),
    'h+': oDate.getHours(),
    'm+': oDate.getMinutes(),
    's+': oDate.getSeconds(),
    'q+': Math.floor((oDate.getMonth() + 3) / 3),
    'S+': oDate.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}
*/
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
