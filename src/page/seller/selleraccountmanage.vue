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
          <span class="label">入驻日期：</span>
          <DatePicker type="date" v-model="formItem.startdate" placement="bottom-start" placeholder="选择开始日期" style="width: 200px"></DatePicker>
          <i> - </i>
          <DatePicker type="date" v-model="formItem.lastdate" placement="bottom-start" placeholder="选择结束日期" style="width: 200px"></DatePicker>
        </FormItem> <br>
        <FormItem>
          <span class="label">账号状态：</span>
          <Select v-model="formItem.status" placeholder="请选择" style="width: 200px" clearable>
                <Option value="1">正常</Option>
                <Option value="2">关档</Option>
                <Option value="3">冻结</Option>
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
    <Modal v-model="shopMessageModal" title="商家信息" width="900">
      <Form ref="formInline"  :model="shopMessage"  label-postion="left" :label-width="100" >
        <Row>
          <Col span="9">
          <!-- 账号信息 -->
          <div  class="shopMessagemModal-user">
            <h3>账号信息</h3>
            <span>账号名：</span>
            <span>{{shopMessage.msSellerId}}</span>
            </br>
            <FormItem label="支付宝账号：" prop="alipayAccount">
              <Input size="small" v-model="shopMessage.alipayAccount"  placeholder="请输入" style="width: 150px" required></Input>
            </FormItem>
            <FormItem label="手机号：" prop="mobileno">
              <Input size="small" :maxlength="11" v-model="shopMessage.mobileno"  placeholder="请输入" style="width: 150px" required/>
            </FormItem>
            <FormItem label="密码：">
              <Button size="small" @click="resetPassword(shopMessage.msSellerId)">重置密码</Button>
            </FormItem>
          </div>
          <!-- 店铺信息 -->
          <div class="shopMessagemModal-shopinfo">
            <h3>店铺信息</h3>
            <span>档口图片：</span>
              <img :src="shopMessage.headUrl"  alt="">
              </br>
              <FormItem label="档口名称：" prop="shopName">
                <Input size="small"  v-model="shopMessage.shopName"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
               <FormItem label="档主姓名：" prop="shopOwerName">
                <Input size="small"  v-model="shopMessage.shopOwerName"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="档口号：" prop="shopNo">
                <Input size="small"  v-model="shopMessage.shopNo"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="主营类型：">
                <Select size="small"  v-model="shopMessage.businessDictCode" :value="shopMessage.businessDictCode" placeholder="请选择" style="width: 150px">
                <Option v-for="item in businessDictCode" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option></Select> 
              </FormItem>
              <FormItem label="营业状态：" prop="bussinessStatus">
                <Select size="small" v-model="shopMessage.bussinessStatus" :value="shopMessage.bussinessStatus" placeholder="请选择" style="width: 150px">
                <Option value="1">营业</Option>
                <Option value="2">打烊</Option>
                <Option value="3">关店</Option>
                </Select>
              </FormItem>
              <FormItem label="营业时间：" prop="businessHour">
                <Input size="small"  v-model="shopMessage.businessHour"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="店铺电话：" prop="mobileno">
                <Input size="small"  v-model="shopMessage.mobileno"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="店铺公告：" prop="notice">
                <Input v-model="shopMessage.notice" type="textarea" style="width: 150px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>   
              </FormItem>
              <FormItem label="店铺地址：" prop="stallAddress">
                <Input size="small" v-model="shopMessage.stallAddress"  placeholder="请输入" style="width: 150px"></Input>
              </FormItem>
          </div>
          </Col>
          <Col span="15">
          <!-- 店铺图片 -->
          <div prop="password" class="shopMessagemModal-shopimag"  >
            <h3>店铺图片</h3>
              <div class="img vm-fl" >
                <img :src="shopMessage.shopPicUrl" alt="" >
                <div class="cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(shopMessage.shopPicUrl)"></Icon>
                </div>
              </div>
              <div class="qualification" style="width:120px;top:130px;left:16px;lineHeight:30px">
                <input type="file" @change="shopimgupload" accept="image/*">上传图片
              </div>
          </div>
          <!-- 营业资质 -->
          <div prop="password" class="shopMessagemModal-qualification">
            <h3>营业资质</h3>
            <ul>
              <li v-for="(item,index) in qulification.qualificationList" :key="index">
                <div class="" >
                  <div class="img vm-fl">
                    <img :src="item.url" alt="">
                    <div class="cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    </div>
                  </div>
                  <div class="qualification">
                    <input type="file" @change="qualificationUpload($event,index)" accept="image/*">上传图片
                  </div>
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
          <!-- 协议合同 -->
          <div prop="password" class="shopMessagemModal-agreement">
            <h3>协议合同</h3>
            <div class="agreementImgBox">
               <div class="img vm-fl"  v-for="(url,index) in qulification.protocol" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="removeProtocol(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton ">
                <input type="file" @change="protocolUpload" accept="image/*">+
              </div>
            </div>
          </div>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button  style="width:60px;margin:auto" @click="hidde">取消</Button>
        <Button type="info" style="width:60px;margin:auto" @click="modifySellerInfo(shopMessage)">保存</Button>
      </div>
    </Modal>
    <!-- 商家账号管理模态框 -->
    <Modal v-model="shopManageModal" title="账号管理" width="300" >
      <Form>
        <FormItem label="设置账号限制：">
          <Select v-model="shopManageData.status" :value="shopManageData.status" placeholder="请选择">
            <Option value="1">账号恢复</Option>
            <Option value="2">关档</Option>
            <Option value="3">账号冻结</Option>
          </Select>
        </FormItem>
        <FormItem label="添加备注：">
          <Input v-model="shopManageData.remark" :value="shopManageData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
       
      </Form>
      <div slot="footer">
        <Button type="info" style="width:60px;margin:auto" @click="modifySellerStatus(shopManageData)">确定</Button>
      </div>
    </Modal>
     <!-- 查看大图 -->
     <Modal
        v-model="picModal"
        title="查看大图"
        width="900"
        class="bigimgs vm-clearfix">
        <img class="bigimg" :src="bigImgUrl" alt="">
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import * as date from '@/until/time'
import { uploadpic } from '../../components/upload-pic'
export default {
  components: {},
  props: {},
  data() {
    return {
      total: 1,
      pageSize: 10,
      disabled: true,
      sellerId: 0,
      shopId: 0,
      shopMessage: {
        msSellerId: '',
        alipayAccount: '',
        headUrl: '',
        shopName: '',
        shopOwerName: '',
        shopNo: '',
        businessDictCode: [],
        businessHour: '',
        mobileno: '',
        notice: '',
        stallAddress: '',
        shopPicUrl: [],
        msShopQualification: {
          protocol: [],
          qualificationList: []
        }
      },
      qulification: [], // 资质证件图片
      shopManageData: {},
      bussinessStatus: [],
      shopMessageModal: false,
      shopManageModal: false, // 商家账号管理模态框
      picModal: false, // 查看大图模态框
      bigImgUrl: '', // 查看大图的图片地址
      sellerAccountData: [],
      formItem: {},
      businessDictCode: [],
      columns: [
        {
          title: '档口名称',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '商家账号',
          key: 'msSellerId',
          align: 'center'
        },
        {
          title: '商家手机',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '商家信息详情',
          key: 'shopMessage',
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
                      this.getsellerInfo(
                        params.row.msSellerId,
                        params.row.shopId
                      )
                      this.getQulification(params.row.msSellerId)
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
                      this.shopId = params.row.shopId
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
          key: 'statusName',
          align: 'center'
        },
        {
          title: '入驻日期',
          key: 'settleDate',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return date.formatDateTime(params.row.settleDate)
          }
        },
        {
          title: '备注说明',
          key: 'remark',
          align: 'center'
        }
      ]
    }
  },
  created() {
    // api.getOssInfo().then(response => {
    //   alert('asddasd')
    //   console.log(response)
    // })
    this.getSellerAccountList(1, 10)
    let params = {
      parentId: -1 // 一级分类传入-1
    }
    api.getProductCategory(params).then(response => {
      this.businessDictCode = response
    })
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
    updataShopStatus(shopId, status, remark) {
      let params = {
        shopId: shopId,
        status: status,
        remark: remark
      }
      api.updataShopStatus(params).then(response => {
        this.$Message.success('商家状态修改成功')
        this.shopManageModal = false
      })
    },
    // 商家账号管理状态
    modifySellerStatus(sellerAccountData) {
      if (!this.shopManageData.status) {
        this.$Message.error('请选择状态')
        return false
      }
      let status = sellerAccountData.status
      let remark = sellerAccountData.remark
      this.updataShopStatus(this.shopId, status, remark)
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
    // 获取商家资质证件图片
    getQulification(id) {
      api.getQulification(id).then(res => {
        this.qulification = res
      })
    },
    hidde() {
      this.shopMessageModal = false
    },

    // 更新商家信息
    modifySellerInfo(shopMessage) {
      if (
        !shopMessage.alipayAccount ||
        (!/^1[34578]\d{9}$/.test(shopMessage.alipayAccount) &&
          !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(shopMessage.alipayAccount))
      ) {
        this.$Message.error('支付宝账号为手机号或者邮箱地址')
        return false
      }
      if (
        !shopMessage.mobileno ||
        !/^1[34578]\d{9}$/.test(shopMessage.mobileno)
      ) {
        this.$Message.error('手机号不能为空')
        return false
      }
      if (!shopMessage.shopName) {
        this.$Message.error('档口名称不能为空')
        return false
      }
      if (!shopMessage.shopOwerName) {
        this.$Message.error('档主姓名不能为空')
        return false
      }
      if (!shopMessage.shopNo) {
        this.$Message.error('档口号不能为空')
        return false
      }
      if (!shopMessage.businessDictCode) {
        this.$Message.error('主营类型不能为空')
        return false
      }
      if (!shopMessage.bussinessStatus) {
        this.$Message.error('营业状态不能为空')
        return false
      }
      if (!shopMessage.businessHour) {
        this.$Message.error('营业时间不能为空')
        return false
      }
      if (!shopMessage.notice) {
        this.$Message.error('店铺公告不能为空')
        return false
      }
      if (!shopMessage.stallAddress) {
        this.$Message.error('店铺地址不能为空')
        return false
      }
      this.shopMessage.msShopQualification.protocol = this.qulification.protocol
      this.shopMessage.msShopQualification.qualificationList = this.qulification.qualificationList
      let sellerId = shopMessage.msSellerId
      api.modifysellerInfo(shopMessage, sellerId).then(response => {
        this.$Message.info('更新成功')
        this.shopMessageModal = false
      })
    },
    // 搜索
    searchAccountData(formItem) {
      this.getSellerAccountList(
        1,
        10,
        formItem.shopName,
        formItem.mobileno,
        formItem.msSellerId,
        formItem.status,
        formItem.startdate,
        formItem.lastdate
      )
    },
    changepage(index) {
      this.getSellerAccountList(index, 10)
    },
    // 重置密码
    resetPassword(msSellerId) {
      let params = {
        sellerId: msSellerId
      }
      api.resetPassword(params).then(response => {
        this.$Message.info('重置成功')
      })
    },
    // 店铺图片
    shopimgupload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          this.shopMessage.shopPicUrl = res[0].indexOf('?')
            ? res[0].split('?')[0]
            : res[0]
        }
      })
    },
    // 营业资质
    qualificationUpload(e, index) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          this.qulification.qualificationList[index].url = res[0].indexOf('?')
            ? res[0].split('?')[0]
            : res[0]
        }
      })
    },
    // 协议合同
    protocolUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
        }
        this.qulification.protocol = this.qulification.protocol.concat(res)
      })
    },
    // 查看大图
    handleView(url) {
      this.bigImgUrl = url
      this.picModal = true
    },
    // 删除协议合同图片
    removeProtocol(index) {
      this.qulification.protocol.splice(index, 1)
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
  vertical-align: middle;
}

