/*
 * @Author: WuFengliang 
 * @Date: 2017-10-19 10:47:36 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 运费查看 
 */
<template>
  <div class="start-price-see">
    <Table :columns="priceTitle" :data="priceData"></Table>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'priceSee',
  data() {
    return {
      priceTitle: [ //  表头
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
      priceData: null  //  集合数据
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
