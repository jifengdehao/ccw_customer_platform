/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：投诉管理
*/
<template>
  <div class="order-complaint">
    <Row>
      <Col span="24">
      发起端口
      <Select style="width:200px;margin-left: 10px;margin-right: 10px;" @on-change="selectPort">
        <Option v-for="item in portList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      投诉时间
      <DatePicker type="daterange" placeholder="请选择投诉时间" style="width: 200px;margin-left: 10px;margin-right: 10px;"
                  @on-change="selectDate"></DatePicker>
      <Input placeholder="投诉人手机" v-model="mobileno" style="width: 200px;margin-right: 10px;"></Input>
      <Input placeholder="被投诉人手机" v-model="contactNumber" style="width: 200px;margin-right: 10px;"></Input>
      <Button type="primary" @click="handlerSubmit">搜索</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col span="24">
      <Tabs :value="types" :animated="false" @on-click="selectTab">
        <Tab-pane label="待审核" name="0">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已审核" name="1">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已驳回" name="2">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
        <Tab-pane label="已处理" name="3">
          <Table :columns="columns" :data="data" :loading="loading"></Table>
          <Page :total="tableTotal"
                :current="curr"
                :page-size="pageNum"
                @on-change="changePage"
                show-total
                class="vm-fr mt20">
          </Page>
        </Tab-pane>
      </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        portList: [
          {
            value: 'customer',
            label: '用户端'
          },
          {
            value: 'deliver',
            label: '配送端'
          },
          {
            value: 'seller',
            label: '商家段'
          }
        ],
        types: 0,
        loading: false,
        columns: [
          {
            title: '投诉时间',
            key: '',
            align: 'center'
          },
          {
            title: '投诉编号',
            key: '',
            align: 'center'
          },
          {
            title: '投诉人身份',
            key: '',
            align: 'center'
          },
          {
            title: '投诉人ID',
            key: '',
            align: 'center'
          },
          {
            title: '投诉人姓名',
            key: '',
            align: 'center'
          },
          {
            title: '投诉人手机',
            key: '',
            align: 'center'
          },
          {
            title: '被投诉人身份',
            key: '',
            align: 'center'
          },
          {
            title: '被投诉人ID',
            key: '',
            align: 'center'
          },
          {
            title: '被投诉人姓名',
            key: '',
            align: 'center'
          },
          {
            title: '被投诉人手机',
            key: '',
            align: 'center'
          },
          {
            title: '投诉原因',
            key: '',
            align: 'center'
          },
          {
            title: '图片凭证',
            key: '',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '驳回')
              ])
            }
          }
        ],
        data: [],
        curr: 1, // 当前页
        pageNum: 20, // 当前页展示的数据量
        tableTotal: 0 // 数据总数
      }
    },
    methods: {
      // 搜索
      handlerSubmit() {
      },
      selectDate(date) {
        console.log(date)
      },
      selectPort(value) {
        console.log(value)
      },
      selectTab(name) {
        this.types = name
      },
      changePage(index) {
        this.curr = index
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
