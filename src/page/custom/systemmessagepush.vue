/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 14:45:08 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 系统消息推送 
 */

<template>
  <div>
      <p class="message-top">
        <span>推送时间&nbsp;&nbsp;</span>
        <DatePicker transfer placeholder="开始时间" v-model="searchParams.startTime" style="width: 150px"></DatePicker>
        <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <DatePicker transfer placeholder="结束时间" v-model="searchParams.endTime" style="width: 150px"></DatePicker>
        <Button type="primary" style="float:right;margin-left:10px;" @click="searchData">搜索</Button>
        <Input placeholder="请输入关键词" v-model="searchParams.keyWords" style="float:right;width:150px;"></Input>
      </p>
      <div class="contain" v-if="messageData">
        <Tabs @on-click="chooseTab" v-model="tabIndex">
          <TabPane label="全部"></TabPane>
          <TabPane label="待推送"></TabPane>
          <TabPane label="已推送"></TabPane>
        </Tabs>
        <Button type="primary" style="position:absolute;top:0;right:0;" @click="addMessage">新增推送</Button>
        <Table border stripe :columns="messageTitle" :data="messageData.records" @on-row-click="lookMessage"></Table>
        <Page :total="messageData.total" :current="pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
      </div>
  </div>
</template>
<script>
import * as http from 'api/common'
export default {
  name: 'messagePush',
  components: {},
  props: {},
  data() {
    return {
      messageTitle: [
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            return h('div', this.filterTime(params.row.createdAt))
          }
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '消息内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '推送时间',
          key: 'pushTime',
          align: 'center',
          // sortable: true,
          render: (h, params) => {
            return h('span', this.filterTime(params.row.pushTime))
          }
        },
        {
          title: '推送状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              params.row.status === 1
                ? '推送成功'
                : params.row.status === 2
                  ? '推送失败'
                  : params.row.status === 0 ? '未推送' : ''
            )
          }
        },
        {
          title: '操作人员',
          key: 'creator',
          align: 'center'
        }
      ],
      messageData: null,
      tabIndex: 0, //  tab索引
      searchParams: {
        startTime: '', //  开始时间
        endTime: '', //  结束时间
        keyWords: '' //  关键词
      },
      params: {
        status: null, //  消息推送状态 全部null未推送0已推送1
        msgType: 2, //  消息类型 2系统 3是活动 4菜谱 5应用
        key: '', //  关键词
        startTime: '', //  开始时间
        endTime: '', //  结束时间
        pageSize: 20
      }, //  请求传递的参数
      pageNo: 1 //  页码
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    //  检测路由
    checkRoute() {
      let routeName = this.$route.path
      switch (routeName) {
        case '/custom/system_message_push': //  系统消息
          this.params.msgType = 2
          break
        case '/custom/activity_message_push': //  活动消息
          this.params.msgType = 3
          break
        case '/custom/daily_menu_push': //  每日菜谱
          this.params.msgType = 4
          break
        case '/custom/app_notice_push': //  应用通知
          this.params.msgType = 5
          break
      }
    },
    //  获取数据
    getDataList() {
      this.checkRoute()
      http.getMessageList(this.params, this.pageNo).then(response => {
        this.messageData = response
      })
    },
    //  获取tab索引
    chooseTab(index) {
      if (index === 0) {
        this.params.status = ''
      } else {
        this.params.status = index - 1
      }
      this.getDataList()
    },
    //  搜索
    searchData() {
      this.params.startTime = this.searchParams.startTime
      this.params.endTime = this.searchParams.endTime
      this.params.key = this.searchParams.keyWords
      this.getDataList()
    },
    //  加载下一页
    loadNext(pageNo) {
      this.pageNo = pageNo
      this.getDataList()
    },
    //  新增消息推送
    addMessage() {
      switch (this.params.msgType) {
        //  2系统 3是活动 4菜谱 5应用
        case 2:
          this.$router.push({ path: 'system_message_push/addmessage' })
          break
        case 3:
          this.$router.push({ path: 'activity_message_push/addmessage' })
          break
        case 4:
          this.$router.push({ path: 'daily_menu_push/addmessage' })
          break
        case 5:
          this.$router.push({ path: 'app_notice_push/addmessage' })
          break
      }
    },
    //  查看消息
    lookMessage(value) {
      switch (this.params.msgType) {
        //  2系统 3是活动 4菜谱 5应用
        case 2:
          this.$router.push({ path: `system_message_push/${value.smMssageId}` })
          break
        case 3:
          this.$router.push({
            path: `activity_message_push/${value.smMssageId}`
          })
          break
        case 4:
          this.$router.push({ path: `daily_menu_push/${value.smMssageId}` })
          break
        case 5:
          this.$router.push({ path: `app_notice_push/${value.smMssageId}` })
          break
      }
    },
    //  时间过滤
    filterTime(value) {
      if (!value) {
        return
      }
      let date = new Date(value)
      let params = {
        year: date.getFullYear(),
        month:
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1,
        day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hour: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes:
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds:
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      }
      return `${params.year}/${params.month}/${params.day} ${params.hour}:${
        params.minutes
      }:${params.seconds}`
    }
  },
  watch: {
    $route(newValue, oldValue) {
      let routeName =
        '/custom/system_message_push|/custom/activity_message_push|/custom/daily_menu_push|/custom/app_notice_push'
      if (routeName.indexOf(newValue.path) > -1) {
        this.params.status = this.params.key = this.params.startTime = this.params.endTime = this.searchParams.startTime = this.searchParams.endTime =
          ''
        this.tabIndex = 0
        this.getDataList()
      }
    }
  }
}
</script>
<style lang="css" scoped>
.message-top{
  line-height:1.5;
  margin-bottom:40px;
}

.contain{
  position: relative;
}
</style>
