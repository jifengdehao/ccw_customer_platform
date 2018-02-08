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
          <span class="label">日期：</span>
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
      <Tabs  :animated="false" @on-click="changedata">
        <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab.title">
          <Table border ref="selection" :columns="columns" :data="sellervideodata" @on-selection-change="showselect">
          </Table>
        </TabPane>
        <Button type="success" size="small" slot="extra" @click="batchpass()">批量通过</Button>
                      
        <Button type="warning" @click="batchnotpass" size="small" slot="extra" style="marginLeft:5px">批量不通过</Button>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-video-manager-page">
      <Page :total="total" show-total :page-size="pageSize" :current="currentPage" @on-change="changepage"></Page>
    </section>
    <!-- 不通过弹窗 -->
     <Modal v-model="notPassModal" title="请输入不通过原因：" width="300" :mask-closable="false">
      <Form>
        <FormItem>
          <Input v-model="auditPicParams.failReason"  type="textarea" :maxlength='50' :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="info" style="width:60px" @click="notPass">确定</Button>
      </div>
    </Modal>
    <!-- 通过弹窗 -->
     <Modal v-model="PassModal" title="通过"  width="300" :mask-closable="false">
        <h2>确定审核通过？</h2>
      <div slot="footer">
        <Button type="info" style="width:60px" @click="auditPass">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import tableImg from './sellercomponents/tableimage'
