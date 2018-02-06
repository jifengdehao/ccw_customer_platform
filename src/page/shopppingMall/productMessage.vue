/*
 * @Author: huShangJun 
 * @Date: 2018-01-26 16:22:46 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 增加或编辑产品信息
 */
<template>
  <div id="productMessage">
    <h1>商品信息</h1>
       <Form :model="messageData" :label-width="80">
        <FormItem label="商品编号:" v-if="jfProductId">
            <Input v-model="messageData.jfProductId" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
        <FormItem label="商品名称:">
            <Input v-model="messageData.productName" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem>
         <FormItem label="商品关键词:">
            <Input v-model="messageData.labels" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem>
        <FormItem label="所属分类:">
            <Select v-model="messageData.categoryId" style="width:200px">
                <Option v-for="(category,index) in categorys" :key="index" :value="category.jfCategoryId">{{category.categoryName}}</Option>
            </Select>
        </FormItem>
         <FormItem label="商品库存:">
            <Input v-model="messageData.inventory" placeholder="Enter something..." style="width:200px" ></Input>
        </FormItem>
        <FormItem label="兑换方式:">
          <!-- <CheckboxGroup v-model="messageData.exchangeInteger">
            <Checkbox label="1"> <i>积分:</i><Input v-model="messageData.inventory" size="small" style="width:100px" ></Input></Checkbox> <br>
            <Checkbox label="2"> <i>现金:</i><Input v-model="messageData.inventory" size="small" style="width:100px" ></Input></Checkbox> <br>
            <Checkbox label="3">
              <i>积分:</i><Input v-model="messageData.inventory" size="small" style="width:50px" ></Input> 
              <i>现金:</i><Input v-model="messageData.inventory" size="small" style="width:50px" ></Input>
            </Checkbox>
          </CheckboxGroup> -->
          <Checkbox > <i>积分:</i><Input v-model="messageData.exchangeCost" size="small" style="width:100px" :disabled="messageData.exchangeInteger != 1"></Input></Checkbox> <br>
        </FormItem>
        <FormItem label="商品状态:">
           <Radio-group v-model="messageData.status">
                <Radio label="1">上架</Radio>
                <Radio label="2">下架</Radio>
            </Radio-group>
        </FormItem>
        <FormItem label="商品主图:">
          <div class="img vm-fl"  v-for="(url,index) in messageData.mianPicture" :key="index">
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
        <FormItem label="商品详情:">
          <div class="img vm-fl"  v-for="(url,index) in messageData.detailsPicture" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="detailsPicRemove(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton">
                <input type="file" @change="descPicUpload" accept="image/*">+
              </div>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="save" :disabled="isSave">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click="toProductManage($event)">返回</Button>
        </FormItem>
    </Form>
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
import * as api from 'api/common.js'
import { uploadpic } from '../../components/upload-pic'
export default {
  components: {},
  props: ['jfProductId'],
  data() {
    return {
      single: true,
      picModal: false,
      bigImgUrl: '',
      data: [],
      isSave: false, // 保存按钮，点击提交置灰
      categorys: [],
      messageData: {
        mianPicture: [],
        detailsPicture: [],
        exchangeInteger: 1
      }
    }
  },
  created() {
    api.getCategoryList().then(res => {
      this.categorys = res
    })
  },
  mounted() {
    if (this.jfProductId) {
      api.productinfo(this.jfProductId).then(res => {
        this.messageData = res
      })
    } else {
      this.messageData.exchangeInteger = 1
    }
  },
  methods: {
    // 返回
    toProductManage(event) {
      // this.$emit('product-manage')
      console.log(this.messageData.status)
    },
    // 主图上传
    mainPicUpload(e) {
      if (this.messageData.mianPicture.length < 3) {
        var file = e.target.files[0]
        uploadpic(file).then(res => {
          if (res) {
            res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
            this.messageData.mianPicture = this.messageData.mianPicture.concat(
              res
            )
          }
        })
      } else {
        this.$Message.error('最多上传3张图片')
      }
    },
    // 详情图片上传
    descPicUpload(e) {
      if (this.messageData.detailsPicture.length < 3) {
        var file = e.target.files[0]
        uploadpic(file).then(res => {
          if (res) {
            res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
            this.messageData.detailsPicture = this.messageData.detailsPicture.concat(
              res
            )
          }
        })
      } else {
        this.$Message.error('最多上传3张图片')
      }
    },
    // 查看大图
    handleView(url) {
      this.picModal = true
      this.bigImgUrl = url
    },
    // 删除主图片
    mainPicRemove(index) {
      this.messageData.mianPicture.splice(index, 1)
    },
    // 删除详情图片
    detailsPicRemove(index) {
      this.messageData.detailsPicture.splice(index, 1)
    },
    // 保存
    save(event) {
      if (!this.messageData.productName) {
        this.$Message.error('小伙请填写商品名称')
        return false
      }
      if (!this.messageData.labels) {
        this.$Message.error('小伙请填写商品关键词')
        return false
      }
      if (!this.messageData.categoryId) {
        this.$Message.error('小伙请选择商品所属分类')
        return false
      }
      if (!this.messageData.inventory) {
        this.$Message.error('小伙请填写商品库存')
        return false
      }
      if (!this.messageData.exchangeInteger || !this.messageData.exchangeCost) {
        this.$Message.error('小伙请填写兑换方式和兑换积分')
        return false
      }
      if (!this.messageData.status) {
        this.$Message.error('小伙请选择商品状态')
        return false
      }
      this.isSave = true
      api
        .editProduct(this.messageData)
        .then(res => {
          this.isSave = false
          this.$emit('product-manage')
        })
        .catch(res => {
          this.isSave = false
        })
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
#productMessage {
}
#productMessage h1 {
  margin-left: 35px;
  margin-bottom: 30px;
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
  width: 80px;
  height: 80px;
  line-height: 60px;
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
  width: 80px;
  height: 80px;
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
  width: 80px;
  height: 80px;
  text-align: center;
}
.cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 80px;
}
</style>