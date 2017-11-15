/*
 * @Author: huShangJun 
 * @Date: 2017-11-09 15:57:07 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 图片上传
 */
<template>
  <div>
    <!-- 图片显示 -->
    <div ref="list" v-for="(url , index) in urlList" :key="index" class="pic vm-fl">
      <img :src="url" alt="">
      <div class="cover">
        <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
      </div>
    </div>
    <!-- 上传按钮 -->
     <div class="upload">
       <!-- <Icon type="android-add"></Icon> -->
      <input type="file" @change="doUpload">+
    </div>
     <Modal
        v-model="modal"
        title="查看大图"
        width="900"
        class="bigimgs vm-clearfix">
        <img class="bigimg" :src="url" alt="">
    </Modal>
  </div>
</template>
<script>
import { uploadpic } from '../../../until/upload'
export default {
  components: {},
  data() {
    return {
      modal: false,
      upList: [],
      ossInfo: {},
      url: '',
      client: {}
    }
  },
  created() {},
  mounted() {},
  updated() {
    //
  },
  activited: {},
  methods: {
    doUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        this.upList = this.upList.concat(res)
        this.$emit('imgurls', [this.imgList].concat(this.upList))
      })
    },
    // 删除图片
    handleRemove(index) {
      // [this.imgList].concat(this.upList).splice(index, 1)
    },
    // 查看大图
    handleView(url) {
      // console.log(this.urlList)
      this.url = url
      this.modal = true
    }
  },
  filfter: {},
  computed: {
    urlList() {
      return [this.imgList].concat(this.upList)
    }
  },
  watch: {}
}
</script>
<style lang="css" scoped>
.upload {
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

.upload input {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 100px;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  overflow: hidden;
}

.upload:hover {
  color: #444;
  /* background: #eee; */
  /* border-color: #ccc; */
  text-decoration: none;
}
.pic,
.pic img {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-origin: border-box;
}
.pic {
  position: relative;
  margin: 0 3px;
}
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.pic:hover .cover {
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
</style>