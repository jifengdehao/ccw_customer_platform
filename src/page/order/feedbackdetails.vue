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
          <li>{{feedbackDetails.creatorId}}</li>
          <li>{{feedbackDetails.creatorName}}</li>
          <li>{{feedbackDetails.content}}</li>
          <li>{{feedbackDetails.createdDt}}</li>
        </ul>
      </i-col>
    </i-row>
    <Row class="mt20" :gutter="16">
      <Col span="8">
      <img :src="feedbackDetails.picUrl1"/></Col>
      <Col span="8">
      <img :src="feedbackDetails.picUrl2"/></Col>
      <Col span="8">
      <img :src="feedbackDetails.picUrl3"/></Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    data () {
      return {
        ptFeedbackId: (() => {
          return this.$route.params.id
        })(),
        feedbackDetails: {}
      }
    },
    created () {
      console.log(this.ptFeedbackId)
      this._getFeedbackDetails()
    },
    methods: {
      close () {
        this.$router.back()
      },
      _getFeedbackDetails () {
        api.getFeedBackInfo(this.ptFeedbackId).then((data) => {
          console.log(data)
          this.feedbackDetails = data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
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
