// 示例
import Vue from 'vue'
import Vuex from 'vuex'
import orderList from './modules/orderList'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList,
    user
  }
})
