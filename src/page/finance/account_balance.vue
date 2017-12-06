/*
 * @Author: Zeng Fanlu 
 * @Date: 2017-11-30 09:45:07 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 商户自动结算申请
 */
<template>
  <div>
    <div>
      <Tabs @on-click="changeTabs" :animated="false">
         <TabPane v-for="(tab,index) in accountTabName" :key="index" :label="tab">
           <Table border :columns="accountTabs" :data="accountData"></Table>
         </TabPane>
      </Tabs>
      <Page class="page-style" :current="pageNo" show-total :total="total" @on-change="changePage"></Page>
      <div class="flag" v-html="returnData"></div>
    </div>
  </div>
</template>
<script>
import * as api from 'api/common'
export default {
  data() {
    return {
      accountTabName: ['未结算', '结算中', '结算完成', '结算失败'], // tabs
      accountBalance1: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '申请日期',
          key: 'createdAt',
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
                      this.$Modal.confirm({
                        title: '提示',
                        content: '是否结算此用户？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          api
                            .getFinanceBill({
                              id: params.row.msSellerBillId
                            })
                            .then(data => {
                              this.returnData = data
                              // 设置计时器 延迟1秒再跳转
                              setTimeout(() => {
                                this.toApplication()
                              }, 1000)
                            })
                        }
                      })
                    }
                  }
                },
                '结算'
              )
            ])
          }
        }
      ], // table th
      accountBalance2: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '申请日期',
          key: 'createdAt',
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
      accountBalance3: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '申请日期',
          key: 'createdAt',
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
          title: '备注',
          key: 'remark',
          align: 'center'
        }
      ],
      accountData: [],
      total: null, // 总页数
      accountTabs: [], // 获取值
      pageNo: 1,
      params: {
        status: 0,
        pageSize: 10
      },
      returnData: '' // 获取跳转数据
    }
  },
  created() {
    this.accountTabs = this.accountBalance1 // 默认tabls
    this.getFinanceList() // 初始化列表
  },
  methods: {
    // 获取列表
    getFinanceList() {
      api.getFinanceList(this.pageNo, this.params).then(data => {
        this.accountData = data.records
        this.total = data.total
      })
    },
    // 获取当前点击table
    changeTabs(index) {
      this.accountData = []
      this.params.status = index
      this.pageNo = 1
      switch (index) {
        case 0:
          this.accountTabs = this.accountBalance1
          break
        case 1:
          this.accountTabs = this.accountBalance2
          break
        case 2:
          this.accountTabs = this.accountBalance3
          break
        case 3:
          this.accountTabs = this.accountBalance1
      }
      this.getFinanceList()
    },
    // 跳转到支付宝页面
    toApplication() {
      if (document.getElementById('alipaysubmit')) {
        var form = document.getElementById('alipaysubmit')
        form.setAttribute('target', '_blank') // 给表格添加target属性 跳转的时候打开新页面
        document.forms['alipaysubmit'].submit()
      } else {
        this.$Message.info(this.returnData);
      }
    },
    // 当前分页
    changePage(page) {
      this.pageNo = page
      this.getFinanceList()
    }
  }
}
</script>
<style lang="css" scoped>
.page-style {
  margin-top: 20px;
  float: right;
}
.flag {
  display: none;
}
</style>