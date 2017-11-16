/**
*
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-app侧栏菜单配置
*/
<template>
  <div id="App">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'app',
    data () {
      return {
        menu: [
//          {
//            name: 'index',
//            text: 'app更新管理',
//            icon: 'images',
//            noDropdown: true
//          }
        ]
      }
    },
    created () {
      this.getAppMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/app/' + name)
      },
      getAppMenu () {
        let menuIcon = ['images']
        let resMenu = JSON.parse(sessionStorage.getItem('menu'))
        resMenu.menusVO.forEach((item) => {
          if (item.url === 'app') {
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
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
