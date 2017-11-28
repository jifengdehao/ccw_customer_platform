/**
 * 2017/11/28
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 数组去重
 */
function unique (a) {
  var res = []

  for (var i = 0, len = a.length; i < len; i++) {
    var item = a[i]
    for (var j = 0, jLen = res.length; j < jLen; j++) {
      if (res[j] === item) {
        break
      }
    }
    if (j === jLen) {
      res.push(item)
    }
  }
  return res
}

var a = [1, 1, '1', 2, '2', 2, 1]
console.log(unique(a))
