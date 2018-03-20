/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: axios底层的封装
 */
import axios from 'axios'
import qs from 'qs'
import iview from 'iview'
import hash from 'js-md5'

// const configPath = '/api'
// window.configPath = configPath

const ax = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000,
  withCredentials: true, // 跨域携带证书
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    CCWTOKEN: '',
    sign: ''
  }
})

export const itr = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = qs.stringify(params)
  if (Object.keys(params).length > 0) {
    url = type === 'get' ? url + '?' + arg : url
  }
  let userInfo = JSON.parse(sessionStorage.getItem('user'))
  let token = ''
  if (userInfo) {
    userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
    token = userInfo.token ? userInfo.token : ''
  }
  let sign = ''
  if (type === 'get' || type === 'delete') {
    sign = hash(arg + token)
  } else {
    sign = hash(JSON.stringify(params) + token)
  }
  ax.defaults.headers.CCWTOKEN = token
  ax.defaults.headers.sign = sign
  return ax[type](url, params)
}

export const g = (url, params) => {
  return base('get', url, params)
}

export const p = (url, params) => {
  return base('post', url, params)
}

export const d = (url, params) => {
  return base('delete', url, params)
}

export const u = (url, params) => {
  return base('put', url, params)
}
export const pa = (url, params) => {
  return base('patch', url, params)
}

export const op = (url, params) => {
  return base('options', url, params)
}

export function base (type, url, params) {
  return new Promise((resolve, reject) => {
    itr(type, url, params)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data.data)
        } else if (response.data.code === 9010 || response.data.code === 9030) {
          iview.Modal.error({
            title: '提示',
            content: response.data.msg,
            onOk: () => {
              sessionStorage.removeItem('user')
              sessionStorage.removeItem('menu')
              window.location.reload()
            }
          })
        } else if (response.data.code === 9090) {
          //  弹框 => 跳登录
          iview.Modal.error({
            title: '提示',
            content: '您已在其他设备登录',
            onOk: () => {
              sessionStorage.removeItem('user')
              sessionStorage.removeItem('menu')
              window.location.href = window.location.origin
            }
          })
        } else {
          iview.Notice.error({
            title: '操作失败',
            desc: `<p><span style="color:#ff3300">${
              response.data.code
              }</span>&nbsp;&nbsp;${response.data.msg}</p>`
          })
          reject(response.data.msg)
        }
      })
      .catch(msg => {
        if (msg) {
          iview.Notice.error({
            title: '网络访问错误',
            desc: msg
          })
        }
        // reject(msg)
      })
  })
}
