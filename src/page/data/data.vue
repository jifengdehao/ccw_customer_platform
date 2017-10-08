<template>
  <div id="data">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'data',
    data() {
      return {
        menu: [
          {
            name: 'index',
            text: '数据中心',
            icon: 'ios-analytics',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route(name) {
        this.$router.push('/data/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
