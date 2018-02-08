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
      <Tabs :animated="false" @on-click="selectTab">
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
          <Table :columns="columns1" :data="data" :loading="loading"></Table>
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
      <Tabs :animated="false" @on-click="selectTab">
        <Tab-pane label="全部评价" name="1">
          <Table :columns="columns2" :data="data" :loading="loading"></Table>
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
          <Table :columns="columns2" :data="data" :loading="loading"></Table>
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
          <Table :columns="columns3" :data="data" :loading="loading"></Table>
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
    <Modal v-model="hide_modal"
           width="400">
      <h3 slot="header">确定将此条评论隐藏？</h3>
      <Input v-model="hideDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearHide">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmHide">确定</Button>
      </div>
    </Modal>
    <Modal v-model="verify_modal" width="400">
      <h3 slot="header">核实差评</h3>
      <RadioGroup v-model="verify" vertical>
        <Radio label="2">
          <span>情况属实</span>
        </Radio>
        <Radio label="1">
          <span>恶意差评(原路退还罚金)</span>
        </Radio>
      </RadioGroup>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearVerify">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmVerify">确定</Button>
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
        verify: '2', // 默认情况属实
        verify_modal: false, // 核实弹窗
        hide_modal: false, // 隐藏弹窗
        hideDec: '',  // 隐藏备注
        evalId: '', // 评价Id
        isSeller: true, // 是否是商家
        psOrMsMobileno: '',   // 商户/配送手机号码
        mcMobileno: '', // 用户手机
        evaluateType: 1, // 评价类型  1商户评价 2骑士评价
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
        status: 1, // 状态
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
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mcMobileno',
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
            align: 'center',
            render: (h, params) => {
              let starLevel = params.row.starLevel
              switch (starLevel) {
                case 1:
                  return '1(很差)';
                case 2:
                  return '2(一般)';
                case 3:
                  return '3(满意)';
                case 4:
                  return '4(非常满意)';
                case 5:
                  return '5(无可挑剔)';
                default:
                  return '';
              }
            }
          },
          {
            title: '质量星级',
            align: 'center',
            key: 'qualityLevel',
            render: (h, params) => {
              let starLevel = params.row.qualityLevel
              switch (starLevel) {
                case 1:
                  return '1(很差)';
                case 2:
                  return '2(一般)';
                case 3:
                  return '3(满意)';
                case 4:
                  return '4(非常满意)';
                case 5:
                  return '5(无可挑剔)';
                default:
                  return '';
              }
            }
          },
          {
            title: '数量评价',
            align: 'center',
            key: 'numTabName'
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
            key: 'picUrlList',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picUrlList,
                    width: '30px',
                    height: '30px'
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
              let isDelete = params.row.isDelete
              let id = params.row.id
              let isMalicious = params.row.isMalicious
              if (isMalicious !== 0) {
                if (isMalicious === 4) {
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
                          this.verify_modal = true
                          this.evalId = id
                          this.isSeller = true
                        }
                      }
                    }, '核实'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          if (isDelete !== 0) {
                            let that = this
                            this.$Modal.confirm({
                              content: '确定解除此条评论隐藏？',
                              onOk: () => {
                                let params = {
                                  id: id
                                }
                                api.patchOrderSellerEval(params).then((res) => {
                                  if (res) {
                                    console.log(res)
                                    that.getOrderEvalList()
                                  }
                                })
                              }
                            })
                          } else {
                            this.evalId = id
                            this.hide_modal = true
                            this.isSeller = true
                          }
                        }
                      }
                    }, isDelete === 0 ? '隐藏' : '解除隐藏')
                  ])
                } else {
                  return h('div', [
                    h('span', {
                      style: {
                        marginRight: '5px'
                      }
                    }, params.row.isMaliciousName),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          if (isDelete !== 0) {
                            let that = this
                            this.$Modal.confirm({
                              content: '确定解除此条评论隐藏？',
                              onOk: () => {
                                let params = {
                                  id: id
                                }
                                api.patchOrderSellerEval(params).then((res) => {
                                  if (res) {
                                    console.log(res)
                                    that.getOrderEvalList()
                                  }
                                })
                              }
                            })
                          } else {
                            this.evalId = id
                            this.hide_modal = true
                            this.isSeller = true
                          }
                        }
                      }
                    }, isDelete === 0 ? '隐藏' : '解除隐藏')
                  ])
                }
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        if (isDelete !== 0) {
                          let that = this
                          this.$Modal.confirm({
                            content: '确定解除此条评论隐藏？',
                            onOk: () => {
                              let params = {
                                id: id
                              }
                              api.patchOrderSellerEval(params).then((res) => {
                                if (res) {
                                  console.log(res)
                                  that.getOrderEvalList()
                                }
                              })
                            }
                          })
                        } else {
                          this.evalId = id
                          this.hide_modal = true
                          this.isSeller = true
                        }
                      }
                    }
                  }, isDelete === 0 ? '隐藏' : '解除隐藏')
                ])
              }
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
            title: '用户昵称',
            key: 'custName',
            align: 'center'
          },
          {
            title: '用户手机号',
            key: 'mcMobileno',
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
            key: 'rkResul'
          },
          {
            title: '评价标签',
            align: 'center',
            key: 'tagName'
          },
          {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 150,
            render: (h, params) => {
              let isDelete = params.row.isDelete
              let id = params.row.id
              let isMalicious = params.row.isMalicious
              if (isMalicious !== 0) {
                if (isMalicious === 4) {
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
                          this.verify_modal = true
                          this.evalId = id
                          this.isSeller = false
                        }
                      }
                    }, '核实'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          if (isDelete !== 0) {
                            let that = this
                            this.$Modal.confirm({
                              content: '确定解除此条评论隐藏？',
                              onOk: () => {
                                let params = {
                                  id: id
                                }
                                api.patchOrderDeliverEval(params).then((res) => {
                                  if (res) {
                                    console.log(res)
                                    that.getOrderEvalList()
                                  }
                                })
                              }
                            })
                          } else {
                            this.evalId = id
                            this.hide_modal = true
                            this.isSeller = false
                          }
                        }
                      }
                    }, isDelete === 0 ? '隐藏' : '解除隐藏')
                  ])
                } else {
                  return h('div', [
                    h('span', {
                      style: {
                        marginRight: '5px'
                      }
                    }, params.row.isMaliciousName),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          if (isDelete !== 0) {
                            let that = this
                            this.$Modal.confirm({
                              content: '确定解除此条评论隐藏？',
                              onOk: () => {
                                let params = {
                                  id: id
                                }
                                api.patchOrderDeliverEval(params).then((res) => {
                                  if (res) {
                                    console.log(res)
                                    that.getOrderEvalList()
                                  }
                                })
                              }
                            })
                          } else {
                            this.evalId = id
                            this.hide_modal = true
                            this.isSeller = false
                          }
                        }
                      }
                    }, isDelete === 0 ? '隐藏' : '解除隐藏')
                  ])
                }
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        if (isDelete !== 0) {
                          let that = this
                          this.$Modal.confirm({
                            content: '确定解除此条评论隐藏？',
                            onOk: () => {
                              let params = {
                                id: id
                              }
                              api.patchOrderDeliverEval(params).then((res) => {
                                if (res) {
                                  console.log(res)
                                  that.getOrderEvalList()
                                }
                              })
                            }
                          })
                        } else {
                          this.evalId = id
                          this.hide_modal = true
                          this.isSeller = false
                        }
                      }
                    }
                  }, isDelete === 0 ? '隐藏' : '解除隐藏')
                ])
              }
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
            align: 'center',
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
      // 关闭核实弹窗
      clearVerify() {
        this.verify_modal = false
        this.evalId = ''
        this.verify = '2'
      },
      // 评价核实
      confirmVerify() {
        let params = {
          id: this.evalId,
          auditResult: this.verify
        }
        if (this.isSeller) {
          api.patchOrderSellerEvalVerify(params).then((res) => {
            if (res) {
              this.clearVerify()
              this.getOrderEvalList()
            }
          })
        } else {
          api.patchOrderDeliverEvalVerify(params).then((res) => {
            if (res) {
              this.clearVerify()
              this.getOrderEvalList()
            }
          })
        }
      },
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
            mcMobileno: this.mcMobileno,
            psOrMsMobileno: this.psOrMsMobileno,
            types: this.status,
            appraiseStatus: this.evaluateType
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
        this.status = parseInt(name)
        this.curr = 1
        this.getOrderEvalList()
      },
      // 关闭弹窗
      clearHide() {
        this.hide_modal = false
        this.hideDec = ''
        this.evalId = ''
      },
      // 确定隐藏
      confirmHide() {
        let params = {
          id: this.evalId,
          reason: this.hideDec
        }
        if (this.isSeller) {
          api.patchOrderSellerEval(params).then((res) => {
            if (res) {
              this.clearHide()
              this.getOrderEvalList()
            }
          })
        } else {
          api.patchOrderDeliverEval(params).then((res) => {
            if (res) {
              this.clearHide()
              this.getOrderEvalList()
            }
          })
        }
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
          }
        })
      }
    }
  }
</script>
