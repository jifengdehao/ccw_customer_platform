/*
 * @Author: huShangJun 
 * @Date: 2017-11-30 11:11:22 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 积分商城主页
 */
<template>
  <div id="shopppingMall">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script>
import SideBar from 'components/sidebar/sidebar'
export default {
  components: { SideBar },
  props: {},
  data() {
    return {
      menu: []
    }
  },
  created() {
    this.getFinanceMenu()
  },
  methods: {
    route(name) {
      this.$router.push('/shopppingMall/' + name)
    },
    getFinanceMenu() {
      if (sessionStorage.getItem('menu')) {
        let menuIcon = ['images']
        let resMenu = JSON.parse(sessionStorage.getItem('menu'))
        resMenu.forEach(item => {
          if (item.url === 'shopppingMall') {
            if (item.childMenusList.length > 0) {
              this.menu = item.childMenusList.map((item, index) => {
                return {
                  id: item.menusId,
                  name: item.menuName,
                  icon: menuIcon[index],
                  url: item.url,
                  noDropdown: true
                }
              })
            }
          }
        })
      }
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>

</style>