<template>
  <div class="order-evaluate">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem prop="phone" label="手机号" :label-width="80">
        <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem prop="orderNumber" label="订单编号" :label-width="80">
        <Input type="text" v-model="formInline.orderNumber" placeholder="请输入订单编号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <Tabs :animated="false" @on-click="selectTab" value="good_eval">
      <Tab-pane label="商品评价" name="good_eval">
        <Table :columns="columns1" :data="data1" ref="table"></Table>
        <Page
          :total="tableTotal"
          :current="curr"
          :page-size="pageNum"
          @on-change="changePage"
          show-total
          class="vm-fr mt20"
        ></Page>
      </Tab-pane>
      <Tab-pane label="商家评价" name="seller_eval">商家评价</Tab-pane>
      <Tab-pane label="配送员评价" name="delivery_eval">配送员评价</Tab-pane>
      <Tab-pane label="差评订单" name="bad_eval"></Tab-pane>
      <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        curr: 1,
        pageNum: 10,
        showEvalDetails: false,
        formInline: {
          phone: '',
          orderNumber: ''
        },
        ruleInline: {
          phone: [
            // {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          orderNumber: []
        },
        columns1: [
          {
            title: '用户ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'phone',
            align: 'center'
          },
          {
            title: '昵称',
            key: 'name',
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'time',
            align: 'center'
          },
          {
            title: '评价订单ID',
            key: 'status',
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
        data1: [
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
      }
    },
    computed: {
      tableTotal () {
        return this.data1.length
      }
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
      },
      exportData () {
        this.$refs.table.exportCsv({
          filename: '商品评价订单列表'
        })
      },
      selectTab (name) {
        console.log(name)
      }
    }
  }
</script>
