/*
 * @Author: huShangJun 
 * @Date: 2018-01-26 16:22:46 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 增加或编辑产品信息
 */
<template>
  <div id="productMessage">
    <h1>商品信息</h1>
       <Form :model="formItem" :label-width="80">
        <FormItem label="商品编号:">
            <Input v-model="formItem.jfProductId" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
        <FormItem label="商品名称:">
            <Input v-model="formItem.productName" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem>
         <FormItem label="商品关键词:">
            <Input v-model="formItem.labels" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem>
        <FormItem label="所属分类:">
            <Select v-model="formItem.categoryId" style="width:200px">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
         <FormItem label="商品库存:">
            <Input v-model="formItem.inventory" placeholder="Enter something..." style="width:200px" ></Input>
        </FormItem>
        <FormItem label="兑换方式:">
           <RadioGroup v-model="formItem.exchangeWay" vertical>
                <Radio label="male">积分    <i>积分:</i><Input v-model="formItem.inventory" size="small"  style="width:100px" ></Input></Radio> 
                <Radio label="female">现金   <i>现金:</i><Input v-model="formItem.inventory" size="small" style="width:100px" ></Input></Radio> 
                <Radio label="a">积分 + 现金 
                   <i>积分:</i><Input v-model="formItem.inventory" size="small" style="width:50px" ></Input> 
                   <i>现金:</i><Input v-model="formItem.inventory" size="small" style="width:50px" ></Input>
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="商品状态:">
           <RadioGroup v-model="formItem.status">
                <Radio label="male">上架</Radio>
                <Radio label="female">下架</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="商品主图:">
          <div class="img vm-fl"  v-for="(url,index) in formItem.mainPic" :key="index">
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
          <div class="img vm-fl"  v-for="(url,index) in formItem.mainPic" :key="index">
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
        <FormItem>
            <Button type="primary">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click="toProductManage($event)">返回</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
// import * as api from 'api/common.js'
import { uploadpic } from '../../components/upload-pic'
export default {
  components: {},
  props: {},
  data() {
    return {
      formItem: {},
      data: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    toProductManage(event) {
      this.$emit('product-manage')
    },
    // 图片上传
    mainPicUpload(e) {
      if (this.formItem.mainPic.length < 3) {
        var file = e.target.files[0]
        uploadpic(file).then(res => {
          if (res) {
            res = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
            this.formItem.mainPic = this.templateItem.mainPic.concat(res)
          }
        })
      } else {
        this.$Message.error('最多上传3张图片')
      }
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
</style>