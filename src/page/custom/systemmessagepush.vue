/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 14:45:08 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 系统消息推送 
 */

<template>
  <div>
    <Input v-model="single.title" :placeholder="'请输入'+tipsMsg + '标题'" style="width: 200px;float:left;margin-right:200px;"></Input>
    <div style="line-height:1.5;float:right">
      <label>推送时间设置</label>
      <Select v-model="pushStyle" style="width:150px;margin-left:10px;">
        <Option value="0">定时推送</Option>
        <Option value="1">立即推送</Option>
      </Select>
      <Select v-model="single.year" style="width:70px;margin-left:10px;">
        <Option value="2017">2017</Option>
        <Option value="2018">2018</Option>
      </Select>
      <span>年</span>
      <Select v-model="single.month" style="width:60px;" @on-change='loadDays'>
        <Option value="1">01</Option>
        <Option value="2">02</Option>
        <Option value="3">03</Option>
        <Option value="4">04</Option>
        <Option value="5">05</Option>
        <Option value="6">06</Option>
        <Option value="7">07</Option>
        <Option value="8">08</Option>
        <Option value="9">09</Option>
        <Option value="10">10</Option>
        <Option value="11">11</Option>
        <Option value="12">12</Option>
      </Select>
      <span>月</span>
      <Select v-model="single.day" style="width:70px">
        <Option v-for="item in single.days" :value="item" :key="item">{{ item >= 10 ? item : '0' + item }}</Option>
      </Select>
      <span>日</span>
      <Select v-model="single.hour" style="width:60px;" @on-change='loadDays'>
        <Option v-for="item in single.hours" :value="item" :key="item">{{ item >= 10 ? item : '0' + item }}</Option>
      </Select>
      <span>时</span>
      <Select v-model="single.second" style="width:60px;" @on-change='loadDays'>
        <Option v-for="item in single.seconds" :value="item" :key="item">{{ item >= 10 ? item : '0' + item }}</Option>
      </Select>
      <span>分</span>
    </div>
    <textarea v-if="routerName !== 'daily_menu_push'" :placeholder="'请输入'+tipsMsg + '推送内容'"></textarea>
    <!-- 每日菜谱 -->
    <div class="cookbook" v-else>
      <h3>食材：</h3>
      <textarea placeholder="请输入你要推送菜谱的食材"></textarea>
      <h3>烹饪方法：</h3>
      <textarea placeholder="请输入你要推送菜谱的烹饪方法"></textarea>
      <p><input type="text" :placeholder="'上传' + tipsMsg + '图片'" disabled><input type="button" value="上传图片"><input type="file" filetype="image/*"></p>
    </div>
    <!-- 每日菜谱 -->

    <!-- 活动消息 -->
    <div class="cookbook" v-if="routerName === 'activity_message_push'">
      <p><input type="text" class="activity-link" placeholder="设置活动链接"></p>
      <p><input type="text" :placeholder="'上传' + tipsMsg + '图片'" disabled><input type="button" value="上传图片"><input type="file" filetype="image/*"></p>
    </div>
    <!-- 活动消息 -->
    <div class="btn-ok">
      <Button type="primary">确定</Button>
    </div>
    <Tabs type="card" @on-click="chooseTabs">
      <TabPane label="全部"></TabPane>
      <TabPane label="待推送"></TabPane>
      <TabPane label="历史推送"></TabPane>
      <TabPane label="推送失败"></TabPane>
    </Tabs>
    <Table border :columns="pushMessageTitle" :data="pushMessageData"></Table>
    <Page className='page-style' :total="100" show-total></Page>
  </div>
</template>
<script>
export default {
  name: 'systemMessagePush',
  components: {
  },
  props: {
  },
  data() {
    return {
      data: [],
      pushStyle: '0', //  推送方式值
      single: { //  时间相关数据
        title: '', //  标题
        msgContent: '',  //  推送内容
        year: '2017', //  年
        month: '1', //  月
        day: 1, //  日
        hours: 24,  //  （时）集合
        hour: 1, //  时
        seconds: 60,  //  分（集合）
        second: 1, //  分
        days: [1]  //  每个与多少天
      },
      tipsMsg: '系统', //  设置标题和placeholder值
      routerName: '',  //  路由名
      pushMessageTitle: [ //  推送table表头
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
                    console.log(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params.row)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      pushMessageData: [  //  推送数据集合
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
  created() {
    this.firstLoadDays()
  },
  mounted() {
    this.checkRouteName()
  },
  activited: {
  },
  update: {
  },
  beforeRouteUpdate: {
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
      }
    },
    //  加载每月中的天数集合
    loadDays(month) {
      this.single.month = month
      this.firstLoadDays()
    },
    //  首次加载月份的天数
    firstLoadDays() {
      this.single.days.length = 0
      let dayArr = new Date(this.single.year, this.single.month, 0).getDate()//  获取这个月的天数
      for (let i = 1; i <= dayArr; i++) {
        this.single.days.push(i)
      }
    },
    //  tab切换
    chooseTabs(index) {

    }
  },
  filter: {
  },
  computed: {
  },
  watch: {
    '$route'(to, from) {
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
  box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
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
