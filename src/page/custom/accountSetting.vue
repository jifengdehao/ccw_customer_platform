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
        <Table border :columns="accountBalance" :data="usersDatas.records"></Table>
      </TabPane>
      <TabPane label="账户延期">
        <Table border :columns="accountBalance" :data="usersDatas.records"></Table>
      </TabPane>
    </Tabs>
    <Page :total="usersDatas.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
  </div>
</template>
</template>
<script>
export default {
  name: 'accountBalance',
  props: {},
  data() {
    return {
      formInline: {
        phone: ''
      },
      params: {
        custId: '',
        types: '',
        pageSize: 10,
        pageNo: 1
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
      accountBalance: [
        {
          title: 'ID',
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
                      this.$router.push(
                        `account_detail/${params.row.mcCustomerId}`
                      )
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
                      this.modalBoolean = true
                      this.singleData = params.row
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      usersDatas: [] //  数据集合
    }
  },
  methods: {
    //  搜索
    search() {},
    //  Tab切换
    chooseTabs(name) {},
    //  下一页
    loadNext() {}
  }
}
</script>
<style lang="css" scoped>

</style>