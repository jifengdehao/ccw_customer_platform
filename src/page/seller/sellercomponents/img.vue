/*
 * @Author: huShangJun 
 * @Date: 2017-11-14 09:42:51 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 上传图片后台的展示和操作
 */
<template>
  <div>
     <!-- 图片显示 -->
    <div ref="list" v-for="(url , index) in urlList" :key="index" class="pic vm-fl">
      <img :src="url" alt="">
      <div class="cover">
        <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  created: {},
  mounted: {},
  activited: {},
  update: {},
  methods: {},
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>

</style>