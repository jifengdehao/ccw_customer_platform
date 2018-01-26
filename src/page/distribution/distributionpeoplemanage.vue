/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-14 10:26:39 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 分销用户管理页面 
 */

<template>
  <div>
    <p class="search">
      <input type="text" placeholder="用户ID/用户昵称/用户手机号">
      <Button type="primary">搜索</Button>
    </p>
    <div class="content">
      <Tabs>
        <TabPane label="用户端"></TabPane>
        <TabPane label="商户端"></TabPane>
        <TabPane label="配送端"></TabPane>
      </Tabs>
      <Table border :columns="keys" :data="tabData"></Table>
      <Page style="float:right;margin-top:20px;" :total="100" show-total></Page>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      keys: [
        {
          title: '用户ID',
          key: 'name',
          align: 'center'
        },
        {
          title: '用户昵称',
          key: 'age',
          align: 'center'
        },
        {
          title: '用户手机',
          key: 'address',
          align: 'center'
        },
        {
          title: '菜一代数量',
          key: 'name',
          align: 'center'
        },
        {
          title: '菜二代数量',
          key: 'age',
          align: 'center'
        },
        {
          title: '菜一代收益(现金)',
          key: 'address',
          align: 'center'
        },
        {
          title: '菜二代收益(现金)',
          key: 'name',
          align: 'center'
        },
        {
          title: '菜一代收益(菜城币)',
          key: 'age',
          align: 'center'
        },
        {
          title: '菜二代收益(菜城币)',
          key: 'address',
          align: 'center'
        },
        {
          title: '总收益(菜城币)',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params)
                  }
                }
              },
              '查看'
            )
          }
        }
      ],
      tabData: []
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="css" >
p.search{
  float:right;
  height:30px;
}

p.search>input[type='text']{
  width:200px;
  height:30px;
  text-indent:5px;
  margin-right:10px;
}

p>*{
  vertical-align: sub;
}

div.content{
  clear: both;
}
</style>
