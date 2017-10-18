<template>
  <div class="banner-manager">
    <Tabs size="small" @on-click="getTabIndex">
      <TabPane label="已开始">
        <p class="btn-add">
          <Button class="right" type="primary">新增</Button>
        </p>
        <Table border :columns="startTitle" :data="startDatas"></Table>
        <div class="save-change">
          <Button @click="getSaveChanges">保存修改</Button>
        </div>
      </TabPane>
      <TabPane label="未开始">
        <p class="btn-add">
          <Button class="right" type="primary">新增</Button>
        </p>
        <Table border :columns="startTitle" :data="startDatas"></Table>
        <div class="save-change">
          <Button @click="getSaveChanges">保存修改</Button>
        </div>
      </TabPane>
      <TabPane label="已结束">
        <Table border :columns="overTitle" :data="overDatas"></Table>
      </TabPane>
    </Tabs>
    <div class="mask-box" v-if="tabIndex == 2 && isOpen">
      <div class="show-box">
        <table>
          <tr>
            <th>banner位置</th>
            <th>图片</th>
            <th>跳转链接</th>
            <th>上传说明</th>
            <th>时间</th>
          </tr>
          <tr>
            <td>{{bannerDetails.index}}</td>
            <td>{{bannerDetails.imgPic}}</td>
            <td>{{bannerDetails.linkuRL}}</td>
            <td>{{bannerDetails.uplode}}</td>
            <td>
              <p>{{'开始时间:' + bannerDetails.time}}</p>
              <p>{{'结束时间:' + bannerDetails.time}}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'bannerManage',
  data() {
    return {
      tabIndex: 0,  //  tab索引
      bannerDetails: null, //  tab查看详情数据
      isOpen: false, //  详细数据boolean值
      //  已开始标题
      startTitle: [
        {
          title: '图片',
          key: 'imgPic',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('img', {
                props: {
                  src: params.row.picture
                },
                style: {
                  height: '190px'
                }
              })
            ])
          }
        },
        {
          title: '图片管理',
          key: 'picManage',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert()
                  }
                }
              }, '重新上传')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '删除')
            ])
          }
        },
        {
          title: '跳转链接',
          key: 'linkUrl',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.linkUrl
                }
              })
            ])
          }
        },
        {
          title: '上传说明',
          key: 'uploadExplain',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.uploadExplain
                }
              })
            ])
          }
        },
        {
          title: '时间',
          key: 'time',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('DatePicker', {
                props: {
                  value: params.row.time,
                  format: 'yyyy-MM-dd HH:mm',
                  placement: 'left',
                  placeholder: '选择日期和时间(不含秒)',
                  type: 'datetimerange'
                },
                style: {
                  zIndex: '40'
                }
              })
            ])
          }
        }
      ],
      //  已开始数据
      startDatas: [
        {
          imgPic: '王小明',
          age: 18,
          linkUrl: 'https://www.baidu.com',
          uploadExplain: '测试数据暂不知晓',
          time: '2017/09/01'
        },
        {
          imgPic: '王小明',
          age: 18,
          linkUrl: 'https://www.baidu.com',
          uploadExplain: '测试数据暂不知晓',
          time: '2017/09/01'
        },
        {
          imgPic: '王小明',
          age: 18,
          linkUrl: 'https://www.baidu.com',
          uploadExplain: '测试数据暂不知晓',
          time: '2017/09/01'
        }, {
          imgPic: '王小明',
          age: 18,
          linkUrl: 'https://www.baidu.com',
          uploadExplain: '测试数据暂不知晓',
          time: '2017/09/01'
        }
      ],
      //  已结束标题
      overTitle: [
        {
          title: '序号',
          type: 'index',
          key: 'position'
        },
        {
          title: '上传说明',
          key: 'uplode'
        },
        {
          title: '更新时间',
          key: 'time'
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: '操作人员',
          key: 'staff'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.bannerDetails = params.row
                    this.isOpen = true
                    console.log(this.bannerDetails)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      //  已结束数据
      overDatas: [
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/11 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/12 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/13 9:20',
          staff: '管理A'
        },
        {
          uplode: '宣传平台、发放优惠券100张入口',
          time: '2017/10/11 9:30',
          endTime: '2017/11/14 9:20',
          staff: '管理A'
        }
      ]
    }
  },
  methods: {
    getTabIndex(index) {
      //  获取tab索引
      console.log(index)
      this.tabIndex = index
    },
    getSaveChanges() {
      //  保存
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(from)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.left {
  float: left;
}

.right {
  float: right;
}

p.btn-add {
  overflow: hidden;
  margin: 10px auto 20px;
}

.save-change {
  text-align: center;
  margin: 20px auto;
}

.mask-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.3);
}

.show-box {
  box-sizing: border-box;
  padding: 20px;
  width: calc(100% - 400px);
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -140px;
  margin-left: calc(-50% + 240px);
  background-color: #fff;
  overflow: hidden;
}

.show-box table {
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  border-collapse: collapse;
}

.show-box table tr th, .show-box table tr td {
  height: 50px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>
