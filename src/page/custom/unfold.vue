/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 14:13:53 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 用户管理详情展开功能 
 */

<template>
  <div>
    <!-- <Table :columns="userBuyDetailTitle" :data="userBuyDetailData"></Table> -->
    <table>
      <tr>
        <th>交易号</th>
        <th>收货人手机</th>
        <th>收货人</th>
        <th>下单时间</th>
        <th>订单状态</th>
        <th>商户ID</th>
        <th>商品价格</th>
      </tr>
      <tr v-for="(order, index) in orderData" :key="index">
        <!-- <td>{{row.coSubOrderId}}</td>
        <td>{{row.contactNumber}}</td>
        <td>{{row.receiver}}</td>
        <td>{{row.submitTime}}</td>
        <td>{{row.status}}</td>
        <td>{{row.msShopId}}</td>
        <td>{{row.realAmount}}</td> -->
        <td>{{order.coSubOrderId}}</td>
        <td>{{order.contactNumber}}</td>
        <td>{{order.receiver}}</td>
        <td>{{formatDateTime(order.submitTime)}}</td>
        <td>{{order.statusChinese}}</td>
        <td>{{order.msShopId}}</td>
        <td>{{order.realPayAmount/100}}</td>
      </tr>
      <tr v-if="orderData && orderData.length < 1">
        <td colspan="7">暂无数据</td>
      </tr>
    </table>
  </div>
</template>
<script>
import * as http from 'api/common'

export default {
  name: 'unFold',
  props: {
    row: Number
  },
  data() {
    return {
      // userBuyDetailTitle: [
      //   //  用户购买记录详情表头
      //   {
      //     title: '交易号',
      //     key: 'orderNum'
      //   },
      //   {
      //     title: '收货人手机',
      //     key: 'contactNumber'
      //   },
      //   {
      //     title: '收货人',
      //     key: 'recevier'
      //   },
      //   {
      //     title: '下单时间',
      //     key: 'submitAt'
      //   },
      //   {
      //     title: '订单状态',
      //     key: 'orderStatus'
      //   },
      //   {
      //     title: '商户ID',
      //     key: 'customerId'
      //   },
      //   {
      //     title: '商品价格',
      //     key: 'price'
      //   }
      // ],
      // userBuyDetailData: [
      //   //  用户购买记录详情数据集合
      // ]
      orderData: []
    }
  },
  created() {
    this.getOrderSeed()
  },
  methods: {
    getOrderSeed() {
      http.getOrderSeed(this.row).then(data => {
        this.orderData = data
      })
    },
    // 时间戳格式化 yyyy-MM-dd hh:mm:ss
    formatDateTime(inputTime) {
      if (inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? '0' + minute : minute
        second = second < 10 ? '0' + second : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
    }
  }
}
</script>
<style lang="css" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e9eaec;
}
table th,
table td {
  text-align: center;
}
</style>