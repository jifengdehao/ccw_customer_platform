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
