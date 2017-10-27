<template>
    <div>
        <Table 
            v-model="tableDatas"
            :ref="refs" 
            :columns="columnsList" 
            :data="tableData" 
            highlight-row 
            border
            @on-selection-change="SelectedData"
        ></Table>
    </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'DragableTable',
  data() {
    return {
      tableDatas: [], // 绑定拖拽后的数据
      moveModal: false
    }
  },
  props: {
    refs: String,
    columnsList: Array,
    tableData: Array,
    start: Function,
    end: Function,
    choose: Function
  },
  methods: {
    // 批量选择
    SelectedData(section) {
      this.$store.commit('sections', section)
    },
    // 拖拽后触发事件
    update() {
    }
  },
  mounted() {
    var el = this.$refs[this.refs].$children[1].$el.children[1]
    let vm = this
    Sortable.create(el, {
      onStart: vm.start,
      onEnd: vm.end,
      onChoose: vm.choose,
      onUpdate: vm.update
    })
  }
}
</script>
<style>
.draggButton {
  height: 30px;
}
</style>

