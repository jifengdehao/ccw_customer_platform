/*
 * @Author: WuFengliang 
 * @Date: 2018-02-01 10:15:40 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  新建消息推送
 */
<template>
  <div>
    <div class="line-box">
      <label for="">消息类型</label>
      <span>{{name}}</span>
    </div>
    <div class="line-box">
      <label for="">标题</label>
      <Input style="width:200px;" placeholder="请输入标题" :maxlength="50" v-model="params.title"></Input>
    </div>
    <div class="line-box">
      <label for="">推送时间</label>
      <Select style="width:100px;margin-right:10px;" v-model="params.pushType">
        <Option value="1" >立即推送</Option>
        <Option value="2" >定时推送</Option>
      </Select>
      <Select style="width:70px;" v-model="date.year" @on-change="changeDays">
        <Option value="2018" >2018</Option>
        <Option value="2019" >2019</Option>
      </Select>
      <span>年</span>
      <Select style="width:70px;" v-model="date.month"  @on-change="changeDays">
        <Option v-for="(month,index) in date.months" :value="month" :key="index">{{ month >= 10 ? month : '0'+month }}</Option>
      </Select>
      <span>月</span>
      <Select style="width:70px" :disabled="date.days <= 0" v-model="date.day">
        <Option v-for="(day,index) in date.days" :value="day" :key="index">{{ day >= 10 ? day : '0'+day }}</Option>
      </Select>
      <span>日</span>
      <Select style="width:70px" v-model="date.hour">
        <Option v-for="(hour,index) in date.hours" :value="hour" :key="index">{{ hour >= 10 ? hour : '0'+hour }}</Option>
      </Select>
      <span>时</span>
      <Select style="width:70px" v-model="date.minute">
        <Option v-for="(minute,index) in date.minutes" :value="minute" :key="index">{{ minute >= 10 ? minute : '0'+minute }}</Option>
      </Select>
      <span>分</span>
    </div>

    <!-- 活动链接 -->
    <div class="line-box" v-if="index === 1">
      <label for="">活动链接</label>
      <Input style="width:200px;" placeholder="请输入活动链接" :maxlength="50" v-model="params.actUrl"></Input>
    </div>

    <!-- 活动消息 -->
    <div class="line-box" v-if="index !== 2">
      <label style="float:left;margin-right:24px;" for="">消息内容</label>
      <textarea style="float:left" placeholder="请输入要推送的系统消息内容" maxlength="100" v-model="params.content"></textarea>
    </div>

    <!-- 食材 -->
    <div class="line-box" v-if="index === 2">
      <label for="">食材</label>
      <Input style="width:200px;" placeholder="请输入食材" :maxlength="100" v-model="params.ingredient"></Input>
    </div>

    <!-- 烹饪方法 -->
    <div class="line-box" v-if="index === 2">
      <label style="float:left;margin-right:24px;" for="">烹饪方法</label>
      <textarea style="float:left" placeholder="请输入要推送的烹饪方法" maxlength="200" v-model="params.cookStep"></textarea>
    </div>

    <!-- 活动图片 -->
    <div class="line-box" v-if="index === 1 || index === 2">
      <label style="float:left;margin-right:24px;" for="">活动图片</label>
      <div style="float:left">
        <div style="float:left;position:relative" v-if="params.picUrl">
          <img style="display:inline-block;width:100px;margin-right:10px;" :src="params.picUrl">
          <span class="close" @click="closeImg">x</span>
        </div>
        <button class="add-btn" v-if="!params.picUrl" @click="addImg">+</button>
      </div>
    </div>

    <div class="line-box" style="text-indent:180px;">
      <Button type="primary" style="margin-right:20px;" @click="reset">重置</Button>
      <Button type="primary" @click="openDialog">确定</Button>
    </div>
    <input type="file" ref="file" style="visibility: hidden;" v-if="index === 1 || index === 2" @change="onUpload">
    <Modal
        v-model="timely"
        title="提示"
        @on-ok="addOk"
        @on-cancel="addCancel">
        <p style="text-align:center;" v-html="dialogWord"></p>
    </Modal>
  </div>
