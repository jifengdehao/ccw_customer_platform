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
    <p class="btn-p">
      <Button @click="getTreeList">取消</Button>
      <Button @click="submitInfoData">确认</Button>
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
      id: (() => {
        return this.$route.query.info
      })(),
      menuData: null, //  传递给子组件的值
      putParams: {
        roleId: '', //  角色ID
        roleName: '', //  角色名称
        permissionList: [] //  用户权限
      }
    }
  },
  created: function() {
    this.getTreeList() // 初始化渲染
  },
  methods: {
    getTreeList() {
      api.getTreeList(this.id).then(list => {
        this.menuData = list
      })
    },

    //  传递至过滤
    filterValue(array) {
      array.forEach(item => {
        if (item.isHave) {
          if (item.permissonList && item.permissonList.length > 0) {
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
          }
        }
        console.log(this.putParams.permissionList)
      })
    },
    //  确认
    submitInfoData() {
      this.putParams.permissionList = []
      this.filterValue(this.menuData.menu)
      if (this.putParams.permissionList.length === 0) {
        return
      }
      api.getUserPermission(this.putParams).then(data => {
        this.getRoleInfo()
      })
    }
  }
}
</script>
 <style lang="css" scoped>

</style>
