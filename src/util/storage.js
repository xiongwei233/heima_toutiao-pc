/**
 * token 封装模块
 */

// 存储token数据
export const setStorage = (key, value) => {
  if (typeof value === 'object') {
    // 对象转为JSON
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 取token数据
export const getStorage = (key) => {
  const data = localStorage.getItem(key)
  // 为什么把 JSON.parse 放到 try-catch 中？
  // 因为 data 可能不是 json 格式字符串
  try {
    // 尝试把data转为 javascript 对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON
    // 直接原样返回
    return data
  }
}

// 删除token数据
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}

// 清空localStorage数据
export const clearStorage = () => {
  localStorage.clear()
}
