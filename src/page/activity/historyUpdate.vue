<template>
  <div>
    <Table stripe border :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: '序号',
          type: 'index',
          key: 'position'
        },
        {
          title: '上传说明',
          key: 'uplode'
        },
        {
          title: '更新时间',
          key: 'time'
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: '操作人员',
          key: 'staff'
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
                    this.$router.push('/activity/viewUpdate?endTime=' + params.row.endTime)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data1: [
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/11 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/12 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/13 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/14 9:20',
          staff: '管理A'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>

</style>