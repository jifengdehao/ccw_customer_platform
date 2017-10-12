/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-10 17:49:54 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 待更新banner页面 
 */

<template>
  <div>
    <div class="add-image">
      <Button class="add-button" @click="addImage">新增</Button>
    </div>
    <div>
      <Table border ref="currentRowTable" :columns="columns3" :data="data1"></Table>
    </div>
    <div class="save-change">
      <Button @click="getSaveChanges">取消</Button>
      <Button @click="getSaveChanges">提交修改</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns3: [
        {
          title: '图片位置',
          key: 'position',
          type: 'index',
          align: 'center',
          width: '110',
          height: '168'
        },
        {
          title: '图片',
          align: 'center',
          key: 'picture'
        },
        {
          title: '图片管理',
          align: 'center',
          key: 'imgAdministration',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }, '重新上传')
            ])
          }
        },
        {
          title: '链接',
          align: 'center',
          key: 'link',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }, params.row.link)
            ])
          }
        },
        {
          title: '时间',
          align: 'center',
          key: 'time',
          render: (h, params) => {
            return h('div', [
              h('DatePicker', {
                props: {
                  format: 'yyyy-MM-dd HH:mm',
                  placement: 'left',
                  placeholder: '选择日期和时间（不含秒）',
                  type: 'datetimerange'
                },
                style: {
                  zIndex: '40',
                  width: '300px'
                }
              })
            ])
          }
        },
        {
          title: '操作',
          width: 150,
          align: 'center',
          key: 'Administration',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // 获取表单长度
                    const dataLength = this.$refs.currentRowTable.data.length
                    if (dataLength === 1) {    // 表单不能全部删除
                      return false
                    }
                    // 删除表单
                    console.log(this.$refs.currentRowTable.data.splice(dataLength - 1, 1), dataLength)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [
        {
          picture: 'common/img/loginbg.jpg',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          picture: '',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          picture: '',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          picture: '',
          link: 'https://www.baidu.com',
          time: ''
        }
      ]
    }
  },
  methods: {
    // 新增对象
    addImage() {
      this.$refs.currentRowTable.data.push({
        picture: '',
        link: '',
        time: ''
      })
    },
    // 保存修改
    getSaveChanges() {
      if (this.$refs.currentRowTable.data) {
        for (let i = 0; i < this.$refs.currentRowTable.data.length; i++) {
          if (!this.$refs.currentRowTable.data[i]) {
            console.log(123)
          } else {
            console.log(22)
          }
        }
      }
    }
  }
}
</script>
<style lang="css" scoped>
.add-image {
  text-align: right;
  margin-bottom: 20px;
}

.add-image .add-button {
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  color: #fff;
}

.save-change {
  text-align: center;
  margin-top: 20px;
}

.ivu-table td {
  height: 190px !important;
}
</style>