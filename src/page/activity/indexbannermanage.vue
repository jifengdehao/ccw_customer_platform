/*
* @Author: ZengFanlu
* @Date: 2018-01-25 10:52:15
* DeveloperMailbox:   zengfanlu@ccw163.com
* FunctionPoint: banner管理迭代功能
*/

<template>
  <div>
    <Tabs :animated="false" @on-click="onBannerMenu">
      <TabPane v-for="tabs in bannerMenu" :key="tabs" :label="tabs">
        <table class="sp-grid-import">
          <thead>
          <tr>
            <th v-for="(tableTH, index) in bannerHead" :key="index" :width="tableTH.style">{{ tableTH.key }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="params.status === 1" v-for="data in bannerData" :key="data.id">
            <td>
              <p v-if="data.isUpdate === 0"> {{ formatDateTime(data.createAt) }} ~ {{ formatDateTime(data.endTime) }} </p>
              <div v-if="data.isUpdate === 1">
                <p> <span>开始时间</span> <DatePicker type="datetime" placement="bottom" v-model="data.createAt" :value="data.createAt" :transfer="true" style="width: 200px; margin-bottom: 5px;" placeholder="选择开始日期和时间"></DatePicker> </p>
                <p> <span>结束时间</span> <DatePicker type="datetime" placement="bottom" v-model="data.endTime" :value="data.endTime" :transfer="true" style="width: 200px" placeholder="选择结束日期和时间"></DatePicker> </p>
              </div>
            </td>
            <td>
              <div v-if="data.isUpdate === 0">{{ data.spCategoryName }}</div>
              <Select v-model="data.spCategoryId" :transfer="true" v-if="data.isUpdate === 1">
                <Option v-for="item in cityList" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
              </Select>
            </td>
            <td>
              <p v-if="data.isUpdate === 0"> {{ data.linkUrl }} </p>
              <p v-if="data.isUpdate === 1"> <input type="text" :value="data.linkUrl"> </p>
            </td>
            <td>
              <p v-if="data.isUpdate === 0"> {{ data.remark }} </p>
              <p v-if="data.isUpdate === 1"> <input type="text" :value="data.remark"> </p>
            </td>
            <td style="width: 10%">
              <upload></upload>
            </td>
            <td>{{ formatDateTime(data.createAt) }}</td>
            <td>{{ data.createName }}</td>
            <td>{{ filterStatus(data.isUpdate) }}</td>
            <td>
              <Button type="primary" v-if="data.isUpdate === 0">终止</Button>
              <Button type="error" v-if="data.isUpdate === 1">删除</Button>
            </td>
          </tr>
          <!-- start已结束 -->
          <tr v-if="params.status === 2" v-for="data in bannerData" :key="data.id">
            <td> {{ formatDateTime(data.createAt) }} ~ {{ formatDateTime(data.endTime) }} </td>
            <td> {{ data.spCategoryName }} </td>
            <td> {{ data.linkUrl }} </td>
            <td> {{ data.remark }} </td>
            <td> <img style="width: 100%; height: 156px;" :src="data.picUrl" alt=""> </td>
            <td> {{ formatDateTime(data.startTime) }} </td>
            <td> {{ data.createName }} </td>
            <td> {{ formatDateTime(data.endTime) }} </td>
            <td> {{ data.endName }} </td>
            <td> {{ data.stopReason }} </td>
          </tr>
          <!-- end已结束 -->
          </tbody>
        </table>
      </TabPane>
      <Button type="primary" slot="extra" v-if="params.status === 1">新增</Button>
    </Tabs>
  </div>
</template>
<script>
  import upload from './upload'
  import * as api from 'api/common.js'
  export default {
    components: { upload },
    data() {
      return {
        bannerMenu: ['未开始', '已结束'], // tabs标签页
        bannerTableTH: [
          { key: '生效周期', style: '18%' },
          { key: '关联位置', style: '' },
          { key: '跳转链接', style: '10%' },
          { key: '上传说明', style: '10%' },
          { key: '图片', style: '' },
          { key: '创建时间', style: '8%' },
          { key: '创建人', style: '8%' },
          { key: '状态', style: '' },
          { key: '操作', style: '' }
        ],
        bannerTableTHs: [
          { key: '生效周期', style: '' },
          { key: '关联位置', style: '' },
          { key: '跳转链接', style: '' },
          { key: '上传说明', style: '' },
          { key: '图片', style: '10%' },
          { key: '创建时间', style: '' },
          { key: '创建人', style: '' },
          { key: '终止时间', style: '' },
          { key: '终止人', style: '' },
          { key: '终止原因', style: '' }
        ],
        cityList: [],
        bannerHead: [], // tableTH数据
        params: {
          status: 1, // banner图状态（未开始1、已结束2）
          pageSize: 10, // 分页参数，表示每页显示多少条
          pageNo: 1
        },
        bannerData: [], // 列表数据
        total: null // 列表总页数
      }
    },
    created: function() {
      this.bannerHead = this.bannerTableTH
      this.getCurrentListData()
    },
    methods: {
      // 切换table 获取Index
      onBannerMenu(index) {
        this.params.status = index + 1
        this.getCurrentListData()
        switch (this.params.status) {
          case 1:
            this.bannerHead = this.bannerTableTH
            break
          case 2:
            this.bannerHead = this.bannerTableTHs
        }
      },
      // 请求banner列表数据
      getCurrentListData() {
        api.seeBannerList(this.params, this.params.pageNo).then(data => {
          console.log(data)
          // 请求数据
          this.bannerData = data.page.records
          this.cityList = data.categories
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
      }
    }
  }
</script>
<style lang="css" scoped>
  .sp-grid-import{border-collapse: collapse;width:100%; border:1px solid #E1E6EB; border-left:none;}
  .sp-grid-import thead th{line-height:20px;padding:8px 12px; border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB; white-space: nowrap; text-align:center; font-weight:normal !important;letter-spacing:1px;}
  .sp-grid-import tbody td{position: relative;text-align: center;line-height:20px;padding:8px 10px;font-size:13px;border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB;}
</style>
