/*
* @Author: ZengFanlu
* @Date: 2018-01-25 10:52:15
* DeveloperMailbox:   zengfanlu@ccw163.com
* FunctionPoint: banner管理迭代功能
*/

 <template>
  <div>
    <Tabs @on-click="onBannerMenu" :animated="false">
        <TabPane label="未结束">
          <table>
            <tr>
              <th style="width:15%;">生效周期</th>
              <th style="width:15%;">跳转链接</th>
              <th style="width:15%;">上传说明</th>
              <th style="width:210px;">图片</th>
              <th>创建时间</th>
              <th>创建人</th>
              <th style="width:6%;">状态</th>
              <th style="width:6%;">操作</th>
            </tr>
            <tr v-for="(banner,index) in bannerData" :key="index">
              <td>
                <p>
                  <span>开始时间</span>
                  <DatePicker type="date" v-model="banner.startTime" :disabled="banner.isUpdate === 0" transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                </p>
                <p>
                  <span>结束时间</span>
                  <DatePicker type="date" v-model="banner.endTime" :disabled="banner.isUpdate === 0" transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                </p>
              </td>
              <td>
                <input type="text" v-model="banner.linkUrl" :disabled="banner.isUpdate === 0" :readonly="banner.isUpdate === 0">
              </td>
              <td>
                <input type="text" v-model="banner.remark" :disabled="banner.isUpdate === 0" :readonly="banner.isUpdate === 0">
              </td>
              <td style="position:relative;width:220px;" v-hover>
                <img v-if="banner.picUrl" :src="banner.picUrl" width="200" style="margin:10px auto;">
                <div class="mask" v-if="banner.picUrl && banner.isUpdate === 1">
                  <a @click="showInput(banner)">重新上传</a>
                  <a style="margin-left:10px;" @click="showImg(banner)">查看</a>
                </div>
                <a v-if="!banner.picUrl" @click="showInput(banner)">上传</a>
              </td>
              <td>{{formatDateTime(banner.createAt)}}</td>
              <td>{{banner.createName}}</td>
              <td>{{banner.isUpdate === 0 ? '已开始':'未开始'}}</td>
              <td><button @click="delOrEnd(banner,index)">{{ (banner.isUpdate === 0 || banner.isUpdate === 1) ? '终止' : '删除'}}</button></td>
            </tr>
            <tr v-if="bannerData && bannerData.length <= 0" style="height:40px;" >
              <td colspan="10">暂无数据</td>
            </tr>
            <tr>
              <td colspan="9" style="height:50px;">
                <button style="width:100px;" @click="addBanner">新增</button>
              </td>
            </tr>
          </table>
          <p style="margin:20px auto;text-align:center;">
            <Button type="primary" style="width:150px;height:40px;" @click="saveEdit">保存修改</Button>
          </p>
        </TabPane>
        <TabPane label="已结束">
          <table>
            <tr>
              <th style="width:15%;">生效周期</th>
              <th style="width:15%;">跳转链接</th>
              <th style="width:15%;">上传说明</th>
              <th style="width:210px;">图片</th>
              <th>创建时间</th>
              <th>创建人</th>
              <th>终止时间</th>
              <th>终止人</th>
              <th>终止原因</th>
            </tr>
            <tr v-for="(banner,index) in bannerData" :key="index">
              <td>
                <p>
                  <span>开始时间</span>
                  <DatePicker type="date" v-model="banner.startTime" disabled transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                </p>
                <p>
                  <span>结束时间</span>
                  <DatePicker type="date" v-model="banner.endTime" disabled transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                </p>
              </td>
              <td>
                <input type="text" v-model="banner.linkUrl" disabled readonly>
              </td>
              <td>
                <input type="text" v-model="banner.remark" disabled readonly>
              </td>
              <td style="position:relative;width:220px;" v-hover>
                <img v-if="banner.picUrl" :src="banner.picUrl" width="200" style="margin:10px auto;">
                <div class="mask">
                  <a @click="showImg(banner)">查看</a>
                </div>
              </td>
              <td>{{formatDateTime(banner.createAt)}}</td>
              <td>{{banner.createName}}</td>
              <td>{{formatDateTime(banner.endAt)}}</td>
              <td>{{banner.endName}}</td>
              <td>{{banner.stopReason}}</button></td>
            </tr>
            <tr v-if="bannerData && bannerData.length <= 0" style="height:40px;">
              <td colspan="10">暂无数据</td>
            </tr>
          </table>
        </TabPane>
    </Tabs>
    <Page v-if="bannerData && bannerData.length > 0" style="margin-top: 20px; float: right;" :page-size="20" show-total :total="total" :current="pageNo" @on-change="onChange"></Page>
    <input type="file" class="inputFile" ref="file" @change="onUpload">
    <div class="big-img" v-if="imgUrl">
      <img :src="imgUrl" />
      <span @click="closeImg">X</span>
    </div>
    <Modal
        v-model="modalBoolean"
        :mask-closable="false"
        title="提示"
        @on-ok="bannerOk"
        @on-cancel="bannerCancel">
        <textarea v-model="stopReason" maxlength="50" placeholder="请输入备注信息(字数不得超过50字)"></textarea>
    </Modal>
  </div>
