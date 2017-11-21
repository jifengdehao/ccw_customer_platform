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
      <FormItem label="最低版本要求">
        <Select>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="最高版本要求">
        <Select>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="应用名称">
        <Select v-model="appVersionInfo.appName" clearable @on-change="changAppName">
          <Option v-for="item in appNameArry" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="APP版本" prop="version">
        <Input v-model="appVersionInfo.version" placeholder="请输入App版本"></Input>
      </FormItem>
      <FormItem label="包路径" prop="bundle">
        <Input v-model="appVersionInfo.bundle" placeholder="请输入包路径"></Input>
      </FormItem>
      <FormItem>
        <Upload action="http://192.168.0.158:8097/stsToken/roleSessionName">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传安装包</Button>
        </Upload>
      </FormItem>
      <FormItem label="强制升级">
        <RadioGroup v-model="appVersionInfo.upgrade">
          <Radio label="yes">是</Radio>
          <Radio label="no">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'api/common'
  // import { uploadpic} from 'components/upload-pic'

  export default {
    data () {
      return {
        platFromArry: [], // 平台列表
        appNameArry: [], // 根据平台获取相对于的应用名称
        bundleArry: [], // 包路径
        appVersionInfo: {
          title: '', // 更新标题
          bundle: '',  // 更新包路径
          version: '', // 更新版本
          publishTime: new Date(), // 更新时间
          platform: 0, // 默认平台为ios
          content: ''  // 更新内容
        }
      }
    },
    created () {
      this.getPlatformData()
      this.getPlatformName()
    },
    methods: {
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
            console.log(res)
            this.platFromArry = res
          }
        })
      },
      changPlatForm (value) {
        console.log(value)
        this.appVersionInfo.platform = value   // 选择对应的平台
        this.getPlatformName()
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
      // 选择应用名称
      changAppName (value) {
        this.getBundleData(value)
//        let idx = this.appNameArry.filter((element, index, array) => {
//          if (element.name === value) {
//            return element
//          }
//        })
//        console.log(idx[0].idx)
//        let bundle = this.bundleArry.filter((element, index, array) => {
//          if (element.idx === idx[0].idx) {
//            return element
//          }
//        })
//        console.log(bundle)
      },
      // 获取包路径
      getBundleData (appName) {
        if (this.appVersionInfo.platform === 0) {
          let params = {
            types: 'app_bundle_ios'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              console.log(res)
              let appNameItem = this.appNameArry.filter((element, index, array) => {
                if (element.name === appName) {
                  return element
                }
              })
              let bundleItem = res.filter((element, index, array) => {
                debugger
                if (element.idx === appNameItem[0].idx) {
                  return element
                }
              })
              this.appVersionInfo.bundle = bundleItem[0].name
            }
          })
        } else {
          let params = {
            types: 'app_bundle_android'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              console.log(res)
              this.bundleArry = res
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
