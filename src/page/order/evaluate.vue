/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-评价管理
*/
<template>
  <div class="order-evaluate">
    <Form inline label-position="left">
      <FormItem>
        <Select v-model="evaluateType" style="width: 200px;" @on-change="selectStatus">
          <Option v-for="item in evaluateList" :value="item.value" :key="item.value">
            {{item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input type="text" v-model.tirm="mcMobileno" placeholder="用户手机" style="width: 200px"></Input>
      </FormItem>
      <FormItem>
        <Input type="text" v-model.trim="psOrMsMobileno" placeholder="商户/配送手机号码" style="width: 200px"></Input>
      </FormItem>
      <!--<FormItem>-->
      <!--<Input type="text" v-model="seek" placeholder="用户ID/用户昵称/用户手机/内容关键词" style="width: 300px"></Input>-->
      <!--</FormItem>-->
      <FormItem>
        <Button type="primary" @click="handleSubmit">搜索</Button>
      </FormItem>
    </Form>
    <div v-if="evaluateType === 1">
      <Tabs :animated="false" @on-click="selectTab" :value="this.status">
        <Tab-pane label="全部评价" name="1">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr mt20"
          ></Page>
        </Tab-pane>
        <Tab-pane label="差评评价" name="2">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr mt20"
          ></Page>
        </Tab-pane>
        <Tab-pane label="差评排行榜" name="3">
          <Table :columns="columns1" :data="data1" :loading="loading"></Table>
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
    </div>
    <div v-else>
      <Tabs :animated="false" @on-click="selectTab" :value="this.status">
        <Tab-pane label="全部评价" name="1">
          <Table :columns="columns2" :data="data2" :loading="loading"></Table>
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr mt20"
          ></Page>
        </Tab-pane>
        <Tab-pane label="差评评价" name="2">
          <Table :columns="columns2" :data="data2" :loading="loading"></Table>
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr mt20"
          ></Page>
        </Tab-pane>
        <Tab-pane label="差评排行榜" name="3">
          <Table :columns="columns3" :data="data3" :loading="loading"></Table>
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
    </div>
    <Modal v-model="exportModal" width="300">
      <div slot="header">导出表格</div>
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="startTime"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="endTime"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="exportData">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  import * as time from '@/until/time'
  import tableImg from '@/components/table/table-img'

  export default {
    name: 'evaluate',
    data() {
      return {
        psOrMsMobileno: '',   // 商户/配送手机号码
        mcMobileno: '', // 用户手机
        evaluateType: 1, // 评价类型
        evaluateList: [  // 评价列表
          {
            value: 1,
            label: '商户评价'
          },
          {
            value: 2,
            label: '骑士评价'
          }
        ],
        curr: 1, // 当前分页
        pageNum: 20, // 当前页的显示的数据数量
        tableTotal: 0, // 总数
        status: '1', // 状态
        loading: false, // 表格loading
        exportModal: false, // 弹出导出表格
        startTime: '', // 导出表格开始时间
        endTime: '', // 导出表格结束时间
        modal_loading: false, // 导出表格加载
        columns: [
          {
            title: '评价时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '订单号',
            align: 'center',
            key: 'coOrderId'
          },
          {
            title: '交易号',
            align: 'center',
            key: 'coSubOrderId'
          },
          {
            title: '流水号',
            align: 'center',
            key: 'subFlowId'
          },
          {
            title: '运单编号',
            align: 'center',
            key: 'coExpressId'
          },
          {
            title: '用户ID',
            key: 'mcCustomerId',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mcMobileno',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '商品清单',
            align: 'center',
            key: 'options',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/order/orderInfo/' + params.row.coOrderId)
                  }
                }
              }, '查看')
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
            title: '档口手机',
            align: 'center',
            key: 'msMobileno'
          },
          {
            title: '评价星级',
            key: 'starLevel',
            align: 'center'
          },
          {
            title: '质量星级',
            align: 'center',
            key: 'qualityLevel'
          },
          {
            title: '数量评价',
            align: 'center',
            key: 'numTab'
          },
          {
            title: '评价内容',
            key: 'content',
            align: 'center',
            render: (h, params) => {
              if (params.row.content && params.row.content.length > 10) {
                return params.row.content.substr(0, 10) + '...'
              } else {
                return params.row.content
              }
            }
          },
          {
            title: '评价图片',
            align: 'center',
            width: 120,
            key: 'picUrl',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picUrl,
                    width: '20px',
                    height: '20px'
                  }
                })
              ])
            }
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
                    marginRight: '5px',
                    width: '52px'
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
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => {
                      if (!isDelete) {
                        this.$Modal.confirm({
                          content: '确定隐藏这评价？',
                          onOk() {
                            // api 操作
                            api.putOrderSellerEval(rkShopId).then(res => {
                              if (res) {
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
        columns1: [
          {
            title: '档口ID',
            align: 'center',
            key: 'msShopId'
          },
          {
            title: '档口名称',
            align: 'center',
            key: 'shopName'
          },
          {
            title: '档口手机',
            align: 'center',
            key: 'msMobileno'
          },
          {
            title: '累计差评',
            align: 'center',
            key: 'badCount'
          },
          {
            title: '档口名次',
            align: 'center',
            key: 'ranking'
          }
        ],
        columns2: [
          {
            title: '评价时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '订单号',
            align: 'center',
            key: 'coOrderId'
          },
//          {
//            title: '交易号',
//            align: 'center',
//            key: 'coSubOrderId'
//          },
//          {
//            title: '流水号',
//            align: 'center',
//            key: 'subFlowId'
//          },
          {
            title: '运单编号',
            align: 'center',
            key: 'coExpressId'
          },
          {
            title: '用户ID',
            key: 'mcCustomerId',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mcMobileno',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '商品清单',
            align: 'center',
            key: 'options',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/order/orderInfo/' + params.row.coOrderId)
                  }
                }
              }, '查看')
            }
          },
          {
            title: '骑士ID',
            align: 'center',
            key: 'psDeliverId'
          },
          {
            title: '骑士姓名',
            align: 'center',
            key: 'name'
          },
          {
            title: '骑士手机',
            align: 'center',
            key: 'psMobileno'
          },
          {
            title: '所属菜市场',
            align: 'center',
            key: 'marketName'
          },
          {
            title: '送达时间',
            align: 'center',
            key: 'deliveryTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.deliveryTime)
            }
          },
          {
            title: '评价结果',
            align: 'center',
            key: ''
          },
          {
            title: '评价标签',
            align: 'center',
            key: ''
          },
          {
            title: '操作',
            align: 'center',
            key: 'options',
            render: (h, params) => {

            }
          }
        ],
        columns3: [
          {
            title: '骑士ID',
            align: 'center',
            key: 'psDeliverId'
          },
          {
            title: '骑士姓名',
            align: 'center',
            key: 'name'
          },
          {
            title: '骑士手机',
            align: 'center',
            key: 'psMobileno'
          },
          {
            title: '累计差评',
            align: '',
            key: 'badCount'
          },
          {
            title: '档口名次',
            align: 'center',
            key: 'ranking'
          }
        ],
        data: [],
        data1: [],
        data2: [],
        data3: []
      }
    },
    created() {
      this.getOrderEvalList()
    },
    methods: {
      // 选择下拉
      selectStatus() {
        this.curr = 1
        this.getOrderEvalList()
      },
      // 搜索
      handleSubmit() {
        this.curr = 1
        this.getOrderEvalList()
      },
      // 分页
      changePage(index) {
        this.curr = index
        this.getOrderEvalList()
      },
      // 导出表格
      exportData() {
        if (this.startTime !== '' && this.endTime !== '') {
          this.modal_loading = true
          let params = {
            startTime: this.startTime,
            endTime: this.endTime,
            mobileno: this.phone,
            types: this.status
          }
          api.exportEval(params).then(res => {
            if (res) {
              this.modal_loading = false
              window.open(res)
            }
          })
        }
      },
      // 切换
      selectTab(name) {
        this.status = name
        this.curr = 1
        this.getOrderEvalList()
      },
      // 获取订单评价列表
      getOrderEvalList() {
        let params = {
          pageSize: this.pageSize,
          appraiseStatus: this.evaluateType,
          type: this.status,
          mcMobileno: this.mcMobileno,
          psOrMsMobileno: this.psOrMsMobileno
        }
        this.loading = true
        api.getOrderEvalList(this.curr, params).then((res) => {
          if (res) {
            console.log(res)
            this.tableTotal = res.total
            this.loading = false
            this.data = res.records
            this.data1 = res.records
            this.data2 = res.records
            this.data3 = res.records
          }
        })
      }
    }
  }
</script>
