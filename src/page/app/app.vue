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
          {
            name: 'index',
            text: 'app更新管理',
            icon: 'images',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route (name) {
        this.$router.push('/app/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
