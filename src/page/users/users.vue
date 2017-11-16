/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-平台用户管理侧栏菜单配置
*/
<template>
  <div id="users">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'users',
    data () {
      return {
        menu: [
//          {
//            name: 'users_manage',
//            text: '平台用户管理',
//            icon: 'ios-people',
//            noDropdown: true
//          },
//          {
//            name: 'users_jurisdiction',
//            text: '权限管理',
//            icon: 'settings',
//            noDropdown: true
//          },
//          {
//            name: 'users_log',
//            text: '操作日志',
//            icon: 'aperture',
//            noDropdown: true
//          }
        ]
      }
    },
    created () {
      this.getUserMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/users/' + name)
      },
      getUserMenu () {
        let menuIcon = ['ios-analytics']
        let resMenu = JSON.parse(sessionStorage.getItem('menu'))
        resMenu.menusVO.forEach((item) => {
          if (item.url === 'users') {
            if (item.childMenusList.length > 0) {
              this.menu = item.childMenusList.map((item, index) => {
                return {id: item.menusId, name: item.menuName, icon: menuIcon[index], url: item.url, noDropdown: true}
              })
            }
          }
        })
      }
    },
    components: {
      SideBar
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
