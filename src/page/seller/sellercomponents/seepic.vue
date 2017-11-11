/*
 * @Author: huShangJun 
 * @Date: 2017-10-30 15:34:18 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看图片
 */
<template>
  <div class="tableImg vm-clearfix">
    <Row> 
      <h3>证件图片</h3>
      <div  v-for="(item, index) in picUrls.qualificationList" :key="index" class="vm-fl">
      <img  :src="item.url"  @click="seeimg(item.url)" class="imgs">
      <p>{{item.name}}</p>
    </div>
    </Row>   
   <Row v-if="picUrls.protocol"> 
      <h3>合同图片</h3>
      <div  v-for="(item, index) in picUrls.protocol" :key="index" class="vm-fl">
      <img  :src="item"  @click="seeimg(item)" class="imgs2">
    </div>
    </Row>   
    <Modal
        v-model="modal"
        title="查看大图"
        width="900"
        class="bigimgs vm-clearfix">
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
    seeimg1(url) {
      this.url = url
      this.modal = true
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.tableImg {
  margin: 0 auto;
}
.imgs {
  width: 240px;
  height: 150px;
  margin: 5px;
}
.imgs2 {
  width: 150px;
  height: 150px;
  margin: 5px;
}
.bigimg {
  width: 800px;
  height: 800px;
}
.bigimgs {
  z-index: 2000;
}
p {
  width: 240px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
</style>