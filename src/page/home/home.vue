/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-首页
*/
<template>
  <div id="home">
    <div class="title">
      <h1>欢迎来到菜城平台后台</h1>
    </div>
    <div class="data-total">
      <i-row :gutter="32">
        <i-col span="8">
          <h2>平台数据</h2>
          <i-table :columns="columns1" :data="data1" border></i-table>
        </i-col>
        <i-col span="8">
          <h2>用户数据</h2>
          <i-table :columns="columns2" :data="data2" border></i-table>
        </i-col>
        <i-col span="8">
          <h2>商户数据</h2>
          <i-table :columns="columns3" :data="data3" border></i-table>
        </i-col>
      </i-row>
      <i-row :gutter="32">
        <i-col span="12">
          <h2>送达时间订单量</h2>
          <div class="vm-border">
            <ve-histogram :data="chartData1"
                          :grid="chartGrid1"
                          :legend="chartLegend1">
            </ve-histogram>
          </div>
        </i-col>
        <i-col span="12">
          <h2>月订单量及退款单量</h2>
          <div class="vm-border">
            <ve-line :data="chartData2"
                     :grid="chartGrid2"
                     :legend="chartLegend2">
            </ve-line>
          </div>
        </i-col>
      </i-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'

  export default {
    name: 'home',
    data () {
      return {
        columns1: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '数据',
            key: 'value',
            align: 'center'
          }
        ],
        data1: [],
        columns2: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '数据',
            key: 'value',
            align: 'center'
          }
        ],
        data2: [],
        columns3: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '数据',
            key: 'value',
            align: 'center'
          }
        ],
        data3: [],
        chartData1: {},
        chartLegend1: {
          top: 20,
          data: ['订单量']
        },
        chartGrid1: {
          top: 80,
          bottom: 30,
          right: 30,
          left: 20
        },
        chartGrid2: {
          top: 80,
          bottom: 30,
          right: 30,
          left: 20
        },
        chartData2: {},
        chartLegend2: {
          top: 20,
          data: ['月订单量', '退款单量']
        }
      }
    },
    created: function () {
      this.getIndexData()
    },
    methods: {
      getIndexData () {
        api.getIndexData().then((res) => {
          console.log(res)
          if (res) {
            this.chartData1 = {
              columns: ['时间', '订单量'],
              rows: res.ptOrderAmounts.map((item) => {
                return {'时间': item.timeType, '订单量': item.timeOrders}
              })
            }
            this.chartData2 = {
              columns: ['时间', '月订单量', '退款单量'],
              rows: res.ptOrderMonths.map((item) => {
                return {'时间': item.dayNo, '月订单量': item.dayOrders, '退款单量': item.dayChargebacks}
              })
            }
            this.data1 = [
              {
                name: '月访客',
                value: res.ptIndexPlatform.monthUniqueVisitors
              },
              {
                name: '月独立访客',
                value: res.ptIndexPlatform.monthIpVisitors
              },
              {
                name: '月订单',
                value: res.ptIndexPlatform.monthOrders
              },
              {
                name: '转化率',
                value: res.ptIndexPlatform.conversionRate + '%'
              },
              {
                name: '复购率',
                value: res.ptIndexPlatform.repurchaseRate + '%'
              },
              {
                name: '客单价',
                value: '¥' + res.ptIndexPlatform.perCustomerTransaction
              }
            ]
            this.data2 = [
              {
                name: '本月用户量(人)',
                value: res.ptIndexCustomer.monthBuyers
              },
              {
                name: '月新增用户',
                value: res.ptIndexCustomer.monthNewCustomers
              },
              {
                name: '总用户量(人)',
                value: res.ptIndexCustomer.customersTotal
              },
              {
                name: '男性/男性占比',
                value: res.ptIndexCustomer.maleTotal + '/' + res.ptIndexCustomer.maleProportion + '%'
              },
              {
                name: '女性/女性占比',
                value: res.ptIndexCustomer.femaleTotal + '/' + res.ptIndexCustomer.femaleProportion + '%'
              },
              {
                name: '',
                value: ''
              }
            ]
            this.data3 = [
              {
                name: '商户总数',
                value: res.ptIndexSeller.sellerTotal
              },
              {
                name: '月新增商户',
                value: res.ptIndexSeller.monthNewSellers
              },
              {
                name: '商户差评总量',
                value: res.ptIndexSeller.sellerNegativeComment
              },
              {
                name: '违规商户',
                value: res.ptIndexSeller.illegalSellers
              },
              {
                name: '',
                value: ''
              },
              {
                name: '',
                value: ''
              }
            ]
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #home
    .title
      height 100px
      line-height 100px
      text-align center
      border-bottom 1px solid #999
    .data-total
      padding 0 20px 80px 20px
      text-align center
      h2
        margin 40px 0

</style>


