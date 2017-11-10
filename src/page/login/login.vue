/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-登录
*/
<template>
  <div id="login">
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
      <Form-item class="formLogin-title">
        <h3>用户端系统登录</h3>
      </Form-item>
      <Form-item prop="userName">
        <Input size="large" type="text" v-model="formLogin.userName" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input size="large" type="password" v-model="formLogin.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="verificationCode">
        <Row>
          <Col span="17">
          <Input size="large" type="text" v-model="formLogin.verificationCode" placeholder="验证码">
          <Icon type="ios-pulse" slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="6" offset="1">
          <div style="height: 36px;line-height: 36px;
                      text-align: center;
                      font-size:18px;
                      cursor: pointer;
                      color: #ed3f14;
                      background-color: #ffffff;
                      font-style:italic;
                      border: 1px solid #dddee1;
                      border-radius: 4px;
                      letter-spacing: .2em;"
               @click="refCode">{{Code}}
          </div>
          </Col>
        </Row>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Checkbox v-model="remember">记住密码</Checkbox>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Row type="flex">
          <Col :xs="{ span: 4, offset: 6}">
          <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
          </Col>
          <Col :xs="{ span: 4, offset: 4 }">
          <Button type="primary" @click="formLoginReset('formLogin')">重置</Button>
          </Col>
        </Row>
      </Form-item>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'

  export default {
    name: 'login',
    data () {
      return {
        Code: '',
        remember: false,
        formLogin: {
          userName: '',
          password: '',
          verificationCode: ''
        },
        formLoginRules: {
          userName: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.initCode()
    },
    mounted () {
      if (sessionStorage.getItem('username')) {
        this.formLogin.username = JSON.parse(sessionStorage.getItem('username'))
      }
      if (sessionStorage.getItem('password')) {
        this.formLogin.password = JSON.parse(sessionStorage.getItem('password'))
      }
    },
    methods: {
      // 登录
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            sessionStorage.setItem('user', JSON.stringify(this.formLogin))
            // console.log(this.formLogin)
            // api.login(this.formLogin).then((res) => {
            //   console.log(res)
            // })
            this.$router.push('/')
          } else {
            this.$Message.error('表单验证失败!')
          }
//          if (this.formLogin.remember[0] === '记住密码') {
//            sessionStorage.setItem('username', JSON.stringify(this.formLogin.username))
//            sessionStorage.setItem('password', JSON.stringify(this.formLogin.password))
//          } else {
//            sessionStorage.removeItem('username')
//            sessionStorage.removeItem('password')
//          }
        })
      },
      // 重置
      formLoginReset (name) {
        this.$refs[name].resetFields()
      },
      // 请求code 验证码
      initCode () {
        api.getCode().then((res) => {
          console.log(res)
          if (res) {
            this.Code = res
          }
        })
      },
      refCode () {
        this.initCode()
      }
    }
  }
</script>
