/*
 * @Author: WuFengliang 
 * @Date: 2017-10-18 10:34:07 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: banner图管理、市场推送 
 */
<template>
  <div>
    <Tabs @on-click="onBannerMenu" :animated="false" v-model="status">
      <TabPane v-for="tab in bannerMenu" :key="tab.id" :label="tab">
        <div class="add-image" v-if="addShow">
          <Button class="add-button" @click="addImage" type="primary" size="large">新增</Button>
        </div>
        <div>
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
            <tr v-for="data in bannerData" :key="data.id" class="draggable">
                <td class="br">
                  <img style="width:calc(100% - 25px);" :src="data.picUrl">
                </td>
                <td class="br" style="width: 10%">
                  <input type="button" @change="onUpload($event,data)" value="重新上传">
                  <input type="file" @change="onUpload($event,data)" title="上传图片" filetype="image/*">
                </td>
                <td class="br" style="width: 20%">
                  <input v-model="data.linkUrl" type="text" :value="data.linkUrl">
                  <a :href="data.linkUrl"></a>
                </td>
                <td class="br" style="width: 20%">
                  <input v-model="data.remark" type="text" :value="data.remark">
                </td>
                <td style="width: 18%" class="br">
                  <DatePicker type="datetime" placeholder="选择日期和时间" placement="left" style="width: 180px; margin-bottom: 5px;" v-model="data.startTime" :value="data.startTime"></DatePicker><DatePicker type="datetime" placeholder="选择日期和时间" placement="left" style="width: 180px" v-model="data.endTime" :value="data.endTime"></DatePicker>
                </td>
                <td style="width: 10%; border-top: 0 !important;"><Button type="error" @click="onChangButton(data)">{{ bannerState }}</Button></td>
              </tr>
          </draggable>
          <!-- 已结束start -->
          <table class="table-banner" v-if="status === 2">
            <tbody>
              <tr>
                <th v-for="tab in bannerThENDdata" :key="tab.id" :width="tab.style">{{ tab.key }}</th>
              </tr>
              <tr v-for="data in bannerData" :key="data.id">
                <td>{{ data.position }}</td>
                <td>{{ data.remark }}</td>
                <td>{{ data.updateAt }}</td>
                <td>{{ filterTime(data.endTime) }}</td>
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
                    <img :src="seeBannerData.picUrl" alt="">
                  </td>
                  <td>{{ seeBannerData.linkUrl }}</td>
                  <td>{{ seeBannerData.remark }}</td>
                  <td>
                    <p>开始时间：{{ filterTime(seeBannerData.startTime) }}</p>
                    <p>结束时间：{{ filterTime(seeBannerData.endTime) }}</p>
                  </td>
                </tr>
              </table>
            </div>
      </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import * as api from 'api/common'
import * as upload from 'components/upload-pic'
import draggable from 'vuedraggable'
export default {
  name: 'bannerManage',
  components: { draggable },
  data() {
    return {
      bannerMenu: ['未开始', '已开始', '已结束'], // 切换导航数据
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
          key: '更新时间',
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
      formData: {}
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
        position: '',
        remark: '',
        addStatus: '1'
      })
    },
    // 请求banner列表数据
    getCurrentListData() {
      if (this.$route.path.startsWith('/custom/banner_manage')) {
        //  banner管理
        api
          .getBannerList({
            types: this.status
          })
          .then(data => {
            this.bannerData = data
          })
      } else if (this.$route.path.startsWith('/custom/market_push')) {
        //  市场推送
        api
          .getMarketlist({
            status: this.status
          })
          .then(data => {
            this.bannerData = data
          })
      }
    },
    // 点击操作button 结束 删除
    onChangButton(data) {
      if (this.$route.path.startsWith('/custom/banner_manage')) {
        if (this.status === 0) {
          // 点击结束
          data.status = 2
          api.putBannerId(data).then(data => {
            this.getCurrentListData()
          })
        } else if (this.status === 1) {
          // 点击删除
          api.delBannerId(data).then(data => {
            this.getCurrentListData()
          })
        }
      } else if (this.$route.path.startsWith('/custom/market_push')) {
        if (this.status === 0) {
          //  点击结束
          data.status = 2
          api.putMarketId(data).then(data => {
            this.getCurrentListData()
          })
        } else if (this.status === 1) {
          //  点击删除
          api.delMarketId(data).then(data => {
            this.getCurrentListData()
          })
        }
      }
    },
    // 查看banner弹框数据
    seeModal(data) {
      api.seeBanner(data.ptBannerId).then(data => {
        this.seeBannerData = data
      })
      this.seeBannerClose = true // 打开查看bnner模态框
    },
    //  关闭查看banner弹框
    onClose() {
      this.seeBannerClose = false
    },
    // 保存修改
    getSaveChanges() {
      if (this.$route.path.startsWith('/custom/banner_manage')) {
        //  banner保存
        api.saveBannerData(this.bannerData).then(data => {
          this.getCurrentListData()
        })
      } else if (this.$route.path.startsWith('/custom/market_push')) {
        //  市场保存
        api.saveMarketData(this.bannerData).then(data => {
          this.getCurrentListData()
        })
      }
    },
    // 上传图片
    onUpload(e, item) {
      upload.uploadpic(e.target.files[0]).then(data => {
        let res = data[0]
        res = res.indexOf('?') ? res.split('?')[0] : res
        item.picUrl = res
      })
    },
    datadragEnd(evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.bannerData, '22')
    },
    //  时间过滤
    filterTime(value) {
      let date = new Date(value)
      let params = {
        year: date.getFullYear(),
        month:
          date.getMonth() + 1 < 10
            ? '0' + date.getMonth() + 1
            : date.getMonth() + 1,
        day:
          date.getDate() + 1 < 10
            ? '0' + date.getDate() + 1
            : date.getDate() + 1,
        hour:
          date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours(),
        minutes:
          date.getMinutes() + 1 < 10
            ? '0' + date.getMinutes()
            : date.getMinutes(),
        seconds:
          date.getSeconds() + 1 < 10
            ? '0' + date.getSeconds()
            : date.getSeconds()
      }
      return `${params.year}/${params.month}/${params.day} ${params.hour}:${params.minutes}:${params.seconds}`
    }
  },
  watch: {
    $route(to, from) {
      this.bannerIndex = 0
      this.status = 0
      this.addShow = false
      this.saveShow = true
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
  padding: 8px 0;
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

.draggable td > input[type='button'],
.draggable td > input[type='file'] {
  padding: 6px 15px 7px 15px;
  margin-left: 20px;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #2d8cf0;
  background-color: #2d8cf0;
  outline: none;
}

table.table-banner td > input[type='file'],
.draggable td > input[type='file'] {
  position: absolute;
  left: 26px;
  opacity: 0;
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
  top: 50%;
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
</style>
