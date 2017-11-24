/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-评价管理
*/
<template>
  <div class="order-evaluate">
    <i-form inline label-position="left">
      <FormItem label="手机号" :label-width="80">
        <Input type="text" v-model="phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs :animated="false" @on-click="selectTab" :value="this.status">
      <Tab-pane label="商户评价" name="0">
        <Table :columns="columns1" :data="data1" ref="table" :loading="loading1"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Tab-pane label="配送员评价" name="1">
        <Table :columns="columns2" :data="data2" ref="table" :loading="loading2"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Tab-pane label="差评订单" name="2">
        <Table :columns="columns3" :data="data3" ref="table" :loading="loading3"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
    </Tabs>
    <Modal v-model="exportModal" width="300">
      <div slot="header">导出表格</div>
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="startTime"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%"  v-model="endTime"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="exportData()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        curr: 1, // 当前分页
        pageNum: 10, // 当前页的显示的数据数量
        tableTotal: 0, // 总数
        status: '0', // 状态 0===>商户评价 1====>配送员评价  2====>差评订单
        loading1: true,
        loading2: true,
        loading3: true,
        exportModal: false, // 弹出导出表格
        startTime: '', // 导出表格开始时间
        endTime: '', // 导出表格结束时间
        modal_loading: false, // 导出表格加载
        phone: '', // 搜索手机号
        columns1: [
          {
            title: '用户ID',
            key: 'custId',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'remarkAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.remarkAt)
            }
          },
          {
            title: '档口ID',
            key: 'msShopId',
            align: 'center'
          },
          {
            title: '档口名称',
            key: 'shopName',
            align: 'center'
          },
          {
            title: '评价星级',
            key: 'starLevel',
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            width: 150,
            render: (h, params) => {
              let rkShopId = params.row.rkShopId
              let isDelete = params.row.isDelete
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
                      this.$router.push('/order/evaluateInfoSeller/' + rkShopId)
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
                      if (!isDelete) {
                        this.$Modal.confirm({
                          content: '确定隐藏这评价？',
                          onOk () {
                            // api 操作
                            api.putOrderSellerEval(rkShopId).then((res) => {
                              if (res) {
                                console.log(res)
                                params.row.isDelete = true
                              }
                            })
                          }
                        })
                      }
                    }
                  }
                }, isDelete === true ? '已隐藏' : '隐藏')
              ])
            }
          }
        ],
        data1: [],
        columns2: [
          {
            title: '用户ID',
            key: 'mcCustomerId',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'remarkAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.remarkAt)
            }
          },
          {
            title: '配送员ID',
            key: 'psDeliverId',
            align: 'center'
          },
          {
            title: '配送员名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '评价星级',
            key: 'starLevel',
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let isDetlete = params.row.isDelete
              let rkDeliverId = params.row.rkDeliverId
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
                      this.$router.push('/order/evaluateInfoDeliver/' + rkDeliverId)
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
                      if (!isDetlete) {
                        this.$Modal.confirm({
                          content: '确定隐藏这评价？',
                          onOk () {
                            // api 操作
                            api.putOrderDeliverEval(rkDeliverId).then((res) => {
                              if (res) {
                                console.log(res)
                                params.row.isDelete = true
                              }
                            })
                          }
                        })
                      }
                    }
                  }
                }, isDetlete === true ? '已隐藏' : '隐藏')
              ])
            }
          }
        ],
        data2: [],
        columns3: [
          {
            title: '用户ID',
            key: 'custId',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'remarkAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.remarkAt)
            }
          },
          {
            title: '档口ID',
            key: 'msShopId',
            align: 'center'
          },
          {
            title: '档口名称',
            key: 'shopName',
            align: 'center'
          },
          {
            title: '评价星级',
            key: 'starLevel',
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let rkShopId = params.row.rkShopId
              let isDelete = params.row.isDelete
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
                      this.$router.push('/order/evaluateInfoSeller/' + rkShopId)
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
                      if (!isDelete) {
                        this.$Modal.confirm({
                          content: '确定隐藏这评价？',
                          onOk () {
                            // api 操作
                            api.putOrderSellerEval(rkShopId).then((res) => {
                              if (res) {
                                console.log(res)
                                params.row.isDelete = true
                              }
                            })
                          }
                        })
                      }
                    }
                  }
                }, isDelete === true ? '已隐藏' : '隐藏')
              ])
            }
          }
        ],
        data3: []
      }
    },
    created () {
      this.getSellerEvalList()
    },
    methods: {
      // 搜索
      handleSubmit () {
        this.curr = 1
        if (this.status === '0') {
          this.getSellerEvalList()
        } else if (this.status === '1') {
          this.getDeliverEval()
        } else {
          this.getBadEval()
        }
      },
      // 分页
      changePage (index) {
        this.curr = index
        if (this.status === '0') {
          this.getSellerEvalList()
        } else if (this.status === '1') {
          this.getDeliverEval()
        } else {
          this.getBadEval()
        }
      },
      // 导出表格
      exportData () {
        this.modal_loading = true
        let params = {
          startTime: this.startTime,
          endTime: this.endTime,
          mobileno: this.phone,
          types: this.status
        }
        api.exportEval(params).then((res) => {
          if (res) {
            console.log(res)
            this.modal_loading = false
            window.open(res)
          }
        })
      },
      // 切换
      selectTab (name) {
        this.status = name
        this.phone = ''
        this.curr = 1
        if (this.status === '0') {
          this.getSellerEvalList()
        } else if (this.status === '1') {
          this.getDeliverEval()
        } else {
          this.getBadEval()
        }
      },
      // 获取商户评价数据
      getSellerEvalList () {
        let params = {
          pageSize: this.pageNum,
          mobileno: this.phone
        }
        api.getOrderSellerListEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.loading1 = false
            this.tableTotal = res.total
            this.data1 = res.records
          }
        })
      },
      // 获取配送员评价数据
      getDeliverEval () {
        let params = {
          pageSize: this.pageNum,
          mobileno: this.phone
        }
        api.getOrderDeliverListeEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.loading2 = false
            this.tableTotal = res.total
            this.data2 = res.records
          }
        })
      },
      // 获取差评数据
      getBadEval () {
        let params = {
          pageSize: this.pageNum,
          mobileno: this.phone
        }
        api.getOrderBadListEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.loading3 = false
            this.tableTotal = res.total
            this.data3 = res.records
          }
        })
      }
    }
  }
</script>
