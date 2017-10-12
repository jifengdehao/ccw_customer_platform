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
            <ve-histogram :data="chartData1" :settings="chartSettings1" :grid="chartGrid1" :legend="chartLegend1"></ve-histogram>
          </div>
        </i-col>
        <i-col span="12">
          <h2>月订单量及退款单量</h2>
          <div class="vm-border">
            <ve-line :data="chartData2" :settings="chartSettings2" :grid="chartGrid2" :legend="chartLegend2"></ve-line>
          </div>
        </i-col>
      </i-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'home',
  data() {
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
      data1: [
        {
          name: '月访客',
          value: 9999
        },
        {
          name: '月订单',
          value: 9999
        },
        {
          name: '转化率',
          value: '99%'
        },
        {
          name: '复购率',
          value: '99%'
        },
        {
          name: '客单价',
          value: 99
        }
      ],
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
      data2: [
        {
          name: '本月用户量(人)',
          value: 99999
        },
        {
          name: '总用户量(人)',
          value: 999999
        },
        {
          name: '男性/男性占比',
          value: '9999/58%'
        },
        {
          name: '女性/女性占比',
          value: '99998/42%'
        },
        {
          name: '',
          value: ''
        }
      ],
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
      data3: [
        {
          name: '商户总数',
          value: '99999'
        },
        {
          name: '月新增商户',
          value: '99999'
        },
        {
          name: '商户差评总量',
          value: 55
        },
        {
          name: '违规商户',
          value: 2
        },
        {
          name: '',
          value: ''
        }
      ]
    }
  },
  created: function() {
    this.chartData1 = {
      columns: ['时间', '订单量'],
      rows: [
        { '时间': '07:30-08:30', '订单量': 1523 },
        { '时间': '10:30-12:00', '订单量': 1223 },
        { '时间': '16:30-17:30', '订单量': 2123 },
        { '时间': '17:30-18:30', '订单量': 4123 },
        { '时间': '18:30-19:30', '订单量': 3123 }
      ]
    }
    this.chartSettings1 = {}
    this.chartGrid1 = {
      top: 80,
      bottom: 30,
      right: 30,
      left: 20
    }
    this.chartGrid2 = {
      top: 80,
      bottom: 30,
      right: 30,
      left: 20
    }
    this.chartData2 = {
      columns: ['日期', '月订单量', '退款单量'],
      rows: [
        { '日期': '1', '月订单量': 1523, '退款单量': 100 },
        { '日期': '2', '月订单量': 1223, '退款单量': 100 },
        { '日期': '3', '月订单量': 2123, '退款单量': 100 },
        { '日期': '4', '月订单量': 4123, '退款单量': 100 },
        { '日期': '5', '月订单量': 3123, '退款单量': 100 },
        { '日期': '6', '月订单量': 7123, '退款单量': 100 },
        { '日期': '7', '月订单量': 7123, '退款单量': 100 },
        { '日期': '8', '月订单量': 7123, '退款单量': 100 },
        { '日期': '9', '月订单量': 7123, '退款单量': 100 },
        { '日期': '10', '月订单量': 9123, '退款单量': 100 },
        { '日期': '11', '月订单量': 5123, '退款单量': 100 },
        { '日期': '12', '月订单量': 6123, '退款单量': 100 },
        { '日期': '13', '月订单量': 8123, '退款单量': 100 },
        { '日期': '14', '月订单量': 4123, '退款单量': 100 },
        { '日期': '15', '月订单量': 9123, '退款单量': 100 },
        { '日期': '16', '月订单量': 5123, '退款单量': 100 },
        { '日期': '17', '月订单量': 4123, '退款单量': 100 },
        { '日期': '18', '月订单量': 3123, '退款单量': 100 },
        { '日期': '19', '月订单量': 2123, '退款单量': 100 },
        { '日期': '20', '月订单量': 2123, '退款单量': 100 },
        { '日期': '21', '月订单量': 2123, '退款单量': 100 },
        { '日期': '22', '月订单量': 2123, '退款单量': 100 },
        { '日期': '23', '月订单量': 3254, '退款单量': 100 },
        { '日期': '24', '月订单量': 5235, '退款单量': 100 },
        { '日期': '25', '月订单量': 6532, '退款单量': 100 },
        { '日期': '26', '月订单量': 4523, '退款单量': 100 },
        { '日期': '27', '月订单量': 2123, '退款单量': 100 },
        { '日期': '28', '月订单量': 3123, '退款单量': 100 },
        { '日期': '29', '月订单量': 4123, '退款单量': 100 },
        { '日期': '30', '月订单量': 5123, '退款单量': 100 }
      ]
    }
    this.chartSettings2 = {}
    this.chartLegend1 = {
      top: 20,
      data: ['订单量']
    }
    this.chartLegend2 = {
      top: 20,
      data: ['月订单量', '退款单量']
    }
  },
  methods: {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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


