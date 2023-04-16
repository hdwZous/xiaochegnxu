import { sendPvLog, sendEpLog, sendClickLog } from './modules/dj_wx_mini_util'

let commonParams = {
  business: '到店下单'
}

export function pvLog(pageName, params) {
  sendPvLog(pageName, { ...commonParams, ...params })
}

export function clickLog(clickName, params) {
  sendClickLog(clickName, { ...commonParams, ...params })
}

export function epLog(epName, params) {
  sendEpLog(epName, { ...commonParams, ...params })
}
