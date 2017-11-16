/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-活动管理侧栏菜单配置
*/
<template>
  <div id="activity">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'activity',
    data () {
      return {
        menu: [
//          {
//            name: 'index_banner_manage',
//            text: '首页banner图管理',
//            icon: 'images',
//            noDropdown: true
//          },
//          {
//            name: 'coupon_management',
//            text: '优惠卷管理',
//            icon: 'briefcase',
//            noDropdown: true
//          }
        ]
      }
    },
    created () {
      this.getActiveMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/activity/' + name)
      },
      getActiveMenu () {
        let menuIcon = ['images', 'briefcase']
        let resMenu = JSON.parse(sessionStorage.getItem('menu'))
        resMenu.forEach((item) => {
          if (item.url === 'activity') {
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
