/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块:用来实现事件从父组件向子组件传递
 * 参考资料：
 * http://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换
 */
import Vue from 'vue'

const eventHub = new Vue()

export {eventHub}
