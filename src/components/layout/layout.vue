/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-布局组件
*/
<template>
  <div class="layout">
    <m-header></m-header>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import mHeader from 'components/header/header'
  export default {
    components: {
      mHeader
    }
  }
</script>
