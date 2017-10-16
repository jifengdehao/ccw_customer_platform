/*
 * @Author: ZengFanlu
 * @Date: 2017-10-11 14:34:42
 * DeveloperMailbox:   zengfanlu@ccw163.com
 * FunctionPoint: 查看进行中优惠券页面
 */
<template>
  <div class="going-coupons">
    <h2>进行中的优惠券</h2>

    <div class="coupons">
      <p>
        <span style="margin-left: 13px;">优惠券列席:</span>
        <span>折扣券</span>
      </p>

      <P>
        <span>用户限领券数:</span>
        <span>1</span>
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
        <span style="margin-left: 28px;">起始时间:</span>
        <span>2017/10/11 16:00</span>
      </p>

      <p>
        <span style="margin-left: 28px;">结束时间:</span>
        <span>2017/10/11 16:00</span>
      </p>

      <p>
        <span style="margin-left: 28px;">规则管理:</span>
        <span>
          <Table width="550" style="margin: 15px 63px;" border :columns="columns2" :data="data4"></Table>
        </span>
      </p>
      <button @click="onBack">关闭</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animal: '仅使用一张',
      fruit: ['新用户可领'],
      columns2: [
        {
          title: '序号',
          key: 'serial',
          type: 'index'
        },
        {
          title: '条件',
          key: 'condition'
        },
        {
          title: '折扣',
          key: 'discount'
        },
        {
          title: '发放数量',
          key: 'number'
        }
      ],
      data4: [
        {
          condition: '订单满50元使用',
          discount: '折扣2%',
          number: '1000'
        },
        {
          condition: '订单满50元使用',
          discount: '折扣2%',
          number: '1000'
        },
        {
          condition: '订单满50元使用',
          discount: '折扣2%',
          number: '1000'
        }
      ]
    }
  },
  methods: {
    onBack() {
      this.$router.back()
    }
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
  margin: 20px 63px;
  width: 116px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  outline: none;
  cursor: pointer;
  border: 1px solid #2d8cf0;
  background-color: #2d8cf0;
}
</style>
