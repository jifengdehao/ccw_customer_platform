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
     <Modal v-model="addModal" :title="modalTitle" :mask-closable="false" @on-ok="add">
       <Form :model="formItem" :label-width="80">
        <FormItem label="分类名称:">
            <Input v-model="formItem.categoryName" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
        <FormItem label="分类ICON:">
          <div class="img vm-fl" >
            <img :src="formItem.iconUrl" alt="" >
            <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(formItem.iconUrl)"></Icon>
            </div>
          </div>
          <div class="uploadButton">
            <input type="file" @change="iconUrlUpload" accept="image/*">+
          </div>
        </FormItem>
    </Form>
    </Modal>
     <Modal v-model="promptModal" title="删除" :mask-closable="false" @on-ok="delCategory">
      <h2>确定删除产品？</h2>
    </Modal>
  </div>
</template>
<script>
import tableImg from '../seller/sellercomponents/tableimage'
import * as api from 'api/common.js'
import { uploadpic } from '../../components/upload-pic'
export default {
  components: {},
  props: {},
  data() {
    return {
      addModal: false,
      promptModal: false,
      modalTitle: '增加',
      formItem: {
        jfCategoryId: null,
        iconUrl: '',
        categoryName: ''
      },
      columns: [
        {
          title: '分类名称',
          key: 'categoryName',
          align: 'center'
        },
        {
          title: '分类ICON',
          key: 'iconUrl',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(tableImg, {
                props: {
                  picUrls: params.row.iconUrl
                }
              })
            ])
          }
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
                      this.formItem = params.row
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
                      this.formItem.jfCategoryId = params.row.jfCategoryId
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
    this.getCategoryList()
  },
  mounted() {},
  methods: {
    // 增加分类
    addSort() {
      this.modalTitle = '增加'
      this.addModal = true
      this.formItem = {
        jfProductId: '',
        iconUrl: ''
      }
    },
    getCategoryList() {
      api.getCategoryList().then(res => {
        this.Data = res
      })
    },
    iconUrlUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          this.formItem.iconUrl = res[0].indexOf('?')
            ? res[0].split('?')[0]
            : res[0]
        }
      })
    },
    // 添加或修改
    add() {
      api.editCategory(this.formItem).then(res => {
        if (res === true) {
          this.$Message.success('更新成功')
          this.getCategoryList()
        }
      })
    },
    // 删除类目
    delCategory() {
      api.delCategory(this.formItem.jfCategoryId).then(res => {
        this.$Message.error('删除成功')
        this.getCategoryList()
      })
    }
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
.img {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 3px;
}
.img img {
  width: 100%;
  height: 100%;
}
/* 图片的遮罩层 */
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.img:hover .cover {
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
}
.cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 80px;
}
</style>