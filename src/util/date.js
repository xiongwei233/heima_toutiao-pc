import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'

// 当前实例使用
dayjs().locale('zh-cn').format()

export const dateReset = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
