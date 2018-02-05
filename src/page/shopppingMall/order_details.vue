/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：订单详情
*/
<template>
  <div class="order-details">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <h2 class="mb10">订单信息</h2>
    <Table :columns="columns1" :data="data1" :border="true"></Table>
    <h2 class="mtb10">支付信息</h2>
    <Table :columns="columns2" :data="data2" :border="true"></Table>
    <h2 class="mtb10">取消信息</h2>
    <Table :columns="columns3" :data="data3" :border="true"></Table>
    <h2 class="mtb10">交易信息</h2>
    <Table :columns="columns4" :data="data4" :border="true"></Table>
    <h2 class="mtb10">配送信息</h2>
    <Table :columns="columns5" :data="data5" :border="true"></Table>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    data() {
      return {
        orderId: (() => {  // 订单ID
          return this.$route.params.id
        })(),
        columns1: [
          {
            title: '订单编号',
            align: 'center',
            key: 'orderId'
          },
          {
            title: '用户ID',
            align: 'center',
            key: 'mcCustomerId'
          },
          {
            title: '订单状态',
            align: 'center',
            key: 'statusChinese'
          },
          {
            title: '配送方式',
            align: 'center',
            key: 'deliveryModeName'
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
            title: '收货人',
            align: 'center',
            key: 'receiver'
          },
          {
            title: '收货人手机',
            align: 'center',
            key: 'contactNumber'
          },
          {
            title: '收货地址',
            align: 'center',
            key: 'addressEnd'
          },
          {
            title: '备注信息',
            align: 'center',
            key: 'remark'
          }
        ],
        columns2: [
          {
            title: '订单金额',
            align: 'center',
            key: 'amount'
          },
          {
            title: '配送费',
            align: 'center',
            key: 'transCost',
            render: (h, params) => {
              let text = params.row.transCost / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '商品实付',
            align: 'center',
            key: 'exchangeCost'
          },
          {
            title: '支付时间',
            align: 'center',
            key: 'payTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '支付方式',
            align: 'center',
            key: 'payWay'
          }
        ],
        columns3: [
          {
            title: '取消时间',
            align: 'center',
            key: 'payTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '取消人',
            align: 'center',
            key: 'cancelPerson'
          },
          {
            title: '取消原因',
            align: 'center',
            key: 'cancelReason'
          },
          {
            title: '退款金额',
            align: 'center',
            key: 'refundAmount'
          },
          {
            title: '退款时间',
            align: 'center',
            key: 'payTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          }
        ],
        columns4: [
          {
            title: '流水号',
            align: 'center',
            key: 'flowId'
          },
          {
            title: '所属分类',
            align: 'center',
            key: 'categoryName'
          },
          {
            title: '商品名称',
            align: 'center',
            key: 'productName'
          },
          {
            title: '单价',
            align: 'center',
            key: 'unitPrice'
          },
          {
            title: '数量',
            align: 'center',
            key: 'number'
          },
          {
            title: '总计',
            align: 'center'
          }
        ],
        columns5: [
          {
            title: '运单编号',
            align: 'center',
            key: 'coExpressId'
          },
          {
            title: '配送方式',
            align: 'center',
            key: ''
          },
          {
            title: '配送状态',
            align: 'center',
            key: ''
          },
          {
            title: '接单时间',
            align: 'center',
            key: 'orderTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.orderTime)
            }
          },
          {
            title: '取货时间',
            align: 'center',
            key: 'startTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.startTime)
            }
          },
          {
            title: '送达时间',
            align: 'center',
            key: 'endTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.endTime)
            }
          },
          {
            title: '配送时效(分钟)',
            align: 'center',
            key: 'takeTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.takeTime)
            }
          },
          {
            title: '配送员工号',
            align: 'center',
            key: 'delieverNo'
          },
          {
            title: '配送员姓名',
            align: 'center',
            key: 'name'
          },
          {
            title: '所属市场',
            align: 'center',
            key: 'psMarketName'
          },
          {
            title: '异常原因',
            align: 'center',
            key: 'exceptionReason'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: []
      }
    },
    created() {
      this.getOrderDetails()
    },
    methods: {
      close() {
        this.$router.back()
      },
      getOrderDetails() {
        api.getIntegralMallOrderDetails(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            if (res.coOrder) {
              this.data1 = Array.of(res.coOrder)
            }
            if (res.paymentInfo) {
              this.data2 = Array.of(res.paymentInfo)
            }
            if (res.dealInfo) {
              this.data3 = Array.of(res.dealInfo)
            }
            if (res.deliverInfo) {
              this.data5 = Array.of(res.deliverInfo)
            }
            if (res.productInfo) {
              this.data4 = Array.of(res.productInfo)
            }
          }
        })
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" scoped>
  .order-details
    position relative
    border 1px solid #e9eaec
    padding 20px
    .close
      position absolute
      top 0
      right 0
      z-index 10
</style>
