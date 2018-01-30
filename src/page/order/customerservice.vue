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
      <Input placeholder="用户手机" v-model="mobileno" style="width: 200px;margin-right: 10px;"></Input>
      <Input placeholder="收货人手机" v-model="contactNumber" style="width: 200px;margin-right: 10px;"></Input>
      <Button type="primary" @click="handlerSubmit">搜索</Button>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <Button type="primary">全选</Button>
      <Button type="primary">通过</Button>
      <Button type="primary">驳回</Button>
      <Button type="primary" class="vm-fr" @click="addCustomerService">新增售后订单</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <Table :columns="columns" :data="data" :loading="loading"></Table>
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
        tableTotal: 0, // 当前页的总量
        pageNo: 1, // 当前页
        pageSize: 20, // 当前页的数量
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: 0, // 状态
        mobileno: '', // 用户手机
        contactNumber: '', // 收货人手机
        // 订单状态(0/不传全部 1待审核、2售后处理中、3退款中、4已退款、5已经完成、6已取消)
        statusList: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '待审核'
          },
          {
            value: 2,
            label: '售后处理中'
          },
          {
            value: 3,
            label: '退款中'
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
            label: '已取消'
          }
        ],
        loading: false,
        columns: [
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
            align: 'center'
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
                    width: '20px',
                    height: '20px'
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
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '驳回')
              ])
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
      handlerSubmit() {
      },
      selectStatus(value) {
        console.log(value)
        this.status = value
      },
      selectDate(value) {
        this.startTime = value[0]
        this.endTime = value[1]
        console.log(value)
      },
      addCustomerService() {
        this.$router.push('/order/addCustomerService')
      },
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
      changePage(index) {
        this.pageNo = index
        this.getCustomerService()
      }
    }
  }
</script>
