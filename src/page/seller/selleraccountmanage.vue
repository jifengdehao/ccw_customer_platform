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
          <Select v-model="formItem.select" placeholder="请选择" style="width: 200px">
            <Option v-for="item in charge" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="label">商家账号：</span>
          <Input v-model="formItem.input" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <span class="label">商家手机：</span>
          <Input v-model="formItem.input" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <span class="label">档口名称：</span>
          <Input v-model="formItem.input" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
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
    <Modal v-model="shopMessagemModal" title="商家信息" width="900" okText="保存">
      <Form ref="formInline" :model="formItem" inline>
        <Row>
          <Col span="9">
          <!-- 账号信息 -->
          <FormItem prop="user" class="shopMessagemModal-user">
            <h3>账号信息</h3>
            <span>账号名：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>支付宝账号：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>手机号：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>密码：</span>
            <Input type="password" size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            <Button size="small">修改</Button>
          </FormItem>
          <!-- 店铺信息 -->
          <FormItem prop="user" class="shopMessagemModal-shopinfo">
            <h3>店铺信息</h3>
            <span>档口图片：</span>
            <div class="shopPic"></div>
            <span>档口名称：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>档主姓名：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>档口号：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>营业状态：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>营业时间：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>店铺电话：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
            <span>店铺公告：</span>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            </br>
            <span>店铺地址：</span>
            <Input size="small" :disabled="true" v-model="formItem.input" placeholder="请输入" style="width: 150px"></Input>
            </br>
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
    <Modal v-model="shopManageModal" title="账号管理" width="500">
      <Form>
        <FormItem label="设置账号限制：">
          <Select v-model="formItem.select" placeholder="请选择">
            <Option value="beijing">关档</Option>
            <Option value="shanghai">账号恢复</Option>
            <Option value="shenzhen">账号冻结</Option>
          </Select>
        </FormItem>
        <FormItem label="添加备注：">
          <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
      shopMessagemModal: false,
      shopManageModal: false,
      sellerAccountData: [
        { sellerId: 1 }
      ],
      charge: [
        { value: '全部' },
        { value: '关档' },
        { value: '账号封停' },
        { value: '正常' }
      ],
      columns: [
        {
          title: '档口名称',
          key: 'shopName'
        },
        {
          title: '商家账号',
          key: 'sellerId'
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
                    this.shopMessagemModal = true
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '账号管理',
          key: 'shopManage',
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
                    this.shopManageModal = true
                  }
                }
              }, '管理')
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
  // created: {},
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取商户账号列表
    getSellerAccountList(pageNo, pageSize, shopName, mobileno, sellerId, status, settleStartdate, settleEnddate) {
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
    changepage(index) { }
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
</style>