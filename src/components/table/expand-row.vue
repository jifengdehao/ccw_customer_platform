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
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.submitTime)
            }
          },
          {
            title: '订单状态',
            key: 'statusChinese',
            align: 'center'
//            ,
//            render: (h, params) => {
//              // console.log(params.row.status) // 1默认值正常，2、商家标记缺货、3商户取消订单、4差评平台退款、5、货损用户拒收退款(货损)、6、超时退款
//              let status = params.row.status
//              let statusName
//              switch (status) {
//                case 1:
//                  statusName = '正常'
//                  break
//                case 2:
//                  statusName = '商家标记缺货'
//                  break
//                case 3:
//                  statusName = '商户取消订单'
//                  break
//                case 4:
//                  statusName = '差评平台退款'
//                  break
//                case 5:
//                  statusName = '货损用户拒收退款(货损)'
//                  break
//                case 6:
//                  statusName = '超时退款'
//                  break
//                default:
//                  statusName = '正常'
//              }
//              return h('span', statusName)
//            }
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
