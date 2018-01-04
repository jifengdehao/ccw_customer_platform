<template>
  <div class="addCoupon">
    <div class="header">
      <h2>查看优惠券</h2>
    </div>
    <div class="content">
      <ul>
        <li><span>发放类型</span><span><Select style="width: 160px;" v-model="addCoupon.types" @on-change="changeType"><Option v-for="types in couponTypes" :key="types.value" :value="types.value">{{ types.label }}</Option></Select></span></li>
        <li><span>属性</span><span class="mr10"><RadioGroup v-model="addCoupon.couponAttribute"><Radio v-for="item in attributeList" :key="item" :label="item"></Radio></RadioGroup></span></li>
        <li><span>劵名</span><span><textarea v-model="addCoupon.couponName" class="remake" placeholder="最多输入50个字"></textarea></span></li>
        <li><span>使用条件</span><span>订单满<input @focus="focus($event)" @keyup="onKeyup" v-model="addCoupon.useCondition" style="margin: auto 5px; text-align: center;" class="h60" placeholder="0">可使用<span class="gray">(无限制条件,数值为0)</span></span></li>
        <li v-if="iftypes"><span>优惠价格</span><span><input v-model="addCoupon.discount" @keyup="account" class="h60 mr5" type="text"></span><span style="font-size: 14px;" v-if="ifType">%</span></li>
        <li><span>发放数量</span><span><Select style="width: 160px;" @on-change="changeNum" v-model="addCoupon.amount"><Option v-for="num in numberCoupon" :key="num" :value="num">{{ num }}</Option></Select><input @focus="focus($event)" v-model="amountNum" v-if="ifNum" style="margin-left: 5px; text-align: center;" class="h60" type="text"></span></li>
        <li><span>限领规则</span><span class="mr10"><RadioGroup v-model="addCoupon.couponLimit"><Radio v-for="items in limitAmount" :key="items" :label="items"></Radio></RadioGroup></span></li>
        <li><span>领券设置</span><span class="mr10"><RadioGroup v-model="addCoupon.couponSet"><Radio v-for="list in voucherSetting" :key="list" :label="list"></Radio></RadioGroup></span></li>
        <li><span>发放周期</span><span><DatePicker v-model="addCoupon.distributeStartTime" type="datetime" format="yyyy-MM-dd HH:00:00" placeholder="开始时间" style="width: 200px;"></DatePicker><span style="margin: 0 5px;">~</span><DatePicker v-model="addCoupon.distributeEndTime" type="datetime" format="yyyy-MM-dd HH:00:00" placeholder="结束时间" style="width: 200px"></DatePicker></span></li>
        <li><span>有效周期</span><span><RadioGroup @on-change="changeRadio" v-model="cyclelabel"><Radio label="有效周期"></Radio><DatePicker v-model="addCoupon.effectiveStartTime" type="datetime" format="yyyy-MM-dd HH:00:00" placeholder="开始时间" style="width: 200px"></DatePicker><span style="margin: 0 5px;">~</span><DatePicker v-model="addCoupon.effectiveEndTime" type="datetime" format="yyyy-MM-dd HH:00:00" placeholder="结束时间" style="width: 200px; margin-bottom: 12px;"></DatePicker></br><Radio label="优惠券领取后"></Radio><Select style="width: 70px;" v-model="addCoupon.effectivePeriod"><Option v-for="year in [3, 7, 15]" :key="year" :value="year"></Option></Select>天内有效</RadioGroup></span></li>
        <li><span>备注信息</span><span><textarea v-model="addCoupon.remark" class="remake" placeholder="最多输入50个字"></textarea></span></li>
      </ul>
    </div>
    <div class="footer">
      <Button type="primary" @click="onSave">保存优惠券</Button>
    </div>
     <!-- 保存弹框 -->
    <Modal
        :mask-closable="false"
        v-model="saveAlert"
        title="确认新增"
        @on-cancel="cacle"
        @on-ok="changeSave">
        <p>确定将此条优惠保存？</p>
    </Modal>
  </div>
