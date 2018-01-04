/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api模块的封装
 */
import * as ax from './instrance'

/** app 更新模块 author: zhangwenlong start **/

/**
 * 获取平台列表 应用名称 包路径
 * @param params
 */
export const getPlatformData = params => {
  return ax.g('/platform/dict', params)
}

/**
 * 获取app 更新列表
 * @param pageNo
 * @param params
 */
export const getAppListData = (pageNo, params) => {
  return ax.g(`/apps/list/${pageNo}`, params)
}
/**
 * 根据app版本id获取详情
 * @param params
 */
export const getAppDetails = params => {
  return ax.g(`/apps/${params}`)
}
/**
 * 根据app版本id删除
 * @param params
 */
export const deleteApp = params => {
  return ax.d(`/apps/${params}`)
}
/**
 * 根据app版本id 修改
 * @param params
 */
export const putAppDetails = (id, params) => {
  return ax.u(`/apps/${id}`, params)
}
/**
 * 新增app更新
 * @param params
 */
export const addApp = params => {
  return ax.p('/apps', params)
}

/** app 更新模块 end **/

/** 用户登录登出，个人信息，修改密码 首页 author:zhangwenlong start**/

/**
 * 获取首页数据
 * @param params=>null
 */
export const getIndexData = params => {
  return ax.g('/platform/index', params)
}
/**
 * 获取菜单
 * @param params=>null
 */
export const getMemuData = params => {
  return ax.g('/platform/menu/list', params)
}

/**
 * 登录
 * @param params =>{account,password,verificationCode}
 */
export const login = params => {
  return ax.p('/platform/user/login', params)
}
/**
 * 获取验证码
 * @param params
 */
export const getCode = params => {
  return ax.g('/platform/user/login/getCode', params)
}
/**
 * 获取登录用户的详细信息
 * @param params
 */
export const getUserList = params => {
  return ax.g(`/platform/user/${params}`)
}
/**
 * 修改用户信息
 * @param params
 */
export const modifyUserInfo = params => {
  return ax.u('/platform/user', params)
}
/**
 * 退出登录
 * @param params
 */
export const logout = params => {
  return ax.g('/platform/user/logout', params)
}
/**
 * 修改密码
 * @param params
 */
export const modifyPass = params => {
  return ax.u('/platform/user/password', params)
}

/** 用户登录登出，个人信息，修改密码 end**/

/** 订单管理 start **/

/**
 * 导出反馈列表
 * @param params =>{startTime,endTime,types,mobileno}
 */
export const exportFeedback = params => {
  return ax.g('/order/feedback/poi', params)
}

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
  return ax.g('/order/export/poi', params)
}

/**
 * 获取订单详情
 * @param params => {orderId}
 */
export const getOrderInfo = params => {
  return ax.g(`/order/${params}`)
}
/**
 * 子订单退款
 * @param params => {coOrderDetailId}
 */

export const putRefundOrder = params => {
  return ax.u(`/order/order/refund/${params}`)
}
/**
 * 订单全部退款
 * @param params =>{orderId}
 */
export const putRefundOrderAll = params => {
  return ax.u(`/order/order/refund/all/${params}`)
}

/**
 *  获取订单的子订单列表
 * @param params => {orderId}
 */

export const getSeedOrderData = params => {
  return ax.g(`/order/seed/${params}`)
}

/**
 * 查看屏蔽词
 * @param params
 */
export const getOrderSw = params => {
  return ax.g('/order/remark/hidden', params)
}

/**
 * 更新屏蔽词
 * @param params
 */
export const postOrderSw = params => {
  return ax.u('/order/remark/hidden', params)
}
/**
 * 导出评价列表
 * @param params =>{startTime,endTime,mobileno,types}
 */
