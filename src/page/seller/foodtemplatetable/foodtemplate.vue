/*
 * @Author: huShangJun 
 * @Date: 2017-10-14 10:19:09 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 模板库管理 
 */
<template>
  <div class="foodtemplate">
    <!-- 表格内容 -->
    <section class="foodtemplate-button">
      <Button type="primary" @click="showModal">添加模板</Button>
      <Button @click="showmoveModal">批量转移</Button>
    </section>
    <Table border :columns="templatecolumns" :data="templatedata"></Table>
    <section class="foodtemplate-page">
      <Page :total="100" show-total></Page>
    </section>
    <!-- 增加和编辑的模板 -->
    <Modal v-model="templateModal" :title="templateTitle" width="600">
      <Form :model="templateItem" ref="formItem" class="templateModal-from">
        <FormItem>
          <span>商品名称</span>
          <Input size="small" style="width: 200px"></Input> <br>
          <span>商品标签</span>
          <Input size="small" style="width: 200px"></Input> <br>
          <span class="label">所属分类</span>
          <i>一级分类</i>
          <Select v-model="model1" size="small" style="width:100px">
            <Option v-for="item in firstclassify" :value="item.value" :key="item.value" placeholder="一级分类">{{ item.label }}</Option>
          </Select>
          <i>二级分类</i>
          <Select v-model="model1" size="small" style="width:100px">
            <Option v-for="item in secondclassify" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> <br>
          <span>图片</span>
          <ul>
            <li class="templateModal-from-img"><img src="" alt=""></li>
            <li class="templateModal-from-img"><img src="" alt=""></li>
            <li class="templateModal-from-img"><img src="" alt=""></li>
          </ul> <br>
          <span>图片库</span>
          <ul>
            <li class="templateModal-from-img"><img src="" alt=""></li>
            <li class="templateModal-from-img"><img src="" alt=""></li>
            <li class="templateModal-from-img"><img src="" alt=""></li>
            <li class="templateModal-from-img"><img src="" alt=""></li>
          </ul> <br>
          <span>产地默认值</span>
          <Input size="small" style="width: 200px"></Input> <br>
          <span>产品规格</span>
          <table border="1" class="templateModal-table">
            <tr>
              <td>
                <h4>重量单位</h4>
              </td>
              <td>
                <Input type="text" style="width:100px" size="small"></Input>
                <Button size="small">删除</Button>
              </td>
              <td>
                <Button size="small">增加</Button>
              </td>
            </tr>
            <tr>
              <td>
                <h4>重量属性</h4>
              </td>
              <td>
                <Input type="text" style="width:100px" size="small"></Input>
                <Button size="small">删除</Button>
              </td>
              <td>
                <Button size="small">增加</Button>
              </td>
            </tr>
          </table> <br>
          <span>商品属性</span>
          <table border="1" class="templateModal-table">
            <tr>
              <td>
                <h4>重量单位</h4>
              </td>
              <td>
                <Input type="text" style="width:100px" size="small"></Input>
                <Button size="small">删除</Button>
              </td>
              <td>
                <Button size="small">增加</Button>
              </td>
            </tr>
          </table> <br>
          <span>商详情介绍</span>
          <ul>
            <li class="templateModal-from-info"><img src="" alt=""></li>
            <li class="templateModal-from-info"><img src="" alt=""></li>
            <li class="templateModal-from-info"><img src="" alt=""></li>
          </ul> <br>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="moveModal" title="移动至分类">
      <i>一级分类</i>
      <Select v-model="model1" size="small" style="width:100px">
        <Option v-for="item in firstclassify" :value="item.value" :key="item.value" placeholder="一级分类">{{ item.label }}</Option>
      </Select>
      <i>二级分类</i>
      <Select v-model="model1" size="small" style="width:100px">
        <Option v-for="item in secondclassify" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> <br>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      model1: '',
      firstclassify: [],
      secondclassify: [],
      templateItem: {},
      templateModal: false,
      moveModal: false,
      templateTitle: '',
      templatecolumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '三级列表',
          key: 'name'
        },
        {
          title: '图片',
          key: 'age'
        },
        {
          title: '模板',
          key: 'operation',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.templateTitle = '修改模板'
                    this.templateModal = true
                  }
                }
              }, '修改模板')
            ])
          }
        },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      ],
      templatedata: []
    }
  },
  // created: {},
  // mounted: {},
  activited: {},
  update: {},
  methods: {
    showModal() {
      this.templateTitle = '增加商品模板'
      this.templateModal = true
    },
    showmoveModal() {
      this.moveModal = true
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.foodtemplate-button {
  text-align: right
}

.foodtemplate Button {
  margin-bottom: 10px
}

.templateModal-from span {
  display: inline-block;
  width: 80px;
  vertical-align: top
}

.templateModal-from ul {
  display: inline-block;
  width: 450px;
}

.templateModal-table {
  display: inline-block;
}

.templateModal-from .templateModal-from-img,
.templateModal-from-info {
  width: 100px;
  height: 100px;
  margin: 2px;
  border: 1px solid #ccc;
  float: left;
}

.foodtemplate .foodtemplate-page {
  margin-top: 10px;
  float: right;
}

.templateModal-from-info {
  width: 400px;
  height: 200px;
}
</style>