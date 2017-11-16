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
    <Form :label-width="100" class="mt20" style="width: 500px;">
      <FormItem label="更新标题">
        <Input v-model="title" placeholder="请输入更新标题"></Input>
      </FormItem>
      <FormItem label="应用名称">
        <Input v-model="name" placeholder="请输入更新应用名称"></Input>
      </FormItem>
      <FormItem label="APP版本">
        <Input v-model="version" placeholder="请输入App版本"></Input>
      </FormItem>
      <FormItem label="更新时间">
        <DatePicker type="datetime" placeholder="选择日期" style="width: 100%"></DatePicker>
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
        datetime: new Date()
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
