/*
 * @Author: WuFengliang
 * @Date: 2017-10-23 09:43:11
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 账户余额
 */
  <template>
  <div>
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="搜索关键词" :label-width="100">
        <Input type="text" style="width:180px" v-model="formInline.phone" placeholder="请输入用户ID/手机号/昵称"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs @on-click='chooseTabs'>
      <TabPane label="账户余额">
        <Table border stripe :columns="accountBalance" :data="usersDatas.records" @on-row-dblclick="jumpTo"></Table>
      </TabPane>
      <TabPane label="账户积分">
        <Table border stripe :columns="accountCoins" :data="usersDatas.records" @on-row-dblclick="coinsTo"></Table>
      </TabPane>
      <TabPane label="账户延期">
        <!-- <Table border :columns="accountBalance" :data="usersDatas.records"></Table> -->
        本功能点延期
      </TabPane>
    </Tabs>
    <Page :total="usersDatas.total" :page-size="20" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
    <!-- 账户余额 -->
    <Modal
      v-model="isBoolean"
      :closable="false" @on-ok="refundMoney" @on-cancel="resetSome">
      <p class="money">退款金额:¥<input type="number" v-model="amount" style="margin-left:10px;"></p>
      <p class="money">支付宝姓名: <input type="text" v-model="alipayName"></p>
      <p class="money">支付宝账号: <input type="text" v-model="alipayAccount"></p>
      <p class="money"><span style="display:inline-block;vertical-align:top;">退款原因:&nbsp;&nbsp;</span><textarea style="resize:none;height:60px;" v-model="reason"></textarea></p>
    </Modal>

    <!-- 账户积分 -->
    <Modal
        v-model="isCoins"
        title="提示"
        @on-ok="coinsOk"
        @on-cancel="coinsCancel">
        <p class="money">调整积分:<input type="number" v-model="amount" style="margin-left:10px;"></p>
        <p class="money"><textarea style="resize:none;height:80px;margin-left:60px;" maxlength="50" placeholder="请输入备注信息(字数不得超过50字)" v-model="reason"></textarea></p>
    </Modal>
  </div>
</template>
</template>
<script>
import * as http from 'api/common'
export default {
  name: 'accountBalance',
  props: {},
  data() {
    return {
      formInline: {
        phone: ''
      },
      tabIndex: 0, //  tab索引
      params: {
        mobileno: '',
        pageSize: 20,
        pageNo: 1,
        selectTypes: 1
      }, //  传递参数
      isBoolean: false, //  账户余额弹框boolean值
      isCoins: false, //  账户积分弹框boolean值
      custId: '', // 用户ID
      amount: '', //  退款金额
      alipayName: '', //  支付宝姓名
      reason: '', //  退款原因
      alipayAccount: '', // 支付宝账号
      ruleInline: {
        phone: [
          {
            required: true
          }
        ]
      },
      //  余额表头
      accountBalance: [
        {
          title: 'ID',
          key: 'custId',
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
          title: '账户账户',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.status === 1 ? '正常' : '异常')
          }
        },
        {
          title: '账户余额',
          key: 'balance',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.balance / 100)
          }
        },
        {
          title: '操作',
          key: 'action',
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: event => {
                      this.custId = params.row.custId
                      this.isBoolean = true
                      event.cancelBubble = true
                    }
                  }
                },
                '提现'
              )
            ])
          }
        }
      ],
      //  积分表头
      accountCoins: [
        {
          title: 'ID',
          key: 'custId',
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
          title: '账户积分',
          key: 'coins',
          align: 'center'
        },
        {
          title: '账号状态',
          key: 'statusName',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: event => {
                      this.custId = params.row.custId
                      event.cancelBubble = true
                      this.isCoins = true
                    }
                  }
                },
                '调整积分'
              )
            ])
          }
        }
      ],
      usersDatas: [] //  数据集合
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    //  搜索
    search() {
      this.params.mobileno = this.formInline.phone
      this.loadData()
    },
    //  Tab切换
    chooseTabs(name) {
      if (this.tabIndex === name) {
        return
      }
      this.tabIndex = name
      this.params = {
        mobileno: '',
        pageSize: 20,
        pageNo: 1,
        selectTypes: this.tabIndex + 1
      }
      this.formInline.phone = ''
      this.loadData()
    },
    //  下一页
    loadNext(pageNum) {
      this.params.pageNo = pageNum
      this.loadData()
    },
    //  加载数据
    loadData() {
      http.getAccountMoney(this.params).then(data => {
        this.usersDatas = data
        for (let i = 0; i < this.usersDatas.records.length; i++) {
          if (this.usersDatas.records[i].status === 1) {
            this.usersDatas.records[i].statusName = '正常'
          } else if (this.usersDatas.records[i].status === 2) {
            this.usersDatas.records[i].statusName = '冻结'
          }
        }
      })
    },
    //  账户余额跳转查看
    jumpTo(params) {
      this.$router.push(`/custom/account_balance/edit/${params.custId}`)
    },
    //  账户积分跳转查看
    coinsTo(params) {
      this.$router.push({
        name: 'balance_detail',
        query: { custId: params.custId, accountType: 2 }
      })
    },
    //  确定退款
    refundMoney() {
      if (
        !this.custId ||
        !this.alipayAccount ||
        (!this.amount || this.amount < 0) ||
        !this.alipayName ||
        !this.reason
      ) {
        this.$Modal.error({
          title: '提示',
          content: '您输入的有误，请重新来过',
          onOk: () => {
            this.amount = this.alipayName = this.alipayAccount = this.reason =
              ''
          }
        })
        return
      }

      this.amount = this.toFixed(this.amount)
      http
        .refundMoney({
          mcCustomerId: this.custId,
          amount: this.amount,
          alipayAccount: this.alipayAccount,
          alipayName: this.alipayName,
          reason: this.reason,
          types: 1 //  余额是1，积分是2
        })
        .then(data => {
          this.amount = this.alipayName = this.alipayAccount = this.reason = ''
          this.$Modal.success({
            title: '提示',
            content: '已发起申请退款',
            onOk: () => {
              this.loadData()
            }
          })
        })
    },
    //  取消
    resetSome() {
      this.amount = this.alipayName = this.alipayAccount = this.reason = ''
    },
    //  账户积分
    coinsOk() {
      http
        .refundMoney({
          mcCustomerId: this.custId,
          amount: this.amount,
          reason: this.reason,
          types: 2 //  余额是1，积分是2
        })
        .then(data => {
          this.amount = this.reason = ''
          this.$Modal.success({
            title: '提示',
            content: '已调整积分',
            onOk: () => {
              this.loadData()
            }
          })
        })
    },
    coinsCancel() {
      this.amount = this.reason = ''
    },
    //  精准度缺失解决办法
    toFixed(value) {
      if (value.indexOf('.') > 0) {
        let array = value.split('.')
        let arrayInt = array[0]
        let arrayFloat = array[1]

        return arrayInt * 100 + ('0.' + arrayFloat) * 100
      }
      return value * 100
    }
  }
}
</script>
<style lang="css" scoped>
p {
  text-align: center;
}
p.money {
  text-align: center;
  margin: 20px auto;
}
</style>
