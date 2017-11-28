/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-14 14:44:05 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 分销用户数据页面 
 */

<template>
  <div>延期功能
    <!-- <div class="header">
      <ul>
        <li>
          <span>当前平台用户量</span>
          <span>1000000</span>
        </li>
        <li>
          <span>分销系统产生总积分</span>
          <span>1000000</span>
        </li>
        <li>
          <span>菜一代产生积分</span>
          <span>1000000</span>
        </li>
        <li>
          <span>菜二代产生积分</span>
          <span>1000000</span>
        </li>
      </ul>
    </div>
    <div>
      <p>
        <h2 class="br">分销用户统计</h2>
      </p>
      <div class="circular">
        <ve-pie :data="chartData" :settings="chartSettings" style="width: 700px; margin-top: 40px"></ve-pie>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <p>
        <h2 class="br">分销用户增长量统计</h2>
      </p>
      <div class="circular">
        <ve-line :data="chartData2" :settings="chartSettings" style="width: 700px; margin-top: 40px; padding: 10px;"></ve-line>
      </div>
    </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      chartData: []
    }
  },
  created: function() {
    this.chartData = {
      columns: ['用户', '销量'],
      rows: [{ 用户: '参与分销用户量', 销量: 40 }, { 用户: '未参与分销用户量', 销量: 60 }]
    }
    this.chartSettings = {
      dimension: '用户',
      metrics: '销量',
      hoverAnimation: false
    }
    this.chartData2 = {
      columns: ['date', 'balance'],
      rows: [
        { date: '1月分销用户量', balance: 123 },
        { date: '2月分销用户量', balance: 1223 },
        { date: '3月分销用户量', balance: 2123 },
        { date: '4月分销用户量', balance: 4123 },
        { date: '5月分销用户量', balance: 3123 }
      ]
    }
    this.chartSettings = {
      labelMap: {
        balance: '分销用户量'
      }
    }
  }
}
</script>

<style scoped lang="css">
.header ul {
  width: 100%;
  height: 140px;
}

.header ul {
  margin-left: 100px;
}

.header ul li {
  float: left;
  width: 20%;
  height: 100px;
  border: 1px solid #ccc;
  margin-right: 55px;
  text-align: center;
}

.header ul li span {
  display: inline-block;
  width: 300px;
  font-size: 22px;
  margin-top: 20px;
}

.header ul li span:nth-child(2) {
  margin-top: 4px;
}

.circular {
  width: 700px;
  height: 500px;
  display: inline-block;
  margin: 30px 0 0 550px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.br {
  width: 100%;
  text-align: center;
}
</style>
