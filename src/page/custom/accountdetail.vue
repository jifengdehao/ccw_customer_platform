/*
 * @Author: WuFengliang 
 * @Date: 2017-10-12 20:38:20 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  账户详情 
 */

<template>
  <div>
    <h3>用户信息</h3>
    <Table border :columns="userInfoTitle" :data="userInfoData"></Table>
    <h3>用户收货地址</h3>
    <Table border :columns="userAcceptTitle" :data="userAcceptData"></Table>
    <h3>用户购买记录</h3>
    <Table :columns="userBuyTitle" :data="userBuyData.custOrderRecord.records"></Table>
    <Page :total="userBuyData.custOrderRecord.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
  </div>
</template>
<script>
import * as http from 'api/common'
import expandRow from 'page/custom/unfold'
import * as time from '@/until/time'

export default {
  name: 'accountDetail',
  components: {},
  props: {},
  data() {
    return {
      userInfoTitle: [
        //  用户信息表头
        {
          title: '用户ID',
          key: 'mcCustomerId',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'custName',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            return time.formatDateTime(params.row.createdAt)
          }
        }
      ],
      userInfoData: [], //  用户信息数据
      userAcceptTitle: [
        //  用户收货地址表头
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            return time.formatDateTime(params.row.createdAt)
          }
        },
        {
          title: '收货人',
          key: 'receiver',
          align: 'center'
        },
        {
          title: '收货人电话',
          key: 'contactNumber',
          align: 'center'
        },
        {
          title: '收货地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '默认收货地址',
          key: 'isDefault',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row._index === 0 ? '是' : '否')
          }
        }
      ],
      userAcceptData: [], //  用户收货地址数据集合
      userBuyTitle: [
        // 用户购买记录表头
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '订单编号',
          key: 'orderId'
        },
        {
          title: '收货人手机',
          key: 'contactNumber'
        },
        {
          title: '收货人',
          key: 'receiver'
        },
        {
          title: '下单时间',
          key: 'submitTime',
          render: (h, params) => {
            return time.formatDateTime(params.row.submitTime)
          }
        },
        {
          title: '订单状态',
          key: 'status',
          render: (h, params) => {
            return h('span', this.filterStatus(params.row.status))
          }
        }
      ],
      userBuyData: [
        //  用户购买记录数据集合
        {
          orderId: '1001',
          contactNumber: '13838384381',
          recevier: '李四',
          submitAt: '2017/8/16  9:35',
          orderStatus: '待付款'
        }
      ],
      params: {
        pageNo: 1,
        custId: ''
      } //  http传递的参数
    }
  },
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  mounted() {
    this.params.custId = this.$route.params.id
    this.getUserInfoData()
  },
  methods: {
    //  获取用户信息
    getUserInfoData() {
      http.getUserInfoData(this.params).then(data => {
        this.userInfoData = data.custInfo
        this.userAcceptData = data.custAddress
        this.userBuyData = data
      })
    },
    //  下一页
    loadNext(num) {
      this.params.pageNo = num
      this.getUserInfoData()
    },
    filterStatus(value) {
      let str = ''
      switch (value) {
        case 1:
          str = '待付款'
          break
        case 2:
          str = '待接单'
          break
        case 3:
          str = '待发货'
          break
        case 4:
          str = '配送中'
          break
        case 5:
          str = '待评价'
          break
        case 6:
          str = '完成'
          break
        case 7:
          str = '用户取消订单'
          break
      }
      return str
    }
  }
}
</script>
<style lang="css" scoped>
h3 {
  margin: 15px auto;
}

h3:first-child {
  margin-top: 10px;
}
</style>