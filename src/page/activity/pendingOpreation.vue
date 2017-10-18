/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-12 16:43:03 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 待生效优惠券 查看优惠券页面 
 */

<template>
  <div class="going-coupons">
    <h2>进行中的优惠券</h2>

    <div class="coupons">
      <p>
        <span style="margin-left: 13px;">优惠券类型:</span>
        <span>
          <Select v-model="couponsType" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </span>
      </p>

      <P>
        <span>用户限领券数:</span>
        <span>
          <Input v-model="userNumber" placeholder="请输入..." style="width: 99px"></Input>
        </span>
      </P>

      <p>
        <span style="margin-left: 28px;">每单使用:</span>
        <span>
          <RadioGroup v-model="animal">
            <Radio label="仅使用一张" disabled></Radio>
            <Radio label="叠加使用"></Radio>
          </RadioGroup>
        </span>
      </p>

      <p>
        <span style="margin-left: 28px;">领券设置:</span>
        <span style="width: 400px; display: inline-block;">
          <CheckboxGroup v-model="fruit">
            <Checkbox label="新用户可领" disabled></Checkbox>
            <Checkbox label="全部用户可领"></Checkbox>
            <Checkbox label="邀请好友后，好友可领"></Checkbox>
          </CheckboxGroup>
        </span>
      </p>

      <p>
        <span style="margin-left: 28px;">创建时间:</span>
        <span>
          <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="开始时间/结束时间" style="width: 300px"></DatePicker>
        </span>
      </p>

      <p>
        <span style="margin-left: 28px;"> 折扣管理:</span>
        <span>
          <table class="table-coupons">
            <tbody>
              <tr>
                <th style="width: 10%;">序号</th>
                <th>条件</th>
                <th>折扣</th>
                <th>发放数量</th>
                <th style="width: 14%;">操作</th>
              </tr>
              <tr v-for="(item, index) in couponsMessages" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>
                  订单满<input type="text" v-model="item.setCondition">元使用
                </td>
                <td>
                  折扣<input type="text" v-model="item.setDiscount">%
                </td>
                <td>
                  <input type="text" v-model="item.setDiscount">
                </td>
                <td style="cursor: pointer;">
                  <span @click="onAddCoupons" v-if="(index === couponsMessages.length -1)">添加</span>
                  <span @click="removeCoupons">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </span>
      </p>
      <button @click="onSaveCoupons">保存优惠券</button>
      <button @click="onBack" class="buL">退出当前页</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animal: '仅使用一张', // 每单使用用户选择
      fruit: ['新用户可领'], // 领券设置
      couponsType: '', // 获取优惠券类型
      userNumber: '', // 用户领券数,
      flag: false, // 新增判断
      couponsMessages: [
        {
          setCondition: '11', // 订单满参数
          setDiscount: '223', // 折扣参数
          numCoupons: '334' // 发送优惠券数量
        }
      ],
      cityList: [ // 优惠券类型数据
        {
          value: 'discount',
          label: '折扣券'
        },
        {
          value: 'deductible',
          label: '配送费抵扣券'
        }
      ]
    }
  },
  methods: {
    // 回退
    onBack() {
      this.$router.back()
    },
    // 新增折扣管理
    onAddCoupons() {
      this.couponsMessages.push({
        setCondition: '', // 订单满参数
        setDiscount: '', // 折扣参数
        numCoupons: '' // 发送优惠券数量
      })
    },
    // 删除折扣管理
    removeCoupons() {
      if (this.couponsMessages.length === 1) {
        return false
      }
      this.couponsMessages.splice(1, 1)
    },
    // 保存
    onSaveCoupons() { }
  }
}
</script>
<style lang="css" scoped>
.going-coupons h2 {
  padding-bottom: 20px;
}

.going-coupons p {
  margin-bottom: 7px;
}

.going-coupons p span {
  font-size: 14px;
}

.going-coupons p span:nth-child(1) {
  margin-right: 7px;
}

.going-coupons button {
  margin: 20px 10px 0 63px;
  width: 96px;
  height: 30px;
  font-size: 14px;
  color: #fff;
  outline: none;
  cursor: pointer;
  border: 1px solid #2d8cf0;
  background-color: #2d8cf0;
}

.buL {
  margin-left: 0 !important;
}






































/* 折扣管理 */

table.table-coupons {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  margin: 20px 0 0 60px;
  width: 650px;
  color: #495060;
  font-size: 12px;
  border: 1px solid #666666;
  border-collapse: collapse;
}

table.table-coupons th {
  padding: 8px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
}

table.table-coupons td {
  height: 48px;
  padding: 8px;
  text-align: center;
  border: 1px solid #e9eaec;
  background-color: #ffffff;
}

table.table-coupons td>input {
  width: 100px;
  padding-left: 5px;
  margin: 0 5px;
  outline: none;
}
</style>