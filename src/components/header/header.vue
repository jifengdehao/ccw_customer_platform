<template>
  <div class="layout-header">
    <i-row type="flex">
      <i-col :span="3">
        <div class="layout-logo">菜城科技有限公司</div>
      </i-col>
      <i-col :span="18">
        <Menu mode="horizontal" theme="dark" :active-name="activeName">
          <MenuItem name="home">
            <router-link to="/home">
              <Icon type="ios-paper"></Icon>
              首页
            </router-link>
          </MenuItem>
          <MenuItem name="custom">
            <router-link to="/custom">
              <Icon type="ios-people"></Icon>
              用户端管理
            </router-link>
          </MenuItem>
          <MenuItem name="seller">
            <router-link to="/seller">
              <Icon type="settings"></Icon>
              商家端管理
            </router-link>
          </MenuItem>
          <MenuItem name="order">
            <router-link to="/order">
              <Icon type="settings"></Icon>
              订单管理
            </router-link>
          </MenuItem>
          <MenuItem name="activity">
            <router-link to="/activity">
              <Icon type="settings"></Icon>
              活动管理
            </router-link>
          </MenuItem>
          <MenuItem name="data">
            <router-link to="/data">
              <Icon type="settings"></Icon>
              数据中心
            </router-link>
          </MenuItem>
          <MenuItem name="distribution">
            <router-link to="/distribution">
              <Icon type="settings"></Icon>
              分销管理
            </router-link>
          </MenuItem>
          <MenuItem name="users">
            <router-link to="/users">
              <Icon type="ios-people"></Icon>
              平台用户管理
            </router-link>
          </MenuItem>
        </Menu>
      </i-col>
      <i-col :span="3">
        <div class="user-info">
          <Dropdown trigger="click" @on-click="changePwd">
            <a href="javascript:void(0)">
              {{userinfo.name}}&nbsp;
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="change">修改密码</DropdownItem>
              <DropdownItem divided name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </i-col>
    </i-row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeName: 'home',
        userinfo: {
          name: 'admin'
        }
      }
    },
    mounted() {
      this.activeName = this.$route.name
    },
    methods: {
      toggleClick() {
        console.log('收起菜单或者展开菜单')
      },
      changePwd(item) {
        console.log(item)
        switch (item) {
          case 'change':
            this.$router.push('/users/change')
            break
          case 'logout':
            window.sessionStorage.removeItem('user')
            // this.$store.dispatch('loginOut')
            let timeOut = setTimeout(() => {
              window.location.reload()
            }, 1500)
            this.$Modal.success({
              title: '退出登录提示',
              content: '退出成功，感谢您的使用～～',
              'on-ok': () => {
                clearTimeout(timeOut)
                window.location.reload()
              }
            })
            break
        }
      }
    }
  }
</script>

