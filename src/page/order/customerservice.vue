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
      订单状态&nbsp;&nbsp;
      <Select style="width:200px;" @on-change="selectStatus" v-model="statusModel">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      &nbsp;&nbsp;选择日期&nbsp;&nbsp;
      <DatePicker type="daterange" placeholder="请选择售后时间" style="width: 200px" @on-change="selectDate"></DatePicker>
      &nbsp;&nbsp;
      <Input placeholder="注册人手机" v-model="regTel" style="width: 200px;"></Input>
      &nbsp;&nbsp;
      <Input placeholder="收货人手机" v-model="receiptTel" style="width: 200px;"></Input>
      &nbsp;&nbsp;
      <Button type="primary">搜索</Button>
      </Col>
    </Row>
    <Row class="mb20">
      <Col span="24">
      <Button type="primary">全选</Button>
      <Button type="primary">通过</Button>
      <Button type="primary">驳回</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <Table :columns="columns" :data="data" :loading="loading"></Table>
      </Col>
    </Row>
    <Modal v-modal="">

    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        statusList: [
          {
            value: 0,
            label: '待审核'
          },
          {
            value: 1,
            label: '待处理'
          },
          {
            value: 2,
            label: '已退款'
          },
          {
            value: 3,
            label: '已完成'
          },
          {
            value: 4,
            label: '已关闭'
          }
        ],
        statusModel: 0,
        regTel: '',
        receiptTel: '',
        date: '',
        loading: false,
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '创建时间',
            key: '',
            align: 'center'
          },
          {
            title: '售后订单编号',
            key: '',
            align: 'center'
          },
          {
            title: '创建人身份',
            key: '',
            align: 'center'
          },
          {
            title: '创建人',
            key: '',
            align: 'center'
          },
          {
            title: '用户ID',
            key: '',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: '',
            align: 'center'
          },
          {
            title: '注册人手机',
            key: '',
            align: 'center'
          },
          {
            title: '收货人姓名',
            key: '',
            align: 'center'
          },
          {
            title: '收货人手机',
            key: '',
            align: 'center'
          },
          {
            title: '关联交易号',
            key: '',
            align: 'center'
          },
          {
            title: '申请服务',
            key: '',
            align: 'center'
          },
          {
            title: '退款原因',
            key: '',
            align: 'center'
          },
          {
            title: '原因明细',
            key: '',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: '',
            align: 'center'
          },
          {
            title: '申请退款金额',
            key: '',
            align: 'center'
          },
          {
            title: '商户处理结果',
            key: '',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
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
    methods: {
      selectStatus (value) {
        console.log(value)
      },
      selectDate (value) {
        console.log(value)
      }
    }
  }
</script>
