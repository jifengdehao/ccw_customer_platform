import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home/home'
import Layout from 'components/layout/layout'
import Login from 'page/login/login'
import Order from 'page/order/order'
import Custom from 'page/custom/custom'
import Activity from 'page/activity/activity'
// 首页banner图管理 查看历史更新子页面
import ViewHistoryUpdate from 'page/activity/viewHistoryUpdate'
// 优惠券管理 查看进行中优惠券
import viewOngoingCoupons from 'page/activity/viewOngoingCoupons'
// 优惠券管理 进行中添加优惠券
import addCoupons from 'page/activity/addCoupons'
// 优惠券管理 待生效查看编辑
import pendingOpreation from 'page/activity/pendingOpreation'
import Data from 'page/data/data'
import Distribution from 'page/distribution/distribution'
import Users from 'page/users/users'
import Seller from 'page/seller/seller'
import OrderFeedback from 'page/order/feedback'
import OrderFeedbackInfo from 'page/order/feedbackdetails'
import OrderManage from 'page/order/manage'
import OrderAbnormal from 'page/order/abnormal'
import OrderEvaluate from 'page/order/evaluate'
import SystemMessagePush from 'page/custom/systemmessagepush'
import AccountDetail from 'page/custrom/accountdetail'
import ActivityMessagePush from 'page/custom/activitymessagepush'
import DailyMenuPush from 'page/custom/dailymenupush'
import AppNoticePush from 'page/custom/appnoticepush'
import BannerManage from 'page/custom/bannermanage'
import MarketPush from 'page/custom/marketpush'
import StartPriceSee from 'page/custom/startpricesee'
import EvaluationTagManage from 'page/custom/evaluationtagmanage'
import AccountManage from 'page/custom/accountmanage'
import SellerSettledManage from 'page/seller/sellersettledmanage'
import SellerVideoManage from 'page/seller/sellervideomanage'
import SellerAccountManage from 'page/seller/selleraccountmanage'
import SellerObservantManage from 'page/seller/sellerobservantmanage'
import BdManage from 'page/seller/bdmanage'
import FoodTemplateManage from 'page/seller/foodtemplatemanage'
import SellerMessagePush from 'page/seller/sellermessagepush'
import SellerMessageRemind from 'page/seller/sellermessageremind'
import IndexBannerManage from 'page/activity/indexbannermanage'
import CouponManagement from 'page/activity/couponmanagement'
import DataIndex from 'page/data/index'
import DistributionPeopleData from 'page/distribution/distributionpeopledata'
import DistributionPeopleManage from 'page/distribution/distributionpeoplemanage'
import UsersManage from 'page/users/usersmanage'
import UsersJurisdiction from 'page/users/usersjurisdiction'
import UsersLog from 'page/users/userslog'
import OrderSw from 'page/order/sw'
import ChangPwd from 'page/users/changepwd'
import OrderEvaluateInfo from 'page/order/evaldetails'
import NotFound from 'page/404'
import OrderInfo from 'page/order/orderinfo'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
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
            { path: 'manage', component: OrderManage },
            { path: 'abnormal', component: OrderAbnormal },
            { path: 'evaluate', component: OrderEvaluate },
            { path: 'evaluateInfo/:id?', component: OrderEvaluateInfo },
            { path: 'feedback', component: OrderFeedback },
            { path: 'feedbackInfo/:id?', component: OrderFeedbackInfo },
            { path: 'sw', component: OrderSw },
            { path: 'orderInfo/:id?', component: OrderInfo }
          ]
        },
        {
          path: '/custom',
          name: 'custom',
          component: Custom,
          redirect: '/custom/account_manage',
          children: [
            { path: 'account_manage', component: AccountManage },
            { path: 'account_detail/:id', component: AccountDetail },
            { path: 'system_message_push', component: SystemMessagePush },
            { path: 'activity_message_push', component: ActivityMessagePush },
            { path: 'daily_menu_push', component: DailyMenuPush },
            { path: 'app_notice_push', component: AppNoticePush },
            { path: 'banner_manage', component: BannerManage },
            { path: 'market_push', component: MarketPush },
            { path: 'start_price_see', component: StartPriceSee },
            { path: 'evaluation_tag_manage', component: EvaluationTagManage }
          ]
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          redirect: '/users/users_manage',
          children: [
            { path: 'users_manage', component: UsersManage },
            { path: 'users_jurisdiction', component: UsersJurisdiction },
            { path: 'users_log', component: UsersLog },
            { path: 'change_pwd', component: ChangPwd }
          ]
        },
        {
          path: '/activity',
          name: 'activity',
          component: Activity,
          redirect: '/activity/index_banner_manage',
          children: [
            { path: 'index_banner_manage', component: IndexBannerManage },
            { path: 'coupon_management', component: CouponManagement },
            { path: 'viewUpdate', component: ViewHistoryUpdate },
            { path: 'vieOngoingInfo', component: viewOngoingCoupons },
            { path: 'addCoupons', component: addCoupons },
            { path: 'pendingDetali', component: pendingOpreation }
          ]
        },
        {
          path: '/data',
          name: 'data',
          component: Data,
          redirect: '/data/index',
          children: [
            { path: 'index', component: DataIndex }
          ]
        },
        {
          path: '/distribution',
          name: 'distribution',
          component: Distribution,
          redirect: '/distribution/distribution_people_data',
          children: [
            { path: 'distribution_people_data', component: DistributionPeopleData },
            { path: 'distribution_people_manage', component: DistributionPeopleManage }
          ]
        },
        {
          path: '/seller',
          name: 'seller',
          component: Seller,
          redirect: '/seller/seller_settled_manage',
          children: [
            { path: 'seller_settled_manage', component: SellerSettledManage },
            { path: 'seller_video_manage', component: SellerVideoManage },
            { path: 'seller_account_manage', component: SellerAccountManage },
            { path: 'seller_observant_manage', component: SellerObservantManage },
            { path: 'bd_manage', component: BdManage },
            { path: 'food_template_manage', component: FoodTemplateManage },
            { path: 'seller_message_push', component: SellerMessagePush },
            { path: 'seller_message_remind', component: SellerMessageRemind }
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
})
