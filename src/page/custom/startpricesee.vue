/*
 * @Author: WuFengliang 
 * @Date: 2017-10-19 10:47:36 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 运费查看
 */
<template>
  <div class="start-price-see">
    <Table border :columns="priceTitle" :data="priceData"></Table>
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
          title: '省份',
          key: 'provinceName'
        },
        {
          title: '城市',
          key: 'cityName'
        },
        {
          title: '运费',
          key: 'expense'
        },
        {
          title: '用户端即时配送价（元）',
          key: 'instant_expense'
        }
      ],
      priceData: [] //  集合数据
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    //  加载数据
    loadData() {
      http.getPirse().then(data => {
        this.priceData = data
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

