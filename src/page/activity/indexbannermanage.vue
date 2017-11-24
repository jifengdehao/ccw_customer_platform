/*
* @Author: ZengFanlu
* @Date: 2017-10-10 17:39:24
* DeveloperMailbox:   zengfanlu@ccw163.com
* FunctionPoint: banner管理导航
*/

<template>
  <div>
    <Tabs @on-click="onBannerMenu" :animated="false">
      <TabPane v-for="tab in bannerMenu" :key="tab.id" :label="tab">
        <div class="add-image" v-if="addShow">
          <Button class="add-button" @click="addImage" type="primary" size="large">新增</Button>
        </div>
        <div style="width: 100%; min-width: 1220px;">
          <!-- <Table ref="currentRowTable" :columns="changeTitle" :data="bannerData"></Table> -->
          <table class="table-banner" v-if="status === 0 || status === 1">
            <tbody>
              <tr>
                <th v-for="tab in bannerTHdata" :key="tab.id" :width="tab.style">{{ tab.key }}</th>
              </tr>
              <tr v-if="bannerData && bannerData.length <= 0" style="height: 40px;">
                <td colspan="12">暂无数据</td>
              </tr>
            </tbody>
          </table>
            <draggable @update="datadragEnd" v-if="status === 0 || status === 1" v-model="bannerData">
              <tr v-for="(data, index) in bannerData" :key="data.id" class="draggable">
                  <td class="br" style="width: 22%">
                    <img style="height: 156px; width: 100%;" v-if="data.picUrl" :src="data.picUrl">
                  </td>
                  <td class="br" style="width: 10%">
                    <div class="upload">
                      <input type="file" @change="onUpload($event, data)" value="上传">上传
                    </div>
                  </td>
                  <td class="br link" style="width: 20%">
                    <input v-model="data.linkUrl" type="text" :value="data.linkUrl">
                    <a target="_blank" :href="data.linkUrl">跳转链接</a>
                  </td>
                  <td class="br" style="width: 20%">
                    <input v-model="data.remark" type="text" :value="data.remark">
                  </td>
                  <td style="width: 18%" class="br">
                    <DatePicker type="datetime" placeholder="选择日期和时间" placement="left" style="width: 200px; margin-bottom: 5px;" v-model="data.startTime" :value="data.startTime"></DatePicker>
                    <DatePicker type="datetime" placeholder="选择日期和时间" placement="left" style="width: 200px" v-model="data.endTime" :value="data.endTime"></DatePicker>
                  </td>
                  <td style="width: 10%; border-top: 0 !important;"><Button type="error" @click="onChangButton(data, index)">{{ bannerState }}</Button></td>
                </tr>
            </draggable>
          <!-- 已结束start -->
          <table class="table-banner" v-if="status === 2">
            <tbody>
              <tr>
                <th v-for="tab in bannerThENDdata" :key="tab.id" :width="tab.style">{{ tab.key }}</th>
              </tr>
              <tr v-for="(data, index) in bannerData" :key="data.id">
                <td>{{ index + 1 }}</td>
                <td>{{ data.remark }}</td>
                <td>{{ formatDateTime(data.startTime) }}</td>
                <td>{{ formatDateTime(data.endTime) }}</td>
                <td><Button type="primary" @click="seeModal(data)">查看</Button></td>
              </tr>
              <tr v-if="bannerData && bannerData.length <= 0" style="height: 40px;">
                <td colspan="12">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <!-- 已结束end -->
        </div>
        <div class="save-change" v-if="saveShow && bannerData.length > 0" style="margin-bottom: 40px;">
          <Button @click="getSaveChanges" type="primary" size="large">保存修改</Button>
        </div>
        <!-- 查看banner模态框start -->
        <div class="mask-box" v-if="status === 2 && seeBannerClose">
            <div class="show-box">
              <div @click="onClose"><Icon style="float: right; margin-bottom: 20px; font-size: 32px; cursor: pointer;" type="ios-close-empty"></Icon></div>
              <table>
                <tr>
                  <th>banner位置</th>
                  <th>图片</th>
                  <th>跳转链接</th>
                  <th>上传说明</th>
                  <th>时间</th>
                </tr>
                <tr>
                  <td>{{ seeBannerData.ptBannerId }}</td>
                  <td>
                    <img style="width: 400px; height: 200px" :src="seeBannerData.picUrl" alt="">
                  </td>
                  <td>{{ seeBannerData.linkUrl }}</td>
                  <td>{{ seeBannerData.remark }}</td>
                  <td>
                    <p>开始时间：{{ formatDateTime(seeBannerData.startTime) }}</p>
                    <p>结束时间：{{ formatDateTime(seeBannerData.endTime) }}</p>
                  </td>
                </tr>
              </table>
            </div>
      </div>
      </TabPane>
    </Tabs>
    <Page v-if="bannerData && bannerData.length > 0" style="margin-top: 20px; float: right;" :total="total" :current="pageNo" @on-change="onChange"></Page>
  </div>
