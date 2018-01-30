/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：表格里嵌套图片
*/
<template>
  <div class="table-img">
    <img class="preview-img" v-for="(item, index) in imgUrl" :src="item" :key="index" :width="width" :height="height"/>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      imgUrl: {
        type: Array,
        default: []
      },
      width: {
        type: String,
        default: '100px'
      },
      height: {
        type: String,
        default: '100px'
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .table-img
    font-size 0
    .preview-img
      display inline-block
      margin-right 2px
      &:last-child
        margin-right 0
</style>
