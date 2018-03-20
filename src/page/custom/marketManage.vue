/*
 * @Author: WuFengliang 
 * @Date: 2018-02-06 16:51:21 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  市场推送
 */
 <template>
  <div>
    <Tabs v-model="tabIndex" @on-click="showTabIndex">
        <TabPane label="未结束">
          <table>
            <tr>
              <th style="width:15%;">生效周期</th>
              <th style="width:30%;">绑定菜市场</th>
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
                  <DatePicker type="date" v-model="banner.startTime" :disabled="banner.status === 0" transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                </p>
                <p>
                  <span>结束时间</span>
                  <DatePicker type="date" v-model="banner.endTime" :disabled="banner.status === 0" transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                </p>
              </td>
              <td>
                <p v-if="banner.status === 0">
                  {{banner.provinceName ? banner.provinceName : ''}} - {{banner.cityName ? banner.cityName : ''}} - {{banner.areaName ? banner.areaName : ''}} - {{banner.marketName ? banner.marketName : ''}}
                </p>
                <p v-else>
                  <Select v-model="banner.provinceId" style="width:120px" @on-change="getCityData($event,index)">
                    <Option v-for="(province,index) in provinceData" :value="province.provinceId" :key="index">{{ province.provinceName}}</Option>
                  </Select>
                  <span>-</span>
                  <Select v-model="banner.cityId" style="width:70px" @on-change="getAreaData($event,index)">
                    <Option v-for="(_city,index) in banner.cityData" :value="_city.cityId" :key="index">{{ _city.cityName }}</Option>
                  </Select>
                  <span>-</span>
                  <Select v-model="banner.areaId" style="width:100px" @on-change="getMarketData($event,index)">
                    <Option v-for="(_area,index) in banner.areaData" :value="_area.areaId" :key="index">{{ _area.areaName}}</Option>
                  </Select>
                  <span>-</span>
                  <Select v-model="banner.psMarketId" style="width:150px">
                    <Option v-for="(market,index) in banner.marketData" :value="market.marketId" :key="index">{{ market.marketName }}</Option>
                  </Select>
                </p>
              </td>
              <td>
                <input type="text" v-model="banner.remark" :disabled="banner.status === 0" :readonly="banner.status === 0">
              </td>
              <td style="position:relative;width:220px;" v-hover>
                <img v-if="banner.picUrl" :src="banner.picUrl" width="200" style="margin:10px auto;">
                <a v-else  @click="showInput(banner)">上传</a>
                <div class="mask" v-if="banner.picUrl && banner.status === 1">
                  <a @click="showInput(banner)">重新上传</a>
                  <a style="margin-left:10px;" @click="showImg(banner)">查看</a>
                </div>
                <div class="mask" v-else>
                  <a v-if="!banner.picUrl && banner.status !== 0" @click="showInput(banner)">上传</a>
                  <a style="margin-left:10px;" @click="showImg(banner)">查看</a>
                </div>
              </td>
              <td>{{filterTime(banner.createdAt)}}</td>
              <td>{{banner.creator}}</td>
              <td>{{banner.status === 0 ? '已开始':'未开始'}}</td>
              <td><button @click="delOrEnd(banner,index)">{{banner.createdAt ? '终止' : '删除'}}</button></td>
            </tr>
            <tr v-if="!bannerData || bannerData.length === 0" style="height:40px;" >
              <td colspan="8">暂无数据</td>
            </tr>
            <tr>
              <td colspan="8" style="height:50px;">
                <button style="width:100px;" @click="addBanner">新增</button>
              </td>
            </tr>
          </table>
          <p style="margin:20px auto;text-align:center;"  v-if="bannerData.length > 0">
            <Button type="primary" style="width:150px;height:40px;" @click="saveEdit">保存修改</Button>
          </p>
        </TabPane>
        <TabPane label="已结束">
          <table>
            <tr>
              <th style="width:15%;">生效周期</th>
              <th style="width:20%;">绑定菜市场</th>
              <th style="width:15%;">上传说明</th>
              <th style="width:210px;">图片</th>
              <th>创建时间</th>
              <th>创建人</th>
              <th>终止时间</th>
              <th>终止人</th>
              <th>备注信息</th>
            </tr>
            <tr v-for="(banner,index) in bannerData" :key="index">
              <td>
                <p>
                  <span>开始时间</span>
                  <DatePicker type="date" v-model="banner.startTime" :disabled="banner.status === 0 || tabIndex === 1" transfer placeholder="请选择开始时间" style="width: 150px"></DatePicker>
                </p>
                <p>
                  <span>结束时间</span>
                  <DatePicker type="date" v-model="banner.endTime" :disabled="banner.status === 0 || tabIndex === 1" transfer placeholder="请选择结束时间" style="width: 150px"></DatePicker>  
                </p>
              </td>
              <td>
                {{banner.provinceName ? banner.provinceName : ''}} - {{banner.cityName ? banner.cityName : ''}} - {{banner.areaName ? banner.areaName : ''}} - {{banner.marketName ? banner.marketName : ''}}
              </td>
              <td>
                <input type="text" v-model="banner.remark" :disabled="banner.status === 0 || tabIndex === 1" :readonly="banner.status === 0 || tabIndex === 1">
              </td>
              <td style="position:relative;width:220px;" v-hover>
                <img v-if="banner.picUrl" :src="banner.picUrl" width="200" style="margin:10px auto;">
                <div class="mask">
                  <a @click="showImg(banner)">查看</a>
                </div>
              </td>
              <td>{{filterTime(banner.createdAt)}}</td>
              <td>{{banner.creator}}</td>
              <td>{{filterTime(banner.stopedAt)}}</td>
              <td>{{banner.stopOperator}}</td>
              <td>{{banner.stopReason}}</button></td>
            </tr>
            <tr v-if="!bannerData || bannerData.length === 0" style="height:40px;">
              <td colspan="9">暂无数据</td>
            </tr>
          </table>
        </TabPane>
    </Tabs>
    <input type="file" class="inputFile" ref="file" @change="onUpload">
    <div class="big-img" v-if="imgUrl">
      <img :src="imgUrl" />
      <span @click="closeImg">X</span>
    </div>
    <Modal
        v-model="modalBoolean"
        title="提示"
        @on-ok="bannerOk"
        @on-cancel="bannerCancel">
        <textarea v-model="stopReason" placeholder="请输入备注信息(字数不得超过50字)"></textarea>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from 'api/common'
