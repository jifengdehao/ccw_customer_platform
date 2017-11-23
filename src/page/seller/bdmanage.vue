/*
 * @Author: huShangJun 
 * @Date: 2017-10-12 17:33:51 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: BD及邀请码管理 
 */
<template>
  <div class="bd-manager">
    <!-- 筛选 -->
    <section class="bd-manager-select">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">市场：</span>
          <Select v-model="formItem.psMarketId" clearable placeholder="请选择市场" style="width: 200px">
            <Option v-for="item in allMarket" :value="item.psMarketId" :key="item.psMarketId">{{ item.marketName }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="label">负责人筛选：</span>
          <Select v-model="formItem.ptBdId" clearable placeholder="请选择负责人" style="width: 200px">
            <Option v-for="item in allCharge" :value="item.ptBdId" :key="item.ptBdId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search(formItem)">筛选</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 表格 -->
    <section class="bd-manager-table">
      <Button style="marginBottom:10px" @click="addBD">新增</Button>
      <Table border :columns="columns" :data="BDdata"></Table>
    </section>
    <!-- 分页 -->
    <section class="bd-manager-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
    <!-- 新增 修改BD -->
    <Modal v-model="BDmodal" :title="modelTitle" width="400" class="BDmodal" @on-ok="confirmAdd(modelFormItem,modelTitle)">
      <Form :model="modelFormItem" :rules="ruleValidate" ref="formItem" label-postion="left" :label-width="100">
        <FormItem label="姓名：" prop="name">
          <Input size="small" v-model="modelFormItem.name"  placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="电话：" prop="mobileno">
          <Input size="small" v-model="modelFormItem.mobileno"  placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="邀请码：" prop="invitationCode">
          <Input size="small" v-model="modelFormItem.invitationCode"  placeholder="请输入" style="width: 150px"></Input>
        </FormItem> 
        <FormItem label="负责市场：" >
          <Select v-model="modelFormItem.psMarketId"  size="small" placeholder="请选择" style="width: 150px">
             <Option v-for="item in allMarket" :value="item.psMarketId" :key="item.psMarketId">{{ item.marketName }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      total: 1,
      pageSize: 10,
      formItem: {},
      modelFormItem: {},
      allCharge: [],
      allMarket: [],
      BDmodal: false,
      modelTitle: '',
      columns: [
        {
          title: 'BD姓名',
          key: 'name'
        },
        {
          title: '邀请码',
          key: 'invitationCode'
        },
        {
          title: '负责市场',
          key: 'marketName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                      this.modelFormItem = params.row
                      this.modelTitle = '修改BD'
                      this.BDmodal = true
                    }
                  }
                },
                '修改'
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
                      this.remove(params)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      BDdata: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        mobileno: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
            pattern: '^[1][0-9]{10}'
          }
        ],
        invitationCode: [
          {
            required: true,
            message: '邀请码必填',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getBDlist(1, 10)
    this.getAllBD()
    this.getAllMarket()
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取所有BD
    getAllBD() {
      api.getAllBD().then(response => {
        this.allCharge = response
      })
    },
    // 获取所有的菜市场
    getAllMarket() {
      api.getAllMarket().then(response => {
        this.allMarket = response
      })
    },
    // 获取BD用户列表
    getBDlist(pageNo, pageSize, marketId, bdId) {
      let params = {
        pageSize: pageSize,
        marketId: marketId,
        bdId: bdId
      }
      api.getBDlist(params, pageNo).then(response => {
        this.BDdata = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 添加BD
    addPlatformBD(name, mobileno, invitCode, market) {
      let params = {
        name: name,
        mobileno: mobileno,
        invitCode: invitCode,
        marketId: market
      }
      api.addPlatformBD(params).then(response => {})
    },
    // 删除BD
    // delPlatformBD(id) {
    //   api.addPlatformBD(id).then(response => {})
    // },
    // 修改BD
    modifyBD(id, name, mobileno, invitCode, market) {
      let params = {
        name: name,
        mobileno: mobileno,
        invitCode: invitCode,
        marketId: market
      }
      api.modifyBD(params, id).then(response => {})
    },
    // 分页
    changepage(index) {
      this.getBDlist(index, 10)
    },
    // 删除
    remove(params) {
      let id = params.row.ptBdId
      let index = params.index
      api.delPlatformBD(id).then(response => {
        this.$Message.info('删除成功')
        this.BDdata.splice(index, 1)
      })
    },
    addBD() {
      this.modelFormItem = {}
      this.modelTitle = '增加BD'
      this.BDmodal = true
    },
    // 确定添加或者修改
    confirmAdd(modelFormItem, modelTitle) {
      if (modelTitle === '增加BD') {
        api.addPlatformBD(modelFormItem).then(response => {
          this.BDdata.push(modelFormItem)
          this.$Message.info('添加成功')
        })
      } else if (modelTitle === '修改BD') {
        let id = modelFormItem.ptBdId
        api.modifyBD(modelFormItem, id).then(response => {
          this.$Message.info('修改成功')
        })
      }
      this.getBDlist(1, 10)
    },
    // 搜索
    search(formItem) {
      this.getBDlist(1, 10, formItem.psMarketId, formItem.ptBdId)
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.bd-manager-page {
  margin-top: 10px;
  text-align: right;
}
.BDmodal span {
  display: inline-block;
  width: 60px;
}
</style>