</template>
 <script>
import { uploadpic } from 'components/upload-pic'
import * as api from 'api/common.js'
export default {
  components: {},
  data() {
    return {
      params: {
        status: 1, // banner图状态（未开始1、已结束2）
        pageSize: 20 // 分页参数，表示每页显示多少条
      },
      pageNo: 1,
      bannerData: [], // 列表数据
      imgUrl: '', //  查看图片url
      modalBoolean: false, // 打开终止弹框
      stopReason: '', // 获取终止理由
      total: null, // 列表总页数
      singleData: null
    }
  },
  created: function() {
    this.getCurrentListData()
  },
  // 鼠标进入图片 不同hover状态
  directives: {
    hover: {
      inserted(el) {
        el.onmouseover = function() {
          if (this.children[1]) {
            this.children[1].style.visibility = 'visible'
          }
        }
        el.onmouseout = function() {
          if (this.children[1]) {
            this.children[1].style.visibility = 'hidden'
          }
        }
      }
    }
  },
  methods: {
    // 切换table 获取Index
    onBannerMenu(index) {
      this.params.status = index + 1
      this.pageNo = 1
      this.getCurrentListData()
    },
    // 请求banner列表数据
    getCurrentListData() {
      api.shoppingBannerList(this.pageNo, this.params).then(data => {
        // 请求数据
        this.bannerData = data.records
        this.total = data.total
      })
    },
    // 过滤列表状态
    filterStatus(status) {
      switch (status) {
        case 0:
          return '已开始'
        case 1:
          return '未开始'
      }
    },
    // 时间格式化
    formatDateTime(inputTime) {
      if (inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? '0' + minute : minute
        second = second < 10 ? '0' + second : second
        return y + '.' + m + '.' + d + ' ' + h + ':' + minute + ':' + second
      }
    },
    // 上传图片
    onUpload(e) {
      uploadpic(e.target.files[0]).then(data => {
        let res = data[0]
        res = res.indexOf('?') ? res.split('?')[0] : res
        this.singleData.picUrl = res
        e.target.value = ''
        this.$forceUpdate()
      })
    },
    // 重新上传
    showInput(data) {
      this.$refs['file'].click()
      this.singleData = data
    },
    //  查看图片
    showImg(data) {
      this.imgUrl = data.picUrl
      this.$forceUpdate()
    },
    //  关闭大图
    closeImg() {
      this.imgUrl = ''
    },
    //  终止还是删除
    delOrEnd(data, index) {
      this.singleData = data
      if (data.addStatus === false) {
        this.bannerData.splice(index, 1)
      } else {
        this.modalBoolean = true
      }
    },
    // 新增banner图
    addBanner() {
      this.bannerData.push({
        picUrl: '',
        endTime: '',
        linkUrl: '',
        startTime: '',
        remark: '',
        addStatus: false
      })
    },
    // 确认终止弹框
    bannerOk() {
      if (this.stopReason === '') {
        this.$Message.error('终止失败，请填写终止原因')
      } else {
        let endData = {
          id: this.singleData.ptBannerId,
          reason: this.stopReason
        }
        api.shoppingEndBanner(endData).then(data => {
          if (data === true) {
            this.getCurrentListData()
            this.$Message.info('终止成功')
          }
        })
      }
    },
    // 关闭终止弹框
    bannerCancel() {
      this.$Message.info('关闭终止弹框')
    },
    // 保存修改
    saveEdit() {
      api.shoppingSaveBanner(this.bannerData).then(data => {
        if (data === true) {
          this.getCurrentListData()
        }
      })
    },
    // 点击分页
    onChange(page) {
      this.pageNo = page
      this.getCurrentListData()
    }
  }
}
</script>
<style lang="css" scoped>
table{
    width:100%;
    text-align:center;
    border-collapse: collapse;
  }

  table th{
    background-color:#f8f8f9;
  }

  table tr:first-child{
    height:40px;
  }

  table td,table th{
    border:1px solid #e9eaec;
    overflow: hidden;
  }

  table tr td p{
    margin:10px auto;
  }

  table tr td p span{
    margin-right:5px;
  }

table tr td button{
  width:80%;
  height:30px;
  color:#fff;
  border:none;
  outline: none;
  border-radius:4px;
  background-color:#2d8cf0;
  cursor:pointer;
}

table tr td div.mask{
  position: absolute;
  top:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.4);
  visibility: hidden;
}

table  tr td div.mask a{
  color:#fff;
}

.inputFile{
  opacity: 0;
}

div.big-img{
  position:fixed;
  display: flex;
  align-items: center;
  justify-content:center;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:9999;
  background-color:rgba(0,0,0,.4)
}

div.big-img>img{
  width:40%;
}

div.big-img>span{
  position: fixed;
  display:block;
  text-align:center;
  width:40px;
  height:40px;
  line-height:40px;
  top: 50px;
  right: 40px;
  font-size: 20px;
  border-radius:20px;
  cursor:pointer;
  background-color:rgba(255,255,255,.5)
}

textarea{
  width:100%;
  height:140px;
  resize: none;
  outline: none;
  margin:auto;
}
 </style>
