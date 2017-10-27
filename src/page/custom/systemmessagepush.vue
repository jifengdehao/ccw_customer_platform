/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 14:45:08 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 系统消息推送 
 */

<template>
  <div>
    <Input v-model="params.title" :disabled="isAbled"  :placeholder="'请输入'+tipsMsg + '标题'" style="width: 200px;float:left;margin-right:200px;"></Input>
    <div style="line-height:1.5;float:right">
      <label>推送时间设置</label>
      <Select v-model="params.pushType" style="width:150px;margin-left:10px;" :disabled="isAbled">
        <Option value="1">定时推送</Option>
        <Option value="2">立即推送</Option>
      </Select>
      <DatePicker :disabled="isAbled"  type="datetime" format="yyyy-MM-dd HH:mm" v-model="params.pushTime" :value="params.pushTime" placeholder="选择日期和时间（不含秒）" style="width: 200px;margin-left:10px"></DatePicker>
    </div>
    <textarea v-if="routerName !== 'daily_menu_push'" :disabled="isAbled"  :placeholder="'请输入'+tipsMsg + '推送内容'" v-model="params.content"></textarea>
    <!-- 每日菜谱 -->
    <div class="cookbook" v-else>
      <h3>食材：</h3>
      <textarea placeholder="请输入你要推送菜谱的食材" v-model="params.ingredient"></textarea>
      <h3>烹饪方法：</h3>
      <textarea placeholder="请输入你要推送菜谱的烹饪方法" v-model="params.cookStep"></textarea>
      <p><input type="text" :placeholder="'上传' + tipsMsg + '图片'" ><input type="button" value="上传图片"><input type="file" filetype="image/*"></p>
    </div>
    <!-- 每日菜谱 -->

    <!-- 活动消息 -->
    <div class="cookbook" v-if="routerName === 'activity_message_push'">
      <p><input type="text" class="activity-link" placeholder="设置活动链接" :disabled="isAbled" v-model="params.actUrl"></p>
      <p><input type="text" :placeholder="'上传' + tipsMsg + '图片'" :disabled="isAbled" ><input type="button" value="上传图片" :disabled="isAbled"><input type="file" filetype="image/*"></p>
    </div>
    <!-- 活动消息 -->
    <div class="btn-ok" v-if="tabIndex != 3">
      <Button type="primary"  @click="editMessage" :disabled="isAbled">确定</Button>
    </div>
    <Tabs type="card" @on-click="chooseTabs" v-model="tabIndex">
      <TabPane label="全部" name="0"></TabPane>
      <TabPane label="待推送" name="1"></TabPane>
      <TabPane label="历史推送" name="2"></TabPane>
      <TabPane label="推送失败" name="3"></TabPane>
    </Tabs>
    <Table v-if="pushMessageData" border :columns="pushMessageTitle" :data="pushMessageData.records"></Table>
    <Page v-if="pushMessageData" className='page-style' :total="pushMessageData.total" show-total></Page>
  </div>
</template>
<script>
import * as http from 'api/common'

