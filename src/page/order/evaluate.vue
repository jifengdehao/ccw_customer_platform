/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-评价管理
*/
<template>
  <div class="order-evaluate">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="手机号" :label-width="80">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <!--<FormItem prop="orderNumber" label="订单编号" :label-width="80">
        <Input type="text" v-model="formInline.orderNumber" placeholder="请输入订单编号"></Input>
      </FormItem>-->
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs :animated="false" @on-click="selectTab" :value="this.status">
      <Tab-pane label="商家评价" name="0">
        <Table :columns="columns" :data="data" ref="table"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Tab-pane label="配送员评价" name="1">
        <Table :columns="columns" :data="data" ref="table"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Tab-pane label="差评订单" name="2">
        <Table :columns="columns" :data="data" ref="table"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    data () {
      return {
        curr: 1, // 当前分页
        pageNum: 10, // 当前页的显示的数据数量
        tableTotal: 0, // 总数
        status: 0, // 状态 0===>商户评价 1====>配送员评价  2====>差评订单
        formInline: {
          phone: '',
          orderNumber: ''
        },
        ruleInline: {
          phone: [
            // {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          orderNumber: [
            // {required: true, message: '请填写订单号', trigger: 'blur'}
          ]
        },
        columns: [
          {
            title: '用户ID',
            key: 'custId',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '昵称',
            key: 'shopOwerName',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'remarkAt',
            align: 'center'
          },
          {
            title: '评价订单ID',
            key: 'coOrderId',
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let id = params.row.id
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
                      // 查询单个订单详情
                      this.$router.push('/order/evaluateInfo?id=' + id)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(id)
                    }
                  }
                }, '隐藏')
              ])
            }
          }
        ],
        data: []
        /*
         data: [
           {
             id: 10086,
             phone: 13317769149,
             name: '王小明',
             age: 18,
             time: '2017/8/16  9:35',
             status: '正常',
             content: '非常好吃，猴赛雷啊'
           },
           {
             id: 10086,
             phone: 13317769149,
             name: '王小明',
             age: 18,
             time: '2017/8/16  9:35',
             status: '正常',
             content: '非常好吃，猴赛雷啊'
           },
           {
             id: 10086,
             phone: 13317769149,
             name: '王小明',
             age: 18,
             time: '2017/8/16  9:35',
             status: '正常',
             content: '非常好吃，猴赛雷啊'
           },
           {
             id: 10086,
             phone: 13317769149,
             name: '王小明',
             age: 18,
             time: '2017/8/16  9:35',
             status: '正常',
             content: '非常好吃，猴赛雷啊'
           }
         ]
         */
      }
    },
    created () {
      this.getSellerEvalList()
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      remove (id) {
        this.$Modal.confirm({
          content: '确定将此条评论隐藏？',
          onOk () {
            // api 操作
            console.log(id)
          }
        })
      },
      changePage (index) {
        console.log(index)
        this.curr = index
      },
      exportData () {
//        this.$refs.table.exportCsv({
//          filename: '商品评价订单列表'
//        })
      },
      selectTab (name) {
        this.status = name
        console.log(name)
        if (this.status === 0) {
          this.getSellerEvalList()
        } else if (this.status === 1) {
          this.getDeliverEval()
        } else {
          this.getBadEval()
        }
      },
      getSellerEvalList () {
        let params = {
          pageSize: this.pageNum
        }
        api.getOrderSellerListEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.tableTotal = res.total
            this.data = res.records
          }
        })
      },
      getDeliverEval () {
        let params = {
          pageSize: this.pageNum
        }
        api.getOrderDeliverListeEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.tableTotal = res.total
          }
        })
      },
      getBadEval () {
        let params = {
          pageSize: this.pageNum
        }
        api.getOrderBadListEval(params, this.curr).then((res) => {
          console.log(res)
          if (res) {
            this.tableTotal = res.total
          }
        })
      }
    }
  }
</script>
