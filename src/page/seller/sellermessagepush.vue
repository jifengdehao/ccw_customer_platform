/*
 * @Author: huShangJun 
 * @Date: 2017-10-12 22:40:30 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint:  商品模板库管理 测试
 */
<template>
  <div class="seller-template-manager">
    <!-- 搜索 -->
    <section class="seller-template-manager-search">
      <Form :model="formItem" ref="formItem" inline>
        <FormItem>
          <span class="label">分类搜索：</span>
          <Input v-model="formItem.input" placeholder="请输入" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    </section>
    <!-- 表格内容 -->
    <section seller-template-manager-container>
      <Tabs type="card" :animated="false" @on-click="changedata">
        <TabPane v-for="tab in tabs" key :label="tab.title">
          <div class="seller-template-manager-container-classify" v-if="classify">
            <Row>
              <Col span="11">
              <Button type="primary" @click="showModal">增加一级分类</Button>
              <Table :columns="classifColumns" :data="templatedata"></Table>
              </Col>
              <Col span="2">
              <h1>''</h1>
              </Col>
              <Col span="11">
              <Button type="primary">二级分类管理</Button>
             <Table :columns="classifColumns" :data="templatedata"></Table>
              </Col>
            </Row>
          </div>
          <Table :columns="columns" :data="templatedata" v-else></Table>
        </TabPane>
      </Tabs>
    </section>
    <!-- 查看图片 -->
    <Modal v-model="classifymodal" :title="title" width="500">
      分类名称：
      <input type="text" v-model="value">
    </Modal>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: '',
      title: '',
      formItem: {},
      classify: true,
      classifydata: [],
      templatedata: [
        { chargeman: '水果' },
        { chargeman: '海鲜' },
        { chargeman: '野味' }
      ],
      classifymodal: false,
      classifColumns: [
        {
          title: '一级分类',
          key: 'chargeman'
        },
        {
          title: '操作',
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
                    this.value = params.row.chargeman
                    console.log(this.value)
                    this.title = '修改'
                    this.classifymodal = true
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      columns: [],
      tabs: [
        { title: '商品分类管理' },
        { title: '商品模板管理' }
      ]
    }
  },
  // created: {},
  //   mounted: {},
  activited: {},
  update: {},
  methods: {
    changedata(index) {
      if (index === 0) {
        this.classify = true
      } else if (index === 1) {
        this.classify = false
      }
    },
    test(value) {
      alert(value)
    },
    showModal() {
      this.value = ''
      this.title = '增加'
      this.classifymodal = true
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
.seller-template-manager-search span {
  font-size: 16px;
  vertical-align: middle;
}

.seller-template-manager-container-classify {
  width: 100%;
  padding: 40px;
  background-color: #eee;
}

.seller-template-manager-container-classify ul,
.seller-template-manager-container-classify Button {
  /* float: left;
  margin-right: 20px; */
  margin-bottom: 10px;
}

.seller-template-manager-container-classify li {
  position: relative;
  width: 120px;
  height: 30px;
  line-height: 30px;
  margin-top: -1px;
  border: 1px solid #555;
  text-align: center
}
</style>