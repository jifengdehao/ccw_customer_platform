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
          <i>一级分类</i>
          <Select v-model="formItem.parentCatId" style="width:150px;marginRight:20px" @on-change="searchParent(formItem.parentCatId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId" >{{ item.name }}</Option>
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
      <Button @click="saveSort">保存顺序调整</Button>
    </div>
     </section>
     <!-- 表格 -->
    <section>
      <table class="table">
        <tbody>
          <tr>
            <th v-for="(tab,index) in templatecolumns" :key="index" :width="tab.style">{{ tab.title }}</th>
            <th>全选
              <Checkbox v-model="Allsingle" @on-change="clickAll"></Checkbox>
            </th>
          </tr>
        </tbody>
      </table>
          <draggable @update="datadragEnd"  v-model="templatedata">
            <div v-for="(data,index) in templatedata" :key="index" class="draggable vm-clearfix">
                <div style="width:25%">
                  <span>{{data.name}}</span>
                </div>
                <div style="width:30%"> 
                  <div class="tabImgs">
                    <p v-for="(item,index) in data.mainPic" :key="index" >
                    <img :src="item" alt="" class="tabImg">
                    <!-- <tableimage :pic-urls="item.mainPic"></tableimage>   -->
                  </p>
                  </div>
                  
                </div>    
                <div style="width:30%">
                  <Button type="warning" @click="modfiyTemplate(index)">修改模板</Button>
                </div>
                <div style="width:15%">
                  <!-- <input type="checkbox" v-modal="data.check"  @click="clickCheck(index)"> -->
                  <Checkbox v-model="data.single" @on-change="eachChecked"></Checkbox>
                </div>
            </div>
          </draggable>
    </section>
     <!-- 分页 -->
    <!-- <section class="foodtemplate-page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section> -->
    <!-- 增加和编辑的模板 -->
    <Modal v-model="templateModal" :title="templateTitle" width="900">
      <Form :model="templateItem" ref="templateItem"  class="templateModal-from" label-postion="left" :label-width="100">
        <FormItem label="一级分类:" prop="spCategoryParentId" >
          <Select v-model="templateItem.spCategoryParentId"  size="small" style="width:100px" @on-change="searchParent(templateItem.spCategoryParentId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="二级分类" prop="spCategoryId"> 
          <Select v-model="templateItem.spCategoryId"  size="small" style="width:100px">
            <Option v-for="item in childdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select> <br>
        </FormItem>
        <FormItem prop="name" label="商品名称:">
          <Input v-model="templateItem.name" :value="templateItem.name" size="small" style="width: 200px"></Input> <br>
        </FormItem>
        <FormItem label="商品标签:" prop="labels">
          <Input v-model="templateItem.labels" :value="templateItem.labels" size="small" style="width: 200px"></Input> <br>
        </FormItem> 
        <FormItem label="图片:">
              <div class="img vm-fl"  v-for="(url,index) in templateItem.mainPic" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="mainPicRemove(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton">
                <input type="file" @change="mainPicUpload" accept="image/*">+
              </div>
        </FormItem>
        <FormItem label="图片库:">
              <div class="img vm-fl" v-for="(url,index) in templateItem.picLib" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="picLibRemove(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton ">
                <input type="file" @change="picLibUpload" accept="image/*">+
              </div>
        </FormItem>
        <FormItem label="产地默认值:">
          <Input v-model="templateItem.originPlace" :value="templateItem.originPlace" size="small" style="width: 200px"></Input> <br>
        </FormItem>
        <div >
          <table class="templateModal-table" border="0">
            <FormItem label="商品规格" >
              <td><h4>重量单位</h4></td>
              <td  v-for="(weightitem,index) in templateItem.weightUnit" :key="index">
                  <Select size="small" style="width:80px" v-model="weightitem.attributeCode" >
                  <Option v-for="item in weightdata" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
                <Button size="small" type="error" @click="delWeight(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addWeight">增加</Button>
              </td> <br>
              <td><h4>重量属性</h4></td>
              <td  v-for="(item,index) in  templateItem.packAttr" :key="index">
                <Input type="text" style="width:80px" size="small" v-model="item.attributeValue" :value="item.attributeValue"></Input>
                <Button size="small" type="error" @click="delweightAttribute(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addWeightAttribute">增加</Button>
              </td> <br>
              <td><h4>商品属性</h4></td>
               <td v-for="(item,index) in templateItem.productAttr" :key="index">
                <Input type="text" style="width:80px" size="small" v-model="item.attributeValue" ></Input>
                <Button size="small" type="error" @click="delcommodityAttribute(index)">删除</Button>
              </td>
              <td>
                <Button size="small" @click="addCommodityAttribute">增加</Button>
              </td>
            </FormItem>
          </table> <br>
        </div>
        <FormItem label="商品详情:">
              <div class="img vm-fl"  v-for="(url,index) in templateItem.productDesc" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="productDescRemove(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton ">
                <input type="file" @change="productDescUpload" accept="image/*">+
              </div>
        </FormItem>
        <FormItem>
          <Button type="info" value="提交" @click="addtemplate('templateItem',templateItem)">提交</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="moveModal" title="移动至分类" @on-ok="movetemplate(formItem)" class="vm-clearfix">
     <Form :model="formItem" ref="formItem" inline class="vm-fl from">
        <FormItem>
          <span class="label">筛选条件：</span>
          <i>一级分类</i>
          <Select v-model="formItem.parentCatId" style="width:150px" @on-change="searchParent(formItem.parentCatId)">
            <Option v-for="item in parentdata" :value="item.spCategoryId" :key="item.spCategoryId" >{{ item.name }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="formItem.catId" style="width:150px" @on-change="searchChild(formItem.catId)">
            <Option v-for="item in childdata" :value="item.spCategoryId" :key="item.spCategoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="sortModal" title="保存排序" @on-ok="saveSorts">
      <h2>确定保存位置调整？</h2>
    </Modal>
    <!-- 查看大图 -->
     <Modal
        v-model="picModal"
        title="查看大图"
        width="900"
        class="bigimgs vm-clearfix">
        <img class="bigimg" :src="bigImgUrl" alt="">
    </Modal>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import * as api from 'api/common.js'
import { uploadpic } from '../../../components/upload-pic'
import tableimage from './tableimage'
export default {
  props: ['parentdata'],
  components: {
    draggable,
    tableimage
  },
  data() {
    return {
      total: 1,
      section: [],
      formItem: {},
      childdata: [],
      weightdata: [],
      // specification: [
      // {
      //   attributeType: 1
      // },
      // {
      //   attributeType: 2
      // },
      // {
      //   attributeType: 3
      // }
      // ], // 商品属性
      templateItem: {
        name: '',
        labels: '',
        spCategoryParentId: 0,
        spCategoryId: 0,
        mainPic: [],
        picLib: [],
        originPlace: '',
        weightUnit: [{ attributeType: 1 }],
        packAttr: [{ attributeType: 2 }],
        productAttr: [{ attributeType: 3 }],
        productDesc: []
      },
      templateModal: false,
      moveModal: false,
      sortModal: false,
      picModal: false, // 大图模态框
      bigImgUrl: '', // 大图地址
      Allsingle: false,
      templateTitle: '',
      templatecolumns: [
        {
          title: '商品名称',
          key: 'name',
          style: '25%'
        },
        {
          title: '图片',
          key: 'mainPic',
          style: '30%'
        },
        {
          title: '模板',
          key: 'operation',
          style: '30%'
        }
      ],
      templatedata: [],
      table: {
        hasDragged: false,
        isDragging: false
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
  methods: {
    datadragEnd(el) {
      this.templatedata.forEach((item, index) => {
        item.idx = index + 1
      })
      this.$Message.success('拖拽完成')
    },
    // 增加模板按钮
    showModal() {
      this.templateItem = {
        name: '',
        labels: '',
        spCategoryParentId: null,
        spCategoryId: null,
        mainPic: [],
        picLib: [],
        originPlace: '',
        weightUnit: [{ attributeType: 1 }],
        packAttr: [{ attributeType: 2 }],
        productAttr: [{ attributeType: 3 }],
        productDesc: []
      }
      this.templateTitle = '增加商品模板'
      this.templateModal = true
    },
    // 修改模板按钮
    modfiyTemplate(index) {
      let spTemplateId = this.templatedata[index].spTemplateId
      this.templateTitle = '修改商品模板'
      api.getProductTemplate(spTemplateId).then(response => {
        this.templateItem = response
        this.specification = response.specification
      })
      this.templateModal = true
    },
    showmoveModal() {
      this.moveModal = true
    },
    // 保存排序按钮
    saveSort() {
      this.sortModal = true
    },
    saveSorts() {
      let params = {
        templateList: this.templatedata
      }
      api.sortPlatformDict(params).then(response => {
        this.$Message.success('批量修改成功')
      })
    },
    // 选中父级  触发事件获取到子级分类
    searchParent(spCategoryId) {
      this.spCategoryParentId = spCategoryId
      let params = {
        parentId: spCategoryId
      }
      api.getProductCategory(params).then(response => {
        this.childdata = response
      })
    },
    // 选中子分类
    searchChild(catId) {
      this.spCategoryId = catId
    },
    // 搜索
    searchtemplate(formItem) {
      if (!this.formItem.parentCatId) {
        this.$Message.error('请选择一级分类')
        return false
      }
      if (!this.formItem.catId) {
        this.$Message.error('请选择二级分类')
        return false
      }
      api.getProductTemplateList(formItem).then(response => {
        this.templatedata = response
      })
    },
    // 添加，修改模板
    addtemplate(name, templateItem) {
      if (!templateItem.spCategoryParentId) {
        this.$Message.error('请选择一级分类')
        return false
      }
      if (!templateItem.spCategoryId) {
        this.$Message.error('请选择二级分类')
        return false
      }
      if (!templateItem.name) {
        this.$Message.error('商品名称不能为空')
        return false
      }
      if (!templateItem.labels) {
        this.$Message.error('商品标签不能为空')
        return false
      }
      if (templateItem.labels.indexOf(templateItem.name) === -1) {
        this.$Message.error('商品标签必须包含商品名称')
        return false
      }
      if (!templateItem.weightUnit[0].attributeCode) {
        this.$Message.error('请选择重量单位')
        return false
      }
      // 验证成功  执行下面的代码
      let classData = {
        parentCatId: templateItem.spCategoryParentId,
        catId: templateItem.spCategoryId
      }
      this.formItem = classData
      templateItem.specification = this.specification
      if (this.templateTitle === '增加商品模板') {
        api.addProductTemplate(templateItem).then(response => {
          this.searchtemplate(classData)
          this.$Message.success('添加成功')
          this.templateModal = false
        })
      } else if (this.templateTitle === '修改商品模板') {
        api
          .modifyProductTemplate(templateItem, templateItem.spTemplateId)
          .then(response => {
            this.searchtemplate(classData)
            this.templateModal = false
            this.$Message.success('修改成功')
          })
      }
    },
    // 增加重量单位
    addWeight() {
      let weight = {
        attributeType: 1
      }
      this.templateItem.weightUnit.push(weight)
    },
    // 增加重量属性{}
    addWeightAttribute() {
      let weightAttr = {
        attributeType: 2
      }
      this.templateItem.packAttr.push(weightAttr)
    },
    // 增加商品属性
    addCommodityAttribute() {
      let commodityAttribute = {
        attributeType: 3
      }
      this.templateItem.productAttr.push(commodityAttribute)
    },
    // 批量选择
    SelectedData(section) {
      this.section = section
    },
    // 删除重量单位
    delWeight(index) {
      this.templateItem.weightUnit.splice(index, 1)
    },
    // 删除重量属性
    delweightAttribute(index) {
      this.templateItem.packAttr.splice(index, 1)
    },
    // 删除商品属性
    delcommodityAttribute(index) {
      this.templateItem.productAttr.splice(index, 1)
    },
    // 批量移动分类
    movetemplate(formItem) {
      let params = {
        spCategoryId: formItem.catId,
        spCategoryParentId: formItem.parentCatId,
        templateList: this.checkedData
      }
      api.sortPlatformDict(params).then(response => {
        this.searchtemplate(formItem)
        this.$Message.success('批量修改成功')
      })
    },
    // 全选
    clickAll() {
      // 点击全选 子元素选择 或者全不选
      if (this.Allsingle) {
        this.templatedata.forEach(item => {
          item.single = true
        })
      } else {
        this.templatedata.forEach(item => {
          item.single = false
        })
      }
    },
    // 子级选择判断全选是否选中
    eachChecked() {
      this.Allsingle = this.templatedata.every(item => {
        if (item.single) {
          return true
        }
      })
    },
    // 图片上传
    mainPicUpload(e) {
      if (this.templateItem.mainPic.length < 3) {
        var file = e.target.files[0]
        uploadpic(file).then(res => {
          if (res) {
            res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
            this.templateItem.mainPic = this.templateItem.mainPic.concat(res)
          }
        })
      } else {
        this.$Message.error('最多上传3张图片')
      }
    },
    // 图片库
    picLibUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
          this.templateItem.picLib = this.templateItem.picLib.concat(res)
        }
      })
    },
    // 商品详情
    productDescUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
          this.templateItem.productDesc = this.templateItem.productDesc.concat(
            res
          )
        }
      })
    },
    // 查看大图
    handleView(url) {
      this.bigImgUrl = url
      this.picModal = true
    },
    // 删除图片
    mainPicRemove(index) {
      this.templateItem.mainPic.splice(index, 1)
    },
    picLibRemove(index) {
      this.templateItem.picLib.splice(index, 1)
    },
    productDescRemove(index) {
      this.templateItem.productDesc.splice(index, 1)
    }
  },
  filfter: {},
  computed: {
    checkedData() {
      return this.templatedata.filter(item => {
        return item.single === true
      })
    }
  },
  watch: {}
}
</script>
<style lang="css" scoped>
.foodtemplate {
  min-height: 500px;
}
.seller-template-manager-search span {
  font-size: 16px;
  vertical-align: middle;
}
.foodtemplate button {
  margin-bottom: 10px;
}
.table {
  width: 100%;
  line-height: 40px;
  border: 1px solid #ccc;
  background-color: #f8f8f9;
}
.draggable {
  font-family: verdana, arial, sans-serif;
  font-size: 16px;
  width: 100%;
  color: #495060;
  margin-top: -1px;
  padding: 5px;
  height: 90px;
  line-height: 80px;
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: center;
  overflow: hidden;
}
.draggable div {
  float: left;
}
.tabImg {
  display: inline;
  width: 100px;
  height: 80px;
  margin: 0 auto;
}
.tabImgs {
  width: 100px;
  height: 80px;
}
.templateModal-from span {
  display: inline-block;
  width: 80px;
  vertical-align: top;
  float: left;
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
.mainpic {
  display: inline-block;
}
input[type='file'] {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  overflow: hidden;
}
.uploadButton {
  width: 100px;
  height: 100px;
  line-height: 80px;
  position: relative;
  cursor: pointer;
  text-align: center;
  font-size: 80px;
  margin-left: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.img {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 3px;
}
.img img {
  width: 100%;
  height: 100%;
}
/* 图片的遮罩层 */
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.img:hover .cover {
  display: block;
  width: 100px;
  height: 100px;
  text-align: center;
}
.cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 100px;
}
.bigimg {
  max-width: 800px;
  max-height: 800px;
}
</style>