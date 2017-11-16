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
    <Form :label-width="100" class="mt20" style="width: 500px;">
      <FormItem label="更新时间">
        <DatePicker type="datetime" placeholder="选择日期" style="width: 100%" v-model="datetime"></DatePicker>
      </FormItem>
      <FormItem label="更新标题">
        <Input v-model="title" placeholder="请输入更新标题"></Input>
      </FormItem>
      <FormItem label="更新内容">
        <Input v-model="dsc" placeholder="更新内容" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="应用名称">
        <Input v-model="name" placeholder="请输入更新应用名称"></Input>
      </FormItem>
      <FormItem label="APP版本">
        <Input v-model="version" placeholder="请输入App版本"></Input>
      </FormItem>
      <FormItem label="版本要求">
        <Input v-model="versionReq" placeholder="请输入版本要求"></Input>
      </FormItem>
      <FormItem label="手机平台">
        <Select v-model="platform">
          <Option value="android">android</Option>
          <Option value="ios">ios</Option>
        </Select>
      </FormItem>
      <FormItem label="包路径">
        <Input v-model="path" placeholder="请输入包路径"></Input>
      </FormItem>
      <FormItem label="强制升级">
        <RadioGroup v-model="upgrade">
          <Radio label="yes">是</Radio>
          <Radio label="no">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="">
        <Button type="primary">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        title: '',
        name: '',
        version: '',
        datetime: new Date(),
        versionReq: '',
        platform: '',
        path: '',
        upgrade: '',
        dsc: ''
      }
    },
    methods: {
      close () {
        this.$router.back()
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
