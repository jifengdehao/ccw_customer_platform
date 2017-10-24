/*
 * @Author: huShangJun 
 * @Date: 2017-10-10 11:39:58 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商户入驻资料审核 
 */
<template>
  <div class="seller-settled-manage">
    <!-- 选择搜索 -->
    <section class="seller-settled-manage-select">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">日期筛选：</span>
          <DatePicker type="date" v-model="formItem.startdate" placement="bottom-start" placeholder="选择开始日期" style="width: 200px"></DatePicker>
          <i> - </i>
          <DatePicker type="date" v-model="formItem.lastdate" placement="bottom-start" placeholder="选择结束日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <span class="label">负责人筛选：</span>
          <Select v-model="formItem.select" placeholder="请选择" style="width: 200px">
            <Option v-for="item in charge" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="searchdata(formItem)">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 标签页 表格内容 -->
    <section>
      <Tabs type="card" :animated="false" @on-click="changedata">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <Table :columns="columns" :data="auditdata"></Table>
        </TabPane>
      </Tabs>
    </section>
    <!-- 分页 -->
    <section class="seller-settled-manage-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section>
    <!-- 查看图片 -->
    <Modal v-model="modal" title="商家证件图片" width="600" height="400" style="z-index:999">
      <table-img :pic-urls="sellerpicUrls"></table-img>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import tableImg from './sellercomponents/tableimage'
export default {
  components: {
    tableImg
  },
  data() {
    return {
      total: 1,
      pageSize: 5,
      modal: false,
      sellerpicUrls: [
        'http://img4.imgtn.bdimg.com/it/u=3875107969,2530319077&fm=27&gp=0.jpg'
      ],
      charge: [],
      formItem: {
        startdate: '',
        lastdate: '',
        select: ''
      },
      auditdata: [],
      tabs: [{ title: '商家待审核' }, { title: '商家待审批' }, { title: '已通过' }],
      columns: [
        {
          title: '商家手机',
          key: 'mobileno'
        },
        {
          title: '入驻市场',
          key: 'marketName'
        },
        {
          title: '经营范围',
          key: 'businessType'
        },
        {
          title: '档口名称',
          key: 'businessType'
        },
        {
          title: '挡主姓名',
          key: 'shopOwerName'
        },
        {
          title: '档口号',
          key: 'shopNo'
        },
        {
          title: '证件上传状态',
          key: 'upstatus',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.upstatus),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal = true
                    }
                  }
                },
                '查看'
              )
            ])
          }
        },
        {
          title: '档口介绍',
          key: 'shopDesc'
        },
        {
          title: '提交时间',
          key: 'applyDate'
        },
        {
          title: '负责人',
          key: 'chargeman'
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
                      this.updateApplyStatus(
                        params.row.msSellerApplyId,
                        params.row.applyStatus + 2
                      )
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
                      this.updateApplyStatus(
                        params.row.msSellerApplyId,
                        params.row.applyStatus + 1
                      )
                    }
                  }
                },
                '通过'
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.getSellerApplyList(1, this.pageSize, 1)
  },
  mounted() {},
  methods: {
    changedata(index) {
      if (index === 0) {
        this.getSellerApplyList(1, this.pageSize, index + 1)
      } else if (index === 1) {
        this.getSellerApplyList(1, this.pageSize, index + 1)
      } else if (index === 2) {
        this.getSellerApplyList(1, this.pageSize, index + 1)
      }
    },
    changepage(index) {
      this.getSellerApplyList(index, 5, 1)
    },
    remove(index) {
      this.auditdata.splice(index, 1)
    },
    // 获取入驻审核列表
    getSellerApplyList(
      pageNo,
      pageSize,
      applyStatus,
      chargeMan,
      applyStartTime,
      applyEndTime
    ) {
      let params = {
        pageSize: pageSize,
        applyStatus: applyStatus, // 申请的状态
        chargeMan: chargeMan, // 负责人
        applyStartTime: applyStartTime,
        applyEndTime: applyEndTime
      }
      api.getSellerApplyList(params, pageNo).then(response => {
        this.auditdata = response.records
        this.total = response.total
        this.pageSize = response.size
      })
    },
    // 更新商户入驻信息审核状态
    updateApplyStatus(id, applyStatus) {
      let params = {
        applyStatus: applyStatus // 商家入驻申请状态
      }
      api.updateApplyStatus(params, id).then(response => {
        this.$Message.success('发送成功')
      })
    },
    searchdata(formItem) {
      this.getSellerApplyList(1, this.pageSize, this.auditdata.applyStatus)
    }
  },
  computed: {},
  watch: {}
}
</script>
<style scoped>
.seller-settled-manage-select .label {
  font-size: 16px;
  vertical-align: middle;
}

.seller-settled-manage-page {
  margin-top: 10px;
  text-align: right;
}
</style>
