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
    data() {
      return {
        menu: [
          {
            name: 'distribution_people_data',
            text: '分销用户数据',
            icon: 'ios-analytics',
            noDropdown: true
          },
          {
            name: 'distribution_people_manage',
            text: '分销用户管理',
            icon: 'ios-people',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route(name) {
        this.$router.push('/distribution/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
