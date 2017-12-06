/*
* @Author: ZengFanlu
* @Date: 2017-11-09 11:10:05
* DeveloperMailbox:   zengfanlu@ccw163.com
* FunctionPoint: 查看个人权限列表
*/

<template>
  <div id="roleinfo" class="main"  v-if="menuData">
    <div class="tree-box">
      <ul>
        <auth-tree :menuData="menuData.menu" :parentData="menuData"></auth-tree>
      </ul>
    </div>
    <!-- 确定弹框 -->
    <Modal
        v-model="userHid"
        title="修改权限"
        @on-ok="submitInfoData"
        @on-cancel="cancel">
        <p>是否修改权限用户？</p>
    </Modal>
    <p class="btn-p" v-if="showButton && showButton != null">
      <Button @click="getTreeList">重置</Button>
      <Button @click="onUserOk">确认</Button>
    </p>
  </div>
</template>
<script>
import * as api from 'api/common'
import authTree from './tree_row'
export default {
  components: { authTree },
  data() {
    return {
      menuData: null, //  传递给子组件的值
      userHid: false, // 隐藏弹框
      putParams: {
        accountId: '', //  角色ID
        permissionList: [] //  用户权限
      },
      showButton: null
    }
  },
  created: function() {
    this.getTreeList() // 初始化渲染
  },
  methods: {
    getTreeList() {
      this.putParams.accountId = this.$route.query.info
      this.showButton = this.$route.query.details
      api.getTreeList(this.putParams.accountId).then(list => {
        this.menuData = list
      })
    },

    //  传递至过滤
    filterValue(array) {
      array.forEach(item => {
        if (item.isHave) {
          if (item.childMenuList && item.childMenuList.length === 0) {
            //  单个菜单  (首页)
            item.permissonList.forEach(permissin => {
              let single = {
                menuId: item.menuId
              }
              if (permissin.isHave) {
                single.permissionId = permissin.permissionId
                this.putParams.permissionList.push(single)
              }
            })
            this.filterValue(item.childMenuList)
          } else if (item.childMenuList && item.childMenuList.length > 0) {
            //  有多个子菜单
            item.childMenuList.forEach(child => {
              if (child.isHave) {
                if (child.permissonList && child.permissonList.length > 0) {
                  child.permissonList.forEach(son => {
                    let single = {
                      menuId: child.menuId
                    }
                    if (son.isHave) {
                      single.permissionId = son.permissionId
                      this.putParams.permissionList.push(single)
                    }
                  })
                }
                this.filterValue(child.childMenuList)
              }
            })
          }
        }
      })
    },
    // 打开弹框
    onUserOk() {
      this.userHid = true
    },
    //  确认
    submitInfoData() {
      this.putParams.permissionList = []
      this.filterValue(this.menuData.menu)
      console.log(this.putParams)
      if (this.putParams.permissionList.length === 0) {
        return
      }
      api.getUserPermission(this.putParams).then(data => {
        if (data && data === true) {
          this.getTreeList()
          this.$Message.info('修改成功')
        } else {
          this.$Message.info('修改失败')
        }
      })
    },
    cancel() {
      this.$Message.info('取消修改')
    }
  }
}
</script>
<style lang="css" scoped>
.btn-p {
  margin-top: 40px;
  text-align: center;
}
</style>
