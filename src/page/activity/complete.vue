/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-11 11:11:24 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 已结束优惠券列表 
 */

<template>
  <div>
    <Table border :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: '序号',
          key: 'position',
          type: 'index',
          width: '80',
          align: 'center'
        },
        {
          title: '优惠券类型',
          key: 'couponsType'
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
          key: 'startTime'
        },
        {
          title: '操作人员',
          key: 'opreation'
        },
        {
          title: '操作',
          key: 'opreat',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push('/activity/pendingDetali?detail=' + params.row._index)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data1: [
        {
          couponsType: '折扣券',
          activityRules: '1.0版本更新内容如下:1、新增了XXX功能...',
          activityTime: '2018.01.10~2019.10.20',
          startTime: '2017.10.30 15:32',
          opreation: '管理A'
        },
        {
          couponsType: '折扣券',
          activityRules: '1.0版本更新内容如下:1、新增了XXX功能...',
          activityTime: '2018.01.10~2019.10.20',
          startTime: '2017.10.30 15:32',
          opreation: '管理A'
        },
        {
          couponsType: '折扣券',
          activityRules: '1.0版本更新内容如下:1、新增了XXX功能...',
          activityTime: '2018.01.10~2019.10.20',
          startTime: '2017.10.30 15:32',
          opreation: '管理A'
        },
        {
          couponsType: '折扣券',
          activityRules: '1.0版本更新内容如下:1、新增了XXX功能...',
          activityTime: '2018.01.10~2019.10.20',
          startTime: '2017.10.30 15:32',
          opreation: '管理A'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>

</style>