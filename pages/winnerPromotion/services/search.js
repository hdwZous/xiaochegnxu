import { djRequest } from '../utils/modules/dj_wx_mini_util'

export function searchHotWordList(params) {
  return djRequest.get({
    functionId: 'hotWords/list',
    body: params
  })
}

export function searchList(data) {
  return djRequest.post({
    functionId: 'storeIndexSearch/searchPost',
    isNeedDealError: true,
    isNeedDealLogin: false,
    body: data
  })
}
