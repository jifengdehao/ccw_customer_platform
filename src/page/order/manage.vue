/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-订单管理
*/
<template>
  <div class="order-manage">
    <i-form inline>
      <FormItem>
        <Input type="text" v-model.tirm="seek" placeholder="订单编号/用户ID/收货人手机" style="width: 200px"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs value="0" @on-click="selectTab" :animated="false">
      <Tab-pane label="全部订单" name="0">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="待付款" name="1">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="待接单" name="2">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="待发货" name="3">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="配送中" name="4">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="待评价" name="5">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="已完成" name="6">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Tab-pane label="已取消" name="7">
        <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToOrderDetails"></Table>
        <Col span="24" class="mt20">
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr"
        ></Page>
        </Col>
      </Tab-pane>
      <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
    </Tabs>
    <Modal v-model="exportModal" width="300">
      <div slot="header">导出表格</div>
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="startTime"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="endTime"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="exportData()">确定</Button>
      </div>
    </Modal>
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
    name: 'manage',
    data() {
      return {
        curr: 1, // 当前页
        pageNum: 20, // 当前页的显示的数据数量
        tableTotal: 0, // 当前页的数据总数
        status: 0, // 状态
        seek: '',   // 搜索
        loading: true,  // 表格加载
        exportModal: false, // 弹出导出表格
        startTime: '', // 导出表格开始时间
        endTime: '', // 导出表格结束时间
        modal_loading: false, // 导出表格加载
        cancel_order: false, // 弹出取消订单modal
        cancelOrderDec: '', // 取消订单备注
        cancelOrderId: '', // 取消订单ID
        columns: [
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
            title: '配送状态',
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
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '收货人地址',
            key: 'addressEnd',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let orderId = params.row.orderId
              let disabled
              if (params.row.isCancel === 0) {
                disabled = true
              } else {
                disabled = false
              }
              return h('Button', {
                props: {
                  type: 'error',
                  disabled: disabled
                },
                on: {
                  click: () => {
                    this.cancelOrderId = orderId
                    this.cancel_order = true
                  }
                }
              }, '取消订单')
            }
          }
        ],
        data: []
      }
    },
    created() {
      this.getOrderListData()
    },
    methods: {
      // 搜索
      handleSubmit() {
        this.curr = 1
        this.getOrderListData()
      },
      // 选择tab
      selectTab(name) {
        this.status = parseInt(name)
        this.curr = 1
        this.getOrderListData()
      },
      // 导出数据
      exportData() {
        if (this.startTime !== '' && this.endTime !== '') {
          this.modal_loading = true
          let params = {
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            seek: this.seek
          }
          api.exportOrderList(params).then((res) => {
            if (res) {
              console.log(res)
              this.modal_loading = false
              window.open(res)
            }
          })
        }
      },
      // 分页
      changePage(index) {
        this.curr = index
        this.getOrderListData()
      },
      // 取消订单
      cancelOrder() {
        if (this.cancelOrderDec) {
          let params = {
            orderId: this.cancelOrderId,
            reason: this.cancelOrderDec
          }
          api.cancelOrder(params).then((res) => {
            if (res) {
              console.log(res)
              this.clearOrderDec()
              this.getOrderListData()
            } else {
              this.$Notice.error({
                title: '取消订单失败！'
              })
            }
          })
        }
      },
      // 清除数据和关闭modal
      clearOrderDec() {
        this.cancelOrderDec = ''
        this.cancelOrderId = ''
        this.cancel_order = false
      },
      // 查看详情
      goToOrderDetails(params, index) {
        console.log(index)
        this.$router.push('/order/orderInfo/' + params.orderId)
      },
      // 获取订单列表
      getOrderListData() {
        let params = {
          pageSize: this.pageNum,
          status: this.status,
          seek: this.seek
        }
        this.loading = true
        api.getOrderList(params, this.curr).then((res) => {
          if (res) {
            console.log(res.records)
            this.loading = false
            this.tableTotal = res.total
            this.data = res.records
          }
        })
      }
    }
  }
</script>
