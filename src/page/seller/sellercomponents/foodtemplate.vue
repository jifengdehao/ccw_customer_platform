/*
 * @Author: huShangJun 
 * @Date: 2017-10-14 10:19:09 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 模板库管理 
 */
<template>
  <div class="foodtemplate">
     <!-- 搜索 -->
    <section class="seller-template-manager-search vm-clearfix">
      <Form :model="formItem" ref="formItem" inline class="vm-fl from">
        <FormItem>
          <span class="label">筛选条件：</span>
          <i>一级分类</i>
          <Select v-model="formItem.parentCatId" style="width:150px" @on-change="searchParent(formItem.parentCatId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId" placeholder="一级分类">{{ item.name }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="formItem.catId" style="width:150px">
            <Option v-for="item in childdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="searchtemplate(formItem)">搜索</Button>
        </FormItem>
      </Form>
    <!-- 表格内容 -->
    <div class="vm-fr">
      <Button type="primary" @click="showModal">添加模板</Button>
      <Button @click="showmoveModal">批量转移</Button>
      <Button @click="">保存顺序调整</Button>
    </div>
     </section>
    <v-draggable  border refs="table"  :end="handleOnend" :columnsList="templatecolumns" :tableData="templatedata"></v-draggable>
     <!-- 分页 -->
    <!-- <section class="foodtemplate-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section> -->
    <!-- 增加和编辑的模板 -->
    <Modal v-model="templateModal" :title="templateTitle" width="900" @on-ok="addtemplate(templateItem)">
      <Form :model="templateItem" ref="templateItem" class="templateModal-from">
        <FormItem>
          <span>商品名称</span>
          <Input v-model="templateItem.name" :value="templateItem.name" size="small" style="width: 200px"></Input> <br>
          <span>商品标签</span>
          <Input v-model="templateItem.labels" :value="templateItem.labels" size="small" style="width: 200px"></Input> <br>
          <span class="label">所属分类</span>
          <i>一级分类</i>
          <Select v-model="templateItem.spCategoryParentId" :value="templateItem.spCategoryParentId" size="small" style="width:100px" @on-change="searchParent(templateItem.spCategoryParentId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId" placeholder="一级分类">{{ item.name }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="templateItem.spCategoryId" :value="templateItem.spCategoryId" size="small" style="width:100px">
            <Option v-for="item in childdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select> <br>
          <span>图片</span>
          <!-- templateItem.mainPic是数组 -->
          <ul v-model="templateItem.mainPic" :value="templateItem.mainPic">
            <li class="templateModal-from-img"><img src="" alt=""></li>
          </ul> <br>
          <span>图片库</span>
          <!-- templateItem.picLib是数组 -->
          <ul v-model="templateItem.picLib" :value="templateItem.picLib">
            <li class="templateModal-from-img"><img src="" alt=""></li>
          </ul> <br>
          <span>产地默认值</span>
          <Input v-model="templateItem.originPlace" :value="templateItem.originPlace" size="small" style="width: 200px"></Input> <br>
          <span>产品规格</span>
          <table v-model="templateItem.specification" :value="templateItem.specification" class="templateModal-table">
            <tr>
              <td>
                <h4>重量单位</h4>
              </td>
              <td v-for="(weightitem,index) in weight" :key="index">
                <Select size="small" style="width:80px" v-model="weightitem.attributeCode" :value="weightitem.attributeCode">
                  <Option v-for="item in weightdata" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
                <Button size="small" type="error" @click="delWeight(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addWeight">增加</Button>
              </td>
            </tr>
            <tr>
              <td>
                <h4>重量属性</h4>
              </td>
              <td v-for="(item,index) in  weightAttribute" :key="index">
                <Input type="text" style="width:80px" size="small" v-model="item.attributeValue" :value="item.attributeValue"></Input>
                <Button size="small" type="error" @click="delweightAttribute(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addWeightAttribute">增加</Button>
              </td>
            </tr>
            <tr>
               <td>
                <h4>商品属性</h4>
              </td>
              <td v-for="(item,index) in commodityAttribute" :key="index">
                <Input type="text" style="width:80px" size="small" v-model="item.attributeValue" :value="item.attributeValue"></Input>
                <Button size="small" type="error" @click="delcommodityAttribute(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addCommodityAttribute">增加</Button>
              </td>
            </tr>
          </table> <br>
          <span>商品详情</span>
          <ul>
            <li class="templateModal-from-info"><img src="" alt=""></li>
            <li class="templateModal-from-info"><img src="" alt=""></li>
            <li class="templateModal-from-info"><img src="" alt=""></li>
          </ul> <br>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="moveModal" title="移动至分类" @on-ok="movetemplate(formItem)">
     <Form :model="formItem" ref="formItem" inline class="vm-fl from">
        <FormItem>
          <span class="label">筛选条件：</span>
          <i>一级分类</i>
          <Select v-model="formItem.parentCatId" style="width:150px" @on-change="searchParent(formItem.parentCatId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId" placeholder="一级分类">{{ item.name }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="formItem.catId" style="width:150px">
            <Option v-for="item in childdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import vDraggable from '../compontents/draggable'
import * as api from 'api/common.js'
export default {
  props: ['parentdata'],
  components: {
    vDraggable
  },
  data() {
    return {
      total: 1,
      section: [],
      formItem: {},
      childdata: [],
      weightdata: [],
      specification: [
        {
          attributeType: 1
        },
        {
          attributeType: 2
        },
        {
          attributeType: 3
        }
      ], // 商品属性
      templateItem: {},
      templateModal: false,
      moveModal: false,
      templateTitle: '',
      templatecolumns: [
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '图片',
          key: 'mainPic'
        },
        {
          title: '模板',
          key: 'operation',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.templateTitle = '修改商品模板'
                      api
                        .getProductTemplate(params.row.spTemplateId)
                        .then(response => {
                          this.templateItem = response
                          this.specification = response.specification
                        })
                      this.templateModal = true
                    }
                  }
                },
                '修改模板'
              )
            ])
          }
        },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      ],
      templatedata: [],
      table: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        draggingRecord: []
      }
    }
  },
  created() {
    let params = {
      types: 'weight_unit'
    }
    api.getPlatformDict(params).then(response => {
      this.weightdata = response
    })
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    update(el) {
    },
    handleOnend(el) {
      // console.log(this.table.draggingRecord)
    },
    showModal() {
      this.templateItem = {}
      this.specification = []
      this.templateTitle = '增加商品模板'
      this.templateModal = true
    },
    showmoveModal() {
      this.moveModal = true
    },
    // 选中父级  触发事件获取到子级分类
    searchParent(spCategoryId) {
      let params = {
        parentId: spCategoryId
      }
      api.getProductCategory(params).then(response => {
        this.childdata = response
      })
    },
    // 搜索
    searchtemplate(formItem) {
      api.getProductTemplateList(formItem).then(response => {
        this.templatedata = response
      })
    },
    // 添加，修改模板
    addtemplate(templateItem) {
      templateItem.specification = this.specification
      if (this.templateTitle === '增加商品模板') {
        api.addProductTemplate(templateItem).then(response => {
          this.$Message.success('添加成功')
        })
      } else if (this.templateTitle === '修改商品模板') {
        api
          .modifyProductTemplate(templateItem, templateItem.spTemplateId)
          .then(response => {
            this.$Message.success('修改成功')
          })
      }
    },
    // changepage() {},
    // 增加重量单位
    addWeight() {
      let weight = {
        attributeType: 1
      }
      this.specification.push(weight)
    },
    // 增加重量属性{}
    addWeightAttribute() {
      let weightAttribute = {
        attributeType: 2
      }
      this.specification.push(weightAttribute)
    },
    // 增加商品属性
    addCommodityAttribute() {
      let commodityAttribute = {
        attributeType: 3
      }
      this.specification.push(commodityAttribute)
    },
    // 批量选择
    SelectedData(section) {
      this.section = section
    },
    // 删除重量单位
    delWeight(index) {
      this.weight.splice(index, 1)
    },
    // 删除重量属性
    delweightAttribute(index) {
      this.weightAttribute.splice(index, 1)
    },
    // 删除商品属性
    delcommodityAttribute(index) {
      this.commodityAttribute.splice(index, 1)
    },
    // 批量移动分类
    movetemplate(formItem) {
      let params = {
        spCategoryId: formItem.spCategoryId,
        spCategoryParentId: formItem.spCategoryParentId,
        templateList: this.section
      }
      api.sortPlatformDict(params).then(response => {
        this.$Message.success('批量修改成功')
      })
    }
  },
  filfter: {},
  computed: {
    weight() {
      return this.specification.filter(item => {
        return item.attributeType === 1
      })
    },
    weightAttribute() {
      return this.specification.filter(item => {
        return item.attributeType === 2
      })
    },
    commodityAttribute() {
      return this.specification.filter(item => {
        return item.attributeType === 3
      })
    },
    sections() {
      return this.$store.state.sections
    }
  },
  watch() {
  }
}
</script>
<style lang="css" scoped>
.seller-template-manager-search span {
  font-size: 16px;
  vertical-align: middle;
}
.foodtemplate button {
  margin-bottom: 10px;
}

.templateModal-from span {
  display: inline-block;
  width: 80px;
  vertical-align: top;
}

.templateModal-from ul {
  display: inline-block;
  width: 450px;
}

.templateModal-table {
  display: inline-block;
}

.templateModal-from .templateModal-from-img,
.templateModal-from-info {
  width: 100px;
  height: 100px;
  margin: 2px;
  border: 1px solid #ccc;
  float: left;
}

.templateModal-from-info {
  width: 400px;
  height: 200px;
}
</style>