</template>
<script>
import * as http from 'api/common'
export default {
  data() {
    return {
      couponTypes: [
        {
          label: '抵扣券',
          value: 1
        },
        {
          label: '折扣券',
          value: 2
        },
        {
          label: '满减券',
          value: 3
        },
        {
          label: '免配送费券',
          value: 4
        }
      ],
      attributeList: ['常规券', '补偿券'],
      limitAmount: ['发券周期内限领1张', '发券周期内每天限领1张'],
      voucherSetting: ['新用户可领', '邀请好友后，好友可领', '全部用户可领'],
      numberCoupon: ['无限制', '有限制'],
      addCoupon: {
        types: null, // 发放类型
        couponAttribute: '', //  优惠券属性
        couponName: '', // 优惠券名称
        useCondition: '', // 使用条件
        discount: '', // 优惠价格
        amount: '', // 发放数量
        couponLimit: '', // 领券规则
        couponSet: '', // 领券设置
        distributeStartTime: '', // 开始时间
        distributeEndTime: '', // 结束时间
        effectiveStartTime: '', // 领券开始时间
        effectiveEndTime: '', // 领券结束时间
        effectivePeriod: 3, // 有效周期
        remark: '' // 备注信息
      },
      ifType: false, // 判断折扣券百分号显影
      iftypes: true, // 判断免邮费券显影
      ifNum: false, // 发放数量显影
      cyclelabel: '',
      saveAlert: false,
      newValue: {},
      couponId: '',
      amountNum: ''
    }
  },
  created: function() {
    this.seeCoupon()
  },
  methods: {
    // 优惠券详情
    seeCoupon() {
      this.couponId = this.$route.query.detail
      http.seeCoupon(this.couponId).then(res => {
        this.addCoupon.types = res.types
        this.addCoupon.couponAttribute = res.couponAttributeName
        this.addCoupon.couponName = res.couponName
        this.addCoupon.useCondition = res.useCondition
        this.addCoupon.discount = res.discount
        if (res.amount === -1) {
          this.addCoupon.amount = '无限制'
        } else if (res.amount > -1) {
          this.addCoupon.amount = '有限制'
          this.amountNum = res.amount
        }
        this.addCoupon.couponLimit = res.couponLimitName
        this.addCoupon.couponSet = res.couponSetName
        this.addCoupon.distributeStartTime = res.distributeStartTime
        this.addCoupon.distributeEndTime = res.distributeEndTime
        this.addCoupon.remark = res.remark
        if (res.effectiveStartTime && res.effectiveStartTime != null) {
          this.cyclelabel = '有效周期'
          this.addCoupon.effectiveStartTime = res.effectiveStartTime
          this.addCoupon.effectiveEndTime = res.effectiveEndTime
        } else if (res.effectivePeriod && res.effectivePeriod != null) {
          this.cyclelabel = '优惠券领取后'
          this.addCoupon.effectivePeriod = res.effectivePeriod
        }
      })
    },
    // 发放类型改变
    changeType(type) {
      this.iftypes = true
      this.ifType = false
      switch (type) {
        case 2:
          this.ifType = true
          break
        case 4:
          this.iftypes = false
      }
    },
    // 鼠标进入全选
    focus: function(event) {
      event.currentTarget.select()
    },
    // 限制数字
    onKeyup() {
      let reg = /^[1-9.]\d*$/
      if (new RegExp(reg).test(this.addCoupon.useCondition) === false) {
        this.addCoupon.useCondition = this.addCoupon.useCondition.replace(
          /[^\d.]/g,
          ''
        )
      }
    },
    account() {
      let reg = /^[1-9.]\d*$/
      if (new RegExp(reg).test(this.addCoupon.discount) === false) {
        this.addCoupon.discount = this.addCoupon.discount.replace(/[^\d.]/g, '')
      }
    },
    // 发放数量
    changeNum(amount) {
      if (amount === '有限制') {
        this.ifNum = true
      } else {
        this.ifNum = false
      }
    },
    // 有效筛选
    changeRadio(name) {
      this.cyclelabel = name
    },
    // 打开保存弹框
    onSave() {
      this.saveAlert = true
    },
    // 保存
    changeSave() {
      this.newValue = {}
      // 判断有效期值
      Object.keys(this.addCoupon).forEach(key => {
        if (this.cyclelabel === '有效周期') {
          if (key !== 'effectivePeriod') {
            return (this.newValue[key] = this.addCoupon[key])
          }
        } else if (this.cyclelabel === '优惠券领取后') {
          if (key !== 'effectiveStartTime' && key !== 'effectiveEndTime') {
            return (this.newValue[key] = this.addCoupon[key])
          }
        }
      })

      if (this.newValue.amount === '无限制') {
        this.newValue.amount = -1
      } else if (this.newValue.amount === '有限制') {
        this.newValue.amount = this.amountNum
      }

      if (this.newValue.couponAttribute === '常规券') {
        this.newValue.couponAttribute = 1
      } else if (this.newValue.couponAttribute === '补偿券') {
        this.newValue.couponAttribute = 2
      }

      if (this.newValue.couponLimit === '发券周期内限领1张') {
        this.newValue.couponLimit = 1
      } else if (this.newValue.couponLimit === '发券周期内每天限领1张') {
        this.newValue.couponLimit = 2
      }

      if (this.newValue.couponSet === '新用户可领') {
        this.newValue.couponSet = 1
      } else if (this.newValue.couponSet === '邀请好友后，好友可领') {
        this.newValue.couponSet = 2
      } else if (this.newValue.couponSet === '全部用户可领') {
        this.newValue.couponSet = 3
      }

      for (let oldValue in this.newValue) {
        if (this.newValue[oldValue] === '' || this.newValue[oldValue] === null) {
          console.log(this.newValue[oldValue])
          this.$Message.error('新增数据请填写完整')
          return false
        }
      }
      // 发送请求
      http.addCoupon(this.newValue).then(res => {
        console.log(res)
        if (res === true) {
          this.$Message.info('修改成功')
          window.history.back(-1)
        }
      })
    },
    cacle() {
      this.$Message.info('取消新增')
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
  resize: none;
}

.footer {
  margin-top: 20px;
  margin-left: 60px;
}
</style>