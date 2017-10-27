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
        <th v-if="params.accountType == 2">账户积分</th>
        <th v-if="params.accountType == 2">账户状态</th>
      </tr>
      <tr>
        <td>{{singleData.custId}}</td>
        <td>{{singleData.mobileno}}</td>
        <td>{{singleData.custName}}</td>
        <td v-if="params.accountType == 1">{{singleData.balance}}</td>
        <td v-if="params.accountType == 2">{{singleData.coins}}</td>
        <td v-if="params.accountType == 2">{{singleData.status === 1 ? '正常':'冻结'}}</td>
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
          key: 'changeAtString'
        },
        {
          title: '方式',
          key: 'changeType'
        },
        {
          title: '账户余额(元)',
          key: 'chanerAfter'
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