/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 14:13:53 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 用户管理详情展开功能 
 */

<template>
  <div>
    <Table :columns="userBuyDetailTitle" :data="userBuyDetailData"></Table>
  </div>
</template>
<script>
export default {
  name: 'unFold',
  components: {
  },
  props: {
  },
  data() {
    return {
      userBuyDetailTitle: [  //  用户购买记录详情表头
        {
          title: '交易号',
          key: 'orderNum'
        },
        {
          title: '收货人手机',
          key: 'contactNumber'
        },
        {
          title: '收货人',
          key: 'recevier'
        },
        {
          title: '下单时间',
          key: 'submitAt'
        },
        {
          title: '订单状态',
          key: 'orderStatus'
        },
        {
          title: '商户ID',
          key: 'customerId'
        },
        {
          title: '商品价格',
          key: 'price'
        }
      ],
      userBuyDetailData: [ //  用户购买记录详情数据集合

      ]
    }
  },
  activited: {
  },
  update: {
  },
  beforeRouteUpdate: {
  },
  methods: {
  },
  filter: {
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style lang="css" scoped>

</style>