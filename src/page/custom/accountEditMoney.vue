/*
 * @Author: WuFengliang 
 * @Date: 2017-10-26 11:33:36 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 账户余额管理编辑 
 */
<template>
  <div>
    <table v-if="singleData">
      <tr>
        <th>用户ID</th>
        <th>用户手机号码</th>
        <th>用户昵称</th>
        <th>用户余额</th>
        <th>账户状态</th>
        <th>操作</th>
      </tr>
      <tr>
        <td>{{singleData.custId}}</td>
        <td>{{singleData.mobileno}}</td>
        <td>{{singleData.custName}}</td>
        <td v-if="params.accountType == 1">{{singleData.balance}}</td>
        <td>{{singleData.status}}</td>
        <td><a @click="editAccount">编辑</a></td>
      </tr>
    </table>
    <div class="account-money-detail">
      <h3>账户余额流水</h3>
      <Table v-if="data" border :columns="changeTitle" :data="data.records"></Table>   
      <Page v-if="data" :total="data.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
    </div>
      <Modal
        v-model="isBoolean"
        :closable="false" @on-ok="refundMoney">
        <p class="money">退款金额:¥<input type="number" v-model="changeVal" style="margin-left:10px;"></p>
        <p>请按照客服退款操作手册</p>
        <p>对话框内容</p>
    </Modal>
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
        accountType: 1, //  1是流水 2是积分
        pageSize: 10,
        pageNo: 1
      },
      isBoolean: false, //  弹框boolean值
      changeVal: '', //  退款金额
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
    this.params.custId = this.$route.params.custId
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
    },
    //  编辑用户
    editAccount() {
      this.isBoolean = true
    },
    //  确定退款
    refundMoney() {
      http
        .refundMoney({
          id: this.params.custId,
          changeVal: this.changeVal
        })
        .then(data => {
          console.log(data)
        })
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
p {
  text-align: center;
}
p.money {
  text-align: center;
  margin: 20px auto 30px;
}
</style>