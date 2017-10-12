<template>
  <div class="order-manage">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="订单编号" :label-width="80">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem prop="phone" label="订单编号" :label-width="80">
        <Input type="text" v-model="formInline.orderNumber" placeholder="请输入订单编号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs value="all_order" @on-click="selectTab" :animated="false">
      <Tab-pane label="全部订单" name="all_order">
        <i-table :columns="columns1" :data="data1" ref="all_order" stripe></i-table>
        <i-col span="24" class="mt20">
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr"
          ></Page>
        </i-col>
      </Tab-pane>
      <Tab-pane label="待付款" name="pending_pay">待付款的内容</Tab-pane>
      <Tab-pane label="待接单" name="waiting_list">待接单的内容</Tab-pane>
      <Tab-pane label="待发货" name="shipment_pending">待发货的内容</Tab-pane>
      <Tab-pane label="配送中" name="in_delivery">配送中的内容</Tab-pane>
      <Tab-pane label="待评价" name="pending_evaluation">待评价的内容</Tab-pane>
      <Tab-pane label="已完成" name="completed">已完成的内容</Tab-pane>
      <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
    </Tabs>
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="exportData()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import expandRow from 'components/table/expand-row'

  export default {
    data () {
      return {
        curr: 1,
        pageNum: 10,
        exportModal: false,
        modal_loading: false,
        formInline: {
          phone: '',
          orderNumber: ''
        },
        ruleInline: {
          phone: [
            // {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          orderNumber: []
        },
        columns1: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '订单编号',
            key: 'orderNumber',
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
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let orderNumber = params.row.orderNumber
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(orderNumber)
                      this.$router.push('/order/orderInfo?orderNumber=' + orderNumber)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(orderNumber)
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        data1: [
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待付款',
            transactionNumber: 912912291,
            sellerId: 372382382,
            goodPrice: '¥59.2'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '已完成'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待发货'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待接单'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '配送中'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          },
          {
            orderNumber: 10086,
            consigneeTel: 13317769149,
            consignee: '王小明',
            orderTime: '2017/8/16  9:35',
            orderStatus: '待评价'
          }
        ]
      }
    },
    computed: {
      tableTotal () {
        return this.data1.length
      }
    },
    methods: {
      // 搜索
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      // 选择tab
      selectTab (name) {
        console.log(name)
      },
      // 导出数据
      exportData () {
        this.modal_loading = true
        setTimeout(() => {
          this.$refs.all_order.exportCsv({
            filename: '全部订单'
          })
          this.modal_loading = false
        }, 2000)
      },
      // 分页
      changePage (index) {
        console.log(index)
      }
    },
    components: {
      expandRow
    }
  }
</script>
