/*
 * @Author: ZengFanlu 
 * @Date: 2017-10-14 9:17:45 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 分销内容管理 查看分销 
 */

<template>
  <div>
    <div class="userInfo">
      <div class="userLeft">
        <p>
          <span>用户ID：</span>
          <span>10086</span>
        </p>
        <p>
          <div class="onePrict">
            <span>菜一代：</span>
            <span>20</span>
          </div>
          <div>
            <span>菜二代收益：</span>
            <span>1000（菜城币）</span>
          </div>
        </p>
        <p>
          <span>总收益：</span>
          <span>1600（菜城币）</span>
        </p>
      </div>
      <div class="userRight">
        <p>
          <span>手机号码：</span>
          <span>13113277667</span>
        </p>
        <p>
          <div class="twoPrict">
            <span>菜一代：</span>
            <span>20</span>
          </div>
          <div>
            <span>菜二代收益：</span>
            <span>1000（菜城币）</span>
          </div>
        </p>
        <Button type="primary">冻结</Button>
      </div>
    </div>
    <DatePicker type="date" placeholder="选择日期" style="width: 200px; margin-bottom: 20px; position: absolute; top: 224px; right: 38px; z-index: 999;"></DatePicker>
    <Tabs value="integral">
      <TabPane label="积分流水" name="integral">
         <Table stripe :columns="columns1" :data="data1"></Table>
      </TabPane>
      <TabPane label="菜一代" name="oneProfit">
        <Table stripe :columns="columns2" :data="data2"></Table>
      </TabPane>
      <TabPane label="菜二代" name="twoProfit">
        <Table stripe :columns="columns2" :data="data2"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      columns1: [ // 积分流水title
        {
          title: '时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '登录IP',
          key: 'login',
          align: 'center'
        },
        {
          title: '获取方式',
          key: 'mode',
          align: 'center'
        },
        {
          title: '获得积分',
          key: 'integral',
          align: 'center'
        }
      ],
      data1: [ // 积分流水数据
        {
          time: '2017/10/16 12:11',
          login: '192.168.1.102',
          mode: '用户10086产生消费获得',
          integral: '+20'
        }
      ],
      columns2: [ // 菜一代title
        {
          title: '用户ID',
          key: 'userId',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'phoneNum',
          align: 'center'
        },
        {
          title: '用户名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '最近下单时间',
          key: 'lastTime',
          align: 'center'
        },
        {
          title: '共产生积分',
          key: 'commonIntegral',
          align: 'center'
        }
      ],
      data2: [ // 菜一代数据
        {
          userId: '10086',
          phoneNum: '13189050531',
          userName: '小菜',
          lastTime: '2017/10/2',
          commonIntegral: '100'
        }
      ]
    }
  }
  // created: {},
  // mounted: {},
  // methods: {}
}
</script>
<style lang="css" scoped>
.userInfo {
  width: 100%;
  height: 140px;
  padding: 20px;
  margin-bottom: 40px;
  border: 1px solid #000000;
}

.userInfo .userLeft {
  float: left;
  width: 835px;
  padding-left: 180px;
}

.userInfo .userLeft p {
  margin-bottom: 12px;
}

.userInfo .userLeft .onePrict {
  float: left;
  margin-right: 40px;
}

.userInfo .userRight {
  float: right;
  width: 700px;
}

.userInfo .userRight p {
  float: right;
  width: 700px;
  margin-bottom: 12px;
}

.userInfo .userRight .twoPrict {
  float: left;
  margin-right: 40px;
}

.userInfo .userRight button {
  margin-left: 205px;
}
</style>