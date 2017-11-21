/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：查看app更新详情
*/
<template>
  <div class="indexDetails">
    <div class="close" @click="close">
      <Button type="text" icon="close"></Button>
    </div>
    <Form :label-width="100" class="mt20" style="width: 500px;" :model="formModel">
      <FormItem label="更新时间" prop="publishTime">
        <DatePicker type="datetime" placeholder="选择日期" style="width: 100%" v-model="formModel.publishTime"></DatePicker>
      </FormItem>
      <FormItem label="更新标题" prop="title">
        <Input v-model="formModel.title" placeholder="请输入更新标题"></Input>
      </FormItem>
      <FormItem label="更新内容" prop="content">
        <Input v-model="formModel.content" placeholder="更新内容" type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="手机平台" prop="platform">
        <Select v-model="formModel.platform" clearable @on-change="changPlatForm">
          <Option v-for="item in platFromArry" :value="item.code" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="最低版本要求" prop="minSystemVersion">
        <Select v-model="formModel.minSystemVersion" clearable>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="最高版本要求" prop="maxSystemVersion">
        <Select v-model="formModel.maxSystemVersion" clearable>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="应用名称" prop="appName">
        <Select v-model="formModel.appName" clearable @on-change="changAppName">
          <Option v-for="item in appNameArry" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="APP版本" prop="appVersion">
        <Input v-model="formModel.appVersion" placeholder="请输入App版本"></Input>
      </FormItem>
      <FormItem label="包路径" prop="bundle">
        <Input v-model="formModel.bundle" placeholder="请输入包路径"></Input>
      </FormItem>
      <FormItem label="强制升级" prop="forceUpdate">
        <RadioGroup v-model="formModel.forceUpdate">
          <Radio label=0>否</Radio>
          <Radio label=1>是</Radio>
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

  export default {
    data () {
      return {
        id: (() => {
          return this.$route.params.id
        })(),
        formModel: {
          title: '',
          appName: '',
          appVersion: '',
          publishTime: new Date(),
          versionReq: '',
          platform: 0,
          bundle: '',
          forceUpdate: 0,
          content: ''
        },
        platFromArry: [],
        appNameArry: [],
        minSystemVersion: [],
        maxSystemVersion: [],
        bundleArry: []
      }
    },
    created () {
      this.getAppDetails()
      this.getPlatformData()
      setTimeout(() => {
        this.getPlatformName()
        this.getBundle()
      }, 1000)
    },
    methods: {
      // 关闭app更新详情
      close () {
        this.$router.back()
      },
      // 获取app更新
      getAppDetails () {
        api.getAppDetails(this.id).then((res) => {
          if (res) {
            this.formModel = res
          }
        })
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
      // 根据平台获取应用名称
      getPlatformName () {
        if (this.formModel.platform === 0) {
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
      // 根据平台获取包路径
      getBundle () {
        if (this.formModel.platform === 0) {
          let params = {
            types: 'app_bundle_ios'
          }
          api.getPlatformData(params).then((res) => {
            if (res) {
              this.bundleArry = res
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
      },
      // 选择平台 获取相对应的应用名称 相对的包路径
      changPlatForm (value) {
        this.formModel.platform = value
        this.getPlatformName()
      },
      changAppName (value) {
//        let index = ''
//        this.appNameArry.forEach((item, i) => {
//          if (item.name === value) {
//            index = i
//          }
//        })
//        console.log(index)
//        this.formModel.bundle = this.bundleArry[index].name
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #App
    .indexDetails
      position relative
      border 1px solid #e9eaec
      padding 20px
      .close
        position absolute
        top 0
        right 0
        z-index 10
</style>
