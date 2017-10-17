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
          dateTime: new Date()
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
      this._getSwData()
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 发送数据
            console.log(this.formValidate)
            // this.$Message.success('提交成功!')
            let params = {
              startTime: this.formValidate.dateTime,
              words: this.formValidate.desc
            }
            this._posSwData(params).then((data) => {
              console.log(data)
            })
          } else {
            this.$Message.error('提交失败 !')
          }
        })
      },
      _getSwData () {
        api.getOrderSw().then((data) => {
          console.log(data)
          this.formValidate.desc = data
        })
      },
      _posSwData (params) {
        return new Promise((resolve, reject) => {
          api.postOrderSw(params).then((data) => {
            if (data) {
              resolve(data)
            } else {
              reject(data)
            }
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
