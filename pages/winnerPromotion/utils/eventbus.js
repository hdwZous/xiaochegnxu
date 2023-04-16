const events = new Map()

// 消息订阅
function listen(key, target, callback) {
  const obj = { target, callback }
  let value = events.get(key)
  if (Array.isArray(value)) {
    value = value.filter((e) => e.target != target)
    value.push(obj)
    events.set(key, value)
  } else {
    events.set(key, [obj])
  }
}

// 消息分发
export function dispatch(key, data) {
  const value = events.get(key)
  if (Array.isArray(value)) {
    value.map(({ target, callback }) => callback.call(target, data))
  }
}

// 取消订阅
export function cancel(key, target) {
  if (events.has(key)) {
    let value = events.get(key)
    if (Array.isArray(value)) {
      if (value.length == 1) {
        events.delete(key)
      } else {
        value = value.filter((e) => e.target != target)
        events.set(key, value)
      }
    }
  }
}

export default {
  listen,
  dispatch,
  cancel
}
