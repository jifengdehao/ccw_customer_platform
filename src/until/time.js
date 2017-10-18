/**
 * 2017/10/18
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 时间转换
 */

// 将分秒时间格式化
export function timeFormat (now) {
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

// 将格式化的时间转化成数字
export function timeConvert (time) {
  let tempArr = time.split(':')
  let minute = parseInt(tempArr[0])
  let second = parseInt(tempArr[1])
  return minute * 60 + second
}
