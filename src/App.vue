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
