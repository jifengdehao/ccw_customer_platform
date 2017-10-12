<template>
  <div class="order-sw">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <Form-item class="vm-textRight">
        生效时间设置&nbsp;&nbsp;
        <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.dateTime"
                    placement="bottom-end"></DatePicker>
      </Form-item>
      <FormItem prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 20,maxRows: 30}"
               placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        formValidate: {
          desc: '',
          dateTime: new Date()
        },
        ruleValidate: {
          desc: [
            {required: true, message: '请输入屏蔽词', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      // 获取默认数据库里的屏蔽词
      this.formValidate.desc = '最高 最低价 0元购 天猫 最佳 奢侈 文化大革命   极致 出厂价 零元购 京东 最先进 金牌 蛮夷     国家级 批发价 全场通用 淘宝 最大 名牌 日本鬼子   世界级 极品价 零利 当当 最强 最赚 战斗民族   顶级 一降到底 倾销 聚美优品 最极致 超赚 印度阿三   国家领导人  特价  最终解释权 1号店 最棒 之王 佛祖   国家主席 惊爆价 亏本 聚划算 最新 之最 上帝   习大大 清仓 击破一折 阿里巴巴 最低 填补国内空白 真主   周总理 跳楼价 击破二折 taobao 最长 著名品牌 绿茶婊   周恩来 跳水价 击破三折 TMALL 最宽 质量免检 权势狗   毛泽东  神价  击破四折  tianmao  最窄  质量无须检测 最薄     毛主席 一省到底 击破五折 Alibaba 最坚固 国家领导人推荐 最美     第一 底价 击破六折 alibaba 最小巧 国家机关推荐 顶尖     最新科学 极品价 击破七折 dangdang 最灵敏 国家机关专供 巅峰     最新技术 全场低至 击破1折 亚马逊 最完美 国家机关特供 极品     最先进加工工艺 价格最低 击破2折 amazon 最高级 屌炸天 百分百   一流 最实惠 击破3折 Amazon 绝佳 屌丝 国宝级   最小  最优惠  击破4折  jd  极佳  撕逼  宇宙级 、大牌、精确、超赚、领导品牌、领先上市、巨星、著名、奢侈、世界 全国X大品牌之一等无法考证的词语。  4、严禁使用100%、国际品质、高档、正品、国家级、世界级、最高级最佳等虚假或无法判断真伪的夸张性表述词语。  违禁时限用语  限时须有具体时限，所有团购须标明具体活动日期，严禁使用随时结束、仅此一次、随时涨价、马上降价、最后一波等无法确定时限的词语。  违禁权威性词语 1、严禁使用国家XXX领导人推荐、国家XX机关推荐、国家XX机关专供、特供等借国家、国家机关工作人员名称进行宣传的用语、  2、严禁使用质量免检、无需国家质量检测、免抽检等宣称质量无需检测的用语  3、严禁使用人民币图样（央行批准的除外）  4、严禁使用老字号、中国驰名商标、特供、专供等词语（唯品会专供除外）。  严禁使用点击XX词语  严禁使用疑似欺骗消费者的词语，例如“恭喜获奖”“全民免单”“点击有惊喜”“点击获取”“点击试穿”“领取奖品”“非转基因更安全”等文案元素。  严禁使用刺激消费词语  严禁使用激发消费者抢购心理词语，如“秒杀”“抢爆”“再不抢就没了”“不会再便宜了”“错过就没机会了”“万人疯抢”“抢疯了”等词语。    医疗用语（普通商品，不含特殊用途化妆品、保健食品、医疗器械）  1、全面调整人体内分泌平衡；增强或提高免疫力；助眠；失眠；滋阴补阳；壮阳；  2、消炎；可促进新陈代谢；减少红血丝；产生优化细胞结构；修复受损肌肤；治愈（治愈系除外）；抗炎；活血；解毒；抗敏；脱敏；  3、减肥；清热解毒；清热袪湿；治疗；除菌；杀菌；抗菌；灭菌；防菌；消毒；排毒 4、防敏；柔敏；舒敏；缓敏；脱敏；褪敏；改善敏感肌肤；改善过敏现象；降低肌肤敏感度；  5、镇定；镇静；理气；行气；活血；生肌肉；补血；安神；养脑；益气；通脉； 6、胃胀蠕动；利尿；驱寒解毒；调节内分泌；延缓更年期；补肾；祛风；生发； 7、防癌；抗癌；  8、祛疤；降血压；防治高血压；治疗；  9、改善内分泌；平衡荷尔蒙；防止卵巢及子宫的功能紊乱；去除体内毒素；吸附铅汞； 10、除湿；润燥；治疗腋臭；治疗体臭；治疗阴臭；  11、美容治疗；消除斑点；斑立净；无斑；治疗斑秃；逐层减退多种色斑；妊娠纹；'
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 发送数据
            console.log(this.formValidate)
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('提交失败!')
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
