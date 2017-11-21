/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-订单详情
*/
<template>
  <div class="orderInfo">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <Row class="mb20">
      <Col span="24">
      <h2 class="mb10">订单信息</h2>
      <Table :columns="columns1" :data="data1" :border="true"></Table>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <h2 class="mb10">配送信息</h2>
      <Table :columns="columns2" :data="data2" :border="true"></Table>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <h2 class="mb10">支付信息</h2>
      <Table :columns="columns3" :data="data3" :border="true"></Table>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <h2 class="vm-clearfix mb10">交易信息
        <Button type="primary" class="vm-fr" @click="refundAll" v-show="options==='edit'? true: false ">全部退款</Button>
      </h2>
      <Table :columns="columns4" :data="data4" :border="true"></Table>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        orderId: (() => {
          return this.$route.params.id
        })(),
        options: (() => {
          return this.$route.query.options
        })(),
        columns1: [
          {
            title: '订单编号',
            key: 'orderId',
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
            title: '收货人',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货电话',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '收货地址',
            key: 'address',
            align: 'center'
          },
          {
            title: '收货时间段',
            key: 'deliveryZone',
            align: 'center'
          },
          {
            title: '收货方式',
            key: 'deliveryMode',
            align: 'center'
          }
        ],
        columns2: [
          {
            title: '配送员ID',
            key: 'psDeliverId',
            align: 'center'
          },
          {
            title: '配送员姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '取货时间',
            key: 'startTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.startTime)
            }
          },
          {
            title: '送达时间',
            key: 'endTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.endTime)
            }
          }
        ],
        columns3: [
          {
            title: '订单金额',
            key: 'amount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.amount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '配送费',
            key: 'transCost',
            align: 'center',
            render: (h, params) => {
              let text = params.row.transCost / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '优惠金额',
            key: 'discount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.discount / 100
              return ('span', '¥' + text)
            }
          },
//          {
//            title: '优惠券',
//            key: 'coupon',
//            align: 'center'
//          },
          {
            title: '实际金额',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.realPayAmount / 100
              return ('span', '¥' + text)
            }
          }
        ],
        columns4: [
          {
            title: '商户名称',
            key: 'shopName',
            align: 'center'
          },
//          {
//            title: '交易号',
//            key: 'transactionNumber',
//            align: 'center'
//          },
          {
            title: '商品名称',
            key: 'productName',
            align: 'center'
          },
          {
            title: '数量',
            key: 'unit',
            align: 'center'
          },
          {
            title: '规格',
            key: 'productProperty',
            align: 'center'
          },
          {
            title: '属性',
            key: 'names',
            align: 'center'
          },
          {
            title: '单价',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              let text = params.row.price / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '小计',
            key: 'amount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.amount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let foodId = params.row.coOrderDetailId
              let isRefunded = params.row.isRefunded
              if (isRefunded === 0) {
                isRefunded = false
              } else if (isRefunded === 1) {
                isRefunded = true
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: isRefunded
                  },
                  on: {
                    click: () => {
                      let _this = this // 这里有个bug this指向重新来
                      this.$Modal.confirm({
                        content: '确定退还此商品金额？',
                        onOk () {
                          // api 操作
                          api.putRefundOrder(foodId).then((res) => {
                            console.log(res)
                            if (res) {
                              _this.getOrderDetails()
                            } else {
                              _this.$Notice.error({
                                title: '退款失败'
                              })
                            }
                          })
                        }
                      })
                    }
                  }
                }, '退款')
              ])
            }
          },
          {
            title: '退款金额',
            key: 'refundAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.refundAmount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '退款时间',
            key: 'payTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '退款方式',
            key: 'payWay',
            align: 'center'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        data4: []
      }
    },
    created () {
      console.log(this.options)
      this.getOrderDetails()
      this.hiddenOptions()
    },
    methods: {
      refundAll () {
        let that = this
        this.$Modal.confirm({
          content: '确定退还此订单金额？',
          onOk () {
            // api 操作
            api.putRefundOrderAll(that.orderId).then((res) => {
              console.log(res)
              if (res) {
                that.getOrderDetails()
              } else {
                that.$Notice.error({
                  title: '退款失败'
                })
              }
            })
          }
        })
      },
      close () {
        this.$router.back()
      },
      getOrderDetails () {
        api.getOrderInfo(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            this.data4 = res.dealInfoList
            this.data1 = Array.of(res.orderInfo)
            this.data2 = Array.of(res.deliverInfo)
            this.data3 = Array.of(res.paymentInfo)
          }
        })
      },
      hiddenOptions () {
        if (this.options === 'see') {
          this.columns4.splice(this.columns4.length - 4, 1)
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #order
    .orderInfo
      position relative
      border 1px solid #e9eaec
      padding 20px
      .close
        position absolute
        top 0
        right 0
        z-index 10
</style>
