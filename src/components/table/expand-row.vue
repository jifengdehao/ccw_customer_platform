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
  export default {
    props: {
      row: Object
    },
    data () {
      return {
        columns: [
          {
            title: '交易号',
            key: 'transactionNumber',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'consigneeTel',
            align: 'center'
          },
          {
            title: '收货人',
            key: 'consignee',
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'orderTime',
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'orderStatus',
            align: 'center'
          },
          {
            title: '商户ID',
            key: 'sellerId',
            align: 'center'
          },
          {
            title: '商品价格',
            key: 'goodPrice',
            align: 'center'
          }
        ],
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
      }
    },
    created () {
      console.log(this.row)
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
