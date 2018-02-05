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
      <h2 class="mb10">支付信息</h2>
      <Table :columns="columns3" :data="data3" :border="true"></Table>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <h2 class="vm-clearfix mb10">交易信息
        <Button type="primary"
                class="ml10"
                @click="refundModal=true"
                :disabled="fullRefund === 0 ? false : true">全部退款
        </Button>
      </h2>
      <Table :columns="columns4" :data="data4" :border="true"></Table>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <h2 class="mb10">配送信息</h2>
      <Table :columns="columns2" :data="data2" :border="true"></Table>
      </Col>
    </Row>
    <Modal v-model="refundModal"
           width="400">
      <h3 slot="header" class="vm-textCenter" v-if="foodId">确定退还此商品金额？</h3>
      <h3 slot="header" class="vm-textCenter" v-else>确定退还此订单金额？</h3>
      <Input v-model="refundDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearRefundDec">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmRefundDec">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    data() {
      return {
        orderId: (() => {  // 订单ID
          return this.$route.params.id
        })(),
        foodId: null, // 商品ID
        refundModal: false, // 退款弹窗
        refundDec: '',  // 退款备注
        fullRefund: 1, // 全部退款 0 是可以全部退款 1 不可以全部退款
        columns1: [
          {
            title: '订单编号',
            key: 'orderId',
            align: 'center'
          },
          {
            title: '用户ID',
            key: 'mcCustomerId',
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'statusChinese',
            align: 'center'
          },
          {
            title: '配送方式',
            key: 'deliveryModeName',
            align: 'center'
          },
          {
            title: '商品缺货时',
            key: 'onOutName',
            align: 'center'
          },
          {
            title: '期待送达时间',
            key: 'deliveryDate',
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
            key: 'addressEnd',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
          }
        ],
        columns2: [
          {
            title: '运单编号',
            key: 'coExpressId',
            align: 'center'
          },
          /*
          {
            title: '配送方式',
            key: '',
            align: 'center'
          },
          {
            title: '配送状态',
            key: '',
            align: 'center'
          },
          */
          {
            title: '接单时间',
            key: 'orderTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.startTime)
            }
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
          },
          {
            title: '配送时效(分钟)',
            key: 'deliveryTime',
            align: 'center'
          },
          {
            title: '配送员工号',
            key: 'psDeliverId',
            align: 'center'
          },
          {
            title: '配送员姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '所属市场',
            key: 'psMarketName',
            align: 'center'
          },
          {
            title: '异常原因',
            key: 'exceptionReason',
            align: 'center'
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
          {
            title: '优惠券',
            key: 'coupon',
            align: 'center'
          },
          {
            title: '实际支付金额',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.realPayAmount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '支付时间',
            key: 'payTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '支付方式',
            key: 'payWay',
            align: 'center'
          }
        ],
        columns4: [
          {
            title: '流水号',
            key: 'subFlowId',
            align: 'center'
          },
          {
            title: '交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '接单时间',
            key: 'orderTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.orderTime)
            }
          },
          {
            title: '备货完成(召唤骑手)时间',
            key: 'finishTheTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.finishTheTime)
            }
          },
          {
            title: '是否缺货',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return params.status === 0 ? '否' : '是'
            }
          },
          {
            title: '档口名称',
            key: 'shopName',
            align: 'center'
          },
          {
            title: '档口号',
            key: 'msShopId',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'productName',
            align: 'center'
          },
          {
            title: '单价',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              let text = params.row.price / 100
              return ('¥' + text)
            }
          },
          {
            title: '数量',
            key: 'unit',
            align: 'center'
          },
          {
            title: '小计',
            key: 'amount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.amount / 100
              return ('¥' + text)
            }
          },
          {
            title: '分摊优惠',
            key: 'discountsAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.discountsAmount / 100
              return ('¥' + text)
            }
          },
          {
            title: '实际结算',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.realPayAmount / 100
              return ('¥' + text)
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let foodId = params.row.coOrderDetailId
              let isRefunded = params.row.isRefunded
              if (isRefunded !== -1) {
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
                        console.log(foodId)
                        this.foodId = foodId
                        this.refundModal = true
                      }
                    }
                  }, isRefunded === false ? '退款' : params.row.statusName)
                ])
              }
            }
          },
          {
            title: '退款方式',
            key: 'refundedWay',
            align: 'center'
          },
          {
            title: '备注信息',
            key: 'subject',
            align: 'center'
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
            title: '退款金额',
            key: 'refundAmount',
            align: 'center',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('¥' + text)
              }
            }
          },
          {
            title: '退款渠道',
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
    created() {
      this.getOrderDetails()
    },
    methods: {
      // 确定退款
      confirmRefundDec() {
        // 商品退款
        if (this.foodId) {
          let params = {
            id: this.foodId,
            reason: this.refundDec
          }
          api.putRefundOrder(params).then((res) => {
            if (res) {
              console.log(res)
              this.clearRefundDec()
              this.getOrderDetails()
            }
          })
          // 订单退款
        } else {
          let params = {
            id: this.orderId,
            reason: this.refundDec
          }
          api.putRefundOrderAll(params).then((res) => {
            if (res) {
              console.log(res)
              this.clearRefundDec()
              this.getOrderDetails()
            }
          })
        }
      },
      // 关闭退款填写备注弹窗
      clearRefundDec() {
        this.refundModal = false
        this.foodId = ''
        this.refundDec = ''
      },
      // 关闭详情
      close() {
        this.$router.back()
      },
      // 获取订单详情
      getOrderDetails() {
        api.getOrderInfo(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            this.data4 = res.dealInfoList
            if (res.fullRefund !== null) {
              this.fullRefund = res.fullRefund
            }
            if (res.coOrder !== null) {
              this.data1 = Array.of(res.coOrder)
            }
            if (res.deliverInfo !== null) {
              this.data2 = Array.of(res.deliverInfo)
            }
            if (res.paymentInfo !== null) {
              this.data3 = Array.of(res.paymentInfo)
            }
          }
        })
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
