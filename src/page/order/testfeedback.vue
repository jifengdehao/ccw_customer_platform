/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：反馈管理
*/
<template>
  <div>
    <Row class="mb20">
      <Col span="24">
      <Select v-model="feedbackType" style="width: 200px;margin-right: 10px;" @on-change="selectFeedbackType">
        <Option v-for="item in feedbackTypeList" :value="item.value" :key="item.value">
          {{item.label }}
        </Option>
      </Select>
      反馈时间
      <DatePicker type="daterange" placeholder="请选择" style="width: 200px;margin: 0 10px;"
                  @on-change="selectDate"></DatePicker>
      <Input placeholder="手机号码" style="width: 200px;margin-right: 10px;" v-model.tirm="tel"></Input>
      <Button type="primary" @click="handleSubmit">搜索</Button>
      </Col>
    </Row>
    <div class="mb10 vm-textRight">
      <Button type="primary" @click="exportData">导出</Button>
    </div>
    <Table :columns="columns" :data="data" :loading="loading" v-if="feedbackType===1"></Table>
    <Table :columns="columns1" :data="data" :loading="loading" v-if="feedbackType===2"></Table>
    <Table :columns="columns2" :data="data" :loading="loading" v-if="feedbackType===3"></Table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        feedbackType: 1,
        tel: '',
        starTime: '',
        endTime: '',
        loading: false,
        feedbackTypeList: [
          {
            value: 1,
            label: '用户端'
          },
          {
            value: 2,
            label: '商户端'
          },
          {
            value: 3,
            label: '配送端'
          }
        ],
        columns: [
          {
            title: '反馈时间',
            align: 'center',
            key: ''
          },
          {
            title: '用户ID',
            align: 'center',
            key: ''
          },
          {
            title: '用户昵称',
            align: 'center',
            key: ''
          },
          {
            title: '用户手机',
            align: 'center',
            key: ''
          },
          {
            title: '反馈信息',
            align: 'center',
            key: ''
          },
          {
            title: '反馈图片',
            align: 'center',
            key: ''
          }
        ],
        columns1: [
          {
            title: '反馈时间',
            align: 'center',
            key: ''
          },
          {
            title: '商户ID',
            align: 'center',
            key: ''
          },
          {
            title: '商户姓名',
            align: 'center',
            key: ''
          },
          {
            title: '商户手机',
            align: 'center',
            key: ''
          },
          {
            title: '反馈信息',
            align: 'center',
            key: ''
          },
          {
            title: '反馈图片',
            align: 'center',
            key: ''
          }
        ],
        columns2: [
          {
            title: '反馈时间',
            align: 'center',
            key: ''
          },
          {
            title: '骑士ID',
            align: 'center',
            key: ''
          },
          {
            title: '骑士姓名',
            align: 'center',
            key: ''
          },
          {
            title: '骑士手机',
            align: 'center',
            key: ''
          },
          {
            title: '反馈信息',
            align: 'center',
            key: ''
          },
          {
            title: '反馈图片',
            align: 'center',
            key: ''
          }
        ],
        data: []
      }
    },
    methods: {
      selectDate(value) {
        this.startTime = value[0]
        this.endTime = value[1]
      },
      selectFeedbackType(type) {
        this.feedbackType = type
      },
      handleSubmit() {
      },
      exportData() {
      }
    }
  }
</script>
