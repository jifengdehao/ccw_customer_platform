/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：增加app版本更新
*/
<template>
  <div class="addAppUpdate">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <Form :label-width="100" class="mt20" style="width: 500px;" :model="appVersionInfo">
      <FormItem label="更新时间" prop="publishTime">
        <DatePicker type="datetime" placeholder="选择日期" style="width: 100%"
                    v-model="appVersionInfo.publishTime"></DatePicker>
      </FormItem>
      <FormItem label="更新标题" prop="publishTime">
        <Input v-model="appVersionInfo.title" placeholder="请输入更新标题"></Input>
      </FormItem>
      <FormItem label="更新内容" prop="content">
        <Input v-model="appVersionInfo.content" placeholder="更新内容" type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="手机平台">
        <Select v-model="appVersionInfo.platform" clearable @on-change="changPlatForm">
          <Option v-for="item in platFromArry" :value="item.code" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="最低版本要求" prop="minSystemVersion">
        <Select v-model="appVersionInfo.minSystemVersion" clearable>
          <Option v-for="item in versionArry" :value="item.code" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="最高版本要求" prop="maxSystemVersion">
        <Select v-model="appVersionInfo.maxSystemVersion" clearable>
          <Option v-for="item in versionArry" :value="item.code" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="应用名称" prop="appName">
        <Select v-model="appVersionInfo.appName" clearable @on-change="changAppName">
          <Option v-for="item in appNameArry" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="APP版本" prop="appVersion">
        <Input v-model="appVersionInfo.appVersion" placeholder="请输入App版本"></Input>
      </FormItem>
      <FormItem label="包路径" prop="bundle">
        <Input v-model="appVersionInfo.bundle" placeholder="请输入包路径" disabled></Input>
      </FormItem>
      <FormItem label="安装包" prop="downloadUrl">
        <Input v-model="appVersionInfo.downloadUrl" placeholder="请输入安装包地址"></Input>
      </FormItem>
      <FormItem label="构建版本" prop="buildVersion">
        <Input v-model="appVersionInfo.buildVersion" placeholder="请输入构建版本"></Input>
      </FormItem>

      <FormItem>
        <input id="upload" type="file" @change="onUpload($event)" title="上传图片" filetype="image/*">
      </FormItem>
      <FormItem label="强制升级" prop="forceUpdate">
        <RadioGroup v-model="appVersionInfo.forceUpdate">
          <Radio label=0>否</Radio>
          <Radio label=1>是</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="addAppUpdate">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  import * as upload from 'components/upload-pic'

  export default {
    data () {
      return {
        platFromArry: [], // 平台列表
        appNameArry: [], // 根据平台获取相对于的应用名称
        versionArry: [], // 版本要求
        appVersionInfo: {
          title: '', // 更新标题
          bundle: '',  // 更新包路径
          appVersion: '', // 更新版本
          publishTime: new Date(), // 更新时间
          platform: 0, // 默认平台为ios
          content: '',  // 更新内容
          forceUpdate: 0,  // 是否强制升级
          maxSystemVersion: 0, // 最大版本要求
          minSystemVersion: 0,  // 最小版本要求
          downloadUrl: '',
          appName: '', // 应用名称
          buildVersion: 0
        }
      }
    },
    created () {
      this.getPlatformData()
      this.getPlatformName()
      this.getVersionData()
    },
    methods: {
      // 回退
      close () {
        this.$router.back()
      },
      // 获取移动平台列表
      getPlatformData () {
        let params = {
          types: 'mobile_platforms'
        }
        api.getPlatformData(params).then((res) => {
          if (res) {
            this.platFromArry = res
          }
        })
      },
      // 选择平台
      changPlatForm (value) {
        this.appVersionInfo.platform = value   // 选择对应的平台
        this.getPlatformName()
        this.getVersionData()
      },
      // 根据平台获取应用名称
      getPlatformName () {
        if (this.appVersionInfo.platform === 0) {
          let params = {
            types: 'app_name_ios'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.appNameArry = res
            }
          })
        } else {
          let params = {
            types: 'app_name_android'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.appNameArry = res
            }
          })
        }
      },
      // 上传安装包
      onUpload (e) {
        upload.uploadpic(e.target.files[0]).then(data => {
          let res = data[0]
          res = res.indexOf('?') ? res.split('?')[0] : res
          this.appVersionInfo.downloadUrl = res
        })
      },
      // 获取版本要求
      getVersionData () {
        if (this.appVersionInfo.platform === 0) {
          let params = {
            types: 'ios_versions'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.versionArry = res
            }
          })
        } else {
          let params = {
            types: 'android_versions'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.versionArry = res
            }
          })
        }
      },
      // 增加app更新
      addAppUpdate () {
        api.addApp(this.appVersionInfo).then((res) => {
          if (res) {
            console.log(res)
            let that = this
            this.$Notice.success({
              title: '增加app更新成功',
              duration: 2,
              onClose () {
                that.$router.back()
              }
            })
          } else {
            this.$Notice.error({
              title: '增加app更新失败'
            })
          }
        })
      },
      // 选择app应用名称
      changAppName (value) {
        this.getBundleData(value)
      },
      // 获取包路径
      getBundleData (value) {
        if (this.appVersionInfo.platform === 0) {
          let params = {
            types: 'app_bundle_ios'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.appNameArry.forEach((item) => {
                if (item.name === value) {
                  res.forEach((it) => {
                    if (it.idx === item.idx) {
                      this.appVersionInfo.bundle = it.name
                    }
                  })
                }
              })
            }
          })
        } else {
          let params = {
            types: 'app_bundle_android'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.appNameArry.forEach((item) => {
                if (item.name === value) {
                  res.forEach((it) => {
                    if (it.idx === item.idx) {
                      this.appVersionInfo.bundle = it.name
                    }
                  })
                }
              })
            }
          })
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #App
    .addAppUpdate
      position relative
      border 1px solid #e9eaec
      padding 20px
      .close
        position absolute
        top 0
        right 0
        z-index 10
</style>
