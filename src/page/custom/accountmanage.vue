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
        <Button type="primary" @click="search">搜索</Button>
      </FormItem>
      <label v-if="count">昨日新增用户量：
        <span>{{count.yesterdayNewCustomer}}</span>
      </label>
      <label v-if="count">当前用户量：
        <span>{{count.totalCustomer}}</span>
      </label>
    </i-form>
    <Tabs type="card" @on-click='chooseTabs'>
      <TabPane label="所用用户">
        <Table border :columns="allUsersTitle" :data="usersDatas.records"></Table>
      </TabPane>
      <TabPane label="冻结用户">
        <Table border :columns="freezeUsersTitle" :data="usersDatas.records"></Table>
      </TabPane>
    </Tabs>
    <Page :total="usersDatas.total" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
    <Modal v-if="tabIndex == 0" v-model="modalBoolean" :styles="{top: '40px'}" @on-ok="isOkDelete" @on-cancel="modalBoolean=false;">
      <p>设置冻结时间
        <select name="" v-model="changeStatus.frezonTime">
          <option value="3">3天</option>
          <option value="7">7天</option>
          <option value="-1">永久</option>
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

import * as http from 'api/common'

export default {
  name: 'accountManage',
  components: {
  },
  props: {
  },
  data() {
    return {
      count: null, //  用户量
      params: {
        status: null,
        mobileno: '',
        pageSize: 10,
        pageNo: 1
      },
      changeStatus: {  //  冻结与恢复账户
        custId: '',
        frezonTime: 3
      },
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
          key: 'statusName',
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
      usersDatas: {
        //  所用用户数据
      },
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
          key: 'statusName',
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
  created() {
    this.getUsersList()
    this.getCustomerCount()
  },
  methods: {
    //  加载数据
    getUsersList() {
      http.getUsersList(this.params).then(
        (data) => {
          data.records.forEach((item, index) => {
            if (item.status === 1) {
              item.statusName = '正常'
            } else if (item.status === 2) {
              item.statusName = '冻结'
            }
          })
          this.usersDatas = data
        }
      )
    },
    //  获取用户端昨日新增用户量和当前用户量
    getCustomerCount() {
      http.getCustomerCount().then(
        (data) => {
          this.count = data
        }
      )
    },
    //  tab选择
    chooseTabs(index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
      this.params.mobileno = this.formInline.phone = ''
      switch (index) {
        case 0:
          //  请求获取所有用户请求
          this.params.status = null
          break
        case 1:
          //  请求获取冻结用户请求
          this.params.status = 1
          break
      }
      this.params.pageNo = 1
      this.getUsersList()
    },
    //  冻结/恢复 账户
    isOkDelete() {
      this.changeStatus.custId = this.singleData.mcCustomerId
      if (this.tabIndex === 0) {
        //  冻结账户
        http.changeStatus(this.changeStatus).then((data) => {
          this.usersDatas.records.forEach((item, index) => {
            if (item.mcCustomerId === this.singleData.mcCustomerId) {
              this.usersDatas.records.splice(index, 1)
              return
            }
          }, this)
        })
      } else {
        //  恢复账户
        this.changeStatus.frezonTime = null
        http.changeStatus(this.changeStatus).then((data) => {
          this.getUsersList()
        })
      }
    },
    //  分页加载下一页
    loadNext(current) {
      this.params.pageNo = current
      this.getUsersList()
    },
    //  手机号搜索
    search() {
      let reg = new RegExp('^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$')
      if (!reg.test(this.formInline.phone)) {
        return
      }
      for (let i in this.params) {
        if (i === 'mobileno') {
          this.params.mobileno = this.formInline.phone
          break
        }
      }
      this.params.status = null
      this.params.pageSize = 10
      this.params.pageNo = 1
      this.getUsersList()
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