/*
 * @Author: huShangJun 
 * @Date: 2017-11-30 09:45:07 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 用户账户退款申请
 */
<template>
  <div class="refundApplication">
    <!-- 表格内容 -->
    <section>
       <Tabs :animated="false"  @on-click="changeTable">
      <TabPane v-for="tab in tabs" key :label="tab.title">
        <Table border :columns="refundColumns" :data="remindData"></Table>
      </TabPane>
    </Tabs>
    </section>
   <!-- 按钮 和分页 -->
    <section>
      <div class="buttons" v-if="current === 0">
        <Button>全选</Button>
        <Button type="success">通过</Button>
        <Button type="warning">驳回</Button>
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
      current: 0,
      tabs: [
        { title: '申请中' },
        { title: '退款中' },
        { title: '已完成' },
        { title: '已驳回' }
      ],
      refundColumns: [],
      refundColumns1: [
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
          title: '用户ID',
          key: 'mcCustomerId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '账户余额',
          key: 'balance',
          align: 'center'
        },
        {
          title: '申请退款金额',
          key: 'amount',
          align: 'center'
        },
        {
          title: '用户姓名',
          key: 'alipayName',
          align: 'center'
        },
        {
          title: '支付宝账号',
          key: 'alipayAccount',
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'createdAt',
          align: 'center'
        },
        {
          title: '操作客服',
          key: 'operatorName',
          align: 'center'
        },
        {
          title: '操作',
          width: 140,
          align: 'center',
          display: 'none',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '通过'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    width: '50px'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '驳回'
              )
            ])
          }
        }
      ],
      refundColumns2: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'mcCustomerId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '账户余额',
          key: 'balance',
          align: 'center'
        },
        {
          title: '申请退款金额',
          key: 'amount',
          align: 'center'
        },
        {
          title: '用户姓名',
          key: 'alipayName',
          align: 'center'
        },
        {
          title: '支付宝账号',
          key: 'alipayAccount',
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'createdAt',
          align: 'center'
        },
        {
          title: '操作客服',
          key: 'operatorName',
          align: 'center'
        }
      ],
      remindData: []
    }
  },
  created() {
    this.refundColumns = this.refundColumns1
  },
  mounted() {},
  activited: {},
  update: {},
  methods: {
    // 切换tab
    changeTable(index) {
      this.current = index
      if (index === 0) {
        this.refundColumns = this.refundColumns1
      } else if (index === 1) {
        this.refundColumns = this.refundColumns2
      } else if (index === 2) {
        this.refundColumns = this.refundColumns2
      } else if (index === 3) {
        this.refundColumns = this.refundColumns2
      }
    },
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