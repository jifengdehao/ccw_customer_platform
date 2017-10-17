/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: render 封装
 */
import iview from 'iview'

// 基础操纵
function baseHandle(title, content, ok, cancel) {
  title = title || '操作确认框'
  content = content || '<p>您确定要进行该项操作吗？</p>'
  let config = {
    title: title,
    content: content,
    okText: '确定',
    cancelText: '取消'
  }

  if (typeof ok === 'function') {
    config.onOk = ok
  }
  if (typeof cancel === 'function') {
    config.onCancel = cancel
  }

  iview.Modal.confirm(config)
}

// 提示并刷新页面
export const notice = (title, cb) => {
  iview.Notice.success({
    title: title,
    duration: 1.5,
    onClose: () => {
      if (typeof cb === 'function') {
        cb()
      }
    }
  })
}
// 执行删除操作确认框
export const handleDel = (ok, title, content, cancel) => {
  content = content || '该操作不可逆，您确定要删除当前数据吗？'
  title = title || '删除确认'
  baseHandle(title, content, ok, cancel)
}

// 更改状态
export const handleSta = (ok, title, content, cancel) => {
  content = content || '您确定要更改当前数据状态吗？'
  title = title || '状态更改确认'
  baseHandle(title, content, ok, cancel)
}
// render 版的查看
export const show = (h, cb, ...args) => {
  return h('Button', {
    props: {
      type: 'text',
      size: 'small'
    },
    on: {
      click: () => {
        cb(...args)
      }
    }
  }, '查看')
}
// render 版的隐藏
export const hide = (h, cb, ...args) => {
  return h('Button', {
    props: {
      type: 'text',
      size: 'small'
    },
    on: {
      click: () => {
        cb(...args)
      }
    }
  }, '隐藏')
}
// render 版的编辑
export const edit = (h, cb, ...args) => {
  return h('Button', {
    props: {
      type: 'text',
      size: 'small'
    },
    on: {
      click: () => {
        cb(...args)
      }
    }
  }, '编辑')
}
// render 版的删除
export const del = (h, cb, ...args) => {
  return h('Button', {
    props: {
      type: 'text',
      size: 'small'
    },
    on: {
      click: () => {
        cb(...args)
      }
    }
  }, '删除')
}

