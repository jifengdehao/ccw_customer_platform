<template>
  <div class="order-evaluate">
    <div v-show="!showEvalDetails">
      <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
        <FormItem label="手机号" prop="phone" :label-width="80">
          <Input type="password" v-model="formInline.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
        </FormItem>
      </i-form>
      <i-row>
        <i-col span="24" style="margin-bottom: 20px;">
          <Button type="primary" class="vm-fr" @click="exportData()">导出</Button>
        </i-col>
        <i-col span="24">
          <Table :columns="columns1" :data="data1" ref="table"></Table>
        </i-col>
        <i-col span="24" style="margin-top: 20px;">
          <Page
            :total="tableTotal"
            :current="curr"
            :page-size="pageNum"
            @on-change="changePage"
            show-total
            class="vm-fr"
          ></Page>
        </i-col>
      </i-row>
    </div>
    <eval-details :eval="selectEval" @closeEval="openEval" v-show="showEvalDetails"></eval-details>
  </div>
</template>
<script type="text/ecmascript-6">
  import EvalDetails from 'page/order/evaldetails'

  export default {
    data() {
      return {
        curr: 1,
        pageNum: 10,
        showEvalDetails: false,
        selectEval: {},
        formInline: {
          phone: ''
        },
        ruleInline: {
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ]
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
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // 查询单个订单详情
                      this.showEvalDetails = true
                      this.selectEval = params.row
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
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
      tableTotal() {
        return this.data1.length
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      remove(id) {
        this.$Modal.confirm({
          content: '确定将此条评论隐藏？',
          onOk() {
            // api 操作
            console.log(id)
          }
        })
      },
      changePage(index) {
        console.log(index)
      },
      openEval(flag) {
        this.showEvalDetails = flag
      },
      exportData() {
        this.$refs.table.exportCsv({
          filename: '评价订单列表'
        })
      }
    },
    components: {
      EvalDetails
    }
  }
</script>
