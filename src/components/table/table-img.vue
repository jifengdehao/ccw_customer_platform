/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：表格里嵌套图片
*/
<template>
  <div class="table-img">
    <img class="preview-img" v-for="(item, index) in imgUrl" :src="item" :key="index" :width="width" :height="height"
         @click="openImg(item)"/>
    <Modal v-model="open_img" width="600">
      <img :src="imgSrc" style="max-width: 500px;max-height: 500px;"/>
    </Modal>
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
    },
    data() {
      return {
        imgSrc: '',
        open_img: false
      }
    },
    methods: {
      openImg(item) {
        this.imgSrc = item
        this.open_img = true
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .table-img
    font-size 0
    .preview-img
      display inline-block
      margin-right 5px
      margin-bottom 5px
      &:last-child
        margin-right 0
</style>
