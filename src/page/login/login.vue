/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-登录
*/
<template>
  <div id="login">
    <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
      <Form-item class="formLogin-title">
        <h3>用户端系统登录</h3>
      </Form-item>
      <Form-item prop="username">
        <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item prop="password">
        <i-input size="large" type="password" v-model="formLogin.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item prop="code">
        <Row>
          <Col span="17">
          <Input size="large" type="text" v-model="formLogin.code" placeholder="验证码">
          <Icon type="ios-pulse" slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="6" offset="1" @click="getCode">
          <img src="https://api.it120.cc/jifengdehao/verification/pic/get" style="width: 100%;height: 35px;">
          </Col>
        </Row>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Checkbox-group v-model="formLogin.remember">
          <Checkbox label="记住密码" name="remember"></Checkbox>
        </Checkbox-group>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Row type="flex">
          <i-col :xs="{ span: 4, offset: 6}">
            <i-button type="primary" @click="handleSubmit('formLogin')">登录</i-button>
          </i-col>
          <i-col :xs="{ span: 4, offset: 4 }">
            <i-button type="primary" @click="formLoginReset('formLogin')">重置</i-button>
          </i-col>
        </Row>
      </Form-item>
    </i-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    name: 'login',
    data () {
      return {
        formLogin: {
          username: '',
          password: '',
          code: '',
          remember: []
        },
        formLoginRules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.getCode()
    },
    methods: {
      // 登录
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            sessionStorage.setItem('user', JSON.stringify(this.formLogin))
            this.$Message.success('提交成功!')
            api.login(this.formLogin).then((user) => {
              console.log(user)
            })
            this.$router.push({path: '/'})
          } else {
            this.$Message.error('表单验证失败!')
          }
          if (this.formLogin.remember[0] === '记住密码') {
            sessionStorage.setItem('username', JSON.stringify(this.formLogin.username))
            sessionStorage.setItem('password', JSON.stringify(this.formLogin.password))
          } else {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('password')
          }
        })
      },
      // 重置
      formLoginReset (name) {
        this.$refs[name].resetFields()
      },
      // 请求code 验证码
      getCode () {
        api.getCode().then((res) => {
          console.log(res)
        })
      }
    },
    mounted () {
      if (sessionStorage.getItem('username')) {
        this.formLogin.username = JSON.parse(sessionStorage.getItem('username'))
      }
      if (sessionStorage.getItem('password')) {
        this.formLogin.password = JSON.parse(sessionStorage.getItem('password'))
      }
    }
  }
</script>
