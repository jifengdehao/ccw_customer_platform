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
        <Button type="success" size="small" slot="extra" @click="batchpass()">批量通过</Button>
        <Button type="warning" @click="batchnotpass()" size="small" slot="extra" style="marginLeft:5px">批量不通过</Button>
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
import tableImg from './sellercomponents/tableimage'
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
        h(tableImg, {
          props: {
            picUrls: params.row.picUrls
          }
        })
      ])
    }
  },
  {
    title: '商品介绍图片',
    key: 'picDesc',
    render: (h, params) => {
      return h('div', [
        h(tableImg, {
          props: {
            picUrls: params.row.picDesc
          }
        })
      ])
    }
  },
  {
    title: '商品添加或修改时间',
    key: 'lastUpdateTime',
    width: 200,
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    width: 140,
    render: (h, params) => {
      return h('div', [
        h(
          'Button',
          {
            props: {
              type: 'warning',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.auditProductPicStatus(params.row.spProductId, 0)
              }
            }
          },
          '不通过'
        ),
        h(
          'Button',
          {
            props: {
              type: 'success',
              size: 'small'
            },
            on: {
              click: () => {
                this.auditProductPicStatus(params.row.spProductId, 1)
              }
            }
          },
          '通过'
        )
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
    key: 'shoppic',
    render: (h, params) => {
      return h('div', [
        h(tableImg, {
          props: {
            picUrls: params.row.shoppic
          }
        })
      ])
    }
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
        h(
          'Button',
          {
            props: {
              type: 'warning',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.auditShopPicStatus(params.row.shopId, 1, 0)
              }
            }
          },
          '不通过'
        ),
        h(
          'Button',
          {
            props: {
              type: 'success',
              size: 'small'
            },
            on: {
              click: () => {
                this.auditShopPicStatus(params.row.shopId, 1, 1)
              }
            }
          },
          '通过'
        )
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
    key: 'headUrl',
    render: (h, params) => {
      return h('div', [
        h(tableImg, {
          props: {
            picUrls: params.row.headUrl
          }
        })
      ])
    }
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
        h(
          'Button',
          {
            props: {
              type: 'warning',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.auditShopPicStatus(params.row.shopId, 2, 0)
              }
            }
          },
          '不通过'
        ),
        h(
          'Button',
          {
            props: {
              type: 'success',
              size: 'small'
            },
            on: {
              click: () => {
                this.auditShopPicStatus(params.row.shopId, 2, 1)
              }
            }
          },
          '通过'
        )
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
  components: {
    tableImg
  },
  props: {},
  data() {
    return {
      total: 1,
      pageSize: 1,
      current: 1,
      selectiondata: [],
      sellervideodata: [],
      formItem: {
        startdate: '',
        lastdate: ''
      },
      tabs: [{ title: '商品图片审核' }, { title: '档口图片审核' }, { title: '档口头像审核' }],
      columns: []
    }
  },
  created() {
    this.getProductPic(1, 5)
    this.columns = producttitle
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    changedata(index) {
      this.current = index
      if (index === 0) {
        this.getProductPic(1, 5)
        this.columns = producttitle
      } else if (index === 1) {
        this.getShopPic(1, 5, 1)
        this.columns = shoptitle
      } else if (index === 2) {
        this.getShopPic(1, 5, 2)
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
    // 审核商品图片
    auditProductPicStatus(productId, auditStatus) {
      let params = {
        productId: productId,
        auditStatus: auditStatus // 通过是3 不通过是2
      }
      api.auditProductPicStatus(params).then(response => {})
    },
    // 审核店铺图片
    auditShopPicStatus(shopId, picType, auditStatus) {
      let params = {
        shopId: shopId,
        picType: picType, // 1：档口图片，2：档口头像
        auditStatus: auditStatus // 通过是3 不通过是2
      }
      api.auditShopPicStatus(params).then(response => {
        if (response.msg === '更新成功') {
          // remove(1)
        }
      })
    },
    // 分页
    changepage(index) {
      if (this.current === 0) {
        this.getProductPic(index, 5)
      } else if (this.current === 1) {
        this.getShopPic(index, 5, 1)
      } else if (this.current === 2) {
        this.getShopPic(index, 5, 2)
      }
    },
    // 搜索
    searchdata(formItem) {
      if (this.current === 0) {
        this.getProductPic(1, 5, formItem.startdate, formItem.lastdate)
      } else if (this.current === 1) {
        this.getShopPic(1, 5, 1, formItem.startdate, formItem.lastdate)
      } else if (this.current === 2) {
        this.getShopPic(1, 5, 2, formItem.startdate, formItem.lastdate)
      }
    },
    // 多选
    showselect(selection) {
      this.selectiondata = selection
    },
    // 批量通过
    batchpass() {
      this.selectiondata.forEach(item => {
        if (this.current === 0) {
          this.auditProductPicStatus(item.spProductId, 1)
        } else if (this.current === 1) {
          this.auditShopPicStatus(item.msShopId, 1, 1)
        } else if (this.current === 2) {
          this.auditShopPicStatus(item.msShopId, 1, 1)
        }
      })
    },
    // 批量不通过
    batchnotpass() {
      this.selectiondata.forEach(item => {
        if (this.current === 0) {
          this.auditProductPicStatus(item.spProductId, 0)
        } else if (this.current === 1) {
          this.auditShopPicStatus(item.msShopId, 1, 0)
        } else if (this.current === 2) {
          this.auditShopPicStatus(item.msShopId, 1, 0)
        }
      })
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