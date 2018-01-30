/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-反馈管理
*/
<template>
  <div class="feedback">
    <Form inline label-position="left">
      <FormItem>
        <Input type="text" v-model="seek" placeholder="用户ID/用户昵称" style="width: 200px"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">搜索</Button>
      </FormItem>
    </Form>
    <Row>
      <Col span="24">
      <Tabs :value="this.types" :animated="false" @on-click="selectTab">
        <Tab-pane label="商户端" name="0">
          <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToFeedbackDetails"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="用户端" name="1">
          <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToFeedbackDetails"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="配送端" name="2">
          <Table :columns="columns" :data="data" :loading="loading" @on-row-dblclick="goToFeedbackDetails"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
      </Tabs>
      <Modal v-model="exportModal" width="300">
        <div slot="header">导出表格</div>
        <div class="vm-textCenter">
          <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="startTime"></DatePicker>
          <div class="mtb10">到</div>
          <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="endTime"></DatePicker>
        </div>
        <div slot="footer">
          <Button type="primary" long :loading="modal_loading" @click="exportData()">确定</Button>
        </div>
      </Modal>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import * as time from '@/until/time'

  export default {
    name: 'feedback',
    data () {
      return {
        curr: 1, // 当前页
        pageNum: 20, // 当前页展示的数据量
        tableTotal: 0, // 数据总数
        types: '0', // 评价类型
        seek: '', // 搜索条件
        loading: true, // 表格加载
        exportModal: false, // 弹出导出表格
        startTime: '', // 导出表格开始时间
        endTime: '', // 导出表格结束时间
        modal_loading: false, // 导出表格加载
        columns: [
          {
            title: '用户ID',
            key: 'creatorId',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'creatorName',
            align: 'center'
          },
          {
            title: '反馈内容',
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
            title: '反馈时间',
            key: 'createdDt',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.createdDt)
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
        this.curr = 1
        this.getFeedbackListData()
      },
      changePage (index) {
        this.curr = index
        this.getFeedbackListData()
      },
      selectTab (name) {
        this.types = name
        this.curr = 1
        this.getFeedbackListData()
      },
      // 导出表格
      exportData () {
        if (this.startTime !== '' && this.endTime !== '') {
          this.modal_loading = true
          let params = {
            startTime: this.startTime,
            endTime: this.endTime,
            types: this.types,
            seek: this.seek
          }
          api.exportFeedback(params).then((res) => {
            if (res) {
              this.modal_loading = false
              window.open(res)
            }
          })
        }
      },
      // 查看详情
      goToFeedbackDetails (params, index) {
        this.$router.push('/order/feedbackInfo/' + params.pt_feedback_id)
      },
      getFeedbackListData () {
        let params = {
          pageSize: this.pageNum,
          types: this.types,
          seek: this.seek
        }
        api.getFeedBackList(params, this.curr).then((res) => {
          if (res) {
            console.log(res);
            this.tableTotal = res.total
            this.data = res.records
            this.loading = false
          }
        })
      }
    }
  }
</script>
