/*
 * @Author: WuFengliang 
 * @Date: 2017-10-13 10:15:25 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 账户管理 
 */
<template>
  <div>
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="手机号码" :label-width="80">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">搜索</Button>
      </FormItem>
      <label>昨日新增用户量：
        <span>200000</span>
      </label>
      <label>当前用户量：
        <span>10000</span>
      </label>
    </i-form>
    <Tabs type="card" @on-click='chooseTabs'>
      <TabPane label="所用用户">
        <Table border :columns="allUsersTitle" :data="usersDatas"></Table>
      </TabPane>
      <TabPane label="冻结用户">
        <Table border :columns="freezeUsersTitle" :data="usersDatas"></Table>
      </TabPane>
    </Tabs>
    <Page :total="usersDatas.length" :styles="{margin:'20px auto',float:'right'}" show-total></Page>
    <Modal v-if="tabIndex == 0" v-model="modalBoolean" :styles="{top: '40px'}" @on-ok="isOkDelete" @on-cancel="modalBoolean=false;">
      <p>设置冻结时间
        <select name="">
          <option value="">3天</option>
          <option value="">7天</option>
          <option value="">永久</option>
        </select>
      </p>
      <p>温馨提醒：如若误操作可在封停用</p>
    </Modal>
    <Modal v-if="tabIndex == 1" v-model="modalBoolean" :styles="{top: '40px'}" @on-ok="isOkDelete" @on-cancel="modalBoolean=false;">
      <p>是否要在用户列表中进行恢复操作</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'accountManage',
  components: {
  },
  props: {
  },
  data() {
    return {
      formInline: {
        phone: ''
      },
      ruleInline: {
        phone: [
          { required: true, message: '请填写正确的手机号', trigger: 'blur', pattern: '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$' }
        ]
      },
      allUsersTitle: [  //  所用用户表头
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
          title: '登录IP',
          key: 'lastLoginIp',
          align: 'center'
        },
        {
          title: '账号状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push(`account_detail/${params.row.mcCustomerId}`)
                  }
                }
              }, '查看'),
              h('Button', {
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
              }, '冻结')
            ])
          }
        }
      ],
      tabIndex: 0,  // tab索引
      usersDatas: [  //  所用用户数据
        {
          mcCustomerId: '1001',
          mobileno: '13838384831',
          custName: '张三',
          lastUpdateTime: '2017/8/16  9:35',
          lastLoginIp: '192.168.1.1',
          status: '正常'
        }
      ],
      freezeUsersTitle: [  // 冻结用户表头
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
          title: '登录IP',
          key: 'lastLoginIp',
          align: 'center'
        },
        {
          title: '冻结时间',
          key: 'frezonTime',
          align: 'center'
        },
        {
          title: '操作人员',
          key: 'creator',
          align: 'center'
        },
        {
          title: '账号状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push(`account_detail/${params.row.mcCustomerId}`)
                  }
                }
              }, '查看'),
              h('Button', {
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
              }, '恢复')
            ])
          }
        }
      ],
      modalBoolean: false,  //  对话框是否显示
      singleData: null //  单个数据
    }
  },
  activited: {
  },
  update: {
  },
  beforeRouteUpdate: {
  },
  methods: {
    //  tab选择
    chooseTabs: function(index) {
      this.tabIndex = index
      switch (index) {
        case 0:
          //  请求获取所有用户请求
          break
        case 1:
          //  请求获取冻结用户请求
          break
      }
    },
    isOkDelete: function() {
      //  冻结账户
      if (this.tabIndex === 0) {
        this.usersDatas.forEach(function(item) {
          if (item.mcCustomerId === this.singleData.mcCustomerId) {
            this.usersDatas.splice(0, 1)
            //  请求冻结账户请求
            return
          }
        }, this)
      } else {
        //  恢复账户
      }
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
label {
  float: right;
  line-height: 32px;
}

label:last-child {
  margin-right: 40px;
}

p {
  text-indent: 130px;
  margin: 10px;
}

p:first-child {
  margin-top: 30px;
}

.page-style {
  float: right !important;
  margin-top: 20px;
}
</style>