/*
 * @Author: WuFengliang 
 * @Date: 2017-10-26 11:33:36 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 账户余额管理查看 
 */
<template>
  <div>
    <table v-if="singleData">
      <tr>
        <th>用户ID</th>
        <th>用户手机号码</th>
        <th>用户昵称</th>
        <th v-if="params.accountType == 1">用户余额</th>
        <th v-if="params.accountType != 1">账户积分</th>
        <th v-if="params.accountType != 1">账户状态</th>
      </tr>
      <tr>
        <td>{{singleData.custId}}</td>
        <td>{{singleData.mobileno}}</td>
        <td>{{singleData.custName}}</td>
        <td v-if="params.accountType == 1">{{singleData.balance/100}}</td>
        <td v-if="params.accountType != 1">{{singleData.coins}}</td>
        <td v-if="params.accountType != 1">{{singleData.status === 1 ? '正常':'冻结'}}</td>
      </tr>
    </table>
    <div class="account-money-detail">
      <h3>账户{{params.accountType == 1 ? '余额':'积分'}}流水</h3>
      <Table v-if="data" border :columns="changeTitle" :data="data.records"></Table>   
      <Page v-if="data" :total="data.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
    </div>
  </div>
</template>
<script>
import * as http from 'api/common'
export default {
  name: 'accountMoneyDetail',
  data() {
    return {
      params: {
        custId: '',
        accountType: '', //  1是流水 2是积分
        pageSize: 10,
        pageNo: 1
      },
      singleData: null, //  查看用户获取到的数据
      changeTitle: [
        {
          title: '时间',
          key: 'changeAt',
          align: 'center',
          render: (h, params) => {
            return h('span', this.filterTime(params.row.changeAt))
          }
        },
        {
          title: '方式',
          key: 'changeType',
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              this.filterType(params.row.changeType, params.row.changeVal)
            )
          }
        },
        {
          title: '账户余额(元)',
          key: 'chanerAfter',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.chanerAfter / 100)
          }
        }
      ],
      data: null
    }
  },
  created() {
    this.params.custId = this.$route.query.custId
    this.params.accountType = this.$route.query.accountType
    this.loopAccount()
    this.getAccountMoneyChange()
  },
  methods: {
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
    },
    //  过滤方式
    filterType(type, value) {
      let str = ''
      switch (type) {
        case 0:
          str = '退款'
          break
        case 1:
          str = '充值'
          break
        case 2:
          str = '消费'
          break
        case 3:
          str = '分享'
          break
        case 4:
          str = '奖励'
          break
        case 5:
          str = '购物获得积分'
          break
        case 6:
          str = '分销获得积分'
          break
      }
      return str + '  ' + value
    },
    //  查看用户账户
    loopAccount() {
      http.loopAccount(this.params).then(data => {
        this.singleData = data
      })
    },
    //  查看用户账户变更流水
    getAccountMoneyChange() {
      http.getAccountMoneyChange(this.params).then(data => {
        this.data = data
      })
    },
    //  加载下一页
    loadNext(num) {
      this.params.pageNo = num
      this.getAccountMoneyChange()
    }
  }
}
</script>
<style lang="css" scoped>
table {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table th,
table td {
  height: 40px;
  border: 1px solid #ccc;
  text-align: center;
}
h3 {
  margin: 20px auto;
  line-height: 20px;
}
</style>