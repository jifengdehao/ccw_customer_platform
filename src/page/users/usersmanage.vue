<template>
  <div>
    <div class="searchInput">
      <p>手机号码：</p>
      <input type="text" v-model="searchMobileno">
      <Select v-model="status" style="width:150px;margin-left:10px; margin-right: 10px;">
        <Option value="0">正常用户</Option>
        <Option value="1">冻结用户</Option>
      </Select>
      <Button type="primary"@click="onSearchMobile" icon="ios-search">搜索</Button>
    </div>
    <div>
      <div class="exportButton" :class="{'alost': addHidden === false}">
         <button style="margin-right: 7px;" @click="onExportModal">
          <Icon type="ios-download-outline"></Icon> 导出</button>
         <button @click="onShowUser" v-if="addHidden">增加</button>
      </div>
      <div>
        <Table stripe :columns="columns1" :data="userDate" ref="all_order"></Table>
      </div>
        <Page v-if="userDate && userDate.length > 0" :page-size="20" show-total :curent="pageNo" style="margin-top: 20px; float: right;" :total="total" @on-change="onChange"></Page>
    </div>
    <!-- 导出数据弹框start -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" v-model="startTime" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="datetime" @on-change="onChangeStartTime" placeholder="请输入开始时间" style="width: 100%"></DatePicker> -->
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" v-model="endTime" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="datetime" @on-change="onChangeEndTime" placeholder="请输入结束时间" style="width: 100%"></DatePicker> -->
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>
    <!-- 导出数据弹框end -->
    <!-- 新增数据弹框start -->
    <Modal v-model="showUser" title="新增用户" @on-ok="addUser" @on-cancel="addCancel" class="userShowModal" :mask-closable="false">
      <p>
        <span>用户ID</span>
        <Input v-model="addUsers.ptUserId" placeholder="请输入..." style="width: 300px" disabled></Input>
      </p>
      <p>
        <span>用户昵称</span>
        <Input v-model="addUsers.nickname" placeholder="请输入..." style="width: 300px"></Input>
      </p>
      <p>
        <span>用户手机</span>
        <Input v-model="addUsers.mobileno" placeholder="请输入..." style="width: 300px"></Input>
      </p>
      <p>
        <span>用户邮箱</span>
        <Input v-model="addUsers.email" placeholder="请输入..." style="width: 300px"></Input>
      </p>
    </Modal>
    <!-- 新增数据弹框end -->
    <!-- 查看数据弹框start -->
    <Modal v-model="checkUser" title="查看用户" class="userShowModal">
      <p>
        <span>用户ID:</span>
        <span>{{ seeInformation.ptUserId }}</span>
      </p>
      <p>
        <span>用户昵称:</span>
        <span>{{ seeInformation.nickname }}</span>
      </p>
      <p>
        <span>用户手机:</span>
        <span>{{ seeInformation.mobileno }}</span>
      </p>
      <p>
        <span>用户邮箱:</span>
        <span>{{ seeInformation.email }}</span>
      </p>
    </Modal>
    <!-- 查看数据弹框end -->
    <!-- 冻结用户 解冻用户start -->
    <Modal v-model="userFrozen" :title="userStatus" @on-ok="onUserStatus" ok-text="确定" cancel-text="取消">
      <p style="line-height: 78px; text-align: center; font-size: 18px">{{ userProcessu }}</p>
    </Modal>
    <!-- 冻结用户 解冻用户end -->
  </div>
</template>
<script type="text/ecmascript-6">
import * as api from 'api/common'
export default {
  data() {
    return {
      searchMobileno: '', // 搜索电话
      userMenu: ['正常用户', '冻结用户'], // 导航 table切换数据
      userDate: [], // 列表数据
      status: '0', // 默认切换teble 状态
      pageSize: 20, // 分页参数，表示每页显示多少条记录
      pageNo: 1, // 分页参数，表示当前页
      total: '', // 总页数
      exportModal: false, // 显示弹出弹框
      startTime: '', // 获取导出开始时间
      endTime: '', // 获取导出结束时间
      showUser: false, // 显示查看用户弹框
      checkUser: false, // 查看用户弹框
      userFrozen: false, // 冻结用户弹框
      userProcessu: '确定将用户冻结？', // 冻结用户 解冻用户字段
      addHidden: false, // 新增判断显隐
      userStatus: '冻结', // 用户操作状态
      saveStatus: '', // 保存冻结 解冻 ID 发送请求
      seeInformation: [], // 查看个人信息
      addUsers: {
        ptUserId: '', // 用户ID
        nickname: '', // 用户昵称
        mobileno: '', // 用户手机
        email: '' // 用户邮箱
      },
      columns1: [
        // title 信息数据
        {
          title: '用户Id',
          key: 'ptUserId',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'nickname',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
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
                      this.checkUser = true
                      api.getplatformUserId(params.row.ptUserId).then(res => {
                        this.seeInformation = res
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
                      // 打开冻结 解冻弹框
                      this.userFrozen = true
                      this.saveStatus = params.row.ptUserId // 保存冻结 解冻 ID 发送请求
                    }
                  }
                },
                this.userStatus
              )
            ])
          }
        }
      ]
    }
  },
  created: function() {
    this.getUserData() // 初始化列表数据
    this.userProcessu = '确定将用户冻结？' // 冻结弹出框数据
    this.userStatus = '冻结' // 初始化用户状态
    this.addHidden = true // 显隐新增弹框
  },
  methods: {
    // 处理列表数据
    getUserData() {
      let params = {
        mobileno: this.searchMobileno, // 搜索电话
        status: this.status, // 获取状态
        pageSize: this.pageSize // 分页参数，表示每页显示多少条记录
      }
      api.getplatformUser(params, this.pageNo).then(res => {
        this.userDate = res.records // 获取列表数据
        this.total = res.total // 总页数
      })
    },
    // 搜索电话
    onSearchMobile() {
      this.pageNo = 1 // 每次切换 初始化页面 1
      this.getUserData() // 初始化列表数据
      if (this.status === '0') {
        this.userProcessu = '确定将用户冻结？' // 冻结用户弹框内容
        this.userStatus = '冻结' // 用户状态
        this.addHidden = true // 新增弹框显示
      } else if (this.status === '1') {
        this.userStatus = '解冻' // 用户状态更换
        this.userProcessu = '确定将用户解冻？' // 解冻用户弹框内容
        this.addHidden = false
      }
    },
    // 更新状态 冻结 解冻
    onUserStatus() {
      let params = {
        ptUserId: this.saveStatus, // 获取当前点击ID
        status: this.status // 当前所在页
      }
      api.getpaltformUserChange(params).then(data => {
        if (data === true) {
          if (this.userStatus === '解冻') {
            this.$Message.info('解冻成功')
          } else if (this.userStatus === '冻结') {
            this.$Message.info('冻结成功')
          }
          this.getUserData() // 数据调用
        }
      })
    },
    // 获取当前分页
    onChange(name) {
      this.pageNo = name
      this.getUserData() // 数据调用
    },
    // 打开导出弹框 默认清空时间
    onExportModal() {
      this.startTime = ''
      this.endTime = ''
      this.exportModal = true
    },
    // // 获取开始 时间源
    // onChangeStartTime(data) {
    //   this.startTime = data
    // },
    // // 获取结束 时间源
    // onChangeEndTime(data) {
    //   this.endTime = data
    // },
    // 导出数据
    getExportData() {
      if (!!this.startTime && !!this.endTime) {
        let params = {
          status: this.status,
          mobileno: this.searchMobileno,
          startTime: this.startTime,
          endTime: this.endTime
        }
        api.getUserExport(params).then(res => {
          if (res && res != null) {
            window.open(res)
          }
        })
      }
      this.exportModal = false
    },
    // 新增用户 打开弹框 清空默认值
    onShowUser() {
      this.addUsers = {}
      this.showUser = true
    },
    // 确定新增用户
    addUser() {
      api.getAddUser(this.addUsers).then(res => {
        if (res === true) {
          this.$Message.info('新增成功');
          this.getUserData() // 数据调用
        } else {
          this.$Message.info('新增失败');
        }
      })
    },
    addCancel() {
      this.$Message.info('关闭新增弹框');
    }
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

.exportButton {
  margin-left: calc(100% - 142px);
  margin-bottom: 10px;
}
.alost {
  margin-left: calc(100% - 78px);
}

.exportButton button {
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  padding: 6px 15px 7px 15px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.exportButton button:nth-child(2) {
  color: #495060;
  background-color: transparent;
  border: 1px solid #dddee1;
}
</style>
