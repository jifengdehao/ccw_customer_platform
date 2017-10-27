/*
 * @Author:  huShangJun
 * @Date: 2017-10-27 19:27:16
 * DeveloperMailbox:   hsjcc@ccw163.com
 * FunctionPoint: 模板状态管理
 */
const state = {
  sections: []
}
const mutations = {
  sections(state, section) {
    state.sections = section
  }
}

export default {
  state,
  mutations
}
