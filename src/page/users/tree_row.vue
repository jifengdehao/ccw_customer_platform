/*
* @Author: WuFengliang
* @Date: 2017-11-09 10:39:03
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint: 权限树模板
*/
<template>
  <div>
    <li v-for="(item,index) in menuData" :key="index">
        <span>
          <Icon style="width:8px;height:12px;" :type="item.childMenuList.length > 0 ? 'arrow-down-b' : ''"></Icon>
          <input type="checkbox"  @click="changeCheck(item)" v-model="item.isHave" :checked="item.isHave" style="margin:5px;">
        </span>
      <span>{{item.menuName}}
          <a style="margin-left:20px;" v-for="(permission,index) in item.permissonList" :key="index">
          <input type="checkbox" v-model="permission.isHave" :checked="permission.isHave" @permissionCheck="permissionCheck" @click="checkPermission(permission,item)">
          {{permission.permissionName}}
          </a>
        </span>
      <ul v-if="item.childMenuList">
        <auth-tree :menuData="item.childMenuList" :parentData="item" @forward="forwardChecked" @permissionCheck="permissionCheck"></auth-tree>
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: 'authTree',
  props: ['menuData', 'parentData'],
  data() {
    return {}
  },
  created() {},
  methods: {
    // 判断浏览器
    isFirefox() {
      if (navigator.userAgent.indexOf('Firefox') > -1) return true
      else return false
    },
    isIE() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) return true
      else return false
    },
    //  查看选中
    changeCheck(child, bool) {
      if (this.isFirefox()) {
        child.isHave = bool || !child.isHave
      } else {
        child.isHave = bool || child.isHave
      }
      if (!bool) {
        this.selectChildAll(child)
      }
      this.$emit('forward', {
        isHave: child.isHave,
        parent: this.parentData
      })
    },
    //  子项菜单全部选中状态
    selectChildAll(parent) {
      let bool = parent.isHave
      if (parent.childMenuList) {
        parent.childMenuList.forEach(item => {
          item.isHave = bool
          this.selectChildAll(item)
        })
      }

      if (parent.permissonList) {
        parent.permissonList.forEach(permission => {
          permission.isHave = bool
          this.selectChildAll(permission)
        })
      }
    },
    //  自定义权限点击
    checkPermission(permission, item, bool) {
      if (!this.parentData.childMenuList || !this.parentData.permissonList) {
        item.isHave = true
        return
      }
      this.$emit('permissionCheck', {
        permission: permission,
        item: item,
        bool: bool,
        parent: this.parentData
      })
    },
    //  权限点击
    permissionCheck(data) {
      data.permission.isHave = !data.bool ? !data.permission.isHave : data.bool
      // data.item.isHave = data.permission.isHave
      data.item.isHave = true
      this.checkPermission(data.item, data.parent, true)
    },
    //  向上传递值
    forwardChecked(data) {
      if (data.parent && data.isHave) {
        data.parent.isHave = true
        if (data.parent.permissonList) {
          data.parent.permissonList.forEach(item => {
            item.isHave = true
          })
        }
        this.changeCheck(data.parent, true)
      }
    }
  }
}
</script>
<style lang="css" scoped>
ul {
  padding-left: 1.5em;
}
</style>
