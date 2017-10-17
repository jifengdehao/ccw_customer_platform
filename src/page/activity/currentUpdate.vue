/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-10 17:38:47 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 当前banner页面
 */

<template>
  <div>
    <div class="add-image">
      <Button class="add-button" @click="addImage" type="primary" size="small">新增</Button>
    </div>
    <div>
      <Table border ref="currentRowTable" :columns="columns3" :data="data1"></Table>
    </div>
    <div class="save-change">
      <Button @click="getSaveChanges" type="primary" size="small">保存修改</Button>
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
          align: 'center',
          width: '110',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.position
                }
              })
            ])
          }
        },
        {
          title: '图片',
          align: 'center',
          key: 'pictureUrl',
          render: (h, params) => {
            console.log(params.row.pictureUrl)
            return h('div', [
              h('Img', {
                attrs: {
                  src: params.row.pictureUrl
                },
                style: {
                  width: '100%',
                  height: '180px',
                  padding: '10px'
                }
              })
            ])
          }
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
              h('Input', {
                props: {
                  value: params.row.link
                },
                style: {
                  height: '90px !important',
                  lineHeight: '90px'
                }
              })
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
                  placement: 'left',
                  placeholder: '选择日期和时间（不含秒）',
                  type: 'datetime'
                },
                style: {
                  zIndex: '40',
                  width: '200px'
                }
              }),
              h('DatePicker', {
                props: {
                  placement: 'left',
                  placeholder: '选择日期和时间（不含秒）',
                  type: 'datetime'
                },
                style: {
                  zIndex: '40',
                  width: '200px',
                  marginTop: '7px'
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
                    this.$refs.currentRowTable.data.splice(dataLength - 1, 1)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [
        {
          position: '1',
          pictureUrl: './common/img/loginbg.jpg',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          position: '2',
          pictureUrl: '',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          position: '3',
          pictureUrl: '',
          link: 'https://www.baidu.com',
          time: ''
        },
        {
          position: '4',
          pictureUrl: '',
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
      // if (this.$refs.currentRowTable.data) {
      //   for (let i = 0; i < this.$refs.currentRowTable.data.length; i++) {
      //     if (!this.$refs.currentRowTable.data[i]) {
      //       console.log(123)
      //     } else {
      //       console.log(22)
      //     }
      //   }
      // }
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