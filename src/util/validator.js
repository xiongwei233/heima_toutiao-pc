/**
 *  自定义校验器
 */

// 验证邮箱的规则
export const check_Email = (rule, value, callback) => {
  const check = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  if (check.test(value)) {
    // 验证当前内容，并且返回布尔值
    // 合法邮箱
    return callback()
  }
  callback(new Error('请输入合法的邮箱'))
}

// 验证手机号的规则
export const check_Mobile = (rule, value, callback) => {
  const check = /0?(13|14|15|18|17|12|16|19)[0-9]{9}/
  if (check.test(value)) {
    // 验证当前内容，并且返回布尔值
    // 合法邮箱
    return callback()
  }
  callback(new Error('请输入合法的手机号'))
}

// login- 用户协议单选框
export const check_Checkbox = (rule, value, callback) => {
  if (value) return callback()
  callback(new Error('请同意用户协议'))
}

// publish- 封面单选框
export const check_Cover = (rule, value, callback) => {
  if (value) return callback()
  callback(new Error('选择封面'))
}
