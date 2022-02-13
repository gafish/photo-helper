/**
 * 友盟统计
 */

// 页面曝光埋点
export const sendPV = () => {
  // 页面事件的配置，只需要写死{ is_auto: false } 即可
  const pageEventConfig = { is_auto: false }
  // 本次页面事件的扩展参数，其取值为一个 JSON 对象(平铺的简单对象，不能多层嵌套)
  const userData = {}

  window?.aplus_queue.push({
    action: 'aplus.sendPV',
    arguments: [pageEventConfig, userData],
  })
}

// 页面点击事件
export const record = (eventCode: string, eventParams: any = {}) => {
  if (!eventCode) return

  // 事件ID 或 事件编码
  // const eventCode = ''
  const eventType = 'CLK'
  // 本次事件中上报的事件参数。其取值为一个JSON对象（平铺的简单对象，不能多层嵌套）
  // const eventParams = {}

  window?.aplus_queue.push({
    action: 'aplus.record',
    arguments: [eventCode, eventType, eventParams],
  })
}
