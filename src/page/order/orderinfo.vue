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
        <Button type="primary" class="vm-fr" @click="refundAll">全部退款</Button>
      </h2>
      <Table :columns="columns4" :data="data4" :border="true"></Table>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        columns1: [
          {
            title: '订单编号',
            key: 'orderNumber',
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'orderTime',
            align: 'center'
          },
          {
            title: '收货人',
            key: 'consignee',
            align: 'center'
          },
          {
            title: '收货电话',
            key: 'consigneeTel',
            align: 'center'
          },
          {
            title: '收货地址',
            key: 'consigneeAdr',
            align: 'center'
          },
          {
            title: '收货时间段',
            key: 'consigneeTime',
            align: 'center'
          },
          {
            title: '收货方式',
            key: 'consigneeStatus',
            align: 'center'
          }
        ],
        data1: [
          {
            orderNumber: 10086,
            orderTime: '2017/07/07 07:07:07',
            consignee: '张三',
            consigneeTel: '18812345678',
            consigneeAdr: 'XXXXX',
            consigneeTime: '7:30-8:30',
            consigneeStatus: '送货上门'
          }
        ],
        columns2: [
          {
            title: '配送员ID',
            key: 'deliveryId',
            align: 'center'
          },
          {
            title: '配送员姓名',
            key: 'deliveryName',
            align: 'center'
          },
          {
            title: '取货时间',
            key: 'startTime',
            align: 'center'
          },
          {
            title: '送达时间',
            key: 'endTime',
            align: 'center'
          }
        ],
        data2: [
          {
            deliveryId: 1212,
            deliveryName: '张三',
            startTime: '7:15',
            endTime: '8:00'
          }
        ],
        columns3: [
          {
            title: '订单金额',
            key: 'orderSum',
            align: 'center'
          },
          {
            title: '配送费',
            key: 'deliverySum',
            align: 'center'
          },
          {
            title: '优惠金额',
            key: 'discountSum',
            align: 'center'
          },
          {
            title: '优惠券',
            key: 'coupon',
            align: 'center'
          },
          {
            title: '实际金额',
            key: 'actualSum',
            align: 'center'
          },
          {
            title: '支付状态',
            key: 'payStatus',
            align: 'center'
          }
        ],
        data3: [
          {
            orderSum: '¥79.2',
            deliverySum: '¥10',
            discountSum: '¥30',
            coupon: '满50减30',
            actualSum: '¥59.2',
            payStatus: '未付款'
          }
        ],
        columns4: [
          {
            title: '商户ID',
            key: 'sellerId',
            align: 'center'
          },
          {
            title: '交易号',
            key: 'transactionNumber',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'goodName',
            align: 'center'
          },
          {
            title: '数量',
            key: 'goodNumber',
            align: 'center'
          },
          {
            title: '规格',
            key: 'spec',
            align: 'center'
          },
          {
            title: '属性',
            key: 'attr',
            align: 'center'
          },
          {
            title: '单价',
            key: 'unitPrice',
            align: 'center'
          },
          {
            title: '小计',
            key: 'total',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let orderNumber = params.row.transactionNumber
              let isRefund = params.row.isRefund
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: isRefund
                  },
                  on: {
                    click: () => {
                      console.log(orderNumber)
                      // 退款操作
                      this.$Modal.confirm({
                        render: (h) => {
                          return h('Input', {
                            props: {
                              value: this.value,
                              autofocus: true,
                              placeholder: '请输入金额'
                            },
                            on: {
                              input: (val) => {
                                this.value = val
                              }
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
            key: 'refundSum',
            align: 'center'
          },
          {
            title: '退款时间',
            key: 'refundTime',
            align: 'center'
          },
          {
            title: '退款方式',
            key: 'refundMethod',
            align: 'center'
          }
        ],
        data4: [
          {
            sellerId: 9329328,
            transactionNumber: 91938919138,
            goodName: '大白菜',
            goodNumber: 2,
            spec: '500g',
            attr: '不切',
            unitPrice: '¥9.9',
            total: '¥19.8',
            refundSum: '¥10',
            refundTime: '2017/07/08 07:07:07',
            refundMethod: '人工退款',
            isRefund: true
          },
          {
            sellerId: 9329328,
            transactionNumber: 91938919138,
            goodName: '大白菜',
            goodNumber: 2,
            spec: '500g',
            attr: '不切',
            unitPrice: '¥9.9',
            total: '¥19.8',
            refundSum: '¥9.8',
            refundTime: '2017/07/08 07:07:07',
            refundMethod: '自动退款',
            isRefund: true
          },
          {
            sellerId: 9329328,
            transactionNumber: 91938919138,
            goodName: '大白菜',
            goodNumber: 2,
            spec: '500g',
            attr: '不切',
            unitPrice: '¥9.9',
            total: '¥19.8',
            isRefund: false
          }
        ]
      }
    },
    computed: {
      orderId () {
        return this.$route.query.orderNumber
      }
    },
    created () {
      console.log(this.orderId)
    },
    methods: {
      refundAll () {
        this.$Modal.confirm({
          content: '确定退还此订单金额？',
          onOk () {
            // api 操作
          }
        })
      },
      close () {
        this.$router.back()
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
