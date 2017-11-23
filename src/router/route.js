/**
 * 2017/10/17
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 路由的懒加载
 */

// 主体
const Layout = resolve => {
  import('components/layout/layout').then(module => {
    resolve(module)
  })
}
// 首页
const Home = resolve => {
  import('page/home/home').then(module => {
    resolve(module)
  })
}
// 订单管理
const Order = resolve => {
  import('page/order/order').then(module => {
    resolve(module)
  })
}
// 用户端管理
const Custom = resolve => {
  import('page/custom/custom').then(module => {
    resolve(module)
  })
}
// 活动管理
const Activity = resolve => {
  import('page/activity/activity').then(module => {
    resolve(module)
  })
}
// 数据中心
const Data = resolve => {
  import('page/data/data').then(module => {
    resolve(module)
  })
}
// 用户平台管理
const Users = resolve => {
  import('page/users/users').then(module => {
    resolve(module)
  })
}
// 商家端管理
const Seller = resolve => {
  import('page/seller/seller').then(module => {
    resolve(module)
  })
}
// 分销管理
const Distribution = resolve => {
  import('page/distribution/distribution').then(module => {
    resolve(module)
  })
}
// 404
const NotFound = resolve => {
  import('page/404').then(module => {
    resolve(module)
  })
}
// 登录
const Login = resolve => {
  import('page/login/login').then(module => {
    resolve(module)
  })
}
// 订单管理
const OrderManage = resolve => {
  import('page/order/manage').then(module => {
    resolve(module)
  })
}

// 异常订单
const OrderAbnormal = resolve => {
  import('page/order/abnormal').then(module => {
    resolve(module)
  })
}

// 评价管理
const OrderEvaluate = resolve => {
  import('page/order/evaluate').then(module => {
    resolve(module)
  })
}
// 评价详情
const OrderEvaluateDeliver = resolve => {
  import('page/order/evalDeliverDetails').then(module => {
    resolve(module)
  })
}
// 评价详情
const OrderEvaluateSeller = resolve => {
  import('page/order/evalSellerDetails').then(module => {
    resolve(module)
  })
}
// 反馈管理
const OrderFeedback = resolve => {
  import('page/order/feedback').then(module => {
    resolve(module)
  })
}
// 反馈详情
const OrderFeedbackInfo = resolve => {
  import('page/order/feedbackdetails').then(module => {
    resolve(module)
  })
}
// 屏蔽词管理
const OrderSw = resolve => {
  import('page/order/sw').then(module => {
    resolve(module)
  })
}
// 订单详情
const OrderInfo = resolve => {
  import('page/order/orderinfo').then(module => {
    resolve(module)
  })
}
// 用户账号管理
const AccountManage = resolve => {
  import('page/custom/accountmanage').then(module => {
    resolve(module)
  })
}
// 账号详情
const AccountDetail = resolve => {
  import('page/custom/accountdetail').then(module => {
    resolve(module)
  })
}
// 系统消息推送
const SystemMessagePush = resolve => {
  import('page/custom/systemmessagepush').then(module => {
    resolve(module)
  })
}
// banner图管理/市场推送管理
const BannerManage = resolve => {
  import('page/custom/bannermanage').then(module => {
    resolve(module)
  })
}
// 起送价查看
const StartPriceSee = resolve => {
  import('page/custom/startpricesee').then(module => {
    resolve(module)
  })
}
// 评价标签管理
const EvaluationTagManage = resolve => {
  import('page/custom/evaluationtagmanage').then(module => {
    resolve(module)
  })
}
//  账户余额
const AccountBalance = resolve => {
  import('page/custom/accountBalance').then(module => {
    resolve(module)
  })
}
//  用户余额/积分详情
const AccountMoneyDetail = resolve => {
  import('page/custom/accountShowMoney').then(module => {
    resolve(module)
  })
}
//  用户余额编辑
const AccountEditMoney = resolve => {
  import('page/custom/accountEditMoney').then(module => {
    resolve(module)
  })
}
// 平台用户管理
const UsersManage = resolve => {
  import('page/users/usersmanage').then(module => {
    resolve(module)
  })
}
// 权限管理
const UsersJurisdiction = resolve => {
  import('page/users/usersjurisdiction').then(module => {
    resolve(module)
  })
}
// 操作日志
const UsersLog = resolve => {
  import('page/users/userslog').then(module => {
    resolve(module)
  })
}

