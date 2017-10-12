/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-11 10:28:51 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 历史更新/查看历史更新记录子页面
 */

<template>
  <div>
    <Table border :columns="columns3" :data="data1"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns3: [
        {
          title: '图片位置',
          key: 'position',
          type: 'index',
          align: 'center'
        },
        {
          title: '图片',
          align: 'center',
          key: 'picture'
        },
        {
          title: '链接',
          align: 'center',
          key: 'link'
        },
        {
          title: '上传说明',
          align: 'center',
          key: 'upLoad'
        },
        {
          title: '时间',
          align: 'center',
          height: '100',
          key: 'time'
        }
      ],
      data1: [
        {
          picture: 'common/img/loginbg.jpg',
          link: 'https://www.baidu.com',
          upLoad: '宣传平台：菜城新时代、发放优惠券100张入口',
          time: '更新时间 2017/8/16 18:30 结束时间2017/8/15 18:30'
        },
        {
          picture: 'common/img/loginbg.jpg',
          link: 'https://www.baidu.com',
          upLoad: '宣传平台：菜城新时代、发放优惠券100张入口',
          time: '更新时间 2017/8/16 18:30 结束时间2017/8/15 18:30'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>

</style>