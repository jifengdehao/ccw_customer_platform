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
    <Table :columns="userBuyTitle" :data="userBuyData"></Table>
  </div>
</template>
<script>
import * as http from 'api/common'
import expandRow from 'page/custom/unfold'

export default {
  name: 'accountDetail',
  components: {
  },
  props: {
  },
  data() {
    return {
      userInfoTitle: [  //  用户信息表头
        {
          title: '用户ID',
          key: 'mcCustomerId'
        },
        {
          title: '手机号码',
          key: 'mobileno'
        },
        {
          title: '昵称',
          key: 'custName'
        },
        {
          title: '注册时间',
          key: 'createdAt'
        },
        {
          title: '最近登录时间',
          key: 'lastUpdateTime'
        },
        {
          title: '登录IP',
          key: 'lastLoginIp'
        }
      ],
      userInfoData: [], //  用户信息数据
      userAcceptTitle: [  //  用户收货地址表头
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center'
        },
        {
          title: '收货人',
          key: 'recevier',
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
          align: 'center'
        }
      ],
      userAcceptData: [],  //  用户收货地址数据集合
      userBuyTitle: [  // 用户购买记录表头
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
          key: 'recevier'
        },
        {
          title: '下单时间',
          key: 'submitAt'
        },
        {
          title: '订单状态',
          key: 'orderStatus'
        }
      ],
      userBuyData: [ //  用户购买记录数据集合
        {
          orderId: '1001',
          contactNumber: '13838384381',
          recevier: '李四',
          submitAt: '2017/8/16  9:35',
          orderStatus: '待付款'
        }
      ],
      params: {}  //  http传递的参数
    }
  },
  activited: {
  },
  update: {
  },
  beforeRouteUpdate: {
  },
  mounted() {
    this.params.custId = this.$route.params.id
    this.getUserInfoData()
  },
  methods: {
    //  获取用户信息
    getUserInfoData() {
      http.getUserInfoData(this.params).then((data) => {
        this.userInfoData = data.custInfo
        this.userAcceptData = data.custAddress
        this.userBuyData = data.custOrderRecord
      })
    }
  },
  filter: {
  },
  computed: {
  },
  watch: {
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