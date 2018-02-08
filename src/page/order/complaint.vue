/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：投诉管理
*/
<template>
  <div class="order-complaint">
    <Row>
      <Col span="24">
      发起端口
      <Select style="width:200px;margin-left: 10px;margin-right: 10px;" @on-change="selectPort" v-model="launchType">
        <Option v-for="item in portList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      投诉时间
      <DatePicker type="daterange" placeholder="请选择投诉时间" style="width: 200px;margin-left: 10px;margin-right: 10px;"
                  @on-change="selectDate"></DatePicker>
      <Input placeholder="投诉人手机" v-model="complainant" style="width: 200px;margin-right: 10px;"></Input>
      <Select style="width:200px;margin-right: 10px;" v-model="types">
        <Option v-for="item in portList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input placeholder="被投诉人手机" v-model="defendant" style="width: 200px;margin-right: 10px;"></Input>
      <Button type="primary" @click="handlerSubmit">搜索</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col span="24">
      <Tabs :animated="false" @on-click="selectTab">
        <Tab-pane label="待审核" name="1">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已审核" name="2">
          <Table :columns="columns1" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已驳回" name="3">
          <Table :columns="columns2" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已处理" name="4">
          <Table :columns="columns3" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
      </Tabs>
      </Col>
    </Row>
    <Modal v-model="reject_modal"
           width="400">
      <h3 slot="header" class="vm-textCenter">确定驳回此投诉？</h3>
      <Input v-model="rejectDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearReject">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmReject">确定</Button>
      </div>
    </Modal>
    <Modal v-model="punish_modal"
           width="400">
      <h3 slot="header">冻结周期
        <Select style="width:260px;margin-left: 10px;margin-right: 10px;" v-model="punishTime">
          <Option v-for="item in punishList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </h3>
      <Input v-model="punishDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearPunish">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmPunish">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '@/api/common.js'
  import * as time from '@/until/time'
  import tableImg from '@/components/table/table-img'

  export default {
    data() {
      return {
        portList: [
          {
            value: 3,
            label: '用户端'
          },
          {
            value: 2,
            label: '配送端'
          },
          {
            value: 1,
            label: '商家段'
          }
        ],
        punishList: [
          {
            value: 3,
            label: '3天'
          },
          {
            value: 7,
            label: '7天'
          },
          {
            value: -1,
            label: '永久'
          }
        ],
        types: null, // 被投诉端类型 商户端1 配送端2 用户端3
        launchType: 3, // 发起端类型 商户端1 配送端2 用户端3
        loading: false,
        reject_modal: false, // 驳回弹窗
        rejectDec: '', // 驳回备注
        rejectId: '', // 驳回Id
        punishId: '',  // 处罚Id
        punish_modal: false, // 处罚弹窗
        punishDec: '', // 处罚备注
        punishTime: 3, // 冻结周期
        columns: [
          {
            title: '投诉时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '投诉编号',
            key: 'ptComplaintId',
            align: 'center'
          },
          {
            title: '投诉人身份',
            key: 'complainantType',
            align: 'center'
          },
          {
            title: '投诉人ID',
            key: 'complainant',
            align: 'center'
          },
          {
            title: '投诉人姓名',
            key: 'complainantName',
            align: 'center'
          },
          {
            title: '投诉人手机',
            key: 'complainantMobileno',
            align: 'center'
          },
          {
            title: '被投诉人身份',
            key: 'typesName',
            align: 'center'
          },
          {
            title: '被投诉人ID',
            key: 'defendant',
            align: 'center'
          },
          {
            title: '被投诉人姓名',
            key: 'defendantName',
            align: 'center'
          },
          {
            title: '被投诉人手机',
            key: 'defendantMobileno',
            align: 'center'
          },
          {
            title: '投诉原因',
            key: 'reason',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: 'picList',
            align: 'center',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picList,
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
            render: (h, params) => {
              let parm = {
                ptComplaintId: params.row.ptComplaintId,
                operationType: 1
              }
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
                      let that = this
                      this.$Modal.confirm({
                        content: '确定通过此投诉？',
                        onOk: () => {
                          api.patchComplaintOptions(parm).then((res) => {
                            if (res) {
                              console.log(res)
                              that.getComplaintList()
                            }
                          })
                        }
                      })
                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.reject_modal = true
                      this.rejectId = params.row.ptComplaintId
                    }
                  }
                }, '驳回')
              ])
            }
          }
        ], // 待审核
        columns1: [
          {
            title: '投诉时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '投诉编号',
            key: 'ptComplaintId',
            align: 'center'
          },
          {
            title: '投诉人身份',
            key: 'complainantType',
            align: 'center'
          },
          {
            title: '投诉人ID',
            key: 'complainant',
            align: 'center'
          },
          {
            title: '投诉人姓名',
            key: 'complainantName',
            align: 'center'
          },
          {
            title: '投诉人手机',
            key: 'complainantMobileno',
            align: 'center'
          },
          {
            title: '被投诉人身份',
            key: 'typesName',
            align: 'center'
          },
          {
            title: '被投诉人ID',
            key: 'defendant',
            align: 'center'
          },
          {
            title: '被投诉人姓名',
            key: 'defendantName',
            align: 'center'
          },
          {
            title: '被投诉人手机',
            key: 'defendantMobileno',
            align: 'center'
          },
          {
            title: '投诉原因',
            key: 'reason',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: 'picList',
            align: 'center',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picList,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '审核人',
            align: 'center',
            key: 'auditor'
          },
          {
            title: '审核时间',
            align: 'center',
            key: 'auditedAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.auditedAt)
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let punishId = params.row.ptComplaintId
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let that = this
                      this.$Modal.confirm({
                        title: '确定实施处罚？',
                        content: '将根据投诉举报处罚规则处罚相关人员',
                        onOk: () => {
                          that.punishId = punishId
                          that.punish_modal = true
                        }
                      })
                    }
                  }
                }, '处罚')
              ])
            }
          }
        ], // 已审核
        columns2: [
          {
            title: '投诉时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '投诉编号',
            key: 'ptComplaintId',
            align: 'center'
          },
          {
            title: '投诉人身份',
            key: 'complainantType',
            align: 'center'
          },
          {
            title: '投诉人ID',
            key: 'complainant',
            align: 'center'
          },
          {
            title: '投诉人姓名',
            key: 'complainantName',
            align: 'center'
          },
          {
            title: '投诉人手机',
            key: 'complainantMobileno',
            align: 'center'
          },
          {
            title: '被投诉人身份',
            key: 'typesName',
            align: 'center'
          },
          {
            title: '被投诉人ID',
            key: 'defendant',
            align: 'center'
          },
          {
            title: '被投诉人姓名',
            key: 'defendantName',
            align: 'center'
          },
          {
            title: '被投诉人手机',
            key: 'defendantMobileno',
            align: 'center'
          },
          {
            title: '投诉原因',
            key: 'reason',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: 'picList',
            align: 'center',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picList,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '审核人',
            align: 'center',
            key: 'auditor'
          },
          {
            title: '审核时间',
            align: 'center',
            key: 'auditedAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.auditedAt)
            }
          },
          {
            title: '审核备注信息',
            align: 'center',
            key: 'failReason'
          }
        ], // 已驳回
        columns3: [
          {
            title: '投诉时间',
            key: 'createdAt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdAt)
            }
          },
          {
            title: '投诉编号',
            key: 'ptComplaintId',
            align: 'center'
          },
          {
            title: '投诉人身份',
            key: 'complainantType',
            align: 'center'
          },
          {
            title: '投诉人ID',
            key: 'complainant',
            align: 'center'
          },
          {
            title: '投诉人姓名',
            key: 'complainantName',
            align: 'center'
          },
          {
            title: '投诉人手机',
            key: 'complainantMobileno',
            align: 'center'
          },
          {
            title: '被投诉人身份',
            key: 'typesName',
            align: 'center'
          },
          {
            title: '被投诉人ID',
            key: 'defendant',
            align: 'center'
          },
          {
            title: '被投诉人姓名',
            key: 'defendantName',
            align: 'center'
          },
          {
            title: '被投诉人手机',
            key: 'defendantMobileno',
            align: 'center'
          },
          {
            title: '投诉原因',
            key: 'reason',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: 'picList',
            align: 'center',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.picList,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '审核人',
            align: 'center',
            key: 'auditor'
          },
          {
            title: '审核时间',
            align: 'center',
            key: 'auditedAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.auditedAt)
            }
          },
          {
            title: '操作人',
            align: 'center',
            key: 'handler'
          },
          {
            title: '操作时间',
            align: 'center',
            key: 'handledAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.handledAt)
            }
          },
          {
            title: '处罚力度',
            align: 'center',
            key: 'fines'
          },
          {
            title: '关联处罚人身份',
            align: 'center',
            key: 'relateTypeString'
          },
          {
            title: '关联处罚人ID',
            align: 'center',
            key: 'relatePersonId'
          },
          {
            title: '关联处罚人姓名',
            align: 'center',
            key: 'relatePersonName'
          },
          {
            title: '关联处罚人电话',
            align: 'center',
            key: 'relatePersonMobileno'
          },
          {
            title: '关联处罚人处罚力度',
            align: 'center',
            key: 'relateFines'
          }
        ],  // 已处理
        data: [],
        curr: 1, // 当前页
        pageNum: 20, // 当前页展示的数据量
        tableTotal: 0, // 数据总数
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        complainant: '',  // 投诉人手机
        defendant: '', // 被投诉人手机
        auditStatus: 1 // 审核状态   => 待审核1 已审核2 已驳回3 已处理4
      }
    },
    created() {
      this.getComplaintList()
    },
    methods: {
      // 搜索
      handlerSubmit() {
        this.curr = 1
        this.getComplaintList()
      },
      selectDate(value) {
        console.log(value)
        this.startTime = value[0]
        this.endTime = value[1]
      },
      selectPort() {
        this.getComplaintList()
      },
      selectTab(name) {
        this.auditStatus = parseInt(name)
        this.curr = 1
        this.getComplaintList()
      },
      changePage(index) {
        this.curr = index
      },
      // 确认处罚
      confirmPunish() {
        let params = {
          ptComplaintId: this.punishId,
          reason: this.punishDec,
          operationType: 3,
          frozenDays: this.punishTime
        }
        api.patchComplaintOptions(params).then((res) => {
          if (res) {
            console.log(res)
            this.getComplaintList()
            this.clearPunish()
          }
        })
      },
      // 关闭处罚弹窗
      clearPunish() {
        this.punish_modal = false
        this.punishDec = ''
        this.punishTime = ''
      },
      // 关闭驳回弹窗
      clearReject() {
        this.reject_modal = false
        this.rejectDec = ''
        this.rejectId = ''
      },
      // 驳回
      confirmReject() {
        let params = {
          operationType: 2,
          ptComplaintId: this.rejectId,
          reason: this.rejectDec
        }
        api.patchComplaintOptions(params).then((res) => {
          if (res) {
            console.log(res)
            this.getComplaintList()
            this.clearReject()
          }
        })
      },
      // 获取投诉列表
      getComplaintList() {
        let params = {
          pageSize: this.pageNum,
          startTime: this.startTime,
          endTime: this.endTime,
          types: this.types,
          auditStatus: this.auditStatus,
          defendant: this.defendant,
          complainant: this.complainant,
          launchType: this.launchType
        }
        this.loading = true
        api.getComplaintList(this.curr, params).then((res) => {
          if (res) {
            console.log(res)
            this.data = res.records
            this.loading = false
          }
        })
      }
    }
  }
</script>
