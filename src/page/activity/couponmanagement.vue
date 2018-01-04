/*
 * @Author: ZengFanlu 
 * @Date: 2017-12-27 11:00:11 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 优惠券管理 
 */

<template>
  <div class="coupon">
    <div class="header">
      <div class="ds mr10">
         <div class="ds mr6">优惠券类型</div>
         <Select style="width: 160px;" v-model="params.types">
           <Option v-for="typs in conponType" :key="typs.value" :value="typs.value">{{ typs.lable }}</Option>
         </Select>
      </div>
      <div class="ds mr10">
         <div class="ds mr6">创建人员</div>
         <Select style="width: 160px" v-model="params.ptUserName">
           <Option v-for="creator in creatorNameList" :key="creator" :value="creator">{{ creator }}</Option>
         </Select>
      </div>
      <div class="ds" v-if="flag">
        <div class="ds mr6">终止人员</div>
        <Select style="width: 160px;" v-model="params.endName">
          <Option v-for="end in endNameList" :key="end" :value="end">{{ end }}</Option>
        </Select>
      </div>
      <div class="ds fr">
        <Input placeholder="创建人员/终止人员名称" style="width: 230px" v-model="params.seek"></Input>
        <Button type="primary" @click="onSearch">搜索</Button>
      </div>
    </div>
    <div class="content">
      <Tabs :animated="false" @on-click="onChangeTabs">
        <Button type="primary" @click="handleTabsAdd" slot="extra">增加优惠券</Button>
        <TabPane v-for="tab in tabs" :key="tab" :label="tab">
          <Table border stripe :columns="couponLists" :data="data1" @on-row-dblclick="onTabTh"></Table>
        </TabPane>
    </Tabs>
    <Page class="page" v-if="data1 && data1.length > 0" :total="total" :current="pageNo" @on-change="changePage"></Page>
    </div>
    
    <!-- 终止弹框 -->
    <Modal
      :mask-closable="false"
      v-model="endAlert"
      title="确定将此条优惠终止？">
      <textarea class="tar" v-model="endCoupon.reason"></textarea>
      <div slot="footer">
        <Button type="info" style="width:60px;margin:auto" @click="changeEnd">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from 'api/common'
