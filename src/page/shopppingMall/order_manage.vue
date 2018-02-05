/**
* 2018/1/30
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：积分商城 - 订单管理
*/
<template>
  <div>
    <Row>
      <Col span="4">
      <Select v-model="formValidate.status" style="width:200px;" @on-change="selectStatus">
        <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="20" class="vm-textRight">
      <Form ref="formValidate" :model="formValidate" inline :rules="ruleValidate">
        <FormItem prop="orderId">
          <Input v-model.tirm="formValidate.orderId" placeholder="订单编号"></Input>
        </FormItem>
        <FormItem prop="customerId">
          <Input v-model.tirm="formValidate.customerId" placeholder="用户ID"></Input>
        </FormItem>
        <FormItem prop="receiver">
          <Input v-model.tirm="formValidate.receiver" placeholder="收货人"></Input>
        </FormItem>
        <FormItem prop="mobileno">
          <Input v-model.tirm="formValidate.mobileno" placeholder="收货人手机"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page
      :total="tableTotal"
      :current="pageNo"
      :page-size="formValidate.pageSize"
      @on-change="changePage"
      show-total
      class="vm-fr mt20"
    ></Page>
    <Modal v-model="cancel_order"
           width="400">
      <h3 slot="header" class="vm-textCenter">确定取消此订单?</h3>
      <Input v-model="cancelOrderDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearOrderDec">取消</Button>
        <Button type="primary" size="large" @click.stop="cancelOrder">确定</Button>
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
        pageNo: 1,
        tableTotal: 0,
        loading: false,
        cancel_order: false, // 取消订单
        cancelOrderDec: '', // 取消订单备注
        formValidate: {
          status: 0, // 订单状态
          orderId: '', // 订单编号
          customerId: '', // 用户Id
          receiver: '',   // 收货人
          pageSize: 20, // 表格数量
          mobileno: ''  // 收货人手机
        },
        ruleValidate: {},
        orderTypeList: [
          {
            value: 0,
            label: '全部订单'
          },
          {
            value: 2,
            label: '已付款'
          },
          {
            value: 3,
            label: '已出库'
          },
          {
            value: 8,
            label: '出库完成'
          },
          {
            value: 4,
            label: '配送中'
          },
          {
            value: 6,
            label: '已完成'
          },
          {
            value: 7,
            label: '已取消'
          }
        ],
        columns: [
          {
            title: '订单编号',
            align: 'center',
            key: 'orderId'
          },
          {
            title: '用户ID',
            align: 'center',
            key: 'mcCustomerId'
          },
          {
            title: '订单状态',
            align: 'center',
            key: 'statusChinese'
          },
          {
            title: '配送方式',
            align: 'center',
            key: 'deliveryModeName'
          },
          {
            title: '下单时间',
            align: 'center',
            key: 'submitTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.submitTime)
            }
          },
          {
            title: '收货人',
            align: 'center',
            key: 'receiver'
          },
          {
            title: '收货人手机',
            align: 'center',
            key: 'contactNumber'
          },
          {
            title: '收货地址',
            align: 'center',
            key: 'addressEnd'
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            key: 'options',
            render: (h, params) => {
              let status = params.row.status
              let orderId = params.row.orderId
              console.log(status)
              if (status === 2) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '出库'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.cancel_order = true
                      }
                    }
                  }, '取消订单'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push('/shopppingMall/orderDetails/' + orderId)
                      }
                    }
                  }, '查看')
                ])
              }
              if (status === 3) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '出库完成'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '取消订单'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push('/shopppingMall/orderDetails/' + orderId)
                      }
                    }
                  }, '查看')
                ])
              }
              if (status === 8) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '取消订单'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push('/shopppingMall/orderDetails/' + orderId)
                      }
                    }
                  }, '查看')
                ])
              }
              if (status === 4) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '取消订单'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push('/shopppingMall/orderDetails/' + orderId)
                      }
                    }
                  }, '查看')
                ])
              }
              if (status === 6 || status === 7) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push('/shopppingMall/orderDetails/' + orderId)
                      }
                    }
                  }, '查看')
                ])
              }
            }
          }
        ],
        data: []
      }
    },
    created() {
      this.getOrderList()
    },
    methods: {
      selectStatus(value) {
        this.formValidate.status = value
        this.pageNo = 1
        this.getOrderList()
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.pageNo = 1
            this.getOrderList()
          }
        })
      },
      changePage(index) {
        this.pageNo = index
        this.getOrderList()
      },
      // 获取订单列表
      getOrderList() {
        this.loading = true
        api.getIntegralMallOrder(this.pageNo, this.formValidate).then((res) => {
          if (res) {
            console.log(res)
            this.loading = false
            this.tableTotal = res.total
            this.data = res.records
          }
        })
      },
      // 取消订单关闭弹窗
      clearOrderDec() {
        this.cancelOrderDec = ''
        this.cancel_order = false
      },
      // 确定取消订单
      cancelOrder() {
        let params = {
          type: 3,
          id: this.orderId
        }
        api.patchIntegralMallOrder(params).then((res) => {
          if (res) {
            this.clearOrderDec()
            this.getOrderList()
          }
        })
      }
    }
  }
</script>
