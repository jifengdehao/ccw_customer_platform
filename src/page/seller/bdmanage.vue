/*
 * @Author: huShangJun 
 * @Date: 2017-10-12 17:33:51 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 功能开发点 
 */
<template>
  <div class="bd-manager">
    <!-- 筛选 -->
    <section class="bd-manager-select">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">市场：</span>
          <Select v-model="formItem.select" placeholder="请选择" style="width: 200px">
            <Option v-for="item in charge" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="label">负责人筛选：</span>
          <Select v-model="formItem.select" placeholder="请选择" style="width: 200px">
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
      <Page :total="100" show-total></Page>
    </section>
    <!-- 修改BD -->
    <Modal v-model="BDmodal" :title="modelTitle" width="600">
    </Modal>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      formItem: {},
      charge: [],
      BDmodal: false,
      modelTitle: '',
      columns: [
        {
          title: 'BD姓名',
          key: 'mobileno'
        },
        {
          title: '邀请码',
          key: 'marketName'
        },
        {
          title: '负责市场',
          key: 'businessType'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.BDmodel = true
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      BDdata: []
    }
  },
  // created: {},
  // mounted: {},
  activited: {},
  update: {},
  methods: {
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
</style>
