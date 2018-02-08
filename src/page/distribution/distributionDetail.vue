/*
 * @Author: WuFengliang 
 * @Date: 2018-02-08 09:25:12 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  分销用户管理详情
 */

 <template>
   <div>
     <div class="user-info">
       <div class="single">
         <div class="left">
           <p>用户ID:&nbsp;&nbsp;<span>{{perseonData.userId}}</span></p>
         </div>
         <div class="right">
           <p>用户手机号码:&nbsp;&nbsp;<span>{{perseonData.phoneNo}}</span></p>
         </div>
       </div>
       <div class="single">
         <div class="left">
           <label>菜一代:&nbsp;&nbsp;<span>{{perseonData.levelOneCount}}</span></label>
           <label style="margin-left:40px;">菜一代收益:&nbsp;&nbsp;<span>{{perseonData.levelOneCash}}</span>（现金）<span>{{perseonData.levelOneCoins}}</span>（菜城币）</label>
         </div>
         <div class="right">
           <label>菜一代:&nbsp;&nbsp;<span>{{perseonData.levelTwoCount}}</span></label>
           <label style="margin-left:40px;">菜一代收益:&nbsp;&nbsp;<span>{{perseonData.levelTwoCash}}</span>（现金）<span>{{perseonData.levelTwoCoins}}</span>（菜城币）</label>
         </div>
       </div>
       <div class="single">
         <p>总收益:&nbsp;&nbsp;<span>{{perseonData.totalCash}}</span>（现金）<span>{{perseonData.totalCoins}}</span>（菜城币）</p>
       </div>
     </div>
     <Tabs v-model="tabIndex" @on-click="showTabIndex">
        <TabPane label="账户流水"></TabPane>
        <TabPane label="菜一代"></TabPane>
        <TabPane label="菜二代"></TabPane>
      </Tabs>
      <Table border stripe v-if="distributionData" :columns="columns" :data="distributionData.records"></Table>
      <Page :total="distributionData.total" :page-size="params.pageSize" :current="params.pageNo" :styles="{margin:'20px auto',float:'right'}" show-total @on-change="loadNext"></Page>
   </div>
 </template>
 <script>
import * as http from 'api/common'
export default {
  name: 'distributionDetail',
  components: {},
  props: {},
  data() {
    return {
      columns: [
        {
          title: '用户ID',
          key: 'userId',
          align: 'center'
        },
        {
          title: '用户昵称',
          key: 'nickName',
          align: 'center'
        },
        {
          title: '用户手机',
          key: 'phoneNo',
          align: 'center'
        },
        {
          title: '收益到账时间',
          key: 'arrivtedAt',
          align: 'center'
        },
        {
          title: '获取收益（菜城币）',
          key: 'coins',
          align: 'center'
        },
        {
          title: '获取收益（现金）',
          key: 'income',
          align: 'center'
        }
      ],
      tabIndex: 0, //  tab索引
      distributionData: null,
      id: null,
      perseonData: null,
      params: {
        level: '',
        pageSize: 20,
        pageNo: 1
      }
    }
  },
  created() {
    this.getUserId()
    this.getData()
    this.getLookUserCoin()
  },
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    //  获取用户ID
    getUserId() {
      if (!this.id) {
        this.id = this.$route.query.id
      }
    },
    //  获取数据
    getData() {
      http.getUserEarnings({ id: this.id }).then(response => {
        this.perseonData = response
      })
    },
    //  查看账户流水/查看分销用户下级收益信息
    getLookUserCoin() {
      this.params.level = this.tabIndex
      http.getLookUserCoin(this.id, this.params).then(response => {
        this.distributionData = response
      })
    },
    //  加载下一页
    loadNext(pageNo) {
      this.params.pageNo = pageNo
      this.getLookUserCoin()
    },
    //  tab点击
    showTabIndex(index) {
      this.tabIndex = index
      this.getLookUserCoin()
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
 <style lang="css" scoped>
.user-info {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  height: auto;
  overflow: hidden;
  margin-bottom: 30px;
  border: 1px solid #ccc;
}

.single {
  width: 100%;
  line-height: 3;
}

.single > div {
  width: 50%;
  float: left;
}
</style>
