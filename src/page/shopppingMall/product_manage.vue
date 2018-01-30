/*
 * @Author: huShangJun 
 * @Date: 2018-01-26 09:44:21 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商品管理 
 */
<template>
  <div class="product_manage">
    <div v-if="!showProductMessage">
        <!-- 搜索 -->
      <section class="seller-account-manager-select">
        <Form inline>
          <FormItem>
            <span class="label">关键词：</span>
            <Input v-model="params.seek"  placeholder="请输入" style="width: 200px"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchAccountData">搜索</Button>
          </FormItem>
        </Form>
      </section>
      <!-- 表格内容 -->
      <section>
      <Tabs :animated="false"  @on-click="changeTable">
        <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab.title" >
          <Table ref="selection" border :columns="refundColumns" :data="refundData" @on-selection-change="changeData"></Table>
        </TabPane>
        <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra" v-if="showButton === 0">增加</Button>
      </Tabs>
      </section>
    <!-- 按钮 和分页 -->
      <section>
        <div class="buttons">
          <Button @click="handleSelectAll(true)">全选</Button>
          <Button type="success" @click="pass" :disabled="showButton === 1" >上架</Button>
          <Button type="warning" @click="notPass" :disabled="showButton === 2">下架</Button>
          <!--  -->
        </div>
        <div>
          <Page class="page-style" :current="pageNo" show-total :total="total" @on-change="changePage"></Page>
        </div>
      </section>
    </div>
   <div v-else>
     <product-message @product-manage='isShowProductMessage'></product-message>
   </div>
   <!-- 上下架弹框 -->
   <Modal v-model="changeModal" :mask-closable="false">
      <h2>确定将产品<span>{{changeValue}}</span></h2>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import ProductMessage from './productMessage'
export default {
  components: { ProductMessage },
  props: {},
  data() {
    return {
      changeModal: false,
      changeValue: '上架',
      showProductMessage: false, // 是否显示产品信息页
      pageNo: 1,
      pageSize: 10,
      total: 0,
      showButton: 0,
      selection: [], // 选中的数据
      tabs: [{ title: '全部' }, { title: '上架' }, { title: '下架' }],
      params: {
        status: null, // 不传就是查询全部 上架 1、下架 2
        pageSize: 10,
        seek: '' // 搜索内容
      },
      refundColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '商品编号',
          key: 'jfProductId',
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'productName',
          align: 'center'
        },
        {
          title: '商品关键词',
          key: 'labels',
          align: 'center'
        },
        {
          title: '所属分类',
          key: 'categoryName',
          align: 'center'
        },
        {
          title: '兑换方式',
          key: 'exchangeWay',
          align: 'center'
        },
        {
          title: '商品主图',
          key: 'mianPicture',
          align: 'center'
        },
        {
          title: '商品详情',
          key: 'detailsPicture',
          align: 'center'
        },
        {
          title: '商品库存',
          key: 'inventory',
          align: 'center'
        },
        {
          title: '商品状态',
          key: 'statusName',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          width: 120,
          display: 'none',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'info'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.changeModal = true
                      this.changeValue =
                        params.row.statusName === '上架' ? '下架' : '上架'
                    }
                  }
                },
                params.row.statusName === '上架' ? '下架' : '上架'
              ),
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
                      this.showProductMessage = true
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    width: '50px',
                    display: 'none'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      refundData: []
    }
  },
  created() {
    this.getproductList()
  },
  mounted() {},
  activited: {},
  update: {},
  methods: {
    // 切换tab
    changeTable(index) {
      this.showButton = index
      if (index === 0) {
        this.params.status = null
      } else {
        this.params.status = index
      }
      this.getproductList()
    },
    // 切换分页
    changePage(number) {
      this.pageNo = number
      this.getproductList()
    },
    // 获取商品列表
    getproductList() {
      api.getproductList(this.pageNo, this.params).then(res => {
        this.refundData = res.records
        this.total = res.total
        this.pageNo = res.current
      })
    },
    // 搜索
    searchAccountData() {
      this.getproductList()
    },
    // 全选
    handleSelectAll(status) {
      this.$refs.selection[0].selectAll(status)
    },
    // 选中的数据
    changeData(selection) {
      this.selection = selection.map(item => {
        if (item.mcAccountRefundId) {
          return item.mcAccountRefundId
        }
      })
    },
    // 增加
    handleTabsAdd() {
      this.showProductMessage = true
    },
    // 批量通过
    pass() {},
    // 批量不通过
    notPass() {},
    isShowProductMessage() {
      this.showProductMessage = false
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.buttons {
  margin-top: 20px;
  float: left;
}
.page-style {
  margin-top: 20px;
  float: right;
}
h2 {
  width: 100%;
  margin: 30px auto;
  text-align: center;
}
</style>