</template>
<script type="text/ecmascript-6">
import * as api from 'api/common.js'
import draggable from 'vuedraggable'
import { uploadpic } from 'components/upload-pic'

export default {
  components: { draggable },
  data() {
    return {
      bannerMenu: ['已开始', '未开始', '已结束'], // 切换导航数据
      bannerIndex: 0, // 切换id
      bannerData: [], // 列表数据
      addBannerData: [], // 自增列表数据
      addShow: false, // 显示新增按钮
      saveShow: true, // 保存按钮
      changeTitle: [], // 切换table 列表title改变
      bannerState: '结束', // 操作按钮变更
      bannerTHdata: [
        {
          key: '图片',
          style: '22%'
        },
        {
          key: '图片管理',
          style: '10%'
        },
        {
          key: '跳转链接',
          style: '20%'
        },
        {
          key: '上传说明',
          style: '20%'
        },
        {
          key: '时间',
          style: '18%'
        },
        {
          key: '操作',
          style: '10%'
        }
      ], // th title 内容
      bannerThENDdata: [
        {
          key: '序号',
          style: '20%'
        },
        {
          key: '上传说明',
          style: '20%'
        },
        {
          key: '开始时间',
          style: '20%'
        },
        {
          key: '结束时间',
          style: '20%'
        },
        {
          key: '操作',
          style: '20%'
        }
      ], // th title 已结束内容
      pageNo: 1, // 当前页面
      pageSize: 10, // 分页参数，表示每页显示多少条
      status: 0, // banner图状态（目前0、待更新1、历史更新2）
      seeBannerClose: false, // 查看banner弹框 默认关闭
      seeBannerData: [], // 保存查看banner数据
      formData: {},
      total: null, // 总页数
      uploadImg: '' // 上传图片
    }
  },
  created: function() {
    this.changeTitle = this.columns1 // 默认title数据
    this.getCurrentListData() // 初始化已开始数据
  },
  methods: {
    // 点击切换导航tabs
    onBannerMenu(value) {
      this.status = value // 保存状态值 根据点击table
      this.addShow = false // 新增按钮 默认隐藏
      this.bannerState = '结束' // 操作按钮变更
      this.changeTitle = this.columns1 // title数据变更
      this.saveShow = true // 保存按钮 默认显示
      this.pageNo = 1 // 每次切换导航默认值
      this.getCurrentListData()
      switch (value) {
        case 0:
          break
        case 1:
          this.addShow = true // 显示新增按钮
          this.bannerState = '删除'
          break
        case 2:
          this.changeTitle = this.columns2 // 变更title数据
          this.saveShow = false // 保存按钮 隐藏
      }
    },
    // 新增对象
    addImage() {
      this.bannerData.push({
        picUrl: '',
        endTime: '',
        linkUrl: '',
        startTime: '',
        remark: '',
        addStatus: false
      })
    },
    // 请求banner列表数据
    getCurrentListData() {
      let params = {
        status: this.status, // banner图状态（目前0、待更新1、历史更新2）
        pageSize: this.pageSize, // 分页参数，表示每页显示多少条
        pageNo: this.pageNo
      }
      api.seeBannerList(params, this.pageNo).then(data => {
        // 请求数据
        this.bannerData = data.records
        this.total = data.total
      })
    },
    // 点击操作button 结束 删除
    onChangButton(data, index) {
      if (this.status === 0) {
        // 点击结束
        api.endBanner(data.ptBannerId).then(data => {
          if (data === true) {
            this.getCurrentListData() // 调用列表数据
          }
        })
      } else if (this.status === 1) {
        // 点击删除
        if (!data.ptBannerId) {
          // 如果为空id 不发送请求
          this.bannerData.splice(index, 1)
          return false
        } else {
          api.deleteBanner(data.ptBannerId).then(data => {
            if (data === true) {
              this.getCurrentListData() // 调用列表数据
            }
          })
        }
      }
    },
    // 查看banner弹框数据
    seeModal(data) {
      api.seeBanner(data.ptBannerId).then(res => {
        if (res && res != null) {
          this.seeBannerData = res
        }
      })
      this.seeBannerClose = true // 打开查看bnner模态框
    },
    //  关闭查看banner弹框
    onClose() {
      this.seeBannerClose = false
    },
    // 保存修改
    getSaveChanges() {
      if (this.status === 1) {
        // 调用自增 保存api
        api.addUpdataBanner(this.bannerData).then(data => {
          if (data === true) {
            this.getCurrentListData()
          }
        })
      } else if (this.status === 0) {
        api.addUpdataBanner(this.bannerData).then(data => {
          if (data === true) {
            this.getCurrentListData()
          }
        })
      }
    },
    // 上传图片
    onUpload(e, data) {
      let url = ''
      switch (this.status) {
        case 0:
          url = e.target.files[0]
          break
        case 1:
          url = e.target.files[0]
          break
      }
      uploadpic(url).then(res => {
        if (res) {
          data.picUrl = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
        }
      })
    },
    // 拖拽
    datadragEnd(evt) {
      // console.log('拖动前的索引 :' + evt.oldIndex)
      // console.log('拖动后的索引 :' + evt.newIndex)
      // console.log(this.bannerData, '22')
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
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
    },
    // 点击分页
    onChange(page) {
      switch (this.status) {
        case 0:
          this.pageNo = page
          break
        case 1:
          this.pageNo = page
          break
        case 2:
          this.pageNo = page
      }
      this.getCurrentListData()
    }
  }
}
</script>

