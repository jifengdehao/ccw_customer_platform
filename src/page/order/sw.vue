/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-屏蔽词管理
*/
<template>
  <div class="order-sw">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <Form-item class="vm-textRight">
        生效时间设置&nbsp;&nbsp;
        <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.dateTime"
                    placement="bottom-end"></DatePicker>
      </Form-item>
      <FormItem prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 20,maxRows: 30}"
               placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    data () {
      return {
        formValidate: {
          desc: '',
          dateTime: new Date(),
          rkShieldWordId: ''
        },
        ruleValidate: {
          desc: [
            {required: true, message: '请输入屏蔽词', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      // 获取默认数据库里的屏蔽词
      this.getSwData()
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 发送数据
            let params = {
              content: this.formValidate.desc,
              startAt: this.formValidate.dateTime,
              rkShieldWordId: this.formValidate.rkShieldWordId
            }
            api.postOrderSw(params).then((res) => {
              if (res) {
                let that = this
                that.$Notice.success({
                  title: '更新成功！',
                  onClose () {
                    that.getSwData()
                  }
                })
              } else {
                this.$Notice.error({
                  title: '更新失败！'
                })
              }
            })
          } else {
            this.$Notice.error({
              title: '更新失败！'
            })
          }
        })
      },
      getSwData () {
        api.getOrderSw().then((res) => {
          if (res) {
            this.formValidate.desc = res.content
            this.formValidate.dateTime = res.startAt
            this.formValidate.rkShieldWordId = res.rkShieldWordId
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
