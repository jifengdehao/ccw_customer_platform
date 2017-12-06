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
      <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab.title" >
        <Table ref="selection" border :columns="refundColumns" :data="refundData" @on-selection-change="changeData"></Table>
      </TabPane>
    </Tabs>
    </section>
   <!-- 按钮 和分页 -->
    <section>
      <div class="buttons" v-if="showButton === 0">
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button type="success" @click="pass">通过</Button>
        <Button type="warning" @click="notPass">驳回</Button>
        <!--  -->
      </div>
      <div>
        <Page class="page-style" :current="pageNo" show-total :total="total" @on-change="changePage"></Page>
      </div>
      <div v-html="returnData"></div>
    </section>
  </div>
</template>
<script>
import * as api from 'api/common.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      showButton: 0,
      selection: [], // 选中的数据
      returnData: '',
      tabs: [
        { title: '申请中' },
        { title: '退款中' },
        { title: '已完成' },
        { title: '已驳回' }
      ],
      params: {
        auditStatus: 0, // 审核状态 (0待审核1审核通过2审核不通过)
        status: null, // 退款状态 (1退款中2退款完成3退款失败)
        pageSize: 10
      },
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
          key: 'creatorName',
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
                    click: () => {
                      this.auditRefund(params.row.mcAccountRefundId, 1)
                    }
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
                    click: () => {
                      // console.log(params.row.mcAccountRefundId)
                      this.auditRefund(params.row.mcAccountRefundId, 2)
                    }
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
          key: 'creatorName',
          align: 'center'
        }
      ],
      refundData: []
    }
  },
  created() {
    this.refundColumns = this.refundColumns1
    this.getRefundList(this.pageNo, this.params)
  },
  mounted() {},
  activited: {},
  update: {},
  methods: {
    // 切换tab
    changeTable(index) {
      this.showButton = index
      if (index === 0) {
        this.refundColumns = this.refundColumns1
        this.params.auditStatus = index
        this.params.status = null
      } else {
        this.refundColumns = this.refundColumns2
        if (index === 3) {
          this.params.auditStatus = 2
          this.params.status = null
        } else {
          this.params.auditStatus = 1
          this.params.status = index
        }
      }
      this.getRefundList(1, this.params)
    },
    // 切换分页
    changePage(number) {
      this.pageNo = number
      this.getRefundList(this.pageNo, this.params)
    },
    // 获取用户退款列表
    getRefundList(pageNo, params) {
      api.getRefundList(pageNo, params).then(res => {
        // console.log(res)
        this.refundData = res.records
        this.total = res.total
        this.pageNo = res.current
      })
    },
    // 通过或驳回用户退款申请
    auditRefund(idList, auditStatus) {
      if (idList.constructor !== Array) {
        idList = [idList]
      }
      let params = {
        idList: idList,
        auditStatus: auditStatus // 审核状态 0待审核1审核通过2审核不通过
      }
      api.auditRefund(params).then(res => {
        if (res !== '驳回成功') {
          this.returnData = res
          // 设置计时器 延迟1秒再跳转
          setTimeout(() => {
            this.toApplication()
          }, 1000)
        }
        this.getRefundList(this.pageNo, this.params)
        this.$Message.success('修改成功')
      })
    },
    // 全选
    handleSelectAll(status) {
      this.$refs.selection[0].selectAll(status)
    },
    // 选中的数据
    changeData(selection) {
      this.selection = selection.map(item => {
        if (item.mcAccountRefundId) {
          return item.mcAccountRefundId
        }
      })
    },
    // 批量通过
    pass() {
      this.auditRefund(this.selection, 1)
    },
    // 批量不通过
    notPass() {
      this.auditRefund(this.selection, 2)
    },
    // 跳转到支付宝页面
    toApplication() {
      var form = document.getElementById('alipaysubmit')
      form.setAttribute('target', '_blank') // 给表格添加target属性 跳转的时候打开新页面
      document.forms['alipaysubmit'].submit()
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