</template>
<script>
import * as http from 'api/common'
import * as upload from 'components/upload-pic'
export default {
  name: 'addMessagePush',
  components: {},
  props: {},
  data() {
    return {
      date: {
        months: 12,
        days: 0,
        hours: 24,
        minutes: 60,
        year: '2018', // 年
        month: 1, //  月
        day: 1, //  日
        hour: '', // 时
        minute: '' //  分
      },
      params: {
        actPicUrl: '', // 活动图片url
        actUrl: '', //  活动url
        content: '', //  消息内容
        cookStep: '', //  烹饪方法
        ingredient: '', //  食材
        msgType: 2, //  消息类型（2系统消息3活动消息4每日菜谱5应用通知）
        picUrl: '', //  图片url
        pushTimeString: '', //  推送时间
        pushType: '1', //  1是即时推送2是定时推送
        title: '' //  标题
      }, //  传递的参数
      timely: false, //  及时推送
      dialogWord: '', // '本条信息为即时推送消息<br>是否确认推送?' ||  推送时间:2017年12月12日 12:12<br>是否确认推送?
      index: 0, //  当前路由索引
      name: '' //  路由名
    }
  },
  created() {
    this.checkRoute()
    this.getDays()
  },
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    //  检测路由
    checkRoute() {
      let routeName = this.$route.path
      switch (routeName) {
        case '/custom/system_message_push/addmessage': //  系统消息
          this.index = 0
          this.params.msgType = 2
          this.name = '系统消息'
          break
        case '/custom/activity_message_push/addmessage': //  活动消息
          this.index = 1
          this.params.msgType = 3
          this.name = '活动消息'
          break
        case '/custom/daily_menu_push/addmessage': //  每日菜谱
          this.index = 2
          this.params.msgType = 4
          this.name = '每日菜谱'
          break
        case '/custom/app_notice_push/addmessage': //  应用通知
          this.index = 3
          this.params.msgType = 5
          this.name = '应用通知'
          break
      }
    },
    //  获取当前月的天数
    getDays() {
      this.date.month = new Date().getMonth() + 1
      this.date.day = new Date().getDate()
      this.date.days = new Date(this.date.year, this.date.month, 0).getDate()
    },
    //  年或月 发生改变
    changeDays(value) {
      if (value.toString().length === 4) {
        this.date.year = parseInt(value) //  年
      } else {
        this.date.month = parseInt(value) //  月
      }
      this.date.days = new Date(this.date.year, this.date.month, 0).getDate()
      this.date.day = 1
    },
    //  打开弹框
    openDialog() {
      switch (this.params.pushType) {
        case '1':
          this.dialogWord = '本条信息为即时推送消息<br>是否确认推送?'
          break
        case '2':
          this.dialogWord = `推送时间:${this.date.year}年${
            this.date.month >= 10 ? this.date.month : '0' + this.date.month
          }月${this.date.day >= 10 ? this.date.day : '0' + this.date.day}日 ${
            this.date.hour >= 10 ? this.date.hour : '0' + this.date.hour
          }:${
            this.date.minute >= 10 ? this.date.minute : '0' + this.date.minute
          }<br>是否确认推送?`
          break
      }
      this.timely = true
    },
    //  添加图片
    addImg() {
      if (!this.params.picUrl) {
        this.$refs['file'].click()
      }
    },
    //  去掉图片
    closeImg() {
      this.params.picUrl = ''
    },
    // 上传图片
    onUpload(e) {
      upload.uploadpic(e.target.files[0]).then(data => {
        let res = data[0]
        res = res.indexOf('?') ? res.split('?')[0] : res
        this.params.picUrl = res
        e.target.value = ''
        this.$forceUpdate()
      })
    },
    //  确定提交
    addOk() {
      this.params.pushTimeString = `${this.date.year}-${
        this.date.month >= 10 ? this.date.month : '0' + this.date.month
      }-${this.date.day >= 10 ? this.date.day : '0' + this.date.day} ${
        this.date.hour >= 10 ? this.date.hour : '0' + this.date.hour
      }:${this.date.minute >= 10 ? this.date.minute : '0' + this.date.minute}`
      http.addMessage(this.params).then(response => {
        Object.keys(this.params).map(item => {
          if (item === 'msgType' && item === 'msgType') {
            this.params[item] = ''
          }
        })
      })
    },
    //  取消确定
    addCancel() {
      this.timely = false
    },
    //  重置
    reset() {
      this.getDays()
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
div.line-box{
  line-height:1.5;
  padding:15px 0;
  overflow: hidden;
}
div.line-box>label{
  display:inline-block;
  width:50px;
  text-align:right;
  margin-right:20px;
}

div.line-box>textarea{
  width:400px;
  height:80px;
  resize:none;
  border:1px solid #dddee1;
  text-indent:4px;
  line-height:1.5;
  border-radius: 4px;
  outline: none;
}

div.line-box>textarea:focus{
  border-color:#57a3f3;
}

div.line-box>textarea::-webkit-input-placeholder{
  color:#bbbec4;
}

.add-btn{
  float:left;
  width:100px;
  height:100px;
  font-size:60px;
  background-color: #fff;
  border:1px solid #dddee1;
  border-radius:10px;
  outline:none;
  cursor: pointer;
}

.add-btn:hover{
  background-color:#ddd;
}

span.close{
  display:block;
  position: absolute;
  top: -12px;
  left: 85px;
  text-align:center;
  background-color: rgba(0,0,0,.5);
  width:30px;
  height:30px;
  line-height:1.1;
  color:#fff;
  font-size:24px;
  cursor: pointer;
  border-radius:50%;
}
</style>
