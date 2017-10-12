<template>
  <div>
    <Card dis-hover>
      <p slot="title">
        <Icon type="person-add"></Icon>&nbsp;&nbsp;修改密码
      </p>
      <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
        <Form-item label="原始密码" prop="oldpwd">
          <Input v-model="formItem.oldpwd" type="password" placeholder="原始密码"></Input>
        </Form-item>
        <Form-item label="登录密码" prop="pwd">
          <Input v-model="formItem.pwd" type="password" placeholder="新密码"></Input>
        </Form-item>
        <Form-item label="确认密码" prop="s_pwd">
          <Input v-model="formItem.s_pwd" type="password" placeholder="请确认密码"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </Form-item>
      </Form>
    </Card>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formItem.pwd !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('s_pwd')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formItem.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formItem: {
          oldpwd: '',
          pwd: '',
          s_pwd: ''
        },
        ruleValidate: {
          oldpwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          s_pwd: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePassCheck, trigger: 'blur'}

          ]
        }
      }
    },
    created () {},
    mounted () {},
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
              // 验证通过
          } else {

          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
