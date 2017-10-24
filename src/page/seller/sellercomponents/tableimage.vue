/*
 * @Author: huShangJun 
 * @Date: 2017-10-20 17:29:15 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 功能开发点 
 */
<template>
  <div class="tableImg vm-clearfix">
    <img class="preview-img imgs" v-for="(item, index) in picUrls" :src="item"  @click="bigpic(item)">
    <Modal
        v-model="modal"
        title="查看大图"
        width="900"
        class="bigimgs">
        <img class="bigimg" :src="url" alt="">
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'tableImg',
  components: {},
  props: ['picUrls'],
  data() {
    return {
      modal: false,
      url: ''
    }
  },
  mounted() {},
  activited: {},
  update: {},
  methods: {
    bigpic(item) {
      this.url = item
      this.modal = true
      console.log(this.url)
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
/* .tableImg{
  height: 100px;
} */
.imgs {
  width: 100px;
  height: 100px;
  margin: 2px;
  float: left;
}
.bigimg {
  width: 800px;
  height: 800px;
}
.bigimgs{
  z-index: 1008;
}
</style>