/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-table点击行下拉
*/
<template>
  <!--<div>-->
  <!--<Row class="mb10">-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">交易号：</span>-->
  <!--<span class="expand-value">{{ row.transactionNumber }}</span>-->
  <!--</Col>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">收货人手机：</span>-->
  <!--<span class="expand-value">{{ row.consigneeTel }}</span>-->
  <!--</Col>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">收货人：</span>-->
  <!--<span class="expand-value">{{ row.consignee }}</span>-->
  <!--</Col>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">下单时间：</span>-->
  <!--<span class="expand-value">{{ row.orderTime }}</span>-->
  <!--</Col>-->
  <!--</Row>-->
  <!--<Row>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">订单状态：</span>-->
  <!--<span class="expand-value">{{ row.orderStatus }}</span>-->
  <!--</Col>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">商户ID：</span>-->
  <!--<span class="expand-value">{{ row.sellerId }}</span>-->
  <!--</Col>-->
  <!--<Col span="6">-->
  <!--<span class="expand-key">商品价格：</span>-->
  <!--<span class="expand-value">{{ row.goodPrice }}</span>-->
  <!--</Col>-->
  <!--</Row>-->
  <!--</div>-->
  <Table :columns="columns" :data="data"></Table>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    props: {
      orderId: Number
    },
    data () {
      return {
        columns: [
          {
            title: '交易号',
            key: 'coPickingId',
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
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              console.log(params)
              let status = params.row.status
              let statusName
              switch (status) {
                case 1:
                  statusName = '待付款'
                  break
                case 2:
                  statusName = '待接单'
                  break
                case 3:
                  statusName = '待发货'
                  break
                case 4:
                  statusName = '配送中'
                  break
                case 5:
                  statusName = '待评价'
                  break
                case 6:
                  statusName = '已完成'
                  break
                default:
                  statusName = '无'
              }
              return h('span', statusName)
            }
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
              let realPayAmount = params.row.realPayAmount
              return h('span', '¥' + realPayAmount)
            }
          }
        ],
        /*
        data: [
          {
            transactionNumber: 91291,
            consigneeTel: 1928919231,
            consignee: '张三',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待付款',
            sellerId: 9999,
            goodPrice: '¥123'
          },
          {
            transactionNumber: 91291,
            consigneeTel: 1928919231,
            consignee: '张三',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待付款',
            sellerId: 9999,
            goodPrice: '¥123'
          },
          {
            transactionNumber: 91291,
            consigneeTel: 1928919231,
            consignee: '张三',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待付款',
            sellerId: 9999,
            goodPrice: '¥123'
          }
        ]
        */
        data: []
      }
    },
    created () {
      this.getExpandData()
    },
    methods: {
      getExpandData () {
        api.getSeedOrderData(this.orderId).then((res) => {
          this.data = res
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
