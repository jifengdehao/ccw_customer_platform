/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：app更新管理
*/
<template>
  <div id="app-index">
    <div class="vm-textRight mb20">
      <Button type="primary" @click="add">新增</Button>
    </div>
    <Table :data="data" :columns="columns"></Table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        columns: [
          {
            title: '更新标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '应用名称',
            key: 'name',
            align: 'center'
          },
          {
            title: 'App版本',
            key: 'version',
            align: 'center'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let index = params.index
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/app/index/' + index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.data.splice(index, 1)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data: [
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          },
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          },
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          },
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          },
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          },
          {
            title: '安卓更新',
            name: '菜城配送端',
            version: 'V1.1.3',
            updateTime: '2017-11-24 00:00'
          }
        ]
      }
    },
    methods: {
      add () {
        this.$router.push('/app/addAppUpdate')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
