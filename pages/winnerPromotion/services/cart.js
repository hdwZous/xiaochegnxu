import { djRequest } from '../utils/modules/dj_wx_mini_util'

export function cartItemNumChange(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/changeItemNum',
    body: params
  })
}

export function cartItemRemove(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/removeItem',
    body: params
  })
}

export function cartQuery(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/querySingleCart',
    body: params
  })
}

export function cartAllCheck(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/checkAllItems',
    body: params
  })
}

export function cartAllUnCheck(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/uncheckAllItems',
    body: params
  })
}

export function cartItemCheck(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/checkItem',
    body: params
  })
}

export function cartItemUnCheck(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/uncheckItem',
    body: params
  })
}

export function cartAllItemRemove(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/removeAllItems',
    body: params
  })
}

export function cartAllInvalidItemRemove(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/removeItems',
    body: params
  })
}

export function cartSettleVerify(params) {
  return djRequest.get({
    functionId: 'cartV3_3_0/verifySettle',
    body: params
  })
}

// 结算校验
// verifySettle: {
//   functionId: "cartV3_3_0/verifySettle",
//   appVersion: appVersion,
// },






// // 购物车清空失效商品
// removeAllFailureGoods: {
//   functionId: "cartV3_3_0/removeItems",
//   appVersion: appVersion,
// },
