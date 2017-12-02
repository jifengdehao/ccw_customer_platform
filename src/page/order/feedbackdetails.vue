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
    <Row>
      <Col span="24">
      <dl class="mb10">
        <dd>用户ID：{{feedbackDetails.creatorId}}</dd>
        <dd>用户名：{{feedbackDetails.creatorName}}</dd>
        <dd>反馈内容：{{feedbackDetails.content}}</dd>
        <dd>反馈时间：{{feedbackDetails.createdDt | filterTime}}</dd>
        <dd>反馈图片：</dd>
        <dd>
          <template v-for="(item,index) in feedbackDetails.url">
            <img :src="item" style="width: 200px;height: 200px;margin-right: 10px;"/>
          </template>
        </dd>
      </dl>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        ptFeedbackId: (() => {
          return this.$route.params.id
        })(),
        feedbackDetails: {},
        feedbackTime: ''
      }
    },
    created () {
      this.getFeedbackDetails()
    },
    filters: {
      filterTime (value) {
        return time.formatDateTime(value)
      }
    },
    methods: {
      close () {
        this.$router.back()
      },
      getFeedbackDetails () {
        api.getFeedBackInfo(this.ptFeedbackId).then((res) => {
          this.feedbackDetails = res
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

