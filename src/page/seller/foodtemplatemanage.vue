/*
 * @Author: huShangJun 
 * @Date: 2017-10-12 22:40:30 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint:  商品模板库管理
 */
<template>
  <div class="seller-template-manager">
    <!-- 搜索 -->
    <section class="seller-template-manager-search" v-if="search">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">筛选条件：</span>
          <i>一级分类</i>
          <Select v-model="model1" style="width:150px">
            <Option v-for="item in firstclassify" :value="item.value" :key="item.value" placeholder="一级分类">{{ item.label }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="model1" style="width:150px">
            <Option v-for="item in secondclassify" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 表格内容 -->
    <section seller-template-manager-container>
      <Tabs type="card" :animated="false" @on-click="changedata">
        <TabPane label="商品分类管理">
          <div class="seller-template-manager-container-classify">
            <Row>
              <Col span="11">
              <Button size="small" type="primary" @click="showModal1">一级分类管理</Button>
              <ul>
                <li>
                  <h4>一级分类</h4>
                </li>
                <li v-for="item in templatedata" key @click="test(item.name)">{{item.name}}</li>
              </ul>
              </Col>
              <Col span="11">
              <Button size="small" type="primary" @click="showModal2">二级分类管理</Button>
              <ul>
                <li>
                  <h4>二级分类</h4>
                </li>
                <li v-for="item in 12">素材</li>
              </ul>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="商品模板管理">
          <v-foodtemplate></v-foodtemplate>
        </TabPane>
      </Tabs>
    </section>
    <!-- 查看图片 -->
    <Modal v-model="classifymodal" :title="classifytitle" width="300" @on-ok="postdata" @on-cancel="">
      <draggable v-model="templatedata" @update="datadragEnd">
        <transition-group>
          <div v-for="(item,index) in templatedata" :key="index" style="lineHeight:30px">
            <Input v-model="item.name" size="small" style="width: 200px" v-if="item.operation !== 0"></Input>
            <Button type="error" size="small" @click="delClassify(index)" v-if="item.operation !== 0">删除</Button>
          </div>
        </transition-group>
      </draggable>
      </Table>
      <Button size="small" style="marginTop:10px" @click="addClassify">新增分类</Button>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
import vFoodtemplate from './sellercomponents/foodtemplate'
import draggable from 'vuedraggable'
export default {
  components: { vFoodtemplate, draggable },
  props: {},
  data() {
    return {
      formItem: {
        input: ''
      },
      model1: '',
      search: false,
      classifydata: [],
      classifytitle: '',
      firstclassify: [],
      secondclassify: [],
      templatedata: [],
      classifymodal: false,
      classifyColumns: [
        {
          title: '一级分类',
          key: 'catName',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  size: 'small',
                  value: params.row.catName
                },
                style: {
                  marginRight: '5px'
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      columns: []
    }
  },
  created() {
    this.getProductCategory()
  },
  //   mounted: {},
  activited: {},
  update: {},
  methods: {
    getProductCategory() {
      let params = {
        parentId: -1
      }
      api.getProductCategory(params).then(response => {
        this.templatedata = response
      })
    },
    // updateProductCategory(categories) {
    //   api.updateProductCategory(categories).then(response => {
    //     console.log(response)
    //   })
    // },
    changedata(index) {
      if (index === 0) {
        this.search = false
      } else if (index === 1) {
        this.search = true
      }
    },
    test(value) {
      alert(value)
    },
    showModal1() {
      this.classifytitle = '一级分类管理'
      this.classifymodal = true
    },
    showModal2() {
      this.classifytitle = '二级分类管理'
      this.classifymodal = true
    },
    datadragEnd(evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.templatedata)
    },
    addClassify() {
      let addli = { name: '', operation: 3 }
      this.templatedata.push(addli)
      // console.log(this.templatedata)
    },
    delClassify(index) {
      if (this.templatedata[index].operation === 3) {
        this.templatedata.splice(index, 1)
      } else {
        this.templatedata[index].operation = 0
      }
    },
    postdata() {
      api.updateProductCategory(this.templatedata).then(response => {
        console.log(response)
      })
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.seller-template-manager-search span {
  font-size: 16px;
  vertical-align: middle;
}

.seller-template-manager-container-classify {
  width: 100%;
  padding: 40px;
  background-color: #eee;
}

.seller-template-manager-container-classify ul,
.seller-template-manager-container-classify button {
  float: left;
  margin-right: 20px;
}

.seller-template-manager-container-classify li {
  position: relative;
  width: 120px;
  height: 30px;
  line-height: 30px;
  margin-top: -1px;
  border: 1px solid #555;
  text-align: center;
}
</style>