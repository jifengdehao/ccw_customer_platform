/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-14 10:26:39 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 分销用户管理页面 
 */

<template>
  <div>
    <div class="searchInput">
      <input type="text">
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>
    <div class="tabs">
      <Tabs @on-click="onUserName" :animated="false">
        <TabPane v-for="tab in tabPaneValue" :key="tab.id" :label="tab.label">
          <Table :columns="columns" :data="userDate"></Table>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tabPaneValue: [ // table值
        {
          label: '全部',
          name: 'allTab'
        },
        {
          label: '正常用户',
          name: 'normalUser'
        },
        {
          label: '异常用户',
          name: 'exceptiongUser'
        },
        {
          label: '已冻结用户',
          name: 'forzenUser'
        }
      ],
      columns: [
        {
          title: '用户ID',
          key: 'userId',
          width: '110',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'phoneNum'
        },
        {
          title: '菜一代数量',
          key: 'oneUserNum',
          align: 'center'
        },
        {
          title: '菜二代数量',
          key: 'twoUserNum',
          align: 'center'
        },
        {
          title: '菜一代收益（菜城币）',
          key: 'oneProfit',
          align: 'center'
        },
        {
          title: '菜一代收益（菜城币）',
          key: 'twoProfit',
          align: 'center'
        },
        {
          title: '总收益（菜城币）',
          key: 'totalIncome',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/distribution/distributionUserInfo?userId=' + params.row.userId)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data: [
        {
          userId: '1',
          phoneNum: '13113277667',
          oneUserNum: '11111',
          twoUserNum: '2232',
          oneProfit: '1112',
          twoProfit: '22231',
          totalIncome: '43431'
        },
        {
          userId: '2',
          phoneNum: '13113277667',
          oneUserNum: '11111',
          twoUserNum: '2232',
          oneProfit: '1112',
          twoProfit: '22231',
          totalIncome: '43431'
        },
        {
          userId: '3',
          phoneNum: '13113277667',
          oneUserNum: '11111',
          twoUserNum: '2232',
          oneProfit: '1112',
          twoProfit: '22231',
          totalIncome: '43431'
        }
      ],
      data2: [],
      data3: [],
      data4: [],
      userDate: [] // 保存数据
    }
  },
  created: function() {
    // 初始化渲染第一个table数据
    this.userDate = this.data
  },
  methods: {
    // 获取ID 判断当前点击table 渲染数据
    onUserName(index) {
      switch (index) {
        case 0: this.userDate = this.data; break
        case 1: this.userDate = this.data2; break
        case 2: this.userDate = this.data3; break
        case 3: this.userDate = this.data4; break
      }
    }
  }
}
</script>

<style scoped lang="css" >
.searchInput {
  margin-bottom: 40px;
}

.searchInput input {
  width: 220px;
  height: 32px;
  padding-left: 5px;
  margin-right: 6px;
  outline: none;
}
</style>
