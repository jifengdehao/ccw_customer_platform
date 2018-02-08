/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-14 10:26:39 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 分销用户管理页面 
 */

<template>
  <div>
    <p class="search">
      <input style="width:100px;" type="text" placeholder="用户ID" v-model="condition.userId">
      <input style="width:100px;" type="text" placeholder="用户昵称" v-model="condition.nickName">
      <input style="width:100px;" type="text" placeholder="用户手机号" v-model="condition.phone">
      <Button type="primary" @click="search">搜索</Button>
    </p>
    <div class="content">
      <Tabs v-model="tabIndex" @on-click="showTabIndex">
        <TabPane label="用户端"></TabPane>
        <TabPane label="商户端"></TabPane>
        <TabPane label="配送端"></TabPane>
      </Tabs>
      <Table v-if="tabData" border stripe :columns="keys" :data="tabData.records"></Table>
      <Page v-if="tabData" style="float:right;margin-top:20px;" :total="tabData.total" show-total></Page>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from 'api/common'
export default {
  data() {
    return {
      keys: [
        {
          title: '用户ID',
          key: 'userId',
          align: 'center'
        },
        {
          title: '用户手机',
          key: 'phoneNo',
          align: 'center'
        },
        {
          title: '菜一代数量',
          key: 'levelOneCount',
          align: 'center'
        },
        {
          title: '菜二代数量',
          key: 'levelTwoCount',
          align: 'center'
        },
        {
          title: '菜一代收益(菜城币)',
          key: 'levelOneCoins',
          align: 'center'
        },
        {
          title: '菜二代收益(菜城币)',
          key: 'levelTwoCoins',
          align: 'center'
        },
        {
          title: '总收益(菜城币)',
          key: 'totalCoins',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: 'distribution_people_manage/distribution_detail',
                      query: {
                        id: params.row.userId
                      }
                    })
                  }
                }
              },
              '查看'
            )
          }
        }
      ],
      tabData: null,
      pageNo: 1,
      params: {
        type: 1,
        condition1: '', // id
        condition2: '', //  手机号
        condition3: '', //  昵称
        pageSize: 20
      },
      tabIndex: 0,
      condition: {
        userId: '',
        nickName: '',
        phone: ''
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    //  获取分销数据
    getDataList() {
      http.getDistributionList(this.pageNo, this.params).then(response => {
        this.tabData = response
      })
    },
    //  tab点击
    showTabIndex(index) {
      this.params.type = parseInt(index) + 1
      this.getDataList()
    },
    //  搜索
    search() {
      this.params.condition1 = this.condition.userId
      this.params.condition2 = this.condition.phone
      this.params.condition3 = this.condition.nickName
      this.getDataList()
    }
  }
}
</script>

<style scoped lang="css" >
p.search {
  float: right;
  height: 30px;
}

p.search > input[type='text'] {
  width: 200px;
  height: 30px;
  text-indent: 5px;
  margin-right: 10px;
}

p > * {
  vertical-align: sub;
}

div.content {
  clear: both;
}
</style>
