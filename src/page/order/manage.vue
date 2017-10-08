<template>
  <div class="order-manage">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem label="手机号" prop="phone" :label-width="80">
        <Input type="password" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs value="all_order" @on-click="selectTab">
      <Tab-pane label="全部订单" name="all_order">
        <i-table :columns="columns1" :data="data1" ref="all_order"></i-table>
        <i-col span="24" style="margin-top: 20px;">
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
      <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        curr: 1,
        pageNum: 10,
        formInline: {
          phone: ''
        },
        ruleInline: {
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ]
        },
        columns1: [
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
              let row = params.row
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(row)
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
                      console.log(row)
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
            orderStatus: '待付款'
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
          }
        ]
      }
    },
    computed: {
      tableTotal() {
        return this.data1.length
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      selectTab(name) {
        console.log(name)
      },
      exportData() {
        this.$refs.all_order.exportCsv({
          filename: '全部订单'
        })
      },
      changePage(index) {
        console.log(index)
      }
    }
  }
</script>
