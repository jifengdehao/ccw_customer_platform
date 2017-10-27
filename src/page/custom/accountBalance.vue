/*
 * @Author: WuFengliang 
 * @Date: 2017-10-23 09:43:11 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 账户余额 
 */
  <template>
  <div>
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="手机号码" :label-width="80">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs type="card" @on-click='chooseTabs'>
      <TabPane label="账户余额">
        <Table border :columns="accountBalance" :data="usersDatas.records"></Table>
      </TabPane>
      <TabPane label="账户积分">
        <Table border :columns="accountCoins" :data="usersDatas.records"></Table>
      </TabPane>
      <TabPane label="账户延期">
        <!-- <Table border :columns="accountBalance" :data="usersDatas.records"></Table> -->
        本功能点延期
      </TabPane>
    </Tabs>
    <Page :total="usersDatas.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
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
        pageSize: 10,
        pageNo: 1,
        selectTypes: 1
      }, //  传递参数
      ruleInline: {
        phone: [
          {
            required: true,
            message: '请填写正确的手机号',
            trigger: 'blur',
            pattern:
              '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$'
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
          title: '最近登录时间',
          key: 'lastUpdateTime',
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
                    click: () => {
                      this.$router.push({
                        name: 'balance_detail',
                        query: { custId: params.row.custId, accountType: 1 }
                      })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.singleData = params.row
                      this.$router.push(
                        `/custom/account_balance/edit/${params.row.custId}`
                      )
                    }
                  }
                },
                '编辑'
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
                    click: () => {
                      this.$router.push({
                        name: 'balance_detail',
                        query: { custId: params.row.custId, accountType: 2 }
                      })
                    }
                  }
                },
                '查看'
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
        pageSize: 10,
        pageNo: 1,
        selectTypes: this.tabIndex + 1
      }
      this.formInline.phone = ''
      this.loadData()
    },
    //  下一页
    loadNext() {},
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
    }
  }
}
</script>
<style lang="css" scoped>

</style>
