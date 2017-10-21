<template>
  <div>
    <div class="searchInput">
      <p>手机号码：</p>
      <input type="text">
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>
    <div class="exportButton">
      <button @click="exportModal=true">导出</button>
    </div>

    <div>
      <Table stripe :columns="columns1" :data="data1" ref="all_order"></Table>
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
                  }
                }
              }, '修改')
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
      ]
    }
  },
  methods: {
    getExportData() { // 导出数据
      this.modal_loading = true
      setTimeout(() => {
        this.$refs.all_order.exportCsv({
          filename: '全部订单'
        })
        this.modal_loading = false
        this.exportModal = false
      }, 2000)
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
