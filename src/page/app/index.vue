/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：app更新管理
*/
<template>
  <div id="app-index">
    <div class="vm-textRight mb20">
      <Button type="primary" @click="add">新增</Button>
    </div>
    <Table :data="data" :columns="columns"></Table>
    <div class="mt20">
      <Page
        :total="tableTotal"
        :current="curr"
        :page-size="pageNum"
        @on-change="changePage"
        show-total
        class="vm-fr"
      ></Page>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  import * as time from '@/until/time'

  export default {
    data () {
      return {
        columns: [
          {
            title: '更新标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '应用名称',
            key: 'appName',
            align: 'center'
          },
          {
            title: 'App版本',
            key: 'appVersion',
            align: 'center'
          },
          {
            title: '更新时间',
            key: 'publishTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.publishTime)
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let id = params.row.id
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
                      this.$router.push('/app/index/' + id)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let that = this
                      this.$Modal.confirm({
                        content: '确定删除这更新？',
                        onOk () {
                          that.deleteAppUpdate(id)
                        }
                      })
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data: [],
        pageNum: 10, // 当前页的显示的数据数量
        curr: 1, // 当前页
        tableTotal: 0 // 当前页的数据总数
      }
    },
    created () {
      this.getAppListData()
    },
    methods: {
      add () {
        this.$router.push('/app/addAppUpdate')
      },
      getAppListData () {
        let params = {
          pageSize: this.pageNum
        }
        api.getAppListData(this.curr, params).then((res) => {
          if (res) {
            this.data = res.records
            this.tableTotal = res.total
          }
        })
      },
      changePage (index) {
        this.curr = index
        this.getAppListData()
      },
      deleteAppUpdate (id) {
        api.deleteApp(id).then((res) => {
          if (res) {
            this.getAppListData()
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
