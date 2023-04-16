// 领券后需要遍历整个弹层，找到相同券一并同步状态
export function syncCoupon(item, coupon) {
  let userAction = item.userAction;
  const newStyle = Object.assign({}, item.styles || {}, {
    couponLabelStyle:
      (coupon.styles && coupon.styles.couponLabelStyle) ||
      coupon.couponSigns ||
      item.couponSigns ||
      [],
    couponButStyle:
      (coupon.styles && coupon.styles.couponButStyle) ||
      coupon.couponButton ||
      item.couponButton ||
      {},
    leftTopIconList:
      (coupon.styles && coupon.styles.leftTopIconList) || item.leftTopIconList,
  });
  delete coupon.couponBgColor;
  delete coupon.couponBgBorderColor;
  delete coupon.priceColor;
  delete coupon.couponLimitColor;
  delete coupon.couponTitleColor;
  delete coupon.couponExpireColor;
  let newCoupon = Object.assign(item, coupon);
  newCoupon.styles = newStyle;
  newCoupon.userAction = userAction;
  // 如果是已领光并且是限品券，还要重置能领取状态，能让他点
  if (newCoupon.markState == 5 && newCoupon.limitedStandard == 1) {
    newCoupon.markState = 2;
    newCoupon.needToUse = 0;
  }
  return newCoupon;
}