<template>
  <div class="feedback">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem label="姓名" prop="name" :label-width="80">
        <Input type="password" v-model="formInline.name" placeholder="请输入查询的名字"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <i-row>
      <i-col span="24">
        <Tabs value="custom" :animated="false">
          <Tab-pane label="用户端" name="custom">
            <i-table :columns="columns1" :data="data1" ref="custom_table"></i-table>
            <i-page :total="tableTotal"
                    :current="curr"
                    :page-size="pageNum"
                    @on-change="changePage"
                    show-total
                    class="vm-fr" style="margin-top: 20px;">
            </i-page>
          </Tab-pane>
          <Tab-pane label="商户端" name="seller">

          </Tab-pane>
          <Tab-pane label="配送端" name="delivery">

          </Tab-pane>
          <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
        </Tabs>
      </i-col>
    </i-row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        curr: 1,
        pageNum: 10,
        formInline: {
          name: ''
        },
        ruleInline: {
          name: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ]
        },
        columns1: [
          {
            title: '用户ID',
            key: 'custom_id',
            align: 'center'
          },
          {
            title: '用户名',
            key: 'custom_name',
            align: 'center'
          },
          {
            title: '反馈内容',
            key: 'feedback_content',
            align: 'center'
          },
          {
            title: '反馈时间',
            key: 'feedback_time',
            align: 'center'
          },
          {
            title: '反馈图片',
            key: 'feedback_img',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let row = params.row
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/order/feedbackInfo?id=' + row.custom_id)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        data1: [
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
          },
          {
            'custom_id': 1233,
            'custom_name': '张三',
            'feedback_content': '阿斯顿发送到发得分',
            'feedback_time': '2017/8/16  9:35',
            'feedback_img': '有'
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
      changePage(index) {
        console.log(index)
      },
      exportData() {
        this.$refs.custom_table.exportCsv({
          filename: '用户反馈列表'
        })
      }
    }
  }
</script>