export const exportEval = params => {
  return ax.g('/order/remark/shop/poi', params)
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
 * 获取商家评价详情
 * @param params=>{rkShopId}
 */
export const getOrderSellerDetails = params => {
  return ax.g(`/order/remark/shop/${params}`)
}

/**
 * 隐藏商家评价
 * @param params =>{rkShopId}
 */
export const putOrderSellerEval = params => {
  return ax.u(`/order/remarkShop/${params}`)
}
/**
 * 获取配送员的评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderDeliverListeEval = (params, pageNo) => {
  return ax.g(`/order/remark/deliver/list/${pageNo}`, params)
}
/**
 * 隐藏配送员评价
 * @param params=>{rkDeliverId}
 */
export const putOrderDeliverEval = params => {
  return ax.u(`/order/remarkDeliver/${params}`)
}
/**
 * 获取配送员评价详情
 * @param params =>{rkDeliverId}
 */
export const getOrderDeliverEvalDetails = params => {
  return ax.g(`/order/remark/deliver/${params}`)
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

/** 订单管理 end **/

/** 商户端管理
 * 胡上军
 * start**/

// 获取Oss密码
// export const getOssInfo = () => {
//   return ax.g(`http://192.168.0.112:8080/stsToken/ccWeb`)
// }

//  ******************** 商户入驻审核接口 *****************************
// 获取商品图片审核列表
export const getSellerApplyList = (params, pageNo) => {
  return ax.g(`/seller/apply/list/${pageNo}`, params)
}

// 更新商户入驻信息审核状态
export const updateApplyStatus = (params, id) => {
  return ax.g(`/seller/apply/${id}`, params)
}
// 获取图片资质证件
export const getQulification = shopId => {
  return ax.g(`/seller/qulification/${shopId}`)
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
// 商品图片审核
export const auditProductPicStatus = params => {
  return ax.g(`seller/pic/product/audit`, params)
}
// 审核店铺图片
export const auditShopPicStatus = params => {
  return ax.g(`seller/pic/shop/audit`, params)
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
// 获取商家信息详情
export const getsellerInfo = (params, sellerId) => {
  return ax.g(`seller/${sellerId}`, params)
}
// 更新商家信息
export const modifysellerInfo = (params, sellerId) => {
  return ax.u(`seller/${sellerId}`, params)
}
// 重置密码
export const resetPassword = params => {
  return ax.g(`seller/resetPassword`, params)
}
// // 获取店铺纸质证件图片
// export const getQulification = () => {
//   return ax.g(`seller/qulification/${sellerApplyId}`)
// }
//  ********************* BD及邀请码管理 ******************************
// 获取BD用户列表
export const getBDlist = (params, pageNo) => {
  return ax.g(`/platform/bd/list/${pageNo}`, params)
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
// 查询所有BD信息
export const getAllBD = () => {
  return ax.g(`/platform/bd/all`)
}
// 查询所有菜市场信息
export const getAllMarket = () => {
  return ax.g(`/platform/market/all`)
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
// 获取商品模板列表
export const getProductTemplateList = params => {
  return ax.g(`product/template`, params)
}
// 获取单个商品模板
export const getProductTemplate = templateId => {
  return ax.g(`product/template/${templateId}`)
}
// 添加商品模板
export const addProductTemplate = params => {
  return ax.p(`product/template`, params)
}
// 修改商品模板
export const modifyProductTemplate = (params, templateId) => {
  return ax.u(`product/template/${templateId}`, params)
}
// 获取系统参数列表
export const getPlatformDict = params => {
  return ax.g(`platform/dict`, params)
}
// 修改商品模板所属分类或排序
export const sortPlatformDict = params => {
  return ax.pa(`product/template`, params)
}
//  ********************* 商户消息推送 ******************************
// 获取商户端系统消息列表
export const getSysMessage = (params, ID) => {
  return ax.g(`/seller/systemMessage/list/${ID}`, params)
}
// 新增商户端系统消息
export const addSysMessage = params => {
  return ax.p(`/seller/systemMessage`, params)
}
// 查看商户端系统消息
export const seeSysMessage = id => {
  return ax.g(`/seller/systemMessage/${id}`)
}
// 编辑商户端系统消息
export const modifySysMessage = (params, id) => {
  return ax.u(`/seller/systemMessage/${id}`, params)
}
//  ********************* 商户消息提醒 ******************************
// 获取消息提醒列表
export const getAlertsMessageList = (params, pageNo) => {
  return ax.g(`seller/alertMessage/list/${pageNo}`, params)
}
// 更新消息提醒状态
export const updateAlertsMessage = (params, assistantId) => {
  return ax.g(`seller/alertMessage/${assistantId}`, params)
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

// ************* 优惠券管理 **********/

// 查看优惠券列表 /activity/coupon/list/
export const activtyCouponList = (id, params) => {
  return ax.g(`/activity/coupon/list/${id}`, params)
}
// 终结优惠券/activity/coupon
export const activityCouponDelete = (params) => {
  return ax.pa(`/activity/coupon/`, params)
}
// 新增优惠券POST /activity/coupon
export const addCoupon = (params) => {
  return ax.p('/activity/coupon', params)
}
// 查看优惠券详情/activity/coupon/{couponId}
export const seeCoupon = (Id) => {
  return ax.g(`/activity/coupon/${Id}`)
}
// 修改优惠券
export const resiveCoupon = (params) => {
  return ax.u('/activity/coupon/', params)
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
export const getUsersList = (params, pageNo) => {
  return ax.g(`customer/${pageNo}`, params)
}
/**
 * 查询用户端所有用户列表下的个人子订单/order/seed/
 */

export const getOrderSeed = id => {
  return ax.g(`order/seed/${id}`)
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
  return ax.g(`customer/${params.custId}/${params.pageNo}`)
}

/**
 * 获取消息列表
 */
export const getMessageList = (params, pageNo) => {
  return ax.g(`customer/message/list/${pageNo}`, params)
}

/**
 * 查看消息
 */
export const lookMessage = params => {
  return ax.g(`/customer/message/${params.id}`)
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
  return ax.g(`/customer/banner`, params)
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
  return ax.d(`/customer/tag/${params.id}`)
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
  return ax.g(`/customer/account/detail/${params.custId}/${params.pageNo}`, {
    accountType: params.accountType,
    pageSize: params.pageSize
  })
}

/**
 * 用户账户退款
 */
export const refundMoney = params => {
  return ax.u(`/customer/account`, params)
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
  return ax.u('/platform/user/changeState', params)
}

// 平台用户导出用户数据/platform/user/export
export const getUserExport = params => {
  return ax.g('/platform/user/export', params)
}

// 平台用户权限管理列表/platform/permission/list/
export const getPlatformPermissionList = (id, params) => {
  return ax.g(`/platform/permission/list/${id}`, params)
}
// 平台用户权限管理查看列表导出数据/platform/permission/list/export
export const getExportList = params => {
  return ax.g('/platform/permission/list/export', params)
}

// 平台用户权限管理查看列表/platform/permission/
export const getTreeList = id => {
  return ax.g(`/platform/permission/${id}`)
}
// 平台用户权限管理修改查看列表/platform/permission
export const getUserPermission = params => {
  return ax.u('/platform/permission', params)
}
/**
 * 财务管理相关接口
 * ZengFanlu
 */
// 用户退款 胡上军
// 获取用户退款记录列表
export const getRefundList = (pageNo, params) => {
  return ax.g(`/finance/customer/refund/list/${pageNo}`, params)
}
// 通过或驳回用户退款申请
export const auditRefund = params => {
  return ax.pa(`/finance/customer/refund/audit`, params)
}

// 商户结算列表
export const getFinanceList = (pageNo, params) => {
  return ax.g(`/finance/seller/bill/list/${pageNo}`, params)
}

// 商户结算申请/finance/seller/bill
export const getFinanceBill = Id => {
  return ax.pa('/finance/seller/bill', Id)
}