// 首页banner图管理
const IndexBannerManage = resolve => {
  import('page/activity/indexbannermanage').then(module => {
    resolve(module)
  })
}
// 优惠卷管理
const CouponManagement = resolve => {
  import('page/activity/couponmanagement').then(module => {
    resolve(module)
  })
}

// 优惠券管理 查看进行中优惠券
const viewOngoingCoupons = resolve => {
  import('page/activity/viewOngoingCoupons').then(module => {
    resolve(module)
  })
}
// 优惠券管理 进行中添加优惠券
const addCoupons = resolve => {
  import('page/activity/addCoupons').then(module => {
    resolve(module)
  })
}
// 优惠券管理 待生效查看编辑
const pendingOpreation = resolve => {
  import('page/activity/pendingOpreation').then(module => {
    resolve(module)
  })
}
// 数据中心
const DataIndex = resolve => {
  import('page/data/index').then(module => {
    resolve(module)
  })
}
// 分销用户数据
const DistributionPeopleData = resolve => {
  import('page/distribution/distributionpeopledata').then(module => {
    resolve(module)
  })
}
// 分销用户管理
const DistributionPeopleManage = resolve => {
  import('page/distribution/distributionpeoplemanage').then(module => {
    resolve(module)
  })
}
// 商户入驻材料审核
const SellerSettledManage = resolve => {
  import('page/seller/sellersettledmanage').then(module => {
    resolve(module)
  })
}
// 商户视频图片审核
const SellerVideoManage = resolve => {
  import('page/seller/sellervideomanage').then(module => {
    resolve(module)
  })
}
// 商户账号管理
const SellerAccountManage = resolve => {
  import('page/seller/selleraccountmanage').then(module => {
    resolve(module)
  })
}
// 商户守约管理
const SellerObservantManage = resolve => {
  import('page/seller/sellerobservantmanage').then(module => {
    resolve(module)
  })
}

// BD及邀请码管理
const BdManage = resolve => {
  import('page/seller/bdmanage').then(module => {
    resolve(module)
  })
}
// 商品模版库管理
const FoodTemplateManage = resolve => {
  import('page/seller/foodtemplatemanage').then(module => {
    resolve(module)
  })
}
// 商家消息推送
const SellerMessagePush = resolve => {
  import('page/seller/sellermessagepush').then(module => {
    resolve(module)
  })
}
// 商家消息提醒
const SellerMessageRemind = resolve => {
  import('page/seller/sellermessageremind').then(module => {
    resolve(module)
  })
}

// 个人中心
const User = resolve => {
  import('page/users/user').then(module => {
    resolve(module)
  })
}

