/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api模块的封装
 */
import * as ax from './instrance'
// 用户登录
export const Login = params => {
  return ax.p('/user/login', params)
}
// 上传地址
export const uploadUrl = ax.uploadUrl

// 单个用户列表用户详细数据
export const getUserList = params => {
  return ax.g('/user/search', params)
}

/** 订单管理 start **/

/**
 * 获取反馈列表
 * @param params =>{mobileno,pageSize,pageNo,types}
 */
export const getFeedBackList = (params, pageNo) => {
  return ax.g(`/order/feedback/list/${pageNo}`, params)
}

/**
 * 获取反馈详情
 * @param params =>ptFeedbackId
 */
export const getFeedBackInfo = params => {
  return ax.g(`/order/feedback/${params}`)
}

/**
 * 获取订单列表
 * @param params =>{status,mobileno,pageSize,pageNo}
 */
export const getOrderList = (params, pageNo) => {
  return ax.g(`/order/list/${pageNo}`, params)
}

/**
 * 导出订单列表
 * @param params
 */
export const exportOrderList = params => {
  return ax.g('/order/export', params)
}

/**
 * 获取订单详情
 * @param params => orderId
 */
export const getOrderInfo = params => {
  return ax.g(`/order/${params}`)
}

export const putRefundOrder = params => {
  return ax.u(`/order/order/refund/${params}`)
}

/**
 *  获取订单的子订单列表
 * @param params => orderId
 */

export const getSeedOrderData = params => {
  return ax.g(`/order/seed/${params}`)
}

/**
 * 编辑订单
 * @param params ={orderId}
 */

export const putOrderInfo = params => {
  return ax.u('/order', params)
}

/**
 * 查看屏蔽词
 * @param params =>null
 */
export const getOrderSw = params => {
  return ax.g('/order/remark/hidden', params)
}

/**
 * 更新屏蔽词
 * @param params =>null
 */
export const postOrderSw = params => {
  return ax.p('/order/remark/hidden', params)
}

/**
 * 获取商品评价列表
 * @type params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderGoodListEval = params => {
  return ax.g('/order/remark/item', params)
}

/**
 * 获取商家评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderSellerListEval = (params, pageNo) => {
  return ax.g(`/order/remark/shop/list/${pageNo}`, params)
}

/**
 * 获取配送员的评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderDeliverListeEval = (params, pageNo) => {
  return ax.g(`/order/remark/deliver/list/${pageNo}`, params)
}

/**
 * 获取差评评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderBadListEval = (params, pageNo) => {
  return ax.g(`/order/remark/bad/list/${pageNo}`, params)
}

/**
 * 隐藏订单评价
 * @param params ={id}
 */
export const patchOrderEval = params => {
  return ax.pa('/order/remark', params)
}

/**
 * 导出评价列表
 * @param params ={startTime,endTime,status}
 */
export const exportOrderEval = params => {
  return ax.g('/order/remark/export', params)
}

/** 订单管理 end **/

/** 商户端管理
 * 胡上军
 * start**/

//  ******************** 商户入驻审核接口 *****************************
// 获取商品图片审核列表
export const getSellerApplyList = (params, pageNo) => {
  return ax.g(`/seller/apply/list/${pageNo}`, params)
}

// 更新商户入驻信息审核状态
export const updateApplyStatus = (params, id) => {
  return ax.pa(`/seller/apply/${id}`, params)
}
//  ******************** 商户视屏图片审核 *****************************
// 获取商品图片审核列表、
export const getProductPic = (params, pageNo) => {
  return ax.g(`seller/pic/product/list/${pageNo}`, params)
}
// 获取档口图片和档口头像审核列表
export const getShopPic = (params, pageNo) => {
  return ax.g(`seller/pic/shop/list/${pageNo}`, params)
}

//  ********************** 商户账号管理 *******************************
// 获取商户账号列表
export const getSellerAccountList = (params, pageNo) => {
  return ax.g(`seller/list/${pageNo}`, params)
}
// 更新商户状态
export const updataShopStatus = params => {
  return ax.pa(`/seller/changeState`, params)
}

//  ********************* BD及邀请码管理 ******************************
// 获取BD用户列表
export const getBDlist = params => {
  return ax.g(`platform/bd`, params)
}
// 添加BD
export const addPlatformBD = params => {
  return ax.p(`platform/bd`, params)
}
// 删除BD
export const delPlatformBD = id => {
  return ax.d(`platform/bd/${id}`)
}
// 修改BD
export const modifyBD = (params, id) => {
  return ax.u(`platform/bd/${id}`, params)
}

//  ********************* 商品模板库管理 ******************************
// 获取分类列表
export const getProductCategory = params => {
  return ax.g(`product/category`, params)
}
// 更新分类信息
export const updateProductCategory = params => {
  return ax.p(`product/category`, params)
}
//  ********************* 商户消息推送 ******************************
// 获取商户端系统消息列表
export const getSysMessage = params => {
  return ax.g(`seller/message/sys`, params)
}
// 新增商户端系统消息
export const addSysMessage = params => {
  return ax.p(`seller/message/sys`, params)
}
// 查看商户端系统消息
export const seeSysMessage = id => {
  return ax.g(`seller/message/sys/${id}`)
}
// 编辑商户端系统消息
export const modifySysMessage = (params, id) => {
  return ax.u(`seller/message/sys/${id}`, params)
}
//  ********************* 商户消息提醒 ******************************
// 获取消息提醒列表
export const getAlertsMessageList = params => {
  return ax.g(`seller/message/alerts`, params)
}
// 更新消息提醒状态
export const updateAlertsMessage = (params, id) => {
  return ax.p(`seller/message/alerts/${id}`, params)
}

