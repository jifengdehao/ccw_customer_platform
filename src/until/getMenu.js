/**
 * 2017/11/13
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取菜单
 */
import * as api from 'api/common'
// 获取一级菜单
export const getFirstMenu = () => {
  api.getMemuData().then((res) => {
    if (res) {
      let menu = []
      let menuIcon = ['ios-paper', 'ios-people', 'chatbox-working', 'chatbox', 'help-buoy', 'ios-analytics', 'settings', 'ios-people']
      menu = res.map((item, index) => {
        return {id: item.menusId, name: item.menuName, icon: menuIcon[index], url: item.url}
      })
      return menu
    }
  })
}

// 获取二级菜单
export const getSecondMenu = (name) => {
  return []
}
