/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-11 11:09:54 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 进行中优惠券列表 
 */

<template>
  <div>
    <div>
      <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
    <div class="page">
      <Page :total="100" show-total></Page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
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
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // 查看进行中优惠券
                    this.$router.push('/activity/vieOngoingInfo?number=' + params.row._index)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data1: [
        {
          couponType: '配送费抵扣券',
          activityRules: '满50抵扣配送费',
          activityTime: '2017.09.06~2017.10.10',
          createTime: '2017.10.10 15:43',
          operator: '管理A'
        },
        {
          couponType: '配送费抵扣券',
          activityRules: '满50抵扣配送费',
          activityTime: '2017.09.06~2017.10.10',
          createTime: '2017.10.10 15:43',
          operator: '管理A'
        },
        {
          couponType: '配送费抵扣券',
          activityRules: '满50抵扣配送费',
          activityTime: '2017.09.06~2017.10.10',
          createTime: '2017.10.10 15:43',
          operator: '管理A'
        },
        {
          couponType: '配送费抵扣券',
          activityRules: '满50抵扣配送费',
          activityTime: '2017.09.06~2017.10.10',
          createTime: '2017.10.10 15:43',
          operator: '管理A'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="css" scoped>
.page {
  float: right;
  margin-top: 20px;
}
</style>