import * as date from '@/until/time'
export default {
  components: {
    tableImg
  },
  props: {},
  data() {
    return {
      notPassModal: false, // 不通过时弹窗
      PassModal: false, // 通过时弹窗
      total: 1,
      currentPage: 1,
      pageSize: 20,
      current: 0,
      selectiondata: [],
      sellervideodata: [],
      id: '', // 获取的id数组
      formItem: {
        startdate: '',
        lastdate: ''
      },
      productParams: {
        // 获取商品图片列表审核传参
        pageSize: 20,
        updateStartTime: '',
        updateEndTime: ''
      },
      shopParams: {
        // 获取档口或头像图片列表审核传参
        pageSize: 20,
        picType: 1, // 档口图片类型 (1 档口图片，2 档口头像）
        updateStartTime: '',
        updateEndTime: ''
      },
      auditPicParams: {
        // 审核图片传值
        auditStatus: 0,
        failReason: '',
        idList: [],
        picType: NaN
      },
      tabs: [{ title: '商品图片审核' }, { title: '档口图片审核' }, { title: '档口头像审核' }],
      columns: [],
      producttitle: [
        {
          title: '商品标题',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('div', params.row.productName),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    top: '0',
                    left: '-2px',
                    width: '80px',
                    height: '20px',
                    lineHeight: '20px',
                    color: '#fff',
                    backgroundColor: '#ff9900',
                    display:
                      params.row.status === 5 && params.row.auditStatus === 2
                        ? 'block'
                        : 'none'
                  }
                },
                '违规重新上架'
              )
            ])
          }
        },
        {
          title: '商品主图',
          key: 'picUrls',
          align: 'center',
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
          align: 'center',
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
          align: 'center',
          render: (h, params) => {
            return date.formatDateTime(params.row.lastUpdateTime)
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          align: 'center',
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
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.notPassModal = true
                      this.auditPicParams.failReason = ''
                      this.id = params.row.spProductId
                      // this.productPicNotPass(params.row.spProductId)
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
                  style: {
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.PassModal = true
                      this.id = params.row.spProductId
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
      ],
      shoptitle: [
        {
          title: '档口',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '档口图片',
          key: 'shoppic',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(tableImg, {
                props: {
                  picUrls: params.row.shopPicUrl
                }
              })
            ])
          }
        },
        {
          title: '商品添加或修改时间',
          key: 'lastUpdateTime',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return date.formatDateTime(params.row.lastUpdateTime)
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          align: 'center',
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
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.notPassModal = true
                      this.auditPicParams.failReason = ''
                      this.id = params.row.msShopId
                      // this.shopPicNotPass(params.row.msShopId)
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
                  style: {
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.PassModal = true
                      this.id = params.row.msShopId
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
      ],
      avatar: [
        {
          title: '档口',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '档口头像图片',
          key: 'headUrl',
          align: 'center',
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
          key: 'lastUpdateTime',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return date.formatDateTime(params.row.lastUpdateTime)
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          align: 'center',
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
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.notPassModal = true
                      this.auditPicParams.failReason = ''
                      this.id = params.row.msShopId
                      // this.shopHeaderPicNotPass(params.row.msShopId)
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
                  style: {
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.PassModal = true
                      this.id = params.row.msShopId
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
    }
  },
  created() {
    this.columns = this.producttitle
    this.getProductPic(1)
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    changedata(index) {
      this.current = index
      this.selectiondata = []  // 清空上一个table的多选
      if (index === 0) {
        this.columns = this.producttitle
        this.productParams.updateStartTime = this.formItem.startdate
        this.productParams.updateEndTime = this.formItem.lastdate
        this.getProductPic(1)
      } else {
        this.shopParams.updateStartTime = this.formItem.startdate
        this.shopParams.updateEndTime = this.formItem.lastdate
        if (index === 1) {
          this.columns = this.shoptitle
          this.shopParams.picType = 1
        } else if (index === 2) {
          this.columns = this.avatar
          this.shopParams.picType = 2
        }
        this.getShopPic(1)
      }
    },
    // 获取商品图片审核列表
    getProductPic(pageNo) {
      api.getProductPic(this.productParams, pageNo).then(response => {
        this.sellervideodata = response.records
        this.total = response.total
        this.pageSize = response.size
        this.currentPage = response.current
      })
    },
    // 获取档口图片和档口头像审核列表
    getShopPic(pageNo) {
      api.getShopPic(this.shopParams, pageNo).then(response => {
        this.sellervideodata = response.records
        this.total = response.total
        this.pageSize = response.size
        this.currentPage = response.current
      })
    },
    // 审核商品图片
    auditProductPicStatus() {
      api.auditProductPicStatus(this.auditPicParams).then(response => {
        this.$Message.info('更新成功')
        this.getProductPic(1)
      })
    },
    // 审核店铺图片
    auditShopPicStatus() {
      api.auditShopPicStatus(this.auditPicParams).then(response => {
        this.$Message.info('更新成功')
        this.id = ''
        if (this.current === 1) {
          this.getShopPic(1)
        } else if (this.current === 2) {
          this.getShopPic(1)
        }
      })
    },
    // 分页
    changepage(index) {
      if (this.current === 0) {
        this.getProductPic(index)
      } else {
        this.getShopPic(index)
      }
    },
    // 搜索
    searchdata(formItem) {
      if (this.current === 0) {
        this.productParams.updateStartTime = formItem.startdate
        this.productParams.updateEndTime = formItem.lastdate
        this.getProductPic(1)
      } else {
        this.shopParams.updateStartTime = formItem.startdate
        this.shopParams.updateEndTime = formItem.lastdate
        this.getShopPic(1)
      }
    },
    // 多选
    showselect(selection) {
      this.selectiondata = selection
      this.getID()
    },
    getID() {
      this.id = this.selectiondata.map(item => {
        if (this.current === 0) {
          return item.spProductId
        } else {
          return item.msShopId
        }
      })
    },

    // 审核
    audit() {
      if (!Array.isArray(this.id)) {
        this.id = [this.id]
      } else {
        this.getID()
      }
      this.auditPicParams.idList = this.id
      // this.auditPicParams.auditStatus = 0
      if (this.current === 0) {
        this.auditPicParams.picType = 3
        this.auditProductPicStatus()
      } else {
        if (this.current === 1) {
          this.auditPicParams.picType = 1
        } else if (this.current === 2) {
          this.auditPicParams.picType = 2
        }
        this.auditShopPicStatus()
      }
    },
    // 不通过
    notPass() {
      this.auditPicParams.auditStatus = 0
      this.audit()
      this.notPassModal = false
    },
    // 审核通过
    auditPass() {
      this.auditPicParams.auditStatus = 1
      this.audit()
      this.PassModal = false
    },
    // 批量通过
    batchpass() {
      if (this.selectiondata.length > 0) {
        this.PassModal = true
      } else {
        alert('没有选择')
      }
    },
    // 批量不通过
    batchnotpass() {
      if (this.selectiondata.length > 0) {
        this.notPassModal = true
        this.auditPicParams.failReason = ''
      } else {
        alert('没有选择')
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
  vertical-align: middle;
}
.seller-video-manager-page {
  margin-top: 10px;
  text-align: right;
}
</style>