export default {
  name: 'systemMessagePush',
  components: {},
  props: {},
  data() {
    return {
      data: null, //  查看详细数据
      tabIndex: '0',
      isAbled: false,
      editStatus: 0, // 状态（确定、查看和修改）
      params: {
        status: '', //  tab上消息推送状态
        pageSize: 10,
        pageNo: 1,
        actPicUrl: '', // 活动图片url,
        actUrl: '', // 活动url,
        content: '', // 消息内容,
        cookStep: '', // 烹饪方法,
        ingredient: '', // 食材,
        msgType: '', // 消息类型,
        picUrl: '', // 图片url,
        pushTime: '', // 推送时间,
        pushType: '', // 推送类型,
        title: '' // 标题
      },
      tipsMsg: '系统', //  设置标题和placeholder值
      routerName: '', //  路由名
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
                      this.data = params.row
                      this.params.title = params.row.title
                      this.params.content = params.row.content
                      this.params.pushType = String(params.row.pushType)
                      this.params.pushTime = params.row.pushTime
                      this.editStatus = 1
                      this.isAbled = true
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
                  style: {
                    display: params.row.status === 2 ? 'none' : 'initial'
                  },
                  on: {
                    click: () => {
                      this.data = params.row
                      this.params.title = params.row.title
                      this.params.content = params.row.content
                      this.params.pushType = params.row.pushType
                      this.params.pushTime = params.row.pushTime
                      this.params.pushType = params.row.pushType
                      this.editStatus = 2
                      this.isAbled = false
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      pushMessageData: null //  推送数据集合
    }
  },
  created() {
    this.checkRouteName()
  },
  methods: {
    //  校验路由地址
    checkRouteName() {
      let routerName = this.$route.path
      if (!routerName.startsWith('/custom/')) return
      this.routerName = routerName.split('/custom/')[1] //  获取当前路由地址
      switch (this.routerName) {
        case 'system_message_push':
          this.tipsMsg = '系统消息'
          break
        case 'activity_message_push':
          this.tipsMsg = '活动消息'
          break
        case 'daily_menu_push':
          this.tipsMsg = '每日菜谱'
          break
        case 'app_notice_push':
          this.tipsMsg = '应用通知'
          break
        case 'text-message-push':
          this.tipsMsg = '短信消息'
          break
      }
      this.getMessageList()
    },
    //  获取短信消息数据
    getMessageList() {
      switch (this.routerName) {
        case 'system_message_push':
          this.params.msgType = 1
          break
        case 'activity_message_push':
          this.tipsMsg = '活动消息'
          this.params.msgType = 2
          break
        case 'daily_menu_push':
          this.tipsMsg = '每日菜谱'
          this.params.msgType = 3
          break
        case 'app_notice_push':
          this.tipsMsg = '应用通知'
          this.params.msgType = 4
          break
        case 'message_push_manage':
          this.tipsMsg = '短信消息'
          this.params.msgType = 5
          break
      }
      http.getMessageList(this.params).then(data => {
        this.pushMessageData = data
      })
    },
    //  tab切换
    chooseTabs(index) {
      this.editStatus = 0
      this.isAbled = false
      if (parseInt(index) === 0) {
        this.params.status = ''
      } else {
        this.params.status = index - 1
      }
      //  初始化值
      this.params.title = this.params.content = this.params.pushTime = ''
      this.getMessageList()
    },
    //  确定
    editMessage() {
      switch (this.editStatus) {
        case 0:
          //  新增
          http.addMessage(this.params).then(data => {
            this.getMessageList()
            for (let i in this.params) {
              if (i !== 'pageNo' && i !== 'pageSize') {
                this.params[i] = ''
              }
            }
          })
          break
        case 1:
          //  查看
          break
        case 2:
          //  编辑
          this.data.title = this.params.title
          this.data.content = this.params.content
          this.data.pushTime = this.params.pushTime
          this.data.pushType = this.params.pushType
          http.putMessage(this.data).then(data => {
            console.log(data)
          })
          break
      }
    }
  },
  watch: {
    $route(to, from) {
      this.params.status = ''
      this.tabIndex = '0'
      this.params.pushType = '0'
      this.params.title = this.params.content = this.params.pushTime = ''
      this.editStatus = 0
      this.isAbled = false
      this.checkRouteName()
    }
  }
}
</script>
<style lang="css" scoped>
textarea {
  clear: both;
  width: 100%;
  min-height: 100px;
  text-indent: 4px;
  margin: 15px auto;
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

.cookbook {
  clear: both;
  padding: 20px 0;
}

.cookbook h3 {
  font-weight: normal;
}

.cookbook p {
  position: relative;
}

.cookbook input {
  height: 40px;
  text-indent: 4px;
}

.cookbook input[type='text'] {
  width: 200px;
}

.cookbook input.activity-link {
  width: 320px;
  margin-bottom: 20px;
}

.cookbook input[type='button'],
.cookbook input[type='file'] {
  width: 100px;
  margin-left: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
}

.cookbook input[type='file'] {
  position: absolute;
  top: 0;
  left: 200px;
  opacity: 0;
}
</style>

