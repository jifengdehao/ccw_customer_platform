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
        <td v-if="params.accountType == 1">{{singleData.balance/100}}</td>
        <td>{{singleData.status === 1 ? '正常':'冻结'}}</td>
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
        :closable="false" @on-ok="refundMoney" @on-cancel="resetSome">
        <p class="money">退款金额:¥<input type="number" v-model="amount" style="margin-left:10px;"></p>
        <p class="money">支付宝姓名: <input type="text" v-model="alipayName"></p>
        <p class="money">支付宝账号: <input type="text" v-model="alipayAccount"></p>
        <p class="money"><span style="display:inline-block;vertical-align:top;">退款原因:&nbsp;&nbsp;</span><textarea style="resize:none;height:60px;" v-model="reason"></textarea></p>
        <p>请按照客服退款操作手册进行正确的合算</p>
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
      amount: '', //  退款金额
      alipayName: '', //  支付宝姓名
      reason: '', //  退款原因
      alipayAccount: '', // 支付宝账号
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
      return str + '  ' + value / 100
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
      if (
        !this.params.custId ||
        !this.alipayAccount ||
        !this.amount ||
        !this.alipayName ||
        !this.reason
      ) {
        this.$Modal.error({
          title: '提示',
          content: '请输入完整',
          onOk: () => {
            this.amount = this.alipayName = this.alipayAccount = this.reason =
              ''
          }
        })
        return
      }

      this.amount = this.toFixed(this.amount)
      http
        .refundMoney({
          mcCustomerId: this.params.custId,
          amount: this.amount,
          alipayAccount: this.alipayAccount,
          alipayName: this.alipayName,
          reason: this.reason
        })
        .then(data => {
          this.amount = this.alipayAccount = ''
          this.$Modal.success({
            title: '提示',
            content: '已发起申请退款',
            onOk: () => {
              this.loopAccount()
              this.getAccountMoneyChange()
            }
          })
        })
    },
    //  取消
    resetSome() {
      this.amount = this.alipayName = this.alipayAccount = this.reason = ''
    },
    //  精准度缺失解决办法
    toFixed(value) {
      if (value.indexOf('.') > 0) {
        let array = value.split('.')
        let arrayInt = array[0]
        let arrayFloat = array[1]

        return arrayInt * 100 + ('0.' + arrayFloat) * 100
      }
      return value * 100
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
  margin: 20px auto;
}
</style>