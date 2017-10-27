/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：配送员评价订单详情
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
      {{result.mcCustomerId}}</Col>
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
      配送员ID：</Col>
      <Col span="22">
      {{result.psDeliverId}}</Col>
      <Col span="2">
      配送员姓名：</Col>
      <Col span="22">
      {{result.name}}</Col>
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
      this.getDeliverEvalDetail()
    },
    methods: {
      closeEval () {
        this.$router.back()
      },
      getDeliverEvalDetail () {
        api.getOrderDeliverEvalDetails(this.id).then((res) => {
          if (res) {
            console.log(res)
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
