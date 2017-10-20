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
          <Button type="primary" @click="searchdata(formItem)">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 标签页 -->
    <section>
      <Tabs type="card" :animated="false" @on-click="changedata">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <Table border ref="selection" :columns="columns" :data="sellervideodata" @on-select="showselect">
          </Table>
        </TabPane>
        <Button type="success" @click="" size="small" slot="extra" @click="allpass()">批量通过</Button>
        <Button type="warning" @click="" size="small" slot="extra" style="marginLeft:5px">批量不通过</Button>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-video-manager-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
  </div>
</template>
<script>
import * as api from 'api/common.js'
// 商品图片
let producttitle = [
  {
    title: '商品标题',
    key: 'productName',
    width: 100
  },
  {
    title: '商品主图',
    key: 'picUrls',
    render: (h, params) => {
      return h('div', [
        h('img', {
          props: {
            src: '../../../static/update-browser/images/chrome.png',
            alt: ''
          }
        }),
        h('img', {
        })
      ])
    }
  },
  {
    title: '商品介绍图片',
    key: 'picDesc'
  },
  {
    title: '商品添加或修改时间',
    key: 'lastUpdateTime'
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
      total: 1,
      pageSize: 1,
      sellervideodata: [
        { productName: '大银杰' },
        { productName: '小银杰' },
        { productName: '大小银杰' },
        { productName: '淫杰' }
      ],
      formItem: {
        startdate: '',
        lastdate: ''
      },
      tabs: [
        { title: '商品图片审核' },
        { title: '档口图片审核' },
        { title: '档口头像审核' }
      ],
      columns: []
    }
  },
  created() {
    // this.getProductPic(1, 5)
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
    },
    // 获取商品图片审核列表
    getProductPic(pageNo, pageSize, updateStartTime, updateEndTime) {
      let params = {
        pageSize: pageSize,
        updateStartTime: updateStartTime,
        updateEndTime: updateEndTime
      }
      api.getProductPic(params, pageNo).then(response => {
        this.sellervideodata = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 获取档口图片和档口头像审核列表
    getShopPic(pageNo, pageSize, picType, updateStartTime, updateEndTime) {
      let params = {
        pageSize: pageSize,
        picType: picType, // 档口图片类型 (1 档口图片，2 档口头像）
        updateStartTime: updateStartTime,
        updateEndTime: updateEndTime
      }
      api.getShopPic(params, pageNo).then(response => {
        this.sellervideodata = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 更新商户状态
    updataShopStatus(sellerId, status, remark) {
      let params = {
        sellerId: sellerId,
        status: status,
        remark: remark
      }
      api.updataShopStatus(params).then(response => {
      })
    },
    changepage(index) {
      this.getProductPic(index, 5)
    },
    searchdata(formItem) {
      console.log(formItem)
    },
    showselect(selection) {
      console.log(selection)
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