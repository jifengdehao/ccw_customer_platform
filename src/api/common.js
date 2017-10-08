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
