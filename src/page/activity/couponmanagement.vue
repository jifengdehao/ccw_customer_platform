/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-11 11:00:11 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 优惠券管理 
 */

<template>
  <Tabs value="undayWay" :animated="false">
    <TabPane label="进行中" name="undayWay">
      <unday-way></unday-way>
    </TabPane>
    <TabPane label="待生效" name="pendingEffect">
      <pending-effect></pending-effect>
    </TabPane>
    <TabPane label="已结束" name="complete">
      <complete></complete>
    </TabPane>
    <Button type="primary" @click="addCoupons" size="small" slot="extra">添加</Button>
  </Tabs>
</template>
<script type="text/ecmascript-6">
// 进行中优惠券加载
import undayWay from './undayWay'
// 待生效优惠券列表加载
import pendingEffect from './pendingEffect'
// 已结束优惠券列表加载
import complete from './complete'

export default {
  // 注册
  components: {
    undayWay,
    pendingEffect,
    complete
  },
  methods: {
    // 添加优惠券 进入路由
    addCoupons() {
      this.$router.push('/activity/addCoupons')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
