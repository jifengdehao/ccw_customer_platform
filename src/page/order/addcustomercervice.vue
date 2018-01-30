/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：新增售后订单
*/
<template>
  <div class="add-customer-service">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="width: 400px;">
      <FormItem label="关联交易号" prop="coSubOrderId">
        <Input v-model.tirm="formValidate.coSubOrderId" placeholder="请输入关联交易号"></Input>
      </FormItem>
      <FormItem label="申请服务" prop="serviceType">
        <Select v-model="formValidate.serviceType" disabled>
          <Option v-for="item in serviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="退款原因" prop="questionType">
        <Select v-model="formValidate.questionType">
          <Option v-for="item in reasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="原因明细" prop="memo">
        <Input v-model.tirm="formValidate.memo" placeholder="请输入退款原因明细" type="textarea"
               :autosize="{minRows: 5,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="申请退款金额(元)" prop="refundAmount">
        <Input v-model.tirm="formValidate.refundAmount" placeholder="请输入申请退款金额(元)"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
        <Button type="ghost" @click="handleReset('formValidate')" class="ml10">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    data() {
      return {
        serviceList: [
          {
            value: 1,
            label: '售后退款'
          }
        ],
        reasonList: [
          {
            value: 1,
            label: '商品质量问题'
          },
          {
            value: 2,
            label: '商品数量问题'
          },
          {
            value: 3,
            label: '服务问题'
          },
          {
            value: 4,
            label: '其他问题'
          }
        ],
        formValidate: {
          coSubOrderId: '',
          serviceType: 1,
          questionType: 1,
          memo: '',
          refundAmount: ''
        },
        ruleValidate: {
          coSubOrderId: [
            {required: true, message: '请输入关联交易号', trigger: 'blur'}
          ],
          refundAmount: [
            {required: true, message: '请输入申请退款金额', trigger: 'blur'}
          ],
          memo: [
            {required: true, message: '请输入退款原因明细', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formValidate)
            let that = this
            this.$Modal.confirm({
              content: '确定新增售后订单?',
              onOk: () => {
                api.addCustomerService(this.formValidate).then((res) => {
                  if (res) {
                    console.log(res)
                    that.$Notice.success({
                      title: '新增成功',
                      onClose: () => {
                        that.$router.back()
                      }
                    })
                  } else {
                    this.$Notice.error({
                      title: '新增失败！'
                    })
                  }
                })
              }
            })
          } else {
            this.$Notice.error({
              title: '新增失败！'
            })
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      close() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  #order
    .add-customer-service
      position relative
      border 1px solid #e9eaec
      padding 20px
      .close
        position absolute
        top 0
        right 0
        z-index 10
</style>
