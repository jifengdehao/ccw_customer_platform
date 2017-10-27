/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-订单管理
*/
<template>
  <div class="order-manage">
    <i-form inline label-position="left">
      <FormItem label="手机号" :label-width="80">
        <Input type="text" v-model="phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs value="0" @on-click="selectTab" :animated="false">
      <Tab-pane label="全部订单" name="0">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="待付款" name="1">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="待接单" name="2">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="待发货" name="3">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="配送中" name="4">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="待评价" name="5">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Tab-pane label="已完成" name="6">
        <i-table :columns="columns" :data="data" stripe :loading="loading"></i-table>
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
      <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
    </Tabs>
    <Modal v-model="exportModal" width="300">
      <div slot="header">导出表格</div>
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
  import * as api from 'api/common.js'

  export default {
    data () {
      return {
        curr: 1, // 当前页
        pageNum: 10, // 当前页的显示的数据数量
        tableTotal: 0, // 当前页的数据总数
        status: 0, // 状态
        modal_loading: false,
        phone: '',
        loading: true,
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              let orderId = params.row.orderId
              return h(expandRow, {
                props: {
                  orderId: orderId
                }
              })
            }
          },
          {
            title: '订单编号',
            key: 'orderId',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '收货人',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'submitTime',
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              let status = params.row.status
              let statusName
              switch (status) {
                case 1:
                  statusName = '待付款'
                  break
                case 2:
                  statusName = '待接单'
                  break
                case 3:
                  statusName = '待发货'
                  break
                case 4:
                  statusName = '配送中'
                  break
                case 5:
                  statusName = '待评价'
                  break
                case 6:
                  statusName = '已完成'
                  break
                default:
                  statusName = '无'
              }
              return h('span', statusName)
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let orderId = params.row.orderId
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
                      console.log(orderId)
                      this.$router.push('/order/orderInfo/' + orderId + '?options=see')
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(orderId)
                      this.$router.push('/order/orderInfo/' + orderId + '?options=edit')
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        data: [],
        exportModal: false
      }
    },
    computed: {},
    created () {
      this._getOrderData()
    },
    methods: {
      // 搜索
      handleSubmit () {
        this._getOrderData()
      },
      // 选择tab
      selectTab (name) {
        this.status = name
        this._getOrderData()
      },
      // 导出数据
      exportData () {
        let that = this
        this.$Modal.confirm({
          content: '尚未开发',
          onOk () {
            that.exportModal = false
          }
        })
      },
      // 分页
      changePage (index) {
        this.curr = index
        this._getOrderData()
      },
      _getOrderData () {
        let params = {
          pageSize: this.pageNum,
          status: this.status,
          mobileno: this.phone
        }
        api.getOrderList(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.loading = false
            this.tableTotal = res.total
            this.data = res.records
          }
        })
      }
    },
    components: {
      expandRow
    }
  }
</script>
