<template>
  <div id="activity">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'activity',
    data() {
      return {
        menu: [
          {
            name: 'index_banner_manage',
            text: '首页banner图管理',
            icon: 'images',
            noDropdown: true
          },
          {
            name: 'coupon_management',
            text: '优惠卷管理',
            icon: 'briefcase',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route(name) {
        this.$router.push('/activity/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
