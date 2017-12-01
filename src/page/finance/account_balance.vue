/*
 * @Author: Zeng Fanlu 
 * @Date: 2017-11-30 09:45:07 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 商户账户退款申请
 */
<template>
  <div class="refundApplication">
    <!-- 表格内容 -->
    <section>
       <Tabs :animated="false"  @on-click="changeTable">
      <TabPane v-for="(tab, index) in tabs" :key="index" :label="tab.title">
        <Table ref="selection" :columns="accountTabls" :data="accountBalanceData" @on-selection-change="changeSelect"></Table>
      </TabPane>
    </Tabs>
    </section>
   <!-- 按钮 和分页 -->
    <section>
      <div class="buttons" v-if="status === 0">
        <Button type="ghost" @click="onSelect(true)">全选</Button>
        <Button type="primary" @click="onAccounts">结算</Button>
      </div>
      <div>
        <Page class="page-style" :current="pageNo" show-total :total="total" @on-change="changePage"></Page>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      pageNo: 1,
      total: 0,
      status: 0,
      tabs: [{ title: '申请中' }, { title: '转账中' }, { title: '已完成' }],
      accountBalanceData: [
        {
          billDate: '2017/12/1',
          amount: '1000',
          shopAmount: '3'
        },
        {
          billDate: '2017/12/2',
          amount: '1200',
          shopAmount: '4'
        },
        {
          billDate: '2017/12/3',
          amount: '1200',
          shopAmount: '5'
        }
      ],
      accountBalanceTabs: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '结算日期',
          key: 'billDate',
          align: 'center'
        },
        {
          title: '结算总金额(元)',
          key: 'amount',
          align: 'center'
        },
        {
          title: '结算档口数量',
          key: 'shopAmount',
          align: 'center'
        },
        {
          title: '操作',
          width: 140,
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
                      console.log(params.row)
                    }
                  }
                },
                '通过'
              )
            ])
          }
        }
      ],
      accountBalanceTabs1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '结算日期',
          key: 'billDate',
          align: 'center'
        },
        {
          title: '结算总金额(元)',
          key: 'amount',
          align: 'center'
        },
        {
          title: '结算档口数量',
          key: 'shopAmount',
          align: 'center'
        }
      ],
      accountTabls: [], // table
      remindData: []
    }
  },
  created() {
    this.accountTabls = this.accountBalanceTabs
  },
  mounted() {},
  activited: {},
  update: {},
  methods: {
    // 切换tab
    changeTable(status) {
      this.status = status
      switch (status) {
        case 0:
          this.accountTabls = this.accountBalanceTabs
          break
        case 1:
          this.accountTabls = this.accountBalanceTabs1
          break
        case 2:
          this.accountTabls = this.accountBalanceTabs1
      }
    },
    // 获取选择的数据
    changeSelect(name) {
      console.log(name)
    },
    // 点击全选
    onSelect(flag) {
      console.log(this.$refs.selection)
      this.$refs.selection.selectAll(flag)
    },
    // 点击结算
    onAccounts() {},
    // 切换分页
    changePage(number) {
      console.log(number)
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.buttons {
  margin-top: 20px;
  float: left;
}
.page-style {
  margin-top: 20px;
  float: right;
}
</style>