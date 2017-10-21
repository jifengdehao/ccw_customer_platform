/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-11 11:00:11 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 优惠券管理 
 */

<template>
  <Tabs @on-click="onCouponsMenu" :animated="false">
    <TabPane v-for="tabs in couponsMenu" :key="tabs.id" :label="tabs">
      <Table stripe :columns="columns1" :data="couponsData"></Table>
    </TabPane>
    <Button type="primary" @click="addCoupons" size="large" slot="extra">添加</Button>
  </Tabs>
</template>
<script type="text/ecmascript-6">
export default {
  // 注册
  components: {},
  data() {
    return {
      couponsMenu: ['已开始', '未开始', '已结束'], // table切换
      columns1: [
        // th 数据
        {
          type: 'index',
          title: '序号',
          key: 'number',
          width: '200'
        },
        {
          title: '优惠券类型',
          key: 'couponType'
        },
        {
          title: '活动规则',
          key: 'activityRules'
        },
        {
          title: '活动时间',
          key: 'activityTime'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作人员',
          key: 'operator'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // 查看进行中优惠券
                      this.$router.push(
                        '/activity/vieOngoingInfo?number=' + params.row._index
                      )
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      couponsData: [] // 列表数据
    }
  },
  created: function() {},
  methods: {
    // 点击获取table index
    onCouponsMenu(name) {
      console.log(name)
    },
    // 添加优惠券 进入路由
    addCoupons() {
      this.$router.push('/activity/addCoupons')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
