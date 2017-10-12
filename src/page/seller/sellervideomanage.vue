/*
 * @Author: huShangJun 
 * @Date: 2017-10-11 14:16:17 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商家视屏图片审核 
 */
<template>
  <div class="seller-video-manager">
    <!-- 时间筛选 -->
    <section class="seller-video-manager-datepick">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">日期筛选：</span>
          <DatePicker type="date" v-model="formItem.startdate" placement="bottom-start" placeholder="选择开始日期" style="width: 200px"></DatePicker>
          <i> - </i>
          <DatePicker type="date" v-model="formItem.lastdate" placement="bottom-start" placeholder="选择结束日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 标签页 -->
    <section>
      <Tabs type="card" :animated="false" @on-click="changedata">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <Table border :columns="columns" :data="auditdata">
          </Table>
        </TabPane>
        <Button type="success" @click="" size="small" slot="extra">批量通过</Button>
        <Button type="warning" @click="" size="small" slot="extra" style="marginLeft:5px">批量不通过</Button>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-video-manager-page">
      <Page :total="100" show-total></Page>
    </section>
  </div>
</template>
<script>
// 商品图片
let producttitle = [
  {
    title: '商品标题',
    key: 'mobileno'
  },
  {
    title: '商品主图',
    key: 'marketName'
  },
  {
    title: '商品介绍图片',
    key: 'businessType'
  },
  {
    title: '商品添加或修改时间',
    key: 'businessType'
  },
  {
    title: '操作',
    key: 'operation',
    width: 140,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'warning',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            // click: () => {
            // }
          }
        }, '不通过'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          on: {
            // click: () => {
            // }
          }
        }, '通过')
      ])
    }
  },
  {
    type: 'selection',
    width: 60,
    align: 'center'
  }
]
// 档口图片审核
let shoptitle = [
  {
    title: '档口',
    key: 'shopName'
  },
  {
    title: '档口图片',
    key: 'shoppic'
  },
  {
    title: '商品添加或修改时间',
    key: 'modifyTime'
  },
  {
    title: '操作',
    key: 'operation',
    width: 140,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'warning',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            // click: () => {
            // }
          }
        }, '不通过'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          on: {
            // click: () => {
            // }
          }
        }, '通过')
      ])
    }
  },
  {
    type: 'selection',
    width: 60,
    align: 'center'
  }
]
// 档口头像审核
let avatar = [
  {
    title: '档口',
    key: 'shopName'
  },
  {
    title: '档口头像图片',
    key: 'shoppic'
  },
  {
    title: '商品添加或修改时间',
    key: 'modifyTime'
  },
  {
    title: '操作',
    key: 'operation',
    width: 140,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'warning',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            // click: () => {
            // }
          }
        }, '不通过'),
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          on: {
            // click: () => {
            // }
          }
        }, '通过')
      ])
    }
  },
  {
    type: 'selection',
    width: 60,
    align: 'center'
  }
]
export default {
  components: {},
  props: {},
  data() {
    return {
      auditdata: [],
      formItem: {},
      tabs: [
        { title: '商品图片审核' },
        { title: '档口图片审核' },
        { title: '档口头像审核' }
      ],
      columns: []
    }
  },
  created() {
    this.columns = producttitle
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    changedata(index) {
      if (index === 0) {
        this.columns = producttitle
      } else if (index === 1) {
        this.columns = shoptitle
      } else if (index === 2) {
        this.columns = avatar
      }
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.seller-video-manager-datepick .label {
  font-size: 16px;
  vertical-align: middle;
}

.seller-video-manager-page {
  margin-top: 10px;
  text-align: right;
}
</style>