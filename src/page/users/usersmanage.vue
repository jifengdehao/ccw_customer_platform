<template>
  <div>
    <div class="searchInput">
      <p>手机号码：</p>
      <input type="text">
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>
    <div>
      <Tabs @on-click="onSwitch" :animated="false">
        <TabPane v-for="menu in userMenu" :key="menu.id" :label="menu">
          <Table border stripe :columns="columns1" :data="userDate" ref="all_order"></Table>
        </TabPane>
        <Button type="primary" style="margin-right: 7px;" slot="extra" size="large" @click="exportModal=true">
          <Icon type="ios-download-outline"></Icon> 导出</Button>
        <Button type="ghost" size="large" slot="extra" @click="showUser=true" v-if="addHidden">增加</Button>
      </Tabs>
    </div>
    <!-- 导出数据弹框start -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="getExportData()">确定</Button>
      </div>
    </Modal>
    <!-- 导出数据弹框end -->
    <!-- 新增数据弹框start -->
    <Modal v-model="showUser" title="新增用户" @on-ok="addUser" @on-cancel="addCancel" class="userShowModal">
      <p>
        <span>用户ID</span>
        <Input v-model="userId" placeholder="请输入..." style="width: 300px"></Input>
      </p>
      <p>
        <span>用户昵称</span>
        <Input v-model="userName" placeholder="请输入..." style="width: 300px"></Input>
      </p>
      <p>
        <span>用户手机</span>
        <Input v-model="userPhone" placeholder="请输入..." style="width: 300px"></Input>
      </p>
      <p>
        <span>用户邮箱</span>
        <Input v-model="userMailBox" placeholder="请输入..." style="width: 300px"></Input>
      </p>
    </Modal>
    <!-- 新增数据弹框end -->
    <!-- 查看数据弹框start -->
    <Modal v-model="checkUser" title="查看用户" class="userShowModal">
      <p>
        <span>用户ID</span>
        <span>10086</span>
      </p>
      <p>
        <span>用户昵称</span>
        <span>Louis</span>
      </p>
      <p>
        <span>用户手机</span>
        <span>11111111</span>
      </p>
      <p>
        <span>用户邮箱</span>
        <span>wwwwwwwwww</span>
      </p>
    </Modal>
    <!-- 查看数据弹框end -->
    <!-- 冻结用户 解冻用户start -->
    <Modal v-model="userFrozen" title="冻结用户" ok-text="确定" cancel-text="取消">
      <p style="line-height: 78px; text-align: center; font-size: 18px">{{ userProcessu }}</p>
    </Modal>
    <!-- 冻结用户 解冻用户end -->
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      userMenu: ['正常用户', '冻结用户'], // 导航 table切换数据
      userDate: [],
      exportModal: false, // 显示弹出弹框
      modal_loading: false, // 确定显示loading导出 图
      showUser: false, // 显示查看用户弹框
      checkUser: false, // 查看用户弹框
      userFrozen: false, // 冻结用户弹框
      userProcessu: '确定将用户冻结？', // 冻结用户 解冻用户字段
      addHidden: false, // 新增判断显隐
      userId: '', // 用户ID
      userName: '', // 用户昵称
      userPhone: '', // 用户手机
      userMailBox: '', // 用户邮箱
      columns1: [
        {
          title: '用户Id',
          key: 'userId',
          width: '110'
        },
        {
          title: '昵称',
          key: 'name'
        },
        {
          title: '手机号码',
          key: 'phoneNum'
        },
        {
          title: '邮箱',
          key: 'mailbox'
        },
        {
          title: '最后一次登录时间',
          key: 'lastSignIn'
        },
        {
          title: '最后一次登录IP',
          key: 'IP'
        },
        {
          title: '操作',
          key: 'operation',
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
                    this.checkUser = true
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
                    this.userFrozen = true
                  }
                }
              }, '冻结')
            ])
          }
        }
      ],
      data1: [
        {
          userId: '10086',
          name: 'xiaocai',
          phoneNum: '1111111111',
          mailbox: '18883jjfnf@qq`11',
          lastSignIn: '2017/8/16  9:35',
          IP: '192.168.1.1'
        }
      ],
      data2: [
        {
          userId: '10096',
          name: 'xiaocai',
          phoneNum: '1111111111',
          mailbox: '18883jjfnf@qq`11',
          lastSignIn: '2017/8/16  9:35',
          IP: '192.168.1.1'
        }
      ]
    }
  },
  created: function() {
    this.userMenu[0] // 初始化 默认导航为 0
    this.userDate = this.data1 // 初始化数据
    this.userProcessu = '确定将用户冻结？' // 冻结弹出框数据
    this.addHidden = true // 显隐新增弹框
  },
  methods: {
    onSwitch(value) { // 切换导航
      if (value === 0) {
        this.userDate = this.data1 // 正常用户数据
        this.userProcessu = '确定将用户冻结？' // 冻结用户弹框内容
        this.addHidden = true // 新增弹框显示
      } else if (value === 1) {
        this.userDate = this.data2 // 冻结用户数据
        this.userProcessu = '确定将用户解冻？' // 解冻用户弹框内容
        this.addHidden = false
      }
    },
    getExportData() { // 导出数据
      this.modal_loading = true
      setTimeout(() => {
        this.$refs.all_order.exportCsv({
          filename: '全部订单'
        })
        this.modal_loading = false
        this.exportModal = false
      }, 2000)
    },
    addUser() { // 确定新增用户
      console.log(this.userId, this.userName, this.userPhone, this.userMailBox)
    },
    addCancel() { }
  }
}
</script>

<style scoped lang="css">
.searchInput {
  margin-bottom: 60px;
}

.searchInput p {
  display: inline-block;
}

.searchInput input {
  width: 220px;
  height: 32px;
  padding-left: 5px;
  margin-right: 6px;
  outline: none;
}

.userShowModal p {
  margin-bottom: 18px;
}

.userShowModal p:nth-child(1) {
  margin-left: 12px;
}

.userShowModal p span {
  margin-right: 15px;
}
</style>
