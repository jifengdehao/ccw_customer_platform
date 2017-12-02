/*
 * @Author: huShangJun 
 * @Date: 2017-10-10 11:39:58 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商户入驻资料审核 
 */
<template>
  <div class="seller-settled-manage">
    <!-- 选择搜索 -->
    <section class="seller-settled-manage-select">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">日期：</span>
          <DatePicker type="date" v-model="formItem.startdate" placement="bottom-start" placeholder="选择开始日期" style="width: 200px"></DatePicker>
          <i> - </i>
          <DatePicker type="date" v-model="formItem.lastdate" placement="bottom-start" placeholder="选择结束日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <span class="label">负责人：</span>
          <Select v-model="formItem.charge" placeholder="请选择" style="width: 200px" clearable>
            <Option v-for="item in allCharge" :value="item.ptBdId" :key="item.ptBdId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="searchdata(formItem)">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 标签页 表格内容 -->
    <section>
      <Tabs :animated="false" @on-click="changedata">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <Table :columns="auditcolumns" :data="auditdata"></Table>
        </TabPane>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-settled-manage-page">
      <Page :total="total" show-total :page-size="pageSize" :current="currentPage" @on-change="changepage"></Page>
    </section>
    <!-- 查看图片 -->
    <Modal v-model="modal" title="商家证件图片" width="800">
      <table-img :pic-urls="sellerpicUrls"></table-img>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import tableImg from './sellercomponents/seepic'
