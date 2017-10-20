/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-反馈管理
*/
<template>
  <div class="feedback">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline label-position="left">
      <FormItem label="姓名" prop="name" :label-width="80">
        <Input type="text" v-model="formInline.name" placeholder="请输入查询的名字"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
      </FormItem>
    </i-form>
    <i-row>
      <i-col span="24">
        <Tabs :value="this.types" :animated="false" @on-click="selectTab">
          <Tab-pane label="用户端" name="0">
            <i-table :columns="columns" :data="data"></i-table>
            <i-page :total="tableTotal"
                    :current="curr"
                    :page-size="pageNum"
                    @on-change="changePage"
                    show-total
                    class="vm-fr mt20">
            </i-page>
          </Tab-pane>
          <Tab-pane label="商户端" name="1">
            <i-table :columns="columns" :data="data"></i-table>
            <i-page :total="tableTotal"
                    :current="curr"
                    :page-size="pageNum"
                    @on-change="changePage"
                    show-total
                    class="vm-fr mt20">
            </i-page>
          </Tab-pane>
          <Tab-pane label="配送端" name="2">
            <i-table :columns="columns" :data="data"></i-table>
            <i-page :total="tableTotal"
                    :current="curr"
                    :page-size="pageNum"
                    @on-change="changePage"
                    show-total
                    class="vm-fr mt20">
            </i-page>
          </Tab-pane>
          <Button type="primary" class="vm-fr" @click="exportData()" slot="extra">导出</Button>
        </Tabs>
      </i-col>
    </i-row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    data () {
      return {
        curr: 1, // 当前页
        pageNum: 10, // 当前页展示的数据量
        tableTotal: 0, // 数据总数
        types: 0, // 评价类型
        formInline: {
          name: ''
        },
        ruleInline: {
          name: [
            // {required: true, message: '请填写手机号', trigger: 'blur'}
          ]
        },
        columns: [
          {
            title: '用户ID',
            key: 'creatorId',
            align: 'center'
          },
          {
            title: '用户名',
            key: 'creatorName',
            align: 'center'
          },
          {
            title: '反馈内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '反馈时间',
            key: 'createdDt',
            align: 'center'
          },
          {
            title: '反馈图片',
            key: 'noPicture',
            align: 'center',
            render: (h, params) => {
              let noPicture = params.row.noPicture
              if (noPicture) {
                return h('span', '有')
              } else {
                return h('span', '无')
              }
            }
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let id = params.row.pt_feedback_id
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/order/feedbackInfo/' + id)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        /* data: [
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
        ] */
        data: []
      }
    },
    created () {
      this.getFeedbackListData()
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
      changePage (index) {
        this.curr = index
        this.getFeedbackListData()
      },
      selectTab (name) {
        this.types = name
        this.getFeedbackListData()
      },
      exportData () {},
      getFeedbackListData () {
        let params = {
          pageSize: this.pageNum,
          types: this.types
        }
        api.getFeedBackList(params, this.curr).then((data) => {
          console.log(data)
          this.tableTotal = data.total
          this.data = data.records
        })
      }
    }
  }
</script>
