/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-登录
*/
<template>
  <div id="login" @keyup.enter="handleSubmit">
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
      <Form-item class="formLogin-title">
        <h3>平台后台用户登录</h3>
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
          <div @click="refCode" class="refCode">{{Code}}</div>
          </Col>
        </Row>
      </Form-item>
      <!--<Form-item class="login-no-bottom">-->
        <!--<Checkbox v-model="remember">记住密码</Checkbox>-->
      <!--</Form-item>-->
      <Form-item class="login-no-bottom">
        <Row type="flex">
          <Col :xs="{ span: 4, offset: 6}">
          <Button type="primary" @click="handleSubmit">登录</Button>
          </Col>
          <Col :xs="{ span: 4, offset: 4 }">
          <Button type="primary" @click="formLoginReset">重置</Button>
          </Col>
        </Row>
      </Form-item>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common.js'
  import hash from 'js-md5'

  export default {
    name: 'login',
    data () {
      return {
        Code: '',
        // remember: false,
        formLogin: {
          userName: '',
          password: '',
          verificationCode: ''
        },
        formLoginRules: {
          userName: [{required: true, message: '请填写用户名', trigger: 'blur'}],
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
    /*
    mounted () {
      if (se.getItem('username')) {
        this.formLogin.userName = localStorage.getItem('username')
      }
      if (localStorage.getItem('password')) {
        this.formLogin.password = localStorage.getItem('password')
      }
    },
    */
    methods: {
      // 登录
      handleSubmit () {
        this.$refs.formLogin.validate(valid => {
          if (valid) {
            let params = {
              userName: this.formLogin.userName,
              password: hash(this.formLogin.password),
              verificationCode: this.formLogin.verificationCode
            }
            api.login(params).then(res => {
              if (res) {
                sessionStorage.setItem('user', JSON.stringify(res))
                this.$router.go('/')
              }
            })
          } else {
            this.$Notice.error({
              title: '登录验证失败！'
            })
          }
          /*
          if (this.remember) {
            localStorage.setItem('username', (this.formLogin.userName))
            localStorage.setItem('password', this.formLogin.password)
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
          }
          */
        })
      },
      // 重置
      formLoginReset () {
        this.$refs.formLogin.resetFields()
      },
      // 请求code 验证码
      initCode () {
        api.getCode().then(res => {
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
<style lang="stylus" type="text/stylus">
  #login
    .refCode
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size:18px;
      cursor: pointer;
      color: #ed3f14;
      background-color: #ffffff;
      font-style:italic;
      border: 1px solid #dddee1;
      border-radius: 4px;
      letter-spacing: .2em;
</style>
