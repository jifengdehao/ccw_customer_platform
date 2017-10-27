/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-反馈管理
*/
<template>
  <div class="feedback">
    <Form inline label-position="left">
      <FormItem label="手机号" :label-width="80">
        <Input type="text" v-model="phone" placeholder="请输入你的手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">搜索</Button>
      </FormItem>
    </Form>
    <Row>
      <Col span="24">
      <Tabs :value="this.types" :animated="false" @on-click="selectTab">
        <Tab-pane label="用户端" name="0">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="商户端" name="1">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="配送端" name="2">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
      </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        curr: 1, // 当前页
        pageNum: 10, // 当前页展示的数据量
        tableTotal: 0, // 数据总数
        types: 0, // 评价类型
        phone: '', // 手机号
        loading: true,
        columns: [
          {
            title: '用户ID',
            key: 'creatorId',
            align: 'center'
          },
          {
            title: '用户名',
            key: 'creatorName',
            align: 'center'
          },
          {
            title: '手机号',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '反馈内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '反馈时间',
            key: 'createdDt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdDt)
            }
          },
          {
            title: '反馈图片',
            key: 'noPicture',
            align: 'center',
            render: (h, params) => {
              let noPicture = params.row.noPicture
              if (noPicture) {
                return h('span', '有')
              } else {
                return h('span', '无')
              }
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let id = params.row.pt_feedback_id
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/order/feedbackInfo/' + id)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        data: []
      }
    },
    created () {
      this.getFeedbackListData()
    },
    methods: {
      handleSubmit () {
        this.getFeedbackListData()
      },
      changePage (index) {
        this.curr = index
        this.getFeedbackListData()
      },
      selectTab (name) {
        this.types = name
        this.getFeedbackListData()
      },
      exportData () {},
      getFeedbackListData () {
        let params = {
          pageSize: this.pageNum,
          types: this.types,
          mobileno: this.phone
        }
        api.getFeedBackList(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.tableTotal = res.total
            this.data = res.records
            this.loading = false
          }
        })
      }
    }
  }
</script>
