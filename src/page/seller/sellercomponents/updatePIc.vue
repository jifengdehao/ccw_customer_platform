/*
 * @Author: huShangJun 
 * @Date: 2017-11-09 15:57:07 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 图片上传
 */
<template>
  <div>
    <!-- 图片显示 -->
    <div v-for="(url , index) in upList" :key="index" class="pic vm-fl">
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
export default {
  components: {},
  props: ['imgList'],
  data() {
    return {
      modal: false,
      upList: [],
      ossInfo: {},
      name: '',
      url: '',
      client: {}
    }
  },
  created() {
    this.getOssInfo()
  },
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    // 原生ajax 获取token
    getOssInfo() {
      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open(
        'GET',
        'http://192.168.0.158:8097/stsToken/roleSessionName',
        false
      )
      xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
      xmlhttp.send()
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        this.ossInfo = JSON.parse(xmlhttp.response).data
      }
      // 初始化数据
      var OSS = require('ali-oss')
      // 上传图片初始化
      this.client = new OSS.Wrapper({
        region: 'oss-cn-shenzhen',
        accessKeyId: this.ossInfo.accessKeyId,
        accessKeySecret: this.ossInfo.accessKeySecret,
        stsToken: this.ossInfo.securityToken,
        bucket: 'cc-tech'
      })
    },
    // 上传
    doUpload(e) {
      // 获取guid
      function guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        return (
          S4() +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          S4() +
          S4()
        )
      }
      // 根据guid命名图片的名字
      var imgName = guid()
      var file = e.target.files[0]
      var storeAs = '/images/' + imgName + '.png'
      // 上传图片
      this.client
        .multipartUpload(storeAs, file)
        .then(result => {
          this.upList = this.upList.concat(result.res.requestUrls)
          console.log(this.upList)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    // 删除图片
    handleRemove(index) {
      this.upList.splice(index, 1)
    },
    // 查看大图
    handleView(url) {
      this.url = url
      this.modal = true
    }
  },
  filfter: {},
  computed: {},
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