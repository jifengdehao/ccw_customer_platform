/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-09 11:10:05 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 查看个人权限列表 
 */
 
 <template>
   <div>
     <span>查看个人列表</span>
     <ul v-if="userDate">
        <tree-row :userTree="userDate"></tree-row> 
     </ul>
   </div>
 </template>
 <script>
import * as api from 'api/common'
import treeRow from './tree_row'
export default {
  components: { treeRow },
  data() {
    return {
      id: (() => {
        return this.$route.query.info
      })(),
      userDate: []
    }
  },
  created: function() {
    this.getTreeList() // 初始化渲染
  },
  methods: {
    getTreeList() {
      api.getTreeList(this.id).then(list => {
        this.userDate = list.menu // 获取数据
        console.log('list', list.menu)
      })
    }
  }
}
</script>
 <style lang="css" scoped>

</style>
