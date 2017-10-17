/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-反馈详情
*/
<template>
  <div class="feedback-details">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <i-row>
      <i-col span="3">
        <ul>
          <li>用户ID</li>
          <li>用户名</li>
          <li>反馈内容</li>
          <li>反馈时间</li>
          <li>反馈图片</li>
        </ul>
      </i-col>
      <i-col span="21">
        <ul>
          <li>10086</li>
          <li>张三</li>
          <li>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</li>
          <li>2017-10-07 13：54</li>
        </ul>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="8"><img src="../../common/img/logo.png" height="200" width="200"/></i-col>
      <i-col span="8"><img src="../../common/img/logo.png" height="200" width="200"/></i-col>
      <i-col span="8"><img src="../../common/img/logo.png" height="200" width="200"/></i-col>
    </i-row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    mounted() {
      this._getParams()
    },
    methods: {
      close() {
        this.$router.back()
      },
      _getParams() {
        console.log(this.$route.query)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #order
    .feedback-details
      line-height 35px
      border 1px solid #e9eaec
      position relative
      padding 20px
      .close
        position absolute
        top 0
        right 0
        z-index 10
</style>
