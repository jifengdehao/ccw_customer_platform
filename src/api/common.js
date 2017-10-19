/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api模块的封装
 */
import * as ax from './instrance'

// 用户登录
export const Login = (params) => {
  return ax.p('/user/login', params)
}
// 上传地址
export const uploadUrl = ax.uploadUrl

// 单个用户列表用户详细数据
export const getUserList = (params) => {
  return ax.g('/user/search', params)
}

/** 订单管理 start **/

/**
 * 获取反馈列表
 * @param params =>{mobileno,pageSize,pageNo}
 */
export const getFeedBackList = (params) => {
  return ax.g('/order/feedback', params)
}

/**
 * 获取反馈详情
 * @param params =>id
 */
export const getFeedBackInfo = (params) => {
  return ax.g('/order/feedback', params)
}

/**
 * 获取订单列表
 * @param params =>{status,mobileno,pageSize,pageNo}
 */
export const getOrderList = (params) => {
  return ax.g('/order/', params)
}

/**
 * 导出订单列表
 * @param params
 */
export const exportOrderList = (params) => {
  return ax.g('/order/export', params)
}

/**
 * 获取订单详情
 * @param params => orderId
 */
export const getOrderInfo = (params) => {
  return ax.g('/order', params)
}

/**
 * 编辑订单
 * @param params ={orderId}
 */

export const putOrderInfo = (params) => {
  return ax.u('/order', params)
}

/**
 * 查看屏蔽词
 * @param params =>null
 */
export const getOrderSw = (params) => {
  return ax.g('/order/remark/hidden', params)
}

/**
 * 更新屏蔽词
 * @param params =>null
 */
export const postOrderSw = (params) => {
  return ax.p('/order/remark/hidden', params)
}

/**
 * 获取商品评价列表
 * @type params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderGoodListEval = (params) => {
  return ax.g('/order/remark/item', params)
}

/**
 * 获取商家评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderSellerListEval = (params) => {
  return ax.g('/order/remark/shop', params)
}

/**
 * 获取配送员的评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderDeliverListeEval = (params) => {
  return ax.g('/order/remark/deliver', params)
}

/**
 * 获取差评评价列表
 * @param params =>{pageSize,pageNo,mobileno,orderId}
 */
export const getOrderBadListEval = (params) => {
  return ax.g('/order/remark/bad', params)
}

/**
 * 隐藏订单评价
 * @param params ={id}
 */
export const patchOrderEval = (params) => {
  return ax.pa('/order/remark', params)
}

/**
 * 导出评价列表
 * @param params ={startTime,endTime,status}
 */
export const exportOrderEval = (params) => {
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
export const updataShopStatus = (params) => {
  return ax.pa(`/seller/changeState`, params)
}

//  ********************* BD及邀请码管理 ******************************
// 获取BD用户列表
export const getBDlist = (params) => {
  return ax.g(`platform/bd`, params)
}
// 添加BD
export const addPlatformBD = (params) => {
  return ax.p(`platform/bd`, params)
}
// 删除BD
export const delPlatformBD = (id) => {
  return ax.d(`platform/bd/${id}`)
}
// 修改BD
export const modifyBD = (params, id) => {
  return ax.u(`platform/bd/${id}`, params)
}

//  ********************* 商品模板库管理 ******************************
// 获取一级分类列表
export const getCategoryParentList = (params) => {
  return ax.g(`product/category/parent`, params)
}
// 获取二级分类列表
export const getCategoryChildList = (params) => {
  return ax.g(`product/category/child`, params)
}
// 获取一级分类
export const getCategoryParent = (params, id) => {
  return ax.g(`product/category/parent/${id}`, params)
}
// 获取二级分类
export const getCategoryChild = (params, id) => {
  return ax.g(`product/category/child/${id}`, params)
}
// 增加一级分类
export const addCategoryParent = (params) => {
  return ax.p(`product/category/parent`, params)
}
// 增加二级分类
export const addCategoryChild = (params) => {
  return ax.p(`product/category/child`, params)
}
// 修改一级分类
export const modifyCategoryParent = (params, id) => {
  return ax.u(`product/category/parent/${id}`, params)
}
// 修改二级分类
export const modifyCategoryChild = (params, id) => {
  return ax.u(`product/category/child/${id}`, params)
}

//  ********************* 商户消息推送 ******************************
// 获取商户端系统消息列表
export const getSysMessage = (params) => {
  return ax.g(`seller/message/sys`, params)
}
// 新增商户端系统消息
export const addSysMessage = (params) => {
  return ax.p(`seller/message/sys`, params)
}
// 查看商户端系统消息
export const seeSysMessage = (id) => {
  return ax.g(`seller/message/sys/${id}`)
}
// 编辑商户端系统消息
export const modifySysMessage = (params, id) => {
  return ax.u(`seller/message/sys/${id}`, params)
}
//  ********************* 商户消息提醒 ******************************
// 获取消息提醒列表
export const getAlertsMessageList = (params) => {
  return ax.g(`seller/message/alerts`, params)
}
// 更新消息提醒状态
export const updateAlertsMessage = (params, id) => {
  return ax.p(`seller/message/alerts/${id}`, params)
}

/**
 * 用户端相关接口
 * @author by WuFengliang
 */

/**
 * 获取用户端所有用户列表
 * @param params =>{status,mobileno,pageSize,pageNo}
 */
export const getUsersList = (params) => {
  return ax.g(`customer/`, params)
}

/**
 * 获取用户端昨日新增用户量和当前用户量
 */
export const getCustomerCount = (params) => {
  return ax.g(`customer/customerCount`, params)
}

/**
 * 冻结与恢复账户
 */
export const changeStatus = (params) => {
  return ax.pa(`customer/changeState`, params)
}

/**
 * 获取用户信息
 */
export const getUserInfoData = (params) => {
  return ax.g(`customer/${params.custId}`)
}

 /**
 * 用户端相关接口
 * @author by WuFengliang
 */
