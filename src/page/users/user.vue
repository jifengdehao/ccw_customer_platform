/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：个人中心
*/
<template>
  <Card>
    <p slot="title">
      <Icon type="person"></Icon>&nbsp;&nbsp;个人信息
    </p>
    <Form ref="userForm" :model="userForm" :label-width="100" :rules="inforValidate" style="width: 500px;">
      <FormItem label="用户姓名：" prop="name">
        <Input v-model="userForm.name" disabled></Input>
      </FormItem>
      <FormItem label="用户手机：" prop="cellphone">
        <Input v-model="userForm.cellphone" @on-keydown="hasChangePhone"></Input>
      </FormItem>
      <FormItem label="邮箱：" prop="email">
        <Input v-model="userForm.email"></Input>
      </FormItem>
      <FormItem label="部门：" prop="department">
        <Input v-model="userForm.department"></Input>
      </FormItem>
      <FormItem label="登录密码：">
        <Button type="primary" @click="showEditPassword">修改密码</Button>
      </FormItem>
      <FormItem>
        <Button type="ghost" class="mr10" @click="cancelEditUserInfor">取消</Button>
        <Button type="primary" :loading="save_loading" @click="saveEdit">保存</Button>
      </FormItem>
    </Form>
    <Modal v-model="editPasswordModal" :width="500">
      <div slot="header">修改密码</div>
      <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
            :rules="passwordValidate">
        <FormItem label="原密码" prop="oldPass">
          <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPass">
          <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="rePass">
          <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="cancelEditPass">取消</Button>
        <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
      </div>
    </Modal>
  </Card>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      const valideRePassword = (rule, value, callback) => {
        if (value !== this.editPasswordForm.newPass) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      return {
        userForm: {
          name: '',
          cellphone: '',
          email: '',
          department: ''
        },
        save_loading: false,
        savePassLoading: false,
        editPasswordModal: false,
        editPasswordForm: {
          oldPass: '',
          newPass: '',
          rePass: ''
        },
        inforValidate: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          cellphone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: validePhone}
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]
        },
        passwordValidate: {
          oldPass: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
            {max: 32, message: '最多输入32个字符', trigger: 'blur'}
          ],
          rePass: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: valideRePassword, trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      cancelEditUserInfor () {
        this.$router.back()
      },
      saveEdit () {
        // 修改个人信息后保存
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.save_loading = true
            setTimeout(() => {
              this.$Message.success('保存成功')
              this.save_loading = false
            }, 1000)
          }
        })
      },
      showEditPassword () {
        this.editPasswordModal = true
      },
      cancelEditPass () {
        this.editPasswordModal = false
      },
      saveEditPass () {
        this.$refs['editPasswordForm'].validate((valid) => {
          if (valid) {
            this.savePassLoading = true
            // you can write ajax request here
          }
        })
      },
      init () {
        this.userForm.name = 'zhangwenlong'
        this.userForm.cellphone = '18620212776'
        this.userForm.email = '2975830779@qq.com'
        this.userForm.department = '研发部'
      },
      hasChangePhone (event) {
        console.log(event)
      }
    }
  }
</script>
