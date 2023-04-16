import { djRequest } from '../utils/modules/dj_wx_mini_util'
// import couponData from '../couponList/data'


export function couponList(params) {
  // return Promise.resolve(couponData)

  return djRequest.get({
    functionId: 'igw/coupon/stationMoreCouponInfo',
    body: params
  })
}

export function verifyCoupon(params) {
  return djRequest.post({
    functionId: 'igw/coupon/tryGrabCoupon',
    body: params
  })
}

export function grapCoupon(params) {
  return djRequest.get({
    functionId: 'coupon/grabCoupon',
    body: params
  })
}
