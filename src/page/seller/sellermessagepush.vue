/*
 * @Author: huShangJun 
 * @Date: 2017-10-16 13:58:58 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商户消息推送 
 */

<template>
  <div>
    <Input v-model="single.title" placeholder="输入标题" value="single.title" style="width: 200px;float:left;margin-right:200px;"></Input>
    <div style="line-height:1.5;float:right">
      <label>推送时间设置</label>
      <Select v-model="single.pushType" style="width:150px;margin-left:10px; margin-right: 10px;">
        <Option value="1">定时推送</Option>
        <Option value="2">立即推送</Option>
      </Select>
      <label>推送时间设置:</label>
      <DatePicker v-model="single.pushTime" value="single.pushTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 300px"></DatePicker>
    </div>
    <textarea v-model="single.content" placeholder="输入您要推送的系统消息的内容" value="single.content"></textarea>
    <div class="btn-ok">
      <Button type="primary" @click="pushMessage">{{pushButton}}</Button>
    </div>
     <div>
       <Tabs type="card" @on-click="onTabsIndex" :animated="false">
          <TabPane v-for="tab in messgeTabs" :key="tab" :label="tab">
            <Table border :columns="pushMessageTitle" :data="pushMessageData"></Table>
          </TabPane>
            <Page v-if="pushMessageData && pushMessageData.length > 0" class="page-style" :current="pageNo" :total="total" @on-change="changePage"></Page>
        </Tabs>
     </div>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import * as date from '@/until/time'

export default {
  name: 'systemMessagePush',
  components: {},
  props: {},
  data() {
    return {
      messgeTabs: ['全部', '待推送', '历史推送', '推送失败'], // table 切换
      messgeIndex: '', // 保存切换ID
      total: '', // 总页数
      pageNo: 1, // 当前页
      pageSize: 10, // 每页数据
      data: [],
      pushButton: '确定',
      single: {
        //  时间相关数据
        title: '', //  标题
        pushTime: '',
        content: '',
        pushType: '1'
      },
      pushMessageTitle: [
        //  推送table表头
        {
          title: '序号',
          width: 80,
          align: 'center',
          key: 'smMssageId'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '推送时间',
          key: 'pushTime',
          align: 'center',
          render: (h, params) => {
            return date.formatDateTime(params.row.pushTime)
          }
        },
        {
          title: '推送状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '操作人员',
          key: 'creator',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      api
                        .seeSysMessage(params.row.smMssageId)
                        .then(response => {
                          this.single = response
                          this.single.pushType = String(this.single.pushType)
                        })
                      this.pushButton = '查看完毕'
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.single = params.row
                      this.single.pushType = String(params.row.pushType)
                      this.pushButton = '确定修改'
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      pushMessageData: [] // 列表数据
    }
  },
  created() {
    this.messgeIndex = '' // 初始化table ID
    this.getSysMessage() // 初始化历史数据
  },
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    //  tab切换 获取ID
    onTabsIndex(index) {
      this.messgeIndex = index
      this.pageNo = 1
      this.getSysMessage() // 初始化历史数据
    },
    // 点击button 判断状态
    pushMessage() {
      if (this.pushButton === '确定') {
        // 新增消息推送
        this.single.msgType = 6
        switch (this.single.pushType) {
          case '1':
            this.single.pushType = 1
            break
          case '2':
            this.single.pushType = 2
        }
        api.addSysMessage(this.single).then(res => {})
        this.single = {}
        this.single.pushType = '1'
      } else if (this.pushButton === '查看完毕') {
        this.single = {}
        this.single.pushType = '1'
        this.pushButton = '确定'
      } else if (this.pushButton === '确定修改') {
        switch (this.single.status) { // 过滤推送状态 改为number
          case '待推送':
            this.single.status = 0
            break
          case '推送成功':
            this.single.status = 1
            break
          case '推送失败':
            this.single.status = 2
        }
        switch (this.single.pushType) {
          case '1':
            this.single.pushType = 1
            break
          case '2':
            this.single.pushType = 2
        }
        api
          .modifySysMessage(this.single, this.single.smMssageId)
          .then(data => {})
        this.single = {}
        this.single.pushType = '1'
        this.pushButton = '确定'
      } else {
        return false
      }
      this.getSysMessage() // 初始化历史数据
    },
    // 获取商户端系统消息列表
    getSysMessage() {
      if (this.messgeIndex === 0) {
        this.messgeIndex = '' // 消息推送状态 全部不需要状态
      }
      let params = {
        pageSize: this.pageSize,
        status: this.messgeIndex
      }
      api.getSysMessage(params, this.pageNo).then(response => {
        this.pushMessageData = response.records
        this.total = response.total
        this.pushMessageData.forEach((item, index) => {
          switch (item.status) {
            case 0:
              item.status = '待推送'
              break
            case 1:
              item.status = '推送成功'
              break
            case 2:
              item.status = '推送失败'
          }
        })
      })
    },
    // 更改分页数据
    changePage(curren) {
      this.pageNo = curren
      this.getSysMessage() // 初始化历史数据
    }
  }
}
</script>
<style lang="css" scoped>
textarea {
  clear: both;
  width: 100%;
  min-height: 100px;
  margin: 20px auto;
  border: 1px solid #dddee1;
  resize: none;
}

textarea:focus {
  border-color: #57a3f3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}

.btn-ok {
  margin: 10px auto 40px;
  text-align: center;
}

.btn-ok button {
  width: 100px;
  height: 40px;
}

.page-style {
  margin-top: 20px;
  float: right;
}
</style>