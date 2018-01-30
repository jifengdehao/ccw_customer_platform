/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-订单管理侧栏菜单配置
*/
<template>
  <div id="order">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'order',
    data () {
      return {
        menu: [
          {
            name: 'manage',
            text: '订单管理',
            icon: 'ios-navigate',
            noDropdown: true
          },
          {
            name: 'abnormal',
            text: '异常订单管理',
            icon: 'ios-keypad',
            noDropdown: true
          },
          {
            name: 'evaluate',
            text: '评价管理',
            icon: 'ios-analytics',
            noDropdown: true
          },
          {
            name: 'feedback',
            text: '反馈管理',
            icon: 'ios-telephone',
            noDropdown: true
          },
          {
            name: 'sw',
            text: '屏蔽词管理',
            icon: 'ios-paperplane',
            noDropdown: true
          }
        ]
      }
    },
    created () {
      this.getOrderMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/order/' + name)
      },
      getOrderMenu () {
        if (sessionStorage.getItem('menu')) {
          let menuIcon = ['ios-navigate', 'ios-keypad', 'ios-analytics', 'ios-telephone', 'ios-paperplane']
          let resMenu = JSON.parse(sessionStorage.getItem('menu'))
          resMenu.forEach((item) => {
            if (item.url === 'order') {
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
