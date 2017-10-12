<template>
  <div class="eval-details">
    <div class="close-eval" @click="closeEval">
      <Button type="text" icon="close"></Button>
    </div>
   <!-- <template v-for="item in evalDetails">
      <i-row>
        <i-col span="10" class="vm-textRight">{{item.title}}</i-col>
        <i-col span="12" offset="2">{{item.value}}</i-col>
      </i-row>
    </template>-->
    <Row>
      <Col span="24">用户信息</Col>
    </Row>
    <Row>
      <Col span="2">用户ID：</Col>
      <Col span="22">10086</Col>
    </Row>
    <Row>
      <Col span="2">收货人手机：</Col>
      <Col span="22">10086</Col>
    </Row>
    <Row>
      <Col span="2">收货人：</Col>
      <Col span="22">小菜</Col>
    </Row>
    <Table :columns="columns" :data="data" class="mt20"></Table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      eval: {
        type: Object
      }
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
            title: '下单时间',
            key: 'orderTime',
            align: 'center'
          },
          {
            title: '评价星级',
            key: 'evalStar',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'evalTime',
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'evalContent',
            align: 'center'
          }
        ],
        data: [
          {
            transactionNumber: 21891,
            orderTime: '2017/07/07 07:07',
            evalStar: '4',
            evalTime: '2017/8/16  9:35',
            evalContent: '非常好吃，猴赛雷啊'
          },
          {
            transactionNumber: 21891,
            orderTime: '2017/07/07 07:07',
            evalStar: '4',
            evalTime: '2017/8/16  9:35',
            evalContent: '非常好吃，猴赛雷啊'
          },
          {
            transactionNumber: 21891,
            orderTime: '2017/07/07 07:07',
            evalStar: '4',
            evalTime: '2017/8/16  9:35',
            evalContent: '非常好吃，猴赛雷啊'
          },
          {
            transactionNumber: 21891,
            orderTime: '2017/07/07 07:07',
            evalStar: '4',
            evalTime: '2017/8/16  9:35',
            evalContent: '非常好吃，猴赛雷啊'
          },
          {
            transactionNumber: 21891,
            orderTime: '2017/07/07 07:07',
            evalStar: '4',
            evalTime: '2017/8/16  9:35',
            evalContent: '非常好吃，猴赛雷啊'
          }
        ]
      }
    },
    created () {
      console.log(this.$route.query)
    },
    computed: {},
    methods: {
      closeEval () {
        this.$router.back()
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
