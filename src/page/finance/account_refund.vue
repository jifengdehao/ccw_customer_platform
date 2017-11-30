/*
 * @Author: huShangJun 
 * @Date: 2017-11-30 09:45:07 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 用户账户退款申请
 */
<template>
  <div class="refundApplication">
    <Tabs :animated="false"  @on-click="changeTable">
      <TabPane v-for="tab in tabs" key :label="tab.title">
        <Table border :columns="remindColumns" :data="remindData"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tabs: [
        { title: '申请中' },
        { title: '退款中' },
        { title: '已完成' },
        { title: '已驳回' }
      ],
      remindColumns: [],
      remindData: []
    }
  },
  created() {},
  mounted() {},
  activited: {},
  update: {},
  methods: {
    changeTable(index) {
      console.log(index)
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>

</style>