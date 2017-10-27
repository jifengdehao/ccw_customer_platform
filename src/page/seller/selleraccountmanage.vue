/*
 * @Author: huShangJun 
 * @Date: 2017-10-11 17:18:19 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商户账号管理 
 */
<template>
  <div class="seller-account-manager">
    <!-- 搜索 -->
    <section class="seller-account-manager-select">
      <Form :model="formItem" inline>
        <FormItem>
          <span class="label">日期筛选：</span>
          <DatePicker type="date" v-model="formItem.startdate" placement="bottom-start" placeholder="选择开始日期" style="width: 200px"></DatePicker>
          <i> - </i>
          <DatePicker type="date" v-model="formItem.lastdate" placement="bottom-start" placeholder="选择结束日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <span class="label">账号状态：</span>
          <Select v-model="formItem.status" placeholder="请选择" style="width: 200px">
                <Option value="1">全部</Option>
                <Option value="2">关档</Option>
                <Option value="3">暂停封号</Option>
                <Option value="4">正常</Option>
                <Option value="5">账号冻结</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="label">商家账号：</span>
          <Input v-model="formItem.msSellerId" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <span class="label">商家手机：</span>
          <Input v-model="formItem.mobileno" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <span class="label">档口名称：</span>
          <Input v-model="formItem.shopName" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="searchAccountData(formItem)">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 表格内容 -->
    <section class="seller-account-manager-table">
      <Table border :columns="columns" :data="sellerAccountData"></Table>
    </section>
    <!-- 分页 -->
    <section class="seller-account-manager-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
    <!-- 商家信息模态框 -->
    <Modal v-model="shopMessageModal" title="商家信息" width="900" @on-ok="modifySellerInfo(shopMessage)">
      <Form ref="formInline" :model="shopMessage" inline>
        <Row>
          <Col span="9">
          <!-- 账号信息 -->
          <FormItem prop="user" class="shopMessagemModal-user">
            <h3>账号信息</h3>
            <span>账号名：</span>
            <span>{{shopMessage.msSellerId}}</span>
            </br>
            <span>支付宝账号：</span>
            <Input size="small" :disabled="disabled" v-model="shopMessage.alipayAccount" :value="shopMessage.alipayAccount" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>手机号：</span>
            <Input size="small" :disabled="disabled" v-model="shopMessage.mobileno" :value="shopMessage.mobileno" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>密码：</span>
            <Input type="password" size="small" :disabled="disabled" v-model="shopMessage.password" :value="shopMessage.password" placeholder="请输入" style="width: 150px"></Input>
            <Button size="small" @click="modifyDisabled">修改</Button>
          </FormItem>
          <!-- 店铺信息 -->
          <FormItem prop="user" class="shopMessagemModal-shopinfo">
            <h3>店铺信息</h3>
            <span>档口图片：</span>
              <img :src="shopMessage.headUrl" v-model="shopMessage.headUrl" alt="">
              </br>
            <span>档口名称：</span>
            <Input size="small"  v-model="shopMessage.shopName" :value="shopMessage.shopName" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>档主姓名：</span>
            <Input size="small"  v-model="shopMessage.shopOwerName" :value="shopMessage.shopOwerName" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>档口号：</span>
            <Input size="small"  v-model="shopMessage.shopNo" :value="shopMessage.shopNo" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>营业状态：</span>
             <Select size="small" v-model="shopMessage.bussinessStatus" :value="shopMessage.bussinessStatus" placeholder="请选择" style="width: 150px">
                <Option value="1">全部</Option>
                <Option value="2">关档</Option>
                <Option value="3">暂停封号</Option>
                <Option value="4">正常</Option>
            </Select>
            </br>
            <span>营业时间：</span>
            <Input size="small"  v-model="shopMessage.businessHour" :value="shopMessage.businessHour" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>店铺电话：</span>
            <Input size="small"  v-model="shopMessage.mobileno" :value="shopMessage.mobileno" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>店铺公告：</span>
            <textarea v-model="shopMessage.notice" :value="shopMessage.notice" cols="30" rows="3"></textarea>
            </br>
            <span>店铺地址：</span>
            <Input size="small" v-model="shopMessage.stallAddress" :value="shopMessage.stallAddress" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>主营类型：</span>
            <Select size="small"  v-model="shopMessage.businessDictCode" :value="shopMessage.businessDictCode" placeholder="请选择" style="width: 150px">
            <Option v-for="item in businessDictCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="15">
          <!-- 店铺图片 -->
          <FormItem prop="password" class="shopMessagemModal-shopimag">
            <h3>店铺图片</h3>
          </FormItem>
          <!-- 营业资质 -->
          <FormItem prop="password" class="shopMessagemModal-qualification">
            <h3>营业资质</h3>
          </FormItem>
          <!-- 协议合同 -->
          <FormItem prop="password" class="shopMessagemModal-agreement">
            <h3>协议合同</h3>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <!-- 商家账号管理模态框 -->
    <Modal v-model="shopManageModal" title="账号管理" width="500" @on-ok="modifySellerStatus(shopManageData)">
      <Form v-model="shopManageData">
        <FormItem label="设置账号限制：">
          <Select v-model="shopManageData.status" :value="shopManageData.status" placeholder="请选择">
            <Option value="0">关档</Option>
            <Option value="1">账号恢复</Option>
            <Option value="2">账号冻结</Option>
          </Select>
        </FormItem>
        <FormItem label="添加备注：">
          <Input v-model="shopManageData.remark" :value="shopManageData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
      pageSize: 5,
      disabled: true,
      sellerId: 0,
      shopMessage: {},
      shopManageData: {},
      bussinessStatus: [],
      shopMessageModal: false,
      shopManageModal: false,
      sellerAccountData: [],
      formItem: {},
      businessDictCode: [],
      columns: [
        {
          title: '档口名称',
          key: 'shopName'
        },
        {
          title: '商家账号',
          key: 'msSellerId'
        },
        {
          title: '商家手机',
          key: 'mobileno'
        },
        {
          title: '商家信息详情',
          key: 'shopMessage',
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
                      this.getsellerInfo(
                        params.row.msSellerId,
                        params.row.shopId
                      )
                      this.shopMessageModal = true
                    }
                  }
                },
                '查看'
              )
            ])
          }
        },
        {
          title: '账号管理',
          key: 'shopManage',
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
                      this.sellerId = params.row.sellerId
                      this.shopManageModal = true
                    }
                  }
                },
                '管理'
              )
            ])
          }
        },
        {
          title: '账号状态',
          key: 'status'
        },
        {
          title: '备注说明',
          key: 'remark'
        }
      ]
    }
  },
  created() {
    this.getSellerAccountList(1, 5)
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取商户账号列表
    getSellerAccountList(
      pageNo,
      pageSize,
      shopName,
      mobileno,
      sellerId,
      status,
      settleStartdate,
      settleEnddate
    ) {
      let params = {
        pageSize: pageSize,
        shopName: shopName,
        mobileno: mobileno,
        sellerId: sellerId,
        status: status,
        settleStartdate: settleStartdate,
        settleEnddate: settleEnddate
      }
      api.getSellerAccountList(params, pageNo).then(response => {
        this.sellerAccountData = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 商家账号管理
    updataShopStatus(sellerId, status, remark) {
      let params = {
        sellerId: sellerId,
        status: status,
        remark: remark
      }
      api.updataShopStatus(params).then(response => {})
    },
    // 商家账号管理
    modifySellerStatus(sellerAccountData) {
      let status = sellerAccountData.status
      let remark = sellerAccountData.remark
      this.updataShopStatus(this.sellerId, status, remark)
    },
    // getsellerInfo 查看商家信息详情
    getsellerInfo(msSellerId, shopId) {
      let params = {
        shopId: shopId
      }
      api.getsellerInfo(params, msSellerId).then(response => {
        this.shopMessage = response
      })
    },
    // 更新商家信息
    modifySellerInfo(shopMessage) {
      let sellerId = shopMessage.msSellerId
      api.modifysellerInfo(shopMessage, sellerId).then(response => {
        alert('更新成功')
      })
    },
    // 搜索
    searchAccountData(formItem) {
      this.getSellerAccountList(
        1,
        5,
        formItem.shopName,
        formItem.mobileno,
        formItem.sellerId,
        formItem.status,
        formItem.startdate,
        formItem.lastdate
      )
    },
    changepage(index) {
      this.getSellerAccountList(index, 5)
    },
    // 点击修改
    modifyDisabled() {
      this.disabled = false
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.seller-account-manager-select {
  width: 800px;
}

.seller-account-manager-select .label {
  font-size: 16px;
  vertical-align: middle;
}

.seller-account-manager-page {
  margin-top: 10px;
  text-align: right;
}

.shopMessagemModal-user,
.shopMessagemModal-shopinfo,
.shopMessagemModal-qualification,
.shopMessagemModal-agreement,
.shopMessagemModal-shopimag {
  width: 100%;
  border: 1px solid #555;
  padding-left: 10px;
  background-color: #eee;
}

.shopMessagemModal-user span,
.shopMessagemModal-shopinfo span {
  display: inline-block;
  width: 80px;
  vertical-align: top;
}

.shopMessagemModal-user {
  height: 170px;
}

.shopMessagemModal-shopimag {
  height: 170px;
  margin-left: 5px;
}

.shopMessagemModal-shopinfo {
  height: 600px;
}

.shopMessagemModal-qualification {
  height: 376px;
  margin-left: 5px;
}

.shopMessagemModal-agreement {
  height: 200px;
  margin-left: 5px;
}

.shopMessagemModal-shopinfo img {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 50%;
}
</style>