import * as upload from 'components/upload-pic'

export default {
  name: 'marketManage',
  components: {},
  data() {
    return {
      routeIndex: 1, //  路由名
      bannerData: [], //  table数据
      singleData: null, //  传入值
      tabIndex: 0,
      provinceData: [], //  省份集合
      cityData: [], //  城市集合
      areaData: [], //  区域集合
      province: '',
      city: '',
      area: '',
      imgUrl: '', //  查看图片url
      modalBoolean: false, //  弹框状态
      stopReason: '' //  终止原因
    }
  },
  directives: {
    hover: {
      inserted(el) {
        el.onmouseover = function() {
          if (this.children[1] && this.children[0].src) {
            this.children[1].style.visibility = 'visible'
          }
        }
        el.onmouseout = function() {
          if (this.children[1] && this.children[0].src) {
            this.children[1].style.visibility = 'hidden'
          }
        }
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    //  获取数据
    getDataList() {
      if (this.bannerData) {
        this.bannerData.length = 0
      }

      http.getMarketlist({ status: this.tabIndex + 1 }).then(response => {
        this.getProvinceData()
        this.bannerData = response
        if (!this.bannerData) {
          this.bannerData = []
          return
        }
        this.bannerData.forEach((item, index) => {
          item.isShow = false
          if (item.status !== 0) {
            item.cityData = item.areaData = item.marketData = []
            this.getCityData(item.provinceId, index)
            this.getAreaData(item.cityId, index)
            this.getMarketData(item.areaId, index)
          }
        })
      })
    },
    //  获取省份
    getProvinceData(fn) {
      http.getProvinceList().then(response => {
        this.provinceData = response
        this.$forceUpdate()
        fn && fn()
      })
    },
    //  省份值变化
    getCityData(provinceId, index, fn) {
      let obj = this.bannerData[index]
      if (!provinceId) {
        return
      }
      obj.cityData = []
      http
        .getCityList({
          provinceId
        })
        .then(response => {
          obj.areaData = obj.marketData = []
          obj.cityData = response
          this.$forceUpdate()
          fn && fn()
        })
    },
    //  区域值变化
    getAreaData(cityId, index, fn) {
      let obj = this.bannerData[index]
      if (!cityId) {
        return
      }
      obj.areaData = []
      http.getAreaList({ cityId }).then(response => {
        obj.areaData = response
        this.$forceUpdate()
        fn && fn()
      })
    },
    //  获取菜市场
    getMarketData(areaId, index) {
      let obj = this.bannerData[index]
      if (!areaId) {
        return
      }
      obj.marketData = []
      http
        .getMarketList({
          areaId
        })
        .then(response => {
          obj.marketData = response
          this.$forceUpdate()
        })
    },
    //  tab索引
    showTabIndex(index) {
      this.getDataList()
    },
    //  显示上传框
    showInput(data) {
      this.$refs['file'].click()
      this.singleData = data
    },
    //  查看图片
    showImg(data) {
      this.imgUrl = data.picUrl
      this.$forceUpdate()
    },
    //  终止还是删除
    delOrEnd(data, index) {
      this.singleData = data
      if (!data.creator) {
        //  删除
        this.bannerData.splice(index, 1)
      } else {
        //  终止
        this.modalBoolean = true
      }
    },
    //  模态框确认
    bannerOk() {
      this.singleData.stopReason = this.stopReason

      http.putMarketId(this.singleData).then(response => {
        this.getDataList()
        this.stopReason = ''
      })
    },
    //  模态框取消
    bannerCancel() {
      this.modalBoolean = false
      this.stopReason = ''
    },
    // 上传图片
    onUpload(e) {
      upload.uploadpic(e.target.files[0]).then(data => {
        let res = data[0]
        res = res.indexOf('?') ? res.split('?')[0] : res
        this.singleData.picUrl = res
        e.target.value = ''
        this.$forceUpdate()
      })
    },
    //  关闭大图
    closeImg() {
      this.imgUrl = ''
    },
    //  添加新banner
    addBanner() {
      this.bannerData.push({
        startTime: '',
        endTime: '',
        remark: '',
        areaId: '',
        psMarketId: null,
        cityId: null,
        provinceId: null,
        cityData: [],
        areaData: [],
        marketData: []
      })
    },
    //  保存修改
    saveEdit() {
      //  市场推送
      http.saveMarketData(this.bannerData).then(response => {
        console.log(this.bannerData)
        this.bannerData.length = 0
        this.getDataList()
      })
    },
    //  时间过滤
    filterTime(value) {
      if (!value) {
        return
      }
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
  watch: {}
}
</script>

<style scoped lang="css">
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

table th {
  background-color: #f8f8f9;
}

table tr:first-child {
  height: 40px;
}

table td,
table th {
  border: 1px solid #e9eaec;
  overflow: hidden;
}

table tr td p {
  margin: 10px auto;
}

table tr td p span {
  margin-right: 5px;
}

table tr td button {
  width: 80%;
  height: 30px;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #2d8cf0;
  cursor: pointer;
}

table tr td div.mask {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  visibility: hidden;
}

table tr td div.mask a {
  color: #fff;
}

.inputFile {
  opacity: 0;
}

div.big-img {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
}

div.big-img > img {
  width: 40%;
}

div.big-img > span {
  position: fixed;
  display: block;
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  top: 50px;
  right: 40px;
  font-size: 20px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
}

textarea {
  width: 100%;
  height: 140px;
  resize: none;
  outline: none;
  margin: auto;
}
</style>
