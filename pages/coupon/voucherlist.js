import {
  clickBuriedV2_
} from "../../common/util/BI"
import {
    FNIDS,
    request
} from "../../common/util/api";
let app = getApp();
var self = null
Page({
    data: {
        isIPX: app.globalData.isIpx,
        voucherList: [],
        isEmpty: false,
        oldVoucherCodeList: [], // 选中优惠券
        selectCouponList: [],
        // 选中的普通券位置
        normalCouponIndex: -1
    },
    onLoad(options) {
        self = this;
        self.setData({
            unique: options.unique,
            hasNextPage: true,
            pageNo: 1,
            selectCouponList: options.voucherCode.split(",")
        })
        app.globalData.couponCode = options.voucherCode;
        self.getVoucherList(1);
    },
    onShow: function() {
        var create_time = new Date()
        // pvBuried_({
        //     "create_time": create_time
        // })
    },
    onShareAppMessage: function() {
        var shareUtil = require('../../common/util/share_utils.js');
        var url = shareUtil.getShareUrl();

        return {
            title: '京东到家',
            path: url
        }
    },
    goback: function() {
        wx.navigateBack({

        })
    },
    dealErrorClick: function() {
        self.setData({
            showEmpty: false,
        });
        self.getVoucherList(1)
    },
    onReachBottom() {
        self.getVoucherList(self.data.pageNo + 1)
    },
    selectCouponHandle(event) {
        let create_time = new Date(),
            coupon = event.currentTarget.dataset,
            selectCoupon = coupon.couponCode,
            selectCouponList = self.data.selectCouponList,
            couponText = coupon.couponText,
            voucherList = this.data.voucherList,
            normalCouponIndex = this.data.normalCouponIndex;
        let idx;
        for (idx in voucherList) {
            if (voucherList[idx].couponCode == selectCoupon) {
                if (!voucherList[idx].selected) { //选中
                    if (couponText == "可叠加") { //可叠加券
                        if (coupon.use == "UNAVAILABLE") {
                            return;
                        } else if (selectCouponList.join().indexOf(selectCoupon) < 0) {
                            voucherList[idx].selected = !voucherList[idx].selected;
                            selectCouponList[selectCouponList.length] = selectCoupon
                        }
                    } else { //普通券
                        if (coupon.use == "UNAVAILABLE") {
                            return;
                        } else {
                            let oldNormalCoupon;
                            for (let i = 0; i < voucherList.length; i++) {
                                if (!voucherList[i].couponModeDesc && voucherList[i].selected) {
                                    oldNormalCoupon = voucherList[i].couponCode
                                    voucherList[i].selected = false;
                                    break;
                                }
                            }
                            for (let i = 0; i < selectCouponList.length; i++) {
                                if (selectCouponList[i] == oldNormalCoupon) {
                                    selectCouponList.splice(i, 1);
                                    break;
                                }
                            }
                            voucherList[idx].selected = !voucherList[idx].selected;
                            selectCouponList[selectCouponList.length] = selectCoupon;
                        }
                    }
                } else {
                    voucherList[idx].selected = !voucherList[idx].selected;
                    let itemId
                    for (itemId in selectCouponList) {
                        if (selectCouponList[itemId] == selectCoupon) {
                            break
                        }
                    }
                    selectCouponList.splice(itemId, 1);
                }
                break
            }
        }
        this.setData({
            voucherList,
            selectCouponList
        })
        app.globalData.couponCode = selectCouponList.join();
        let {recommendObj = {}} = this.data;
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "ChooseCoupon",
          click_par: {},
          pageId: recommendObj.pageId || "",
          currentPageName: recommendObj.currentPageName || '',
          prePageName: recommendObj.prePageName || ''
        });
    },
    getVoucherList(pageNo) {
        if (!self.data.hasNextPage) return;
        request({
          ...FNIDS.getVoucherListFive,
          isNeedDealError: true,
          body: {
            unique: self.data.unique,
            pageNo: pageNo,
            pagesize: 10,
            fromSource: 5,
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            if (res.data.code == "0") {
              if (res.data.result && res.data.result.length > 0) {
                let voucherList = self.data.voucherList.concat(res.data.result);
                let index1,
                  index2,
                  voucherCodeList = self.data.selectCouponList,
                  chooseType = "其它";
                for (index1 in voucherList) {
                  voucherList[index1].selected = false;
                  for (index2 in voucherCodeList) {
                    if (
                      voucherList[index1].couponCode == voucherCodeList[index2]
                    ) {
                      voucherList[index1].selected = true;
                      if (
                        voucherList[index1].couponModeDesc &&
                        voucherList[index1].couponModeDesc.text
                      ) {
                        chooseType = voucherList[index1].couponModeDesc.text;
                      }
                    }
                  }
                }
                self.setData({
                  voucherList: voucherList,
                  pageNo: pageNo,
                  chooseType,
                });
              }
            } else {
              if (pageNo == 1) {
                self.setData({
                  showEmpty: true,
                  btnName: "重新加载",
                  warnTip: res.data.msg,
                  errorImg:
                    "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
                });
              } else {
                wx.showToast({
                  title: res.data.msg,
                  image: "/images/icon_warn.png",
                });
              }
            }
            var empty = false;
            if (!self.data.voucherList || self.data.voucherList.length == 0) {
              empty = true;
            }
            if (res.data.result && res.data.result.length < 10) {
              self.setData({
                hasNextPage: false,
                loadTip: "已显示全部",
                isEmpty: empty,
              });
            } else {
              self.setData({
                loadTip: "加载中...",
                isEmpty: empty,
              });
            }
          })
          .catch((res) => {
            if (pageNo == 1) {
              self.setData({
                showEmpty: true,
                btnName: "重新加载",
                warnTip: "网络异常",
                errorImg:
                  "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
              });
            }
          });
    },
    disableReason(e) {
        // queryCouponUnusableReason
        let data = e.currentTarget.dataset;
        if (data.unavailableReason) {
            return
        }
        request({
          ...FNIDS.queryCouponUnusableReason,
          method: "POST",
          body: {
            fromSource: 5,
            couponCode: data.couponCode,
            unique: this.data.unique,
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          preObj: this.data.recommendObj || {},
        }).then((res) => {
          if (res.data.code == 0 && res.data.result) {
            let index,
              voucherList = this.data.voucherList;
            for (index in voucherList) {
              if (voucherList[index].couponCode == data.couponCode) {
                voucherList[index].unavailableReason =
                  res.data.result.unusableReason;
                break;
              }
            }
            this.setData({
              voucherList,
            });
          }
        });
    }
})