// 查看个人权限列表
const userList = resolve => {
  import('page/users/seeUserlist').then(module => {
    resolve(module)
  })
}
// app管理
const App = resolve => {
  import('page/app/app').then(module => {
    resolve(module)
  })
}
// app更新管理
const AppIndex = resolve => {
  import('page/app/index').then(module => {
    resolve(module)
  })
}
// 查看app更新详情
const AppIndexDetails = resolve => {
  import('page/app/indexDetails').then(module => {
    resolve(module)
  })
}
// 新增app更新
const AddAppUpdate = resolve => {
  import('page/app/addAppUpdate').then(module => {
    resolve(module)
  })
}

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/order',
        name: 'order',
        component: Order,
        redirect: '/order/manage',
        children: [
          {path: 'manage', component: OrderManage},
          {path: 'abnormal', component: OrderAbnormal},
          {path: 'evaluate', component: OrderEvaluate},
          {path: 'evaluateInfoDeliver/:id', component: OrderEvaluateDeliver},
          {path: 'evaluateInfoSeller/:id', component: OrderEvaluateSeller},
          {path: 'feedback', component: OrderFeedback},
          {path: 'feedbackInfo/:id', component: OrderFeedbackInfo},
          {path: 'sw', component: OrderSw},
          {path: 'orderInfo/:id', component: OrderInfo}
        ]
      },
      {
        path: '/custom',
        name: 'custom',
        component: Custom,
        redirect: '/custom/account_manage',
        children: [
          {path: 'account_manage', component: AccountManage},
          {path: 'account_detail/:id', component: AccountDetail},
          {path: 'system_message_push', component: SystemMessagePush},
          {path: 'activity_message_push', component: SystemMessagePush},
          {path: 'daily_menu_push', component: SystemMessagePush},
          {path: 'app_notice_push', component: SystemMessagePush},
          {path: 'banner_manage', component: BannerManage},
          {path: 'market_push', component: BannerManage},
          {path: 'start_price_see', component: StartPriceSee},
          {path: 'evaluation_tag_manage', component: EvaluationTagManage},
          {path: 'account_balance', component: AccountBalance},
          {
            path: 'account_balance/detail',
            name: 'balance_detail',
            component: AccountMoneyDetail
          },
          {path: 'account_balance/edit/:custId', component: AccountEditMoney}
        ]
      },
      {
        path: '/users',
        name: 'users',
        component: Users,
        redirect: '/users/users_manage',
        children: [
          {path: 'users_manage', component: UsersManage},
          {path: 'users_jurisdiction', component: UsersJurisdiction},
          {path: 'users_log', component: UsersLog},
          {path: 'user/:id', component: User},
          {path: 'seeUserlist', component: userList}
        ]
      },
      {
        path: '/activity',
        name: 'activity',
        component: Activity,
        redirect: '/activity/index_banner_manage',
        children: [
          {path: 'index_banner_manage', component: IndexBannerManage},
          {path: 'coupon_management', component: CouponManagement},
          {path: 'vieOngoingInfo', component: viewOngoingCoupons},
          {path: 'addCoupons', component: addCoupons},
          {path: 'pendingDetali', component: pendingOpreation}
        ]
      },
      {
        path: '/data',
        name: 'data',
        component: Data,
        redirect: '/data/index',
        children: [{path: 'index', component: DataIndex}]
      },
      {
        path: '/distribution',
        name: 'distribution',
        component: Distribution,
        redirect: '/distribution/distribution_people_data',
        children: [
          {
            path: 'distribution_people_data',
            component: DistributionPeopleData
          },
          {
            path: 'distribution_people_manage',
            component: DistributionPeopleManage
          }
        ]
      },
      {
        path: '/seller',
        name: 'seller',
        component: Seller,
        redirect: '/seller/seller_settled_manage',
        children: [
          {path: 'seller_settled_manage', component: SellerSettledManage},
          {path: 'seller_video_manage', component: SellerVideoManage},
          {path: 'seller_account_manage', component: SellerAccountManage},
          {path: 'seller_observant_manage', component: SellerObservantManage},
          {path: 'bd_manage', component: BdManage},
          {path: 'food_template_manage', component: FoodTemplateManage},
          {path: 'seller_message_push', component: SellerMessagePush},
          {path: 'seller_message_remind', component: SellerMessageRemind}
        ]
      },
      {
        path: '/app',
        name: 'app',
        component: App,
        redirect: '/app/index',
        children: [
          {path: 'index', component: AppIndex},
          {path: 'index/:id', component: AppIndexDetails},
          {path: 'addAppUpdate', component: AddAppUpdate}
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    components: {
      blank: Login
    }
  },
  {
    path: '*',
    component: NotFound
  }
]
