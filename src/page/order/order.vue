<template>
  <div id="order">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'order',
    data() {
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
          }
        ]
      }
    },
    methods: {
      route(name) {
        this.$router.push('/order/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
