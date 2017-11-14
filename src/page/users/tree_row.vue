/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-09 14:37:42 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 查看权限管理数据 递归 
 */

<template>
  <div>
    <li v-for="(user, index) in userTree" :key="index" style="margin: 10px;">
      <input type="checkbox" :value="user.parentId" @change="onChange(user.parentId,user)" :checked="user.isHave" style="margin: 5px;">
      <span>{{ user.menuName }}</span>
      <ul v-if="user.childMenuList">
        <tree-row :userTree="user.childMenuList"></tree-row> 
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: 'treeRow',
  components: {},
  props: ['userTree'],
  data () {
    return {
    }
  },
  created: function () {},
  methods: {
    onChange(id, item) {
      console.log(id, 'id', item)
    }
  }
}
</script>
<style lang="css" scoped>
</style>