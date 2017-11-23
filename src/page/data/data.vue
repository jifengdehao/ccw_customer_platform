/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-数据中心侧栏菜单配置
*/
<template>
  <div id="data">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'data',
    data () {
      return {
        menu: [
//          {
//            name: 'index',
//            text: '数据中心',
//            icon: 'ios-analytics',
//            noDropdown: true
//          }
        ]
      }
    },
    created () {
      this.getDataMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/data/' + name)
      },
      getDataMenu () {
        if (sessionStorage.getItem('menu')) {
          let menuIcon = ['ios-analytics']
          let resMenu = JSON.parse(sessionStorage.getItem('menu'))
          resMenu.forEach((item) => {
            if (item.url === 'data') {
              if (item.childMenusList.length > 0) {
                this.menu = item.childMenusList.map((item, index) => {
                  return {id: item.menusId, name: item.menuName, icon: menuIcon[index], url: item.url, noDropdown: true}
                })
              }
            }
          })
        }
      }
    },
    components: {
      SideBar
    }
  }
</script>
