/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-头部组件
*/
<template>
  <div class="layout-header">
    <i-row type="flex" style="min-width:1200px;">
      <i-col :span="3">
        <div class="layout-logo">菜城科技有限公司</div>
      </i-col>
      <i-col :span="18" style="min-width:930px;">
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
              <Icon type="chatbox-working"></Icon>
              商家端管理
            </router-link>
          </MenuItem>
          <MenuItem name="order">
            <router-link to="/order">
              <Icon type="chatbox"></Icon>
              订单管理
            </router-link>
          </MenuItem>
          <MenuItem name="activity">
            <router-link to="/activity">
              <Icon type="help-buoy"></Icon>
              活动管理
            </router-link>
          </MenuItem>
          <MenuItem name="data">
            <router-link to="/data">
              <Icon type="ios-analytics"></Icon>
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
          <Dropdown trigger="click" @on-click="selectDown">
            <a href="javascript:void(0);">
              {{userinfo.nickname}}&nbsp;
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="user">个人中心</DropdownItem>
              <DropdownItem divided name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </i-col>
    </i-row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
 // import * as cookie from '@/data/index'

  export default {
    computed: {
      activeName () {
        return this.$route.path.split('/')[1]
      },
      userinfo () {
        // return cookie.userInfo()
        return JSON.parse(sessionStorage.getItem('user'))
      }
    },
    mounted () {},
    methods: {
      selectDown (item) {
        switch (item) {
          case 'user':
            this.$router.push('/users/' + item)
            break
          case 'logout':
            api.logout().then((res) => {
              if (res) {
                // cookie.delData('userInfo')
                this.$router.go(0);
              }
            })
            break
        }
      }
    }
  }
</script>

