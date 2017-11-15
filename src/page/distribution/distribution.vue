/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-分销管理侧栏菜单配置
*/
<template>
  <div id="distribution">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'distribution',
    data () {
      return {
        menu: [
//          {
//            name: 'distribution_people_data',
//            text: '分销用户数据',
//            icon: 'ios-analytics',
//            noDropdown: true
//          },
//          {
//            name: 'distribution_people_manage',
//            text: '分销用户管理',
//            icon: 'ios-people',
//            noDropdown: true
//          }
        ]
      }
    },
    created () {
      this.getDistributionMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/distribution/' + name)
      },
      getDistributionMenu () {
        let menuIcon = ['ios-analytics', 'ios-people']
        let resMenu = JSON.parse(sessionStorage.getItem('menu'))
        resMenu.forEach((item) => {
          if (item.url === 'distribution') {
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