/**
 * 活动管理
 * zengFanLu
 * start
 */

// ********************* 首页banner图管理****************************/

// 开始 未开始 已结束列表/activity/banner/list/
export const seeBannerList = (params, id) => {
  return ax.g(`/activity/banner/list/${id}`, params)
}

// 保存未开始自增banner
export const addUpdataBanner = params => {
  return ax.p('/activity/banner', params)
}

// 已开始 结束banner
export const endBanner = Id => {
  return ax.u(`/activity/banner/${Id}`)
}

// 未开始 删除banner
export const deleteBanner = id => {
  return ax.d(`/activity/banner/${id}`)
}

// 查看banner数据
export const seeBanner = id => {
  return ax.g(`/activity/banner/${id}`)
}
/* 用户端相关接口
 * @author by WuFengliang
 */

/**
 * 用户端相关接口
 * @author by WuFengliang
 */

/**
 * 获取用户端所有用户列表
 * @param params =>{status,mobileno,pageSize,pageNo}
 */
export const getUsersList = params => {
  return ax.g(`customer/`, params)
}

/**
 * 获取用户端昨日新增用户量和当前用户量
 */
export const getCustomerCount = params => {
  return ax.g(`customer/customerCount`, params)
}

/**
 * 冻结与恢复账户
 */
export const changeStatus = params => {
  return ax.pa(`customer/changeState`, params)
}

/**
 * 获取用户信息
 */
export const getUserInfoData = params => {
  return ax.g(`customer/${params.custId}`)
}

/**
 * 获取消息列表
 */
export const getMessageList = params => {
  return ax.g(
    `customer/message/list/${params.pageNo}?status=${params.status}&msgType=${params.msgType}&pageSize=${params.pageSize}`
  )
}

/**
 * 新增消息
 */

export const addMessage = params => {
  return ax.p(`/customer/message`, params)
}

/**
 * 编辑消息
 */
export const putMessage = params => {
  return ax.u(`/customer/message`, params)
}

/**
 * 获取用户端配送未覆盖banner图
 */
export const getBannerList = params => {
  return ax.g(`/customer/banner?status=0&types=${params.types}`)
}

/**
 * 获取配送未覆盖市场推送列表
 */
export const getMarketlist = params => {
  return ax.g(`/customer/market`, params)
}

/**
 * 删除banner图
 */
export const delBannerId = params => {
  return ax.d(`/customer/banner/${params.ptBannerId}`)
}

/**
 * 更新banner图
 */
export const putBannerId = params => {
  return ax.u(`/customer/banner`, params)
}

/**
 * banner图保存修改
 */
export const saveBannerData = params => {
  return ax.p(`/customer/banner`, params)
}

/**
 * 删除市场某条数据
 */
export const delMarketId = params => {
  return ax.d(`/customer/market/${params.ptMarketPushId}`)
}

/**
 * 更新市场某条数据
 */
export const putMarketId = params => {
  return ax.u(`/customer/market`, params)
}

/**
 * 市场数据保存修改
 */
export const saveMarketData = params => {
  return ax.p(`/customer/market`, params)
}

/**
 * 获取配送价列表
 */
export const getPirse = params => {
  return ax.g(`/customer/expense`, params)
}

/**
 * 获取标签列表
 */
export const getTagLists = params => {
  return ax.g(`/customer/tag`, params)
}

/**
 * 新增标签列表
 */
export const addTag = params => {
  return ax.p(`/customer/tag`, params)
}

/**
 * 更新标签列表
 */
export const putTag = params => {
  return ax.u(`/customer/tag`, params)
}

/**
 * 删除评价标签
 */
export const delTag = params => {
  return ax.d(`/customer/tag`, params)
}

/**
 * 获取用户账户余额流水
 */
export const getAccountMoney = params => {
  return ax.g(`/customer/account/list/${params.pageNo}`, params)
}

/**
 * 查看用户账户
 */
export const loopAccount = params => {
  return ax.g(`/customer/account/${params.custId}`)
}

/**
 * 获取用户账户余额流水变更记录
 */
export const getAccountMoneyChange = params => {
  return ax.g(
    `/customer/account/detail/${params.custId}/${params.pageNo}`,
    params
  )
}

/**
 * 用户账户退款
 */
export const refundMoney = params => {
  return ax.u(`/customer/account/${params.id}`, params)
}

/**
 * 用户端相关接口
 * @author by WuFengliang
 */

/**
 * 平台用户管理相关接口
 * ZengFanlu
 */
export const getplatformUser = (params, pageNo) => {
  return ax.g(`/platform/user/list/${pageNo}`, params)
}

// 查看平台用户个人信息
export const getplatformUserId = id => {
  return ax.g(`/platform/user/${id}`)
}

// 新增用户
export const getAddUser = params => {
  return ax.p('/platform/user', params)
}

// 冻结。解冻用户
export const getpaltformUserChange = params => {
  return ax.pa('/platform/user/changeState', params)
}
