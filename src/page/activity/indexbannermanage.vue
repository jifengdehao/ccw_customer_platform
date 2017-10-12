/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-10 17:39:24 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: banner管理导航 
 */

<template>
  <Tabs value="current" :animated="false">
    <TabPane label="当前" name="current">
      <current-update></current-update>
    </TabPane>
    <TabPane label="待更新" name="stayUpdate">
      <stay-update></stay-update>
    </TabPane>
    <TabPane label="历史更新" name="historyUpdate">
      <history-update></history-update>
    </TabPane>
  </Tabs>
</template>
<script type="text/ecmascript-6">
// 当前页面加载
import currentUpdate from './currentUpdate.vue'
// 待更新页面加载
import stayUpdate from './stayUpdate'
// 历史页面加载
import historyUpdate from './historyUpdate'

export default {
  components: {
    currentUpdate,
    stayUpdate,
    historyUpdate
  }
}
</script>

<style scoped lang="css">

</style>
