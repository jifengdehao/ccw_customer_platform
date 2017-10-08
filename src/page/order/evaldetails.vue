<template>
  <div class="eval-details">
    <div class="close-eval" @click="closeEval">
      <Button type="text" icon="close"></Button>
    </div>
    <template v-for="item in evalDetails">
      <i-row>
        <i-col span="10" class="vm-textRight">{{item.title}}</i-col>
        <i-col span="12" offset="2">{{item.value}}</i-col>
      </i-row>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      eval: {
        type: Object
      }
    },
    data() {
      return {
        evalDetails: [
          {
            title: '订单编号',
            key: 'orderNumber',
            value: 11111
          },
          {
            title: '下单时间',
            key: 'orderTime',
            value: '2017/07/07 07:07'
          },
          {
            title: '商品名称',
            key: 'goodName',
            value: '白菜'
          },
          {
            title: '数量',
            key: 'goodNum',
            value: 1
          },
          {
            title: '规格',
            key: 'goodSpec',
            value: '500g'
          },
          {
            title: '属性',
            key: 'goodAttr',
            value: '不切'
          },
          {
            title: '订单金额',
            key: 'orderSum',
            value: 999
          },
          {
            title: '优惠金额',
            key: 'discountSum',
            value: 9
          },
          {
            title: '优惠券',
            key: 'coupon',
            value: '9元优惠卷'
          },
          {
            title: '实际金额',
            key: 'actualSum',
            value: 990
          },
          {
            title: '收货人',
            key: 'consignee',
            value: '张三'
          },
          {
            title: '收货电话',
            key: 'consigneeTel',
            value: 13265306476
          },
          {
            title: '收货地址',
            key: 'consigneeAdr',
            value: '广州番禺市桥桥南菜城科技'
          },
          {
            title: '收货时间段',
            key: 'consigneeTime',
            value: '07:30-08:30'
          },
          {
            title: '收货方式',
            key: 'consigneeMode',
            value: '自提'
          },
          {
            title: '配送员ID',
            key: 'delivery _clerk_id',
            value: 161616161
          },
          {
            title: '配送员名称',
            key: 'delivery _clerk_name',
            value: '张益达'
          },
          {
            title: '送达时间',
            key: 'serviceTime',
            value: '08:00'
          }
        ],
        showFlag: true
      }
    },
    created() {},
    computed: {},
    methods: {
      closeEval() {
        this.showFlag = !this.showFlag
        this.$emit('closeEval', this.showFlag)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #order
    .eval-details
      border 1px solid #e9eaec
      line-height 35px
      position relative
      padding 20px
      .close-eval
        position absolute
        top 0
        right 0
</style>
