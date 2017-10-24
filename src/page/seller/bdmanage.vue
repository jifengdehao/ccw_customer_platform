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
          <Select v-model="formItem.market" placeholder="请选择" style="width: 200px">
            <Option v-for="item in market" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="label">负责人筛选：</span>
          <Select v-model="formItem.charge" placeholder="请选择" style="width: 200px">
            <Option v-for="item in charge" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary">筛选</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 表格 -->
    <section class="bd-manager-table">
      <Button style="marginBottom:10px" @click="addBD">新增</Button>
      <Table :columns="columns" :data="BDdata"></Table>
    </section>
    <!-- 分页 -->
    <section class="bd-manager-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
    <!-- 修改BD -->
    <Modal v-model="BDmodal" :title="modelTitle" width="400" class="BDmodal">
      <Form :model="modelFormItem" ref="formItem" inline>
        <FormItem>
          <span class="label">姓名：</span>
          <Input size="small" v-model="modelFormItem.name" :value="modelFormItem.name" placeholder="请输入" style="width: 150px"></Input>
          </br>
          <span class="label">电话：</span>
          <Input size="small" v-model="modelFormItem.tel" :value="modelFormItem.tel" placeholder="请输入" style="width: 150px"></Input>
          </br>
          <span class="label">邀请码：</span>
          <Input size="small" v-model="modelFormItem.invitCode" :value="modelFormItem.invitCode" placeholder="请输入" style="width: 150px"></Input>
          </br>
          <span class="label">负责市场：</span>
          <Select v-model="modelFormItem.market" :value="modelFormItem.market" size="small" placeholder="请选择" style="width: 150px">
            <Option v-for="item in market" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
      pageSize: 1,
      formItem: {},
      modelFormItem: {},
      charge: [],
      market: [],
      BDmodal: false,
      modelTitle: '',
      columns: [
        {
          title: 'BD姓名',
          key: 'name'
        },
        {
          title: '邀请码',
          key: 'invitCode'
        },
        {
          title: '负责市场',
          key: 'market'
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
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      BDdata: [{ name: '小二' }]
    }
  },
  // created: {},
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取BD用户列表
    getBDlist(pageStartIndex, pageSize, market, name) {
      let params = {
        pageStartIndex: pageStartIndex,
        pageSize: pageSize,
        market: market,
        name: name
      }
      api.getBDlist(params).then(response => {
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
    delPlatformBD(id) {
      api.addPlatformBD(id).then(response => {})
    },
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
    changepage(index) {},
    remove(index) {
      this.BDdata.splice(index, 1)
    },
    addBD() {
      this.modelTitle = '添加BD'
      this.BDmodal = true
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