<style scoped lang="css">
.add-image {
  text-align: right;
  margin-bottom: 20px;
}

.add-image .add-button {
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  color: #fff;
}

.save-change {
  text-align: center;
  margin-top: 20px;
}

.ivu-table td {
  height: 190px !important;
}

/* table */
table.table-banner,
.draggable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  width: 100%;
  color: #495060;
  font-size: 12px;
  border: 1px solid #666666;
  border-collapse: collapse;
}

table.table-banner th {
  padding: 8px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
}

table.table-banner td,
.draggable td {
  position: relative;
  padding: 8px;
  text-align: center;
  border: 1px solid #e9eaec;
  background-color: #ffffff;
  vertical-align: middle;
}

table.table-banner td > input[type='text'],
.draggable td > input[type='text'] {
  width: 200px;
  padding-left: 5px;
  outline: none;
}

.draggable td > .upload {
  /* width: 120px;
  height: 33px;
  line-height: 30px; */
  padding: 6px 10px;
  display: inline-block;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #2d8cf0;
  background-color: #2d8cf0;
  outline: none;
}

.draggable td .upload > input[type='file'] {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.link > a {
  display: inline-block;
  text-align: center;
}

.br {
  border-top: 0 !important;
  border-right: 0 !important;
}

/* 查看模态框 */
.mask-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.3);
}

.show-box {
  box-sizing: border-box;
  padding: 20px;
  width: calc(100% - 400px);
  position: fixed;
  top: 30%;
  left: 50%;
  margin-top: -140px;
  margin-left: calc(-50% + 240px);
  background-color: #fff;
  overflow: hidden;
}

.show-box table {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
.show-box table tr th {
  padding: 8px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
}

.show-box table tr td {
  padding: 8px;
  text-align: center;
  border: 1px solid #e9eaec;
  background-color: #ffffff;
}
.ds {
  display: none;
}
.show {
  display: block;
}
</style>
