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
      <Tabs :animated="false"  @on-click="changeTable">
        <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab.title">
          <Table border :columns="remindColumns" :data="remindData"></Table>
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
import * as date from '@/until/time'
export default {
  components: {},
  props: {},
  data() {
    return {
      datavalue: true,
      total: 1,
      current: 0,
      pageSize: 20,
      status: '待处理',
      tabs: [{ title: '待处理' }, { title: '已处理' }, { title: '全部' }],
      remindColumns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '类型',
          key: 'assistantTypeName',
          align: 'center'
        },
        {
          title: '商户账号',
          key: 'msSellerId',
          align: 'center'
        },
        {
          title: '档主姓名',
          key: 'shopOwerName',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '商户账号状态',
          key: 'sellerStatusName',
          align: 'center'
        },
        {
          title: '提交日期',
          key: 'createdAt',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return date.formatDateTime(params.row.createdAt)
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small',
                    disabled: params.row.status === 0 ? null : true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: index => {
                      params.row.status = 1
                      this.updateAlertsMessage(
                        params.row.msAssistantId,
                        params.row.status
                      )
                    }
                  }
                },
                params.row.status === 0 ? '待处理' : '已处理'
              )
            ])
          }
        }
      ],
      remindData: []
    }
  },
  created() {
    this.getAlertsMessageList(1, 20, 0)
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取消息提醒列表
    getAlertsMessageList(pageNo, pageSize, status) {
      let params = {
        pageSize: pageSize,
        status: status
      }
      api.getAlertsMessageList(params, pageNo).then(response => {
        this.remindData = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 更新消息提醒状态
    updateAlertsMessage(id, status) {
      let params = {
        status: status
      }
      api.updateAlertsMessage(params, id).then(response => {})
    },
    // 切换tab
    changeTable(index) {
      this.current = index
      if (index === 0) {
        this.getAlertsMessageList(1, 20, 0)
      } else if (index === 1) {
        this.getAlertsMessageList(1, 20, 1)
      } else if (index === 2) {
        this.getAlertsMessageList(1, 20)
      }
    },
    // 分页切换
    changepage(index) {
      if (this.current === 0) {
        this.getAlertsMessageList(index, 20, 0)
      } else if (this.current === 1) {
        this.getAlertsMessageList(index, 20, 1)
      } else if (this.current === 2) {
        this.getAlertsMessageList(index, 20)
      }
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