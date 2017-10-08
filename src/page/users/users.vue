<template>
  <div id="users">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'users',
    data() {
      return {
        menu: [
          {
            name: 'users_manage',
            text: '平台用户管理',
            icon: 'ios-people',
            noDropdown: true
          },
          {
            name: 'users_jurisdiction',
            text: '权限管理',
            icon: 'settings',
            noDropdown: true
          },
          {
            name: 'users_log',
            text: '操作日志',
            icon: 'aperture',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route(name) {
        this.$router.push('/users/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