export default {
  // 注册
  components: {},
  data() {
    return {
      conponType: [
        {
          lable: '全部',
          value: '0'
        },
        {
          lable: '抵扣券',
          value: '1'
        },
        {
          lable: '折扣券',
          value: '2'
        },
        {
          lable: '满减券',
          value: '3'
        },
        {
          lable: '免配送费券',
          value: '4'
        }
      ], // 优惠券类型
      pageNo: 1,
      creatorNameList: [], // 创建人员数据
      endNameList: [], // 终止人员数据
      params: {
        status: 0,
        types: '0', // 优惠券value值
        ptUserName: '全部', // 创建人员
        pageSize: '10',
        endName: '全部',
        seek: '' // 搜索框内容
      },
      tabs: ['已开始', '未开始', '已结束'],
      columns1: [
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            return this.formatDateTime(params.row.createdAt)
          }
        },
        {
          title: '优惠券类型',
          key: 'typesName',
          align: 'center',
          width: '80'
        },
        {
          title: '优惠券属性',
          key: 'couponAttributeName',
          align: 'center'
        },
        {
          title: '劵名',
          key: 'couponName',
          align: 'center'
        },
        {
          title: '发放周期',
          key: 'beginTime',
          align: 'center',
          render: (h, params) => {
            return this.formatDateTime(params.row.beginTime) + ' ~ ' + this.formatDateTime(params.row.endTime)
          }
        },
        {
          title: '有效周期',
          key: 'effectivePeriod',
          align: 'center',
          render: (h, params) => {
            // 判断
            return params.row.effectivePeriod
              ? params.row.effectivePeriod
              : this.formatDateTime(params.row.effectiveStartTime) +
                  ' ~ ' +
                  this.formatDateTime(params.row.effectiveEndTime)
          }
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '创建人员',
          key: 'creatorName',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.endAlert = true
                      this.endCoupon.couponId = params.row.couponId
                    }
                  }
                },
                '终止'
              )
            ])
          }
        }
      ],
      columns2: [
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            return this.formatDateTime(params.row.createdAt)
          }
        },
        {
          title: '优惠券类型',
          key: 'typesName',
          align: 'center'
        },
        {
          title: '优惠券属性',
          key: 'couponAttributeName',
          align: 'center'
        },
        {
          title: '劵名',
          key: 'couponName',
          align: 'center'
        },
        {
          title: '发放周期',
          key: 'beginTime',
          align: 'center',
          render: (h, params) => {
            return this.formatDateTime(params.row.beginTime) + ' ~ ' + this.formatDateTime(params.row.endTime)
          }
        },
        {
          title: '有效周期',
          key: 'effectivePeriod',
          align: 'center',
          render: (h, params) => {
            // 判断
            return params.row.effectivePeriod
              ? params.row.effectivePeriod
              : this.formatDateTime(params.row.effectiveStartTime) +
                  ' ~ ' +
                  this.formatDateTime(params.row.effectiveEndTime)
          }
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '创建人员',
          key: 'creatorName',
          align: 'center'
        },
        {
          title: '终止人员',
          key: 'terminatorName',
          align: 'center'
        },
        {
          title: '终止原因',
          key: 'terminatorReason',
          align: 'center'
        }
      ],
      data1: [],
      couponLists: [],
      flag: false, // 终止人员显影
      endAlert: false, // 终止弹框
      endCoupon: {
        couponId: '', // 获取终止ID
        reason: '' // 终止理由
      },
      total: null // 获取页码
    }
  },
  created: function() {
    this.couponLists = this.columns1
    this.couponList()
  },
  methods: {
    // 初始化列表数据 BASE_API: '"http://192.168.0.226:30140/globalpt"'
    couponList() {
      http.activtyCouponList(this.pageNo, this.params).then(res => {
        this.creatorNameList = res.creatorNameList
        if (res.endNameList && res.endNameList != null) {
          this.endNameList = res.endNameList
        }
        this.data1 = res.page.records
        this.total = res.page.total
      })
    },
    // 模糊查询
    onSearch() {
      this.couponList()
    },
    // 双击一行查看优惠券详情
    onTabTh(params) {
      console.log(this.params.status, 'status')
      if (this.params.status === 0 || this.params.status === 2) {
        this.$router.push('coupon_management/?id=' + params.couponId)
      } else if (this.params.status === 1) {
        this.$router.push('resive_coupon/detail/?detail=' + params.couponId)
      }
    },
    // 新增优惠券
    handleTabsAdd() {
      this.$router.push('add_check_coupon')
    },
    // 点击切换tab
    onChangeTabs(index) {
      this.flag = false
      this.pageNo = 1
      this.params.status = index
      this.couponLists = this.columns1
      if (this.params.status === 2) {
        // 判断显示终止人员下拉框
        this.flag = true
        this.couponLists = this.columns2
      }
      this.couponList()
    },
    // 终止弹框
    changeEnd() {
      if (this.endCoupon.reason === '') {
        this.$Message.error('终止理由不能为空')
        return false
      } else {
        let params = {
          couponId: this.endCoupon.couponId,
          reason: this.endCoupon.reason
        }
        http
          .activityCouponDelete(params)
          .then(res => {
            if (res === true) {
              this.$Message.info('终止成功')
              this.endAlert = false
              this.couponList()
            } else {
              this.$Message.info(res)
            }
          })
      }
    },
    // 分页
    changePage(page) {
      this.pageNo = page
      this.couponList()
    },
    // 时间格式化
    formatDateTime(inputTime) {
      if (inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? '0' + minute : minute
        second = second < 10 ? '0' + second : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
    }
  }
}
</script>

<style scoped lang="css">
textarea:focus {
  border-color: #57a3f3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
.ds {
  display: inline-block;
}
.fr {
  float: right;
}
.mr10 {
  margin-right: 10px;
}
.mr6 {
  margin-right: 6px;
}
.coupon {
  height: 100px;
}
.header {
  margin-bottom: 20px;
}
.tar {
  width: 100%;
  min-height: 100px;
  border: 1px solid #dddee1;
  resize: none;
}

.page {
  margin-top: 20px;
  float: right;
}
</style>
