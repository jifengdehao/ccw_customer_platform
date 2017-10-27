/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-评价详情
*/
<template>
  <div class="eval-details">
    <div class="close-eval" @click="closeEval">
      <Button type="text" icon="close"></Button>
    </div>
    <Row class="mb20">
      <Col span="24">
      用户信息</Col>
      <Col span="2">
      用户ID：</Col>
      <Col span="22">
      {{result.custId}}</Col>
      <Col span="2">
      收货人手机：</Col>
      <Col span="22">
      {{result.mobileno}}</Col>
      <Col span="2">
      收货人：</Col>
      <Col span="22">
      {{result.custName}}</Col>
    </Row>
    <Row>
      <Col span="24">
      评价信息</Col>
      <Col span="2">
      交易号：</Col>
      <Col span="22">
      {{result.coPickingId}}</Col>
      <Col span="2">
      档口ID：</Col>
      <Col span="22">
      {{result.msShopId}}</Col>
      <Col span="2">
      档口名称：</Col>
      <Col span="22">
      {{result.shopName}}</Col>
      <Col span="2">
      评价时间：</Col>
      <Col span="22">
      {{result.remarkAt}}</Col>
      <Col span="2">
      评价星级：</Col>
      <Col span="22">
      {{result.starLevel}}</Col>
      <Col span="2">
      评价内容：</Col>
      <Col span="22">
      {{result.content}}</Col>
      <Col span="2">
      是否隐藏</Col>
      <Col span="22">
      {{result.isDelete}}</Col>
    </Row>
    <Row :gutter="32" v-if="result.rkPicUrlList">
      <Col span="24" v-if="result.rkPicUrlList">
      评价图片：</Col>
      <Col span="8" v-for="(item,index) in result.rkPicUrlList" :key="index">
      <img :src="item" alt="">
      </Col>
    </Row>
    <Row>
      <Col span="2">
      商家回复：</Col>
      <Col span="22">
      {{result.replyContent}}</Col>
    </Row>
    <Row v-if="result.replyPicUrlList">
      <Col span="24">
      回复图片：</Col>
      <Col span="8" v-for="(item,index) in result.replyPicUrlList" :key="index">
      <img :src="item" alt="">
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        id: (() => {
          return this.$route.params.id
        })(),
        result: {}
      }
    },
    created () {
      console.log(this.id)
      this.getEvalDetailsData()
    },
    methods: {
      closeEval () {
        this.$router.back()
      },
      getEvalDetailsData () {
        api.getOrderSellerDetails(this.id).then((res) => {
          console.log(res)
          if (res) {
            this.result = res
            this.result.remarkAt = time.formatDateTime(this.result.remarkAt)
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #order
    .eval-details
      border 1px solid #e9eaec
      line-height 30px
      position relative
      padding 20px
    .close-eval
      position absolute
      top 0
      right 0
</style>
