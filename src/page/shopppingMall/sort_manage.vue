/*
 * @Author: huShangJun 
 * @Date: 2018-01-26 09:43:40 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 分类管理 
 */
<template>
  <div id="sort_manage">
    <Button style="marginBottom: 10px;" @click="addSort">增加</Button>
    <!-- 表格内容 -->
    <section class="table">
      <Table border :columns="columns" :data="Data"></Table>
    </section>
    <!-- 分页
    <section class="page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changepage"></Page>
    </section> -->
     <Modal v-model="addModal" :title="modalTitle" :mask-closable="false">
       <Form :model="formItem" :label-width="80">
        <FormItem label="分类名称:">
            <Input v-model="formItem.jfProductId" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
        <FormItem label="分类ICON:">
          <div class="img vm-fl"  v-for="(url,index) in formItem.mainPic" :key="index">
                <img :src="url" alt="">
                <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="mainPicRemove(index)"></Icon>
                </div>
              </div>
              <div class="uploadButton">
                <input type="file" @change="mainPicUpload" accept="image/*">+
              </div>
        </FormItem>
    </Form>
    </Modal>
     <Modal v-model="promptModal" :mask-closable="false">
      <h2>确定将产品</span></h2>
    </Modal>
  </div>
</template>
<script>
import * as api from 'api/common.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      addModal: false,
      promptModal: false,
      modalTitle: '增加',
      formItem: {},
      columns: [
        {
          title: '分类名称',
          key: 'categoryName',
          align: 'center'
        },
        {
          title: '分类ICON',
          key: 'iconUrl',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'info'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.addModal = true
                      this.modalTitle = '编辑'
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px'
                  },
                  on: {
                    click: () => {
                      this.promptModal = true
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      Data: []
    }
  },
  created() {
    api.getCategoryList().then(res => {
      this.Data = res
    })
  },
  mounted() {},
  methods: {
    // 增加分类
    addSort() {
      this.modalTitle = '增加'
      this.addModal = true
    },
    mainPicUpload() {}
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="css" scoped>
input[type='file'] {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  overflow: hidden;
}
.uploadButton {
  width: 80px;
  height: 80px;
  line-height: 60px;
  position: relative;
  cursor: pointer;
  text-align: center;
  font-size: 80px;
  margin-left: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
</style>