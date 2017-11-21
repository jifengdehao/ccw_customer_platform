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
      <tr>
        <td>{{row.coSubOrderId}}</td>
        <td>{{row.contactNumber}}</td>
        <td>{{row.receiver}}</td>
        <td>{{row.submitTime}}</td>
        <td>{{row.status}}</td>
        <td>{{row.msShopId}}</td>
        <td>{{row.realAmount}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'unFold',
  props: {
    row: Object
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