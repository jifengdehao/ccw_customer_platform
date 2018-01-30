/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-26 10:43:27 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 上传图片 
 */

<template>
  <div>
    <div class="pic" v-if="showMask">
      <div class="pic-mask">
        <input type="file" @change="onUpload($event)" value="重新上传" accept="image/*">重新上传
      </div>
      <img src="http://cc-tech.oss-cn-shenzhen.aliyuncs.com/images/79a00642-2dd6-18ef-3257-310381c3d676.jpeg" alt="">
    </div>
    <div class="upload" v-if="bePic">
      <input type="file" @change="onUpload($event)" value="上传图片" accept="image/*">上传图片
    </div>
  </div>
</template>
<script>
import { uploadpic } from 'components/upload-pic'
export default {
  components: {},
  data() {
    return {
      bePic: true, // 控制button显示
      showMask: false // 遮罩层
    }
  },
  created() {},
  methods: {
    // 上传图片
    onUpload(e) {
      console.log(e.target.files[0])
      uploadpic(e.target.files[0]).then(res => {
        if (res) {
          console.log(res[0].indexOf('?') ? res[0].split('?')[0] : res[0])
          // data.picUrl = res[0].indexOf('?') ? res[0].split('?')[0] : res[0]
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.upload {
  /* width: 120px;
  height: 33px;
  line-height: 30px; */
  padding: 6px 10px;
  display: inline-block;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #2d8cf0;
  background-color: #2d8cf0;
  outline: none;
}

.upload > input[type='file'] {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

/* 图片 */
.pic {
  height: 156px;
  position: relative;
}
.pic > img {
  width: 100%;
  height: 100%;
}
.pic > .pic-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .58);
  display: none;
  color: #fff;
  line-height: 156px;
}
.pic:hover .pic-mask {
  display: inline-block !important;
}

.pic > .pic-mask > input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