.seller-account-manager-page {
  margin-top: 10px;
  text-align: right;
}
h3 {
  margin: 5px 0 10px 10px;
}
.shopMessagemModal-user,
.shopMessagemModal-shopinfo,
.shopMessagemModal-qualification,
.shopMessagemModal-agreement,
.shopMessagemModal-shopimag {
  width: 100%;
  border: 1px solid #555;
  padding-left: 10px;
  background-color: #fff;
}

.shopMessagemModal-user span,
.shopMessagemModal-shopinfo span {
  display: inline-block;
  width: 80px;
  vertical-align: top;
  text-align: right;
}

.shopMessagemModal-user {
  height: 190px;
  margin-bottom: 10px;
}

.shopMessagemModal-shopimag {
  height: 190px;
  margin-left: 5px;
  margin-bottom: 10px;
}

.shopMessagemModal-shopinfo {
  height: 650px;
}

.shopMessagemModal-qualification {
  height: 400px;
  margin-left: 5px;
  margin-bottom: 20px;
}
.shopMessagemModal-qualification li {
  position: relative;
  width: 45%;
  height: 160px;
  /* border: 1px solid #ddd; */
  margin: 5px;
  float: left;
}
.shopMessagemModal-qualification li .img {
  display: block;
  width: 200px;
  height: 130px;
  border: 1px solid #ddd;
}
.shopMessagemModal-qualification li p {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.shopMessagemModal-shopimag .upload {
  position: absolute;
  bottom: 0px;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.05);
}
.shopMessagemModal-qualification .upload {
  position: absolute;
  bottom: 30px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.05);
}
.shopMessagemModal-agreement {
  height: 230px;
  margin-left: 5px;
}

.shopMessagemModal-shopinfo img {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 50%;
}
/* 上传图片按钮和图片位置样式 */
input[type='file'] {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  overflow: hidden;
}
.qualification {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 200px;
  height: 30px;
  background-color: #e6dfbe;
  text-align: center;
}

.uploadButton {
  width: 120px;
  height: 120px;
  line-height: 100px;
  position: relative;
  cursor: pointer;
  text-align: center;
  font-size: 80px;
  margin-left: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.img {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
.agreementImgBox {
  position: relative;
  height: 120px;
  overflow-x: auto;
}
.agreementImgBox .img {
  margin: 3px;
}
.img img {
  width: 100%;
  height: 100%;
}
/* 图片遮罩层 显示查看大图和删除操作 */
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.img:hover .cover {
  display: block;
  width: 100%;
  height: 120px;
  text-align: center;
}
.cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 100px;
}
.bigimg {
  max-width: 800px;
  max-height: 800px;
}
</style>