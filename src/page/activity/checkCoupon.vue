<template>
  <div>
    <div class="addCoupon">
    <div class="header">
      <h2>查看优惠券</h2>
    </div>
    <div class="content">
      <ul>
        <li><span>发放类型</span><span>{{ checkCoupon.typesName }}</span></li>
        <li><span>属性</span><span class="mr10"><label class="mr10" v-for="item in attributeList" :key="item.value"><input disabled type="radio" v-model="checkCoupon.couponAttribute" :value="item.value"> {{ item.label }}</label></span></li>
        <li><span>劵名</span><span>{{ checkCoupon.couponName }}</span></li>
        <li><span>使用条件</span>订单满<span>{{ checkCoupon.useCondition }}</span>可使用<span class="gray">(无限制条件,数值为0)</span></li>
        <li><span>优惠价格</span><span>{{ checkCoupon.discount }}</span><span style="font-size: 14px;" v-if="ifType">%</span></li>
        <li><span>发放数量</span><span class="mr10">{{ num }}</span><span v-if="checkCoupon.amount > -1">{{ checkCoupon.amount }}</span></li>
        <li><span>限领规则</span><span class="mr10"><label class="mr10" v-for="item in limitAmount" :key="item.value"><input disabled class="mr5" v-model="checkCoupon.couponLimit" type="radio" :value="item.value">{{ item.label }}</label></span></li>
        <li><span>领券设置</span><span class="mr10"><label class="mr10" v-for="item in voucherSetting" :key="item.value"><input disabled class="mr5" type="radio" v-model="checkCoupon.couponSet" :value="item.value">{{ item.label }}</label></span></li>
        <li><span>发放周期</span><span>{{ formatDateTime(checkCoupon.distributeStartTime) }}</span><span> ~ </span><span>{{ formatDateTime(checkCoupon.distributeEndTime) }}</span></li>
        <li><span>有效周期</span><span>{{ cyclelabel }}</span></li>
        <li><span>备注信息</span><span>{{ checkCoupon.remark }}</span></li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
import * as http from 'api/common'
export default {
  // components: {},
  data() {
    return {
      attributeList: [{ label: '常规券', value: 1 }, { label: '补偿券', value: 2 }],
      limitAmount: [
        { label: '发券周期内限领1张', value: 1 },
        { label: '发券周期内每天限领1张', value: 2 }
      ],
      voucherSetting: [
        { label: '新用户可领', value: 1 },
        { label: '邀请好友后，好友可领', value: 2 },
        { label: '全部用户可领', value: 3 }
      ],
      couponAttribute: 1, // 属性
      couponSet: 1, // 领券设置
      couponLimit: 1, // 领券规则
      ifType: false,
      couponId: '',
      num: '',
      cyclelabel: '',
      checkCoupon: []
    }
  },
  created: function() {
    this.seeCoupon()
  },
  methods: {
    // 优惠券详情
    seeCoupon() {
      this.couponId = this.$route.query.id
      http.seeCoupon(this.couponId).then(res => {
        this.checkCoupon = res
        if (res.amount === -1) {
          this.num = '无限制'
        } else if (res.amount > -1) {
          this.num = '有限制'
        }
        if (res.effectivePeriod && res.effectivePeriod != null) {
          this.cyclelabel = res.effectivePeriod
        } else {
          this.cyclelabel = this.formatDateTime(res.effectiveStartTime) + ' ~ ' + this.formatDateTime(res.effectiveEndTime)
        }
      })
    },
    // 时间格式化
    formatDateTime(inputTime) {
      if (inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? '0' + minute : minute
        second = second < 10 ? '0' + second : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
    }
  }
}
</script>
<style lang="css" scoped>
.mr10 {
  margin-right: 10px;
}
.mr5 {
  margin-right: 5px;
}
.gray {
  font-size: 12px;
  color: #ccc;
}
.h60 {
  width: 60px;
  height: 28px;
}
.ds {
  display: inline-block;
}
input:focus,
textarea:focus {
  border-color: #57a3f3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
input,
textarea {
  border: 1px solid #dddee1;
}
.header {
  margin-bottom: 20px;
}
.addCoupon {
  margin: 0 auto;
  width: 792px;
  height: 100%;
}
ul li {
  padding-bottom: 10px;
}
ul li span:nth-child(1) {
  width: 50px;
  display: inline-block;
  margin-right: 10px;
}
.remake {
  width: 300px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  overflow: hidden;
  resize: none;
}

.footer {
  margin-top: 20px;
  margin-left: 60px;
}
</style>