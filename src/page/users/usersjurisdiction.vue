/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-15 14:26:49 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 权利权利列表功能
 */

<template>
  <div>
    <div class="searchInput">
      <p>手机号码：</p>
      <input type="text" v-model="params.mobileno">
      <Button type="primary" icon="ios-search" @click="onSearch">搜索</Button>
    </div>
    <div class="exportButton">
      <button @click="onExportModal">导出</button>
    </div>

    <div>
      <Table stripe :columns="columns1" :data="userList" ref="all_order"></Table>
    </div>
    <Page v-if="userList && userList.length > 0" style="margin-top: 20px; float: right;" :current="pageNo" :total="total" @on-change="onChange"></Page>
    <!-- 导出数据弹框start -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" placeholder="选择日期" v-model="startTime" style="width: 100%"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" placeholder="选择日期" v-model="endTime" style="width: 100%"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>
    <!-- 导出数据弹框end -->

  </div>
</template>
<script type="text/ecmascript-6">
import * as api from 'api/common'

export default {
  data() {
    return {
      userMenu: ['正常用户', '冻结用户'], // 导航 table切换数据
      exportModal: false, // 显示弹出弹框
      startTime: '', // 导出开始时间
      endTime: '', // 导出结束时间
      pageNo: 1, // 当前页
      params: {
        pageSize: 10,
        mobileno: '' // 手机号码
      }, // 请求参数
      columns1: [
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
          title: '最后一次登录时间',
          key: 'lastLoginTime',
          align: 'center'
        },
        {
          title: '最后一次登录IP',
          key: 'lastLoginIp',
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
                      this.$router.push(
                        'seeUserlist/?info=' + params.row.ptUserId
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
                      this.$router.push({
                        path: 'seeUserlist',
                        query: {
                          info: params.row.ptUserId,
                          details: '1'
                        }
                      })
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],
      userList: [], // 列表数据
      total: '' // 总页数
    }
  },
  created: function() {
    this.getPlatformPermissionList() // 初始化列表数据
  },
  methods: {
    // 查看列表数据
    getPlatformPermissionList() {
      api.getPlatformPermissionList(this.pageNo, this.params).then(data => {
        this.userList = data.records
        this.total = data.total
      })
    },
    // 搜索电话号码
    onSearch() {
      this.getPlatformPermissionList()
    },
    // 打开导出弹框 默认值为空
    onExportModal() {
      this.startTime = ''
      this.endTime = ''
      this.exportModal = true
    },
    // 导出数据
    getExportData() {
      let params = {
        mobileno: this.params.mobileno,
        startTime: this.startTime,
        endTime: this.endTime
      }
      api.getExportList(params).then(res => {
        if (res && res != null) {
          window.open(res)
        }
        this.exportModal = false
      })
    },
    // 分页数据
    onChange(page) {
      this.pageNo = page
      this.getPlatformPermissionList()
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
  margin-left: calc(100% - 58px);
  margin-bottom: 10px;
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
</style>
