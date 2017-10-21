/*
 * @Author: huShangJun 
 * @Date: 2017-10-16 10:05:54 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商户消息提醒
 */
<template>
  <div class="seller-message-remind">
    <!-- 表格内容 -->
    <section class="seller-message-remind-tab">
      <Tabs type="card" :animated="false" @on-click="">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <Table :columns="remindColumns" :data="remindData"></Table>
        </TabPane>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-message-remind-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
  </div>
</template>
<script>
import * as api from 'api/common.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      datavalue: true,
      total: 1,
      pageSize: 1,
      status: '待处理',
      tabs: [{ title: '待处理' }, { title: '已处理' }, { title: '全部' }],
      remindColumns: [
        {
          title: '序号',
          key: 'id',
          width: 60
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '商户账号',
          key: 'sellerId'
        },
        {
          title: '商户手机号',
          key: 'mobileno'
        },
        {
          title: '商户账号状态',
          key: 'sellertatus'
        },
        {
          title: '提交日期',
          key: 'submitTime'
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: params.row.status === 0 ? 'info' : 'disabled',
                    size: 'small',
                    disabled: params.row.status === 0 ? null : true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: index => {
                      params.row.status = 1
                    }
                  }
                },
                params.row.status === 0 ? '待处理' : '已处理'
              )
            ])
          }
        }
      ],
      remindData: [
        { id: 1, type: '找回密码', sellerId: 'ABC123', status: 0 },
        { type: '找回密码', status: 0 },
        { sellerId: 'ABC123', sellertatus: '营业中', status: 0 }
      ]
    }
  },
  // created: {},
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取消息提醒列表
    getAlertsMessageList(pageNo, pageSize, status) {
      let params = {
        pageNo: pageNo,
        pageSize: pageSize,
        status: status
      }
      api.getAlertsMessageList(params).then(response => {
        this.remindData = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 更新消息提醒状态
    updateAlertsMessage(id, status) {
      let params = {
        stasus: status
      }
      api.updateAlertsMessage(params, id).then(response => {})
    },
    changepage(index) {
      console.log(index)
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.seller-message-remind-page {
  margin-top: 10px;
  text-align: right;
}
</style>