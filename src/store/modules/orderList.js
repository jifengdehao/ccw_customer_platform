/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 示例
 */
import Vue from 'vue'
const state = {
  orderList: [],
  params: {}
}
const getters = {
  getOrderList (state) {
    return state.orderList
  }
}
const actions = {
  fetchOrdList ({commit, state}) {
    Vue.$http.post('api', state.params).then()
  }
}
const mutations = {
  changeOrderList (state, orderList) {
    state.orderList = orderList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
