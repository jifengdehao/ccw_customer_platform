/*
 * @Author: huShangJun 
 * @Date: 2017-10-12 22:40:30 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint:  商品模板库管理
 */
<template>
  <div class="seller-template-manager">
    <!-- 表格内容 -->
    <section seller-template-manager-container>
      <Tabs :animated="false" @on-click="changedata">
        <TabPane label="商品分类管理">
          <div class="seller-template-manager-container-classify">
            <Row>
              <Col span="11">
              <Button size="small" type="primary" @click="showModal1">一级分类管理</Button>
              <ul>
                <li>
                  <h4>一级分类</h4>
                </li>
                <li v-for="(item,index) in parentdata" :key="index" @click="changeParent(item.spCategoryId,index)" :class="{current:selected==index}">{{item.name}}</li>
              </ul>
              </Col>
              <Col span="11">
              <Button size="small" type="primary" @click="showModal2">二级分类管理</Button>
              <ul>
                <li>
                  <h4>二级分类</h4>
                </li>
                <li v-for="(item,index) in childdata" :key="index">{{item.name}}</li>
              </ul>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="商品模板管理">
          <v-foodtemplate :parentdata="parentdata"></v-foodtemplate>
        </TabPane>
      </Tabs>
    </section>
    <!-- 查看 -->
    <Modal v-model="classifymodal" :title="classifytitle" width="350" @on-ok="postdata"  :mask-closable = "false">
      <draggable v-model="dragdata" @update="datadragEnd">
        <transition-group>
          <div v-for="(item,index) in dragdata" :key="index" v-if="item.operation !== 0">
            <div style="lineHeight:30px">
            <Input v-model="item.name" size="small" style="width: 200px"></Input>
            <Button type="error" size="small" v-if="item.canDelete !== 0" @click="delClassify(index)" >删除</Button>
            <Button type="info" size="small" v-if="item.canDelete === 0" disabled>已关联模板</Button>
           </div>
          </div>
        </transition-group>
      </draggable>
      </Table>
      <Button size="small" style="marginTop:10px" @click="addClassify" v-if="classifytitle !== '一级分类管理'">新增分类</Button>
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
      idx: Number,
      selected: 0,
      addID: -1, // 添加二级分类parentId
      model1: '',
      search: false,
      classifydata: [],
      classifytitle: '',
      parentdata: [], // 一级分类列表
      childdata: [], // 二级分类列表
      dragdata: [], // 传入的数据 拖拽或者修改
      classifymodal: false
    }
  },
  created() {
    let params = {
      parentId: -1 // 一级分类传入-1
    }
    api.getProductCategory(params).then(response => {
      this.parentdata = response
      this.addID = this.parentdata[0].spCategoryId
      this.getProductCategory(this.parentdata[0].spCategoryId)
    })
  },
  //   mounted: {},
  activited: {},
  update: {},
  methods: {
    // 获取分类列表
    getProductCategory(parentId) {
      let params = {
        parentId: parentId // 一级分类传入-1 二级分类传入父级分类的spCategoryId
      }
      api.getProductCategory(params).then(response => {
        if (parentId === -1) {
          this.parentdata = response
        } else {
          this.childdata = response
        }
      })
    },
    // 切换tab
    changedata(index) {
      if (index === 0) {
        let params = {
          parentId: -1 // 一级分类传入-1
        }
        api.getProductCategory(params).then(response => {
          this.parentdata = response
          this.addID = this.parentdata[0].spCategoryId
          this.getProductCategory(this.parentdata[0].spCategoryId)
        })
        this.search = false
      } else if (index === 1) {
        this.search = true
      }
    },
    changeParent(spCategoryId, index) {
      this.addID = spCategoryId
      this.selected = index // 点击改变样式
      this.getProductCategory(spCategoryId) // 获取二级分类列表
    },
    // 分类管理按钮
    showModal1() {
      this.classifytitle = '一级分类管理'
      this.dragdata = this.parentdata
      this.classifymodal = true
    },
    showModal2() {
      this.classifytitle = '二级分类管理'
      this.dragdata = this.childdata
      this.classifymodal = true
    },
    // 拖拽触发事件
    datadragEnd(evt) {
      this.dragdata.forEach((item, index) => {
        item.idx = index + 1
      })
    },
    // 添加分类
    addClassify(index) {
      let addli = {
        name: '',
        operation: 2,
        parentId: this.classifytitle === '一级分类管理' ? -1 : this.addID,
        idx: this.dragdata.length + 1
      }
      this.dragdata.push(addli)
    },
    // 删除分类
    delClassify(index) {
      if (this.dragdata[index].operation === 2) {
        this.dragdata.splice(index, 1)
      } else {
        this.dragdata[index].operation = 0
      }
    },
    postdata() {
      api.updateProductCategory(this.dragdata).then(response => {
        if (this.classifytitle === '一级分类管理') {
          let params = {
            parentId: -1 // 一级分类传入-1
          }
          api.getProductCategory(params).then(response => {
            this.parentdata = response
            this.addID = this.parentdata[0].spCategoryId
            this.getProductCategory(this.parentdata[0].spCategoryId)
          })
        } else if (this.classifytitle === '二级分类管理') {
          this.getProductCategory(this.addID)
        }
      })
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.current {
  background-color: #ccc;
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