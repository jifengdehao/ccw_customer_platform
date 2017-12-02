/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-table点击行下拉
*/
<template>
  <Table :columns="columns" :data="data"></Table>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    props: {
      orderId: Number
    },
    data () {
      return {
        columns: [
          {
            title: '交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '收货人',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'submitTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.submitTime)
            }
          },
          {
            title: '订单状态',
            key: 'statusChinese',
            align: 'center'
          },
          {
            title: '商户ID',
            key: 'msShopId',
            align: 'center'
          },
          {
            title: '商品价格',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let realPayAmount = params.row.realPayAmount / 100
              return h('span', '¥' + realPayAmount)
            }
          }
        ],
        data: []
      }
    },
    created () {
      this.getExpandData()
    },
    methods: {
      getExpandData () {
        api.getSeedOrderData(this.orderId).then((res) => {
          if (res) {
            this.data = res
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