export default {
  components: {
    tableImg
  },
  data() {
    return {
      total: 1,
      pageSize: 10,
      modal: false,
      currentPage: 1,
      current: 0, // 申请的状态
      sellerpicUrls: [],
      allCharge: [],
      formItem: {
        startdate: '',
        lastdate: '',
        select: ''
      },
      auditdata: [],
      auditcolumns: [],
      tabs: [{ title: '商家待审核' }, { title: '商家待审批' }, { title: '已通过' }],
      columns: [
        {
          title: '商家手机',
          key: 'mobileno',
          align: 'center',
          width: 110
        },
        {
          title: '入驻市场',
          key: 'marketName',
          align: 'center'
        },
        {
          title: '经营范围',
          key: 'businessType',
          align: 'center'
        },
        {
          title: '档口名称',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '挡主姓名',
          key: 'shopOwerName',
          align: 'center'
        },
        {
          title: '档口号',
          key: 'shopNo',
          align: 'center',
          width: 80
        },
        {
          title: '证件上传状态',
          key: 'uploadStatus',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.uploadStatus),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '3px'
                  },
                  on: {
                    click: () => {
                      api
                        .getQulification(params.row.msSellerApplyId)
                        .then(response => {
                          this.sellerpicUrls = response
                        })
                      this.modal = true
                    }
                  }
                },
                '查看'
              )
            ])
          }
        },
        {
          title: '档口介绍',
          key: 'shopDesc',
          align: 'center'
        },
        {
          title: '提交时间',
          key: 'applyDate',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.formatDateTime(params.row.applyDate))
            ])
          }
        },
        {
          title: '负责人',
          key: 'chargeman',
          align: 'center',
          width: 80
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          align: 'center',
          display: 'none',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.updateApplyStatus(
                        params.row.msSellerApplyId,
                        params.row.applyStatus + 2
                      )
                    }
                  }
                },
                '不通过'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.updateApplyStatus(
                        params.row.msSellerApplyId,
                        params.row.applyStatus + 1
                      )
                      this.auditdata.splice(params.row.index, 1)
                    }
                  }
                },
                '通过'
              )
            ])
          }
        }
      ],
      lastcolumns: [
        {
          title: '商家手机',
          key: 'mobileno',
          width: 110,
          align: 'center'
        },
        {
          title: '入驻市场',
          key: 'marketName',
          align: 'center'
        },
        {
          title: '经营范围',
          key: 'businessType',
          align: 'center'
        },
        {
          title: '档口名称',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '挡主姓名',
          key: 'shopOwerName',
          align: 'center'
        },
        {
          title: '档口号',
          key: 'shopNo',
          width: 80,
          align: 'center'
        },
        {
          title: '证件上传状态',
          key: 'uploadStatus',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.uploadStatus),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      api
                        .getQulification(params.row.msSellerApplyId)
                        .then(response => {
                          this.sellerpicUrls = response
                        })
                      this.modal = true
                    }
                  }
                },
                '查看'
              )
            ])
          }
        },
        {
          title: '档口介绍',
          key: 'shopDesc',
          align: 'center'
        },
        {
          title: '提交时间',
          key: 'applyDate',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.formatDateTime(params.row.applyDate))
            ])
          }
        },
        {
          title: '负责人',
          key: 'chargeman',
          align: 'center'
        }
      ]
    }
  },
  created() {
    this.auditcolumns = this.columns
    this.getSellerApplyList(1, this.pageSize, 1)
    api.getAllBD().then(response => {
      this.allCharge = response
    })
  },
  mounted() {},
  methods: {
    // 状态 1：待审核  4：待审批 5：已通过
    // 切换tab栏
    changedata(index) {
      this.current = index
      if (index === 0) {
        this.auditcolumns = this.columns
        this.getSellerApplyList(1, this.pageSize, 1)
      } else if (index === 1) {
        this.auditcolumns = this.columns
        this.getSellerApplyList(1, this.pageSize, 4)
      } else if (index === 2) {
        this.auditcolumns = this.lastcolumns
        this.getSellerApplyList(1, this.pageSize, 5)
      }
    },
    // 分页
    changepage(index) {
      if (this.current === 0) {
        this.getSellerApplyList(index, this.pageSize, 1)
      } else if (this.current === 1) {
        this.getSellerApplyList(index, this.pageSize, 4)
      } else if (this.current === 2) {
        this.getSellerApplyList(index, this.pageSize, 5)
      }
    },
    remove(index) {
      this.auditdata.splice(index, 1)
    },
    // 获取入驻审核列表
    getSellerApplyList(
      pageNo,
      pageSize,
      applyStatus,
      chargeMan,
      applyStartTime,
      applyEndTime
    ) {
      let params = {
        pageSize: pageSize,
        applyStatus: applyStatus, // 申请的状态
        chargeMan: chargeMan, // 负责人
        applyStartTime: applyStartTime,
        applyEndTime: applyEndTime
      }
      api.getSellerApplyList(params, pageNo).then(response => {
        this.auditdata = response.records
        this.total = response.total
        this.pageSize = response.size
        this.currentPage = response.current
      })
    },
    // 更新商户入驻信息审核状态
    updateApplyStatus(id, applyStatus) {
      let params = {
        applyStatus: applyStatus // 商家入驻申请状态
      }
      api.updateApplyStatus(params, id).then(response => {
        this.$Message.success('发送成功')
      })
    },
    // 搜索
    searchdata(formItem) {
      if (this.current === 0) {
        this.getSellerApplyList(
          1,
          this.pageSize,
          1,
          formItem.charge,
          formItem.startdate,
          formItem.lastdate
        )
      } else if (this.current === 1) {
        this.getSellerApplyList(
          1,
          this.pageSize,
          4,
          formItem.charge,
          formItem.startdate,
          formItem.lastdate
        )
      } else if (this.current === 2) {
        this.getSellerApplyList(
          1,
          this.pageSize,
          5,
          formItem.charge,
          formItem.startdate,
          formItem.lastdate
        )
      }
    },
    formatDateTime(inputTime) {
      if (inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    }
  },
  computed: {},
  watch: {}
}
</script>
<style scoped>
.seller-settled-manage-select .label {
  vertical-align: middle;
}

.seller-settled-manage-page {
  margin-top: 10px;
  text-align: right;
}
</style>
