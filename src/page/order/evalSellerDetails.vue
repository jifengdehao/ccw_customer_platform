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
    <Row>
      <Col span="24">
      <dl class="mb10">
        <dt>用户信息</dt>
        <dd>用户ID：{{result.custId}}</dd>
        <dd>收货人手机：{{result.mobileno}}</dd>
        <dd>收货人：{{result.custName}}</dd>
      </dl>
      <dl class="mb10">
        <dt>评价信息</dt>
        <dd>交易号：{{result.coPickingId}}</dd>
        <dd>档口ID：{{result.msShopId}}</dd>
        <dd>档口名称：{{result.shopName}}</dd>
        <dd>评价时间：{{result.remarkAt | filterTime}}</dd>
        <dd>评价星级：
          <Rate v-model="result.starLevel"></Rate>
        </dd>
        <dd>评价内容：{{result.content}}</dd>
        <dd>是否隐藏：{{result.isDelete | filterIsHidden}}</dd>
        <dd>评价图片：</dd>
        <dd>
          <template v-for="(item,index) in result.rkPicUrlList">
            <img :src="item" v-if="item" style="margin-right: 10px;width: 200px;height: 200px;"/>
          </template>
        </dd>
        <dd>商家回复：{{result.replyContent}}</dd>
        <dd>回复图片：</dd>
        <dd>
          <template v-for="(item,index) in result.replyPicUrlList">
            <img :src="item" v-if="item" style="margin-right: 10px;width: 200px;height: 200px;" />
          </template>
        </dd>
      </dl>
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
      this.getEvalDetailsData()
    },
    filters: {
      filterTime (value) {
        return time.formatDateTime(value)
      },
      filterIsHidden (value) {
        return value === true ? '是' : '否'
      }
    },
    methods: {
      closeEval () {
        this.$router.back()
      },
      getEvalDetailsData () {
        api.getOrderSellerDetails(this.id).then((res) => {
          if (res) {
            console.log(res)
            this.result = res
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
