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
      <label>推送时间设置:</label>
      <DatePicker v-model="single.pushTime" value="single.pushTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 300px"></DatePicker>
    </div>
    <textarea v-model="single.msgContent" placeholder="输入您要推送的系统消息的内容" value="single.msgContent"></textarea>
    <div class="btn-ok">
      <Button type="primary" @click="pushMessage">{{pushButton}}</Button>
    </div>
    <Tabs type="card" @on-click="chooseTabs">
      <TabPane label="全部"></TabPane>
      <TabPane label="待推送"></TabPane>
      <TabPane label="历史推送"></TabPane>
      <TabPane label="推送失败"></TabPane>
    </Tabs>
    <Table border :columns="pushMessageTitle" :data="pushMessageData"></Table>
    <Page class="page-style" :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
  </div>
</template>
<script>
import * as api from 'api/common.js'
export default {
  name: 'systemMessagePush',
  components: {},
  props: {},
  data() {
    return {
      total: 15,
      pageSize: 1,
      data: [],
      pushButton: '确定',
      pushStyle: '0', //  推送方式值
      single: {
        //  时间相关数据
        title: '', //  标题
        pushTime: '',
        msgContent: ''
      },
      pushMessageTitle: [
        //  推送table表头
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '内容',
          key: 'msgContent',
          align: 'center'
        },
        {
          title: '推送时间',
          key: 'pushTime',
          align: 'center'
        },
        {
          title: '推送状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '操作人员',
          key: 'lastUpdatorName',
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
                      this.single = params.row
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
      pushMessageData: [
        //  推送数据集合
        {
          title: '测试数据',
          msgContent: '我只是测试一下',
          pushTime: '2017/8/16  18:30',
          status: '失败',
          lastUpdatorName: '王五'
        }
      ]
    }
  },
  created() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    changepage(index) {
      console.log(index)
    },
    //  tab切换
    chooseTabs(index) {},
    pushMessage() {
      this.single = {}
      this.pushButton = '确定'
    },
    // 获取商户端系统消息列表
    getSysMessage(pageNo, pageSize, pushStatus) {
      let params = {
        pageNo: pageNo,
        pageSize: pageSize,
        pushStatus: pushStatus // 消息推送状态
      }
      api.getSysMessage(params).then(response => {
        this.pushMessageData = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 新增商户端系统消息
    addSysMessage(title, pushType, msgContent, pushTime) {
      let params = {
        title: title, // 消息标题
        pushType: pushType, // 推送消息类型
        msgContent: msgContent, // 推送消息内容
        pushTime: pushTime
      }
      api.addSysMessage(params).then(response => {})
    },
    // 查看商户端系统消息
    seeSysMessage(id) {
      api.seeSysMessage(id).then(response => {})
    },
    // 编辑商户端系统消息
    modifySysMessage(id, title, pushType, msgContent, pushTime) {
      let params = {
        title: title, // 消息标题
        pushType: pushType, // 推送消息类型
        msgContent: msgContent, // 推送消息内容
        pushTime: pushTime
      }
      api.modifySysMessage(params, id).then(response => {})
    }
  },
  filter: {},
  computed: {},
  watch: {}
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
  margin: 20px auto;
  float: right;
}
</style>