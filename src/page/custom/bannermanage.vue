/*
* @Author: WuFengliang
* @Date: 2017-10-18 10:34:07
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint: banner图管理、市场推送
*/
<template>
  <div>
    <Tabs>
        <TabPane label="未结束">
          <draggable class="drag" @update="dragEvent" v-model="bannerData">
            <table>
              <tr>
                <th>生效周期</th>
                <th>跳转链接</th>
                <th>上传说明</th>
                <th>图片</th>
                <th>创建时间</th>
                <th>创建人</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr v-for="banner in bannerData">
                <td>
                  <p>
                    <span>开始时间</span>
                    <DatePicker type="date" v-model="banner.startTime" transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                  </p>
                  <p>
                    <span>结束时间</span>
                    <DatePicker type="date" v-model="banner.endTime" transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                  </p>
                </td>
                <td>
                  <input type="text" v-model="banner.linkUrl">
                </td>
                <td>
                  <input type="text" v-model="banner.remark">
                </td>
                <td style="position:relative;width:220px;">
                  <img :src="banner.picUrl" width="200">
                  <div class="mask" v-id="banner.picUrl">
                    <a style="color:#fff;">重新上传</a>
                  </div>
                </td>
                <td>{{filterTime(banner.createdAt)}}</td>
                <td>{{banner.creator}}</td>
                <td>{{banner.status}}</td>
                <td><button>终止</button></td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span>开始时间</span>
                    <DatePicker type="date" transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                  </p>
                  <p>
                    <span>结束时间</span>
                    <DatePicker type="date" transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                  </p>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <a>上传</a>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td><button>删除</button></td>
              </tr>
              <tr>
                <td colspan="8" style="height:50px;">
                  <button style="width:100px;">新增</button>
                </td>
              </tr>
            </table>
          </draggable>
        </TabPane>
        <TabPane label="已结束">
          <draggable class="drag" @update="dragEvent">

          </draggable>
        </TabPane>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from 'api/common'
import * as upload from 'components/upload-pic'
import draggable from 'vuedraggable'

export default {
  name: 'bannerManage',
  components: { draggable },
  data() {
    return {
      routeIndex: 1, //  路由名
      bannerData: null, //  draggale -> table数据
      params: {
        status: 1
      } //  传递参数 -> 未结束1  已结束2
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    //  获取数据
    getDataList() {
      this.checkRoute()
      switch (this.routeIndex) {
        case 1:
          http.getBannerList(this.params).then(response => {
            this.bannerData = response
          })
          console.log('banner')
          break
        case 2:
          console.log('market')
          break
      }
    },
    //  判断路由
    checkRoute() {
      if (this.$route.path.indexOf('/custom/banner_manage') > -1) {
        this.routeIndex = 1 //  banner图管理
      } else if (this.$route.path.indexOf('/custom/market_push') > -1) {
        this.routeIndex = 2 //  市场推送
      }
    },
    // 上传图片
    onUpload(e, item) {
      upload.uploadpic(e.target.files[0]).then(data => {
        let res = data[0]
        res = res.indexOf('?') ? res.split('?')[0] : res
        item.picUrl = res
        e.target.value = ''
      })
    },
    dragEvent(evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.debug(this.bannerData, '22')
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
      if (
        newValue.path.indexOf('/custom/banner_manage') > -1 ||
        newValue.path.indexOf('/custom/market_push') > -1
      ) {
        this.getDataList()
      }
    }
  }
}
</script>

<style scoped lang="css">
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
  background-color:rgba(0,0,0,.4)
}

</style>
