/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：售后订单管理
*/
<template>
  <div>
    <Row class="mb20">
      <Col span="24">
      订单状态
      <Select style="width:200px;margin-left: 10px;margin-right: 10px;" @on-change="selectStatus" v-model="status">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      选择日期
      <DatePicker type="daterange" placeholder="请选择售后时间" style="width: 200px;margin-right: 10px;margin-left: 10px;"
                  @on-change="selectDate"></DatePicker>
      <Input placeholder="用户手机" v-model.tirm="mobileno" style="width: 200px;margin-right: 10px;"></Input>
      <Input placeholder="收货人手机" v-model.tirm="contactNumber" style="width: 200px;margin-right: 10px;"></Input>
      <Button type="primary" @click="handlerSubmit">搜索</Button>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <div class="vm-fl" v-if="status === 4">
        <Button type="primary" @click="handleSelectAll">全选</Button>
        <Button type="primary" @click="handleServiceAll">售后完成</Button>
      </div>
      <div class="vm-fr">
        <Button type="primary" @click="addCustomerService">新增售后订单</Button>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <Table :columns="columns" :data="data" :loading="loading" v-if="status === 1"></Table>
      <Table :columns="columns1" :data="data" :loading="loading" v-if="status === 2"></Table>
      <Table :columns="columns2" :data="data" :loading="loading" v-if="status === 4" ref="selection"
             @on-select-all="getSelectAll"></Table>
      <Table :columns="columns3" :data="data" :loading="loading" v-if="status === 5"></Table>
      <Table :columns="columns4" :data="data" :loading="loading" v-if="status === 6"></Table>
      <Col span="24" class="mt20">
      <Page
        :total="tableTotal"
        :current="pageNo"
        :page-size="pageSize"
        @on-change="changePage"
        show-total
        class="vm-fr"
      ></Page>
      </Col>
      </Col>
    </Row>
    <Modal v-model="reject_modal"
           width="400">
      <h3 slot="header">确定驳回售后订单？</h3>
      <Input v-model="rejectDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearReject">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmReject">确定</Button>
      </div>
    </Modal>
    <Modal v-model="refuse_modal"
           width="400">
      <h3 slot="header">确定执行拒绝退款？</h3>
      <Input v-model="refuseDec"
             type="textarea" :autosize="{minRows: 5,maxRows: 5}"
             :autofocus="true"
             placeholder="请输入备注信息(字数不得超过50字)"></Input>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearRefuse">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmRefuse">确定</Button>
      </div>
    </Modal>
    <Modal v-model="adopt_modal"
           width="400">
      <div slot="header">
        <Select style="width:300px;" v-model="adopt" @on-change="selectAdopt">
          <Option v-for="item in adoptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div v-if="adopt ===2">
        <RadioGroup v-model="vertical" vertical class="mb10" style="position: relative;" @on-change="selectVertical">
          <Radio label="1">
            <span>无补偿</span>
          </Radio>
          <Radio label="2" class="mb10">
            <span>补偿优惠券</span>
          </Radio>
          <Select style="width:200px;position: absolute;left: 100px;top: 30px;" v-model="coupon">
            <Option v-for="item in couponList" :value="item.couponId" :key="item.couponId">{{ item.couponName }}
            </Option>
          </Select>
          <Radio label="3">
            <span>补偿菜城币</span>
          </Radio>
          <Input v-model="refund" style="width: 200px;position: absolute;top: 70px;left: 100px;"></Input>
        </RadioGroup>
        <Input v-model="refundDec"
               type="textarea" :autosize="{minRows: 5,maxRows: 5}"
               :autofocus="true"
               placeholder="请输入备注信息(字数不得超过50字)"></Input>
      </div>
      <div v-else>
        <div class="mb10">最多可退:¥{{actualAmount}}</div>
        <div class="mb10">退款金额:¥<Input v-model="refund" style="width: 300px;margin-left: 10px;"></Input></div>
        <Input v-model="refundDec"
               type="textarea" :autosize="{minRows: 5,maxRows: 5}"
               :autofocus="true"
               placeholder="请输入备注信息(字数不得超过50字)"></Input>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click.stop="clearAdopt">取消</Button>
        <Button type="primary" size="large" @click.stop="confirmAdopt">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'
  import tableImg from '@/components/table/table-img'

  export default {
    component: {
      tableImg
    },
    data() {
      return {
        actualAmount: '', // 最多退还金额
        vertical: '1', // 无责任
        couponList: [], // 优惠卷列表
        coupon: '', // 优惠卷
        adoptList: [
          {
            value: 2,
            label: '无责任'
          },
          {
            value: 1,
            label: '商户'
          },
          {
            value: 3,
            label: '骑士'
          },
          {
            value: 4,
            label: '平台'
          }
        ],  // 通过状态列表
        refund: '', // 退款金额
        refundDec: '', // 退款备注
        adopt: 2,  // 通过状态
        adopt_modal: false, // 通过弹窗

        refuse_modal: false, // 拒绝退款弹窗
        refuseDec: '', // 拒绝退款备注
        serviceAll: [],  // 已退款全选的数据
        reject_modal: false, // 驳回弹窗
        rejectDec: '', // 驳回备注
        serviceId: '',  // 售后Id
        tableTotal: 0, // 当前页的总量
        pageNo: 1, // 当前页
        pageSize: 20, // 当前页的数量
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: 1, // 状态
        mobileno: '', // 用户手机
        contactNumber: '', // 收货人手机
        statusList: [
          {
            value: 1,
            label: '待审核'
          },
          {
            value: 2,
            label: '待处理'
          },
          {
            value: 4,
            label: '已退款'
          },
          {
            value: 5,
            label: '已完成'
          },
          {
            value: 6,
            label: '已关闭'
          }
        ],
        loading: false,
        columns: [
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createTime)
            }
          },
          {
            title: '售后订单编号',
            key: 'asAfterSaleId',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: 'creatorIdentity',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'creatorName',
            align: 'center'
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
            title: '用户手机',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '申请服务',
            key: 'serviceTypeName',
            align: 'center'
          },
          {
            title: '退款原因',
            key: 'questionTypeName',
            align: 'center'
          },
          {
            title: '原因明细',
            key: 'memo',
            align: 'center',
            render: (h, params) => {
              if (params.row.memo && params.row.memo.length > 10) {
                return params.row.memo.substr(0, 10) + '...'
              } else {
                return params.row.memo
              }
            }
          },
          {
            title: '图片凭证',
            key: 'list',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.list,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '申请退款金额',
            key: 'applyMoney',
            align: 'center',
            render: (h, params) => {
              if (params.row.applyMoney) {
                let text = params.row.applyMoney / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '商户处理结果',
            key: 'sellerActionName',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            width: 100,
            render: (h, params) => {
              let asAfterSaleId = params.row.asAfterSaleId
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
                      this.serviceId = asAfterSaleId
                      this.adopt_modal = true
                      this.getDutyData()
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
                      this.serviceId = asAfterSaleId
                    }
                  }
                }, '驳回')
              ])
            }
          }
        ],
        columns1: [
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createTime)
            }
          },
          {
            title: '售后订单编号',
            key: 'asAfterSaleId',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: 'creatorIdentity',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'creatorName',
            align: 'center'
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
            title: '用户手机',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '申请服务',
            key: 'serviceTypeName',
            align: 'center'
          },
          {
            title: '退款原因',
            key: 'questionTypeName',
            align: 'center'
          },
          {
            title: '原因明细',
            key: 'memo',
            align: 'center',
            render: (h, params) => {
              if (params.row.memo && params.row.memo.length > 10) {
                return params.row.memo.substr(0, 10) + '...'
              } else {
                return params.row.memo
              }
            }
          },
          {
            title: '图片凭证',
            key: 'list',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.list,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '申请退款金额',
            key: 'applyMoney',
            align: 'center',
            render: (h, params) => {
              if (params.row.applyMoney) {
                let text = params.row.applyMoney / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '商户处理结果',
            key: 'sellerActionName',
            align: 'center'
          },
          {
            title: '平台审核结果',
            align: 'center',
            key: 'ptAuditStatusName'
          },
          {
            title: '平台审核时间',
            align: 'center',
            key: 'ptAuditTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptAuditTime)
            }
          },
          {
            title: '责任归属',
            align: 'center',
            key: 'dutyBelongName'
          },
          {
            title: '同意退款金额',
            align: 'center',
            key: 'refundAmount',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '赔偿方式',
            align: 'center',
            key: 'compensateTypeName'
          },
          {
            title: '赔偿详细',
            align: 'center',
            key: 'compensateDetailName'
          },
          {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 100,
            render: (h, params) => {
              let asAfterSaleId = params.row.asAfterSaleId
              let isDisabled
              if (params.row.isRefund === 1) {
                isDisabled = false
              } else {
                isDisabled = true
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: isDisabled
                  },
                  style: {
                    marginBottom: '2px'
                  },
                  on: {
                    click: () => {
                      let that = this
                      this.$Modal.confirm({
                        content: '确定执行同意退款？',
                        onOk: () => {
                          console.log(asAfterSaleId)
                          api.putAgreeServiceOrder(asAfterSaleId).then((res) => {
                            if (res) {
                              console.log(res)
                              that.getCustomerService()
                            }
                          })
                        }
                      })
                    }
                  }
                }, '同意退款'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: isDisabled
                  },
                  on: {
                    click: () => {
                      this.refuse_modal = true
                      this.serviceId = asAfterSaleId
                    }
                  }
                }, '拒绝退款')
              ])
            }
          }
        ],
        columns2: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createTime)
            }
          },
          {
            title: '售后订单编号',
            key: 'asAfterSaleId',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: 'creatorIdentity',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'creatorName',
            align: 'center'
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
            title: '用户手机',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '申请服务',
            key: 'serviceTypeName',
            align: 'center'
          },
          {
            title: '退款原因',
            key: 'questionTypeName',
            align: 'center'
          },
          {
            title: '原因明细',
            key: 'memo',
            align: 'center',
            render: (h, params) => {
              if (params.row.memo && params.row.memo.length > 10) {
                return params.row.memo.substr(0, 10) + '...'
              } else {
                return params.row.memo
              }
            }
          },
          {
            title: '图片凭证',
            key: 'list',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.list,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '申请退款金额',
            key: 'applyMoney',
            align: 'center',
            render: (h, params) => {
              if (params.row.applyMoney) {
                let text = params.row.applyMoney / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '商户处理结果',
            key: 'sellerActionName',
            align: 'center'
          },
          {
            title: '平台审核结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台审核时间',
            align: 'center',
            key: 'ptAuditTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptAuditTime)
            }
          },
          {
            title: '责任归属',
            align: 'center',
            key: 'dutyBelongName'
          },
          {
            title: '同意退款金额',
            align: 'center',
            key: 'refundAmount',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '赔偿方式',
            align: 'center',
            key: 'compensateTypeName'
          },
          {
            title: '赔偿详细',
            align: 'center',
            key: 'compensateDetailName'
          },
          {
            title: '平台处理结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台处理时间',
            align: 'center',
            key: 'ptDisposeAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptDisposeAt)
            }
          },
          {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 80,
            render: (h, params) => {
              let asAfterSaleId = params.row.asAfterSaleId
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(asAfterSaleId)
                    let that = this
                    this.$Modal.confirm({
                      content: '确定执行售后完成？',
                      onOk: () => {
                        api.putServiceOrder(Array.of(asAfterSaleId)).then((res) => {
                          if (res) {
                            console.log(res)
                            that.getCustomerService()
                          }
                        })
                      }
                    })
                  }
                }
              }, '售后完成')
            }
          }
        ],
        columns3: [
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createTime)
            }
          },
          {
            title: '售后订单编号',
            key: 'asAfterSaleId',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: 'creatorIdentity',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'creatorName',
            align: 'center'
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
            title: '用户手机',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '申请服务',
            key: 'serviceTypeName',
            align: 'center'
          },
          {
            title: '退款原因',
            key: 'questionTypeName',
            align: 'center'
          },
          {
            title: '原因明细',
            key: 'memo',
            align: 'center',
            render: (h, params) => {
              if (params.row.memo && params.row.memo.length > 10) {
                return params.row.memo.substr(0, 10) + '...'
              } else {
                return params.row.memo
              }
            }
          },
          {
            title: '图片凭证',
            key: 'list',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.list,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '申请退款金额',
            key: 'applyMoney',
            align: 'center',
            render: (h, params) => {
              if (params.row.applyMoney) {
                let text = params.row.applyMoney / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '商户处理结果',
            key: 'sellerActionName',
            align: 'center'
          },
          {
            title: '平台审核结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台审核时间',
            align: 'center',
            key: 'ptAuditTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptAuditTime)
            }
          },
          {
            title: '责任归属',
            align: 'center',
            key: 'dutyBelongName'
          },
          {
            title: '同意退款金额',
            align: 'center',
            key: 'refundAmount',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '赔偿方式',
            align: 'center',
            key: 'compensateTypeName'
          },
          {
            title: '赔偿详细',
            align: 'center',
            key: 'compensateDetailName'
          },
          {
            title: '平台处理结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台处理时间',
            align: 'center',
            key: 'ptDisposeAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptDisposeAt)
            }
          },
          {
            title: '售后完成时间',
            align: 'center',
            key: 'asAfterSaleFinishAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.asAfterSaleFinishAt)
            }
          }
        ],
        columns4: [
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createTime)
            }
          },
          {
            title: '售后订单编号',
            key: 'asAfterSaleId',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: 'creatorIdentity',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'creatorName',
            align: 'center'
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
            title: '用户手机',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '申请服务',
            key: 'serviceTypeName',
            align: 'center'
          },
          {
            title: '退款原因',
            key: 'questionTypeName',
            align: 'center'
          },
          {
            title: '原因明细',
            key: 'memo',
            align: 'center',
            render: (h, params) => {
              if (params.row.memo && params.row.memo.length > 10) {
                return params.row.memo.substr(0, 10) + '...'
              } else {
                return params.row.memo
              }
            }
          },
          {
            title: '图片凭证',
            key: 'list',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(tableImg, {
                  props: {
                    imgUrl: params.row.list,
                    width: '30px',
                    height: '30px'
                  }
                })
              ])
            }
          },
          {
            title: '申请退款金额',
            key: 'applyMoney',
            align: 'center',
            render: (h, params) => {
              if (params.row.applyMoney) {
                let text = params.row.applyMoney / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '商户处理结果',
            key: 'sellerActionName',
            align: 'center'
          },
          {
            title: '平台审核结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台审核时间',
            align: 'center',
            key: 'ptAuditTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptAuditTime)
            }
          },
          {
            title: '责任归属',
            align: 'center',
            key: 'dutyBelongName'
          },
          {
            title: '同意退款金额',
            align: 'center',
            key: 'refundAmount',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('span', '¥' + text)
              }
            }
          },
          {
            title: '赔偿方式',
            align: 'center',
            key: 'compensateTypeName'
          },
          {
            title: '赔偿详细',
            align: 'center',
            key: 'compensateDetailName'
          },
          {
            title: '平台处理结果',
            align: 'center',
            key: 'ptHandleActionName'
          },
          {
            title: '平台处理时间',
            align: 'center',
            key: 'ptDisposeAt',
            render: (h, params) => {
              return time.formatDateTime(params.row.ptDisposeAt)
            }
          }
        ],
        data: []
      }
    },
    created() {
      this.getCustomerService()
    },
    methods: {
      // 无责任选择状态
      selectVertical(value) {
        if (value === '1') {
          this.refund = ''
          this.coupon = ''
        } else if (value === '2') {
          this.refund = ''
        } else if (value === '3') {
          this.coupon = ''
        }
      },
      // 选择通过不同状态
      selectAdopt() {
        this.getDutyData()
      },
      // 获取售后划分责任
      getDutyData() {
        api.getCustomerServiceDutyData(this.serviceId, this.adopt).then((res) => {
          if (res) {
            console.log(res)
            if (res.couponList) {
              this.couponList = res.couponList
            }
            if (res.actualAmount) {
              this.actualAmount = res.actualAmount
            }
          }
        })
      },
      // 关闭通过弹窗
      clearAdopt() {
        this.serviceId = ''
        this.adopt_modal = false
        this.refundDec = ''
        this.adopt = 2
        this.actualAmount = ''
        this.refund = ''
      },
      // 确认通过
      confirmAdopt() {
        let params = {
          asAfterSaleId: this.serviceId,
          comment: this.refundDec,
          duty: this.adopt,
          refundAmount: this.refund,
          actualAmount: this.actualAmount,
          couponId: this.coupon
        }
        api.patchCustomerServiceDuty(params).then((res) => {
          if (res) {
            console.log(res)
            this.clearAdopt()
            this.getCustomerService()
          }
        })
      },
      // 设置全选
      handleSelectAll() {
        if (this.isAllSelect) {
          this.$refs.selection.selectAll(false)
          this.isAllSelect = false
        } else {
          this.$refs.selection.selectAll(true)
          this.isAllSelect = true
        }
      },
      // 获取全选的数据
      getSelectAll(selection) {
        console.log(selection)
        selection.forEach((item) => {
          this.serviceAll.push(item.asAfterSaleId)
        })
      },
      // 全选售后完成
      handleServiceAll() {
        if (this.serviceAll.length > 0) {
          api.putServiceOrder(this.serviceAll).then((res) => {
            if (res) {
              console.log(res)
              this.getCustomerService()
            }
          })
        }
      },
      // 关闭拒绝退款弹窗
      clearRefuse() {
        this.refuse_modal = false
        this.refuseDec = ''
        this.serviceId = ''
      },
      // 关闭驳回弹窗
      clearReject() {
        this.reject_modal = false
        this.rejectDec = ''
        this.serviceId = ''
      },
      // 确定驳回
      confirmReject() {
        let params = {
          id: this.serviceId,
          reason: this.rejectDec
        }
        api.patchRejectOrder(params).then((res) => {
          if (res) {
            this.clearReject()
            this.getCustomerService()
          }
        })
      },
      // 确定拒绝退款
      confirmRefuse() {
        let params = {
          id: this.serviceId,
          reason: this.refuseDec
        }
        api.patchDisagreeServiceOrder(params).then((res) => {
          if (res) {
            console.log(res)
            this.clearRefuse()
            this.getCustomerService()
          }
        })
      },
      // 搜索
      handlerSubmit() {
        this.pageNo = 1
        this.getCustomerService()
      },
      // 选择状态
      selectStatus(value) {
        console.log(value)
        this.status = value
        this.getCustomerService()
      },
      // 选择时间
      selectDate(value) {
        this.startTime = value[0]
        this.endTime = value[1]
        console.log(value)
      },
      // 跳转到新增售后订单
      addCustomerService() {
        this.$router.push('/order/addCustomerService')
      },
      // 获取售后列表
      getCustomerService() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime,
          status: this.status,
          contactNumber: this.contactNumber,
          mobileno: this.mobileno,
          pageSize: this.pageSize
        }
        this.loading = true
        api.getCustomerService(params, this.pageNo).then((res) => {
          if (res) {
            console.log(res)
            this.loading = false
            this.tableTotal = res.total
            this.data = res.records
          }
        })
      },
      // 分页
      changePage(index) {
        this.pageNo = index
        this.getCustomerService()
      }
    }
  }
</script>
University of Science and Technology of China (CLASSROOM)
DTXRAnPn1P65Rt0xB4eTQ+4bF5IUF0gu0X9XBEUhM4QxY0DRFJxYEmgh4nyh7RtL
