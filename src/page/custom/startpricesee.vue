/*
 * @Author: WuFengliang 
 * @Date: 2017-10-19 10:47:36 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 运费查看
 */
<template>
  <div class="start-price-see">
    <p style="margin-bottom:20px;">
      <span>省区:</span>
      <Select v-model="id" style="width:200px;margin-left:10px;">
        <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
      </Select>  
    </p>
    <Table border :columns="priceTitle" :data="priceData.records"></Table>
    <Page :total="priceData.total" :current="pageNum" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from 'api/common'
export default {
  name: 'priceSee',
  data() {
    return {
      priceTitle: [
        //  表头
        {
          title: '城市',
          key: 'cityName',
          align: 'center'
        },
        {
          title: '配送费(元)',
          key: 'expense',
          align: 'center'
        },
        {
          title: '免配送费门槛(元)',
          key: 'instant_expense',
          align: 'center'
        },
        {
          title: '计重收费门槛(Kg)',
          key: 'freeFeeWeight',
          align: 'center'
        },
        {
          title: '每增加1Kg收费(元)',
          key: 'oneKgFee',
          align: 'center'
        }
      ],
      priceData: [], //  集合数据
      id: '', //  省区ID
      provinceList: null, //  省份集合
      pageNum: 1 //  页码
    }
  },
  created() {
    this.loadProvinceList()
  },
  methods: {
    //  加载数据
    loadData() {
      if (!this.id) {
        return
      }
      http
        .getPirse({ id: this.id, pageNum: this.pageNum }, { pageSize: 10 })
        .then(data => {
          this.priceData = data
        })
    },
    //  加载所有省区
    loadProvinceList() {
      http.getProvinceList().then(data => {
        this.provinceList = data
        this.id = this.provinceList[0].provinceId
        this.loadData()
      })
    },
    //  加载下一页
    loadNext(name) {
      this.pageNum = name
      this.loadData()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
