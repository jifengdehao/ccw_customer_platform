/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-主组件
*/
<template>
  <div id="app">
    <keep-alive>
      <router-view name="blank"></router-view>
    </keep-alive>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style type="text/stylus" lang="stylus">
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow hidden
    min-width 1500px
</style>
