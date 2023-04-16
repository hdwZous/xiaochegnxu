import util from '../../common/util/util'
import { request, requestBuried,FNIDS } from '../../common/util/api'
import { pvBuriedV2_ , clickBuriedV2_} from "../../common/util/BI";

let app = getApp();
let self = null;

Page({
    // 埋点
    buried: {
        orgcode: '',
        type: app.globalData.qrcode.type,
        storeid: '',
        scene: app.globalData.scene.scene,
        deviceid: util.getUUIDMD5(),
        city: app.globalData.qrcode.city,
        materiel: app.globalData.qrcode.materiel,
        business: app.globalData.qrcode.business,
        phone: '',
        code: '',



    },
    /**
     * 页面的初始数据
     */
    data: {
        isIPX: app.globalData.isIpx,
        phone: '',
        code: '',
        cityName: '城市',
        isEnable: false,
        iconToggle: {  // 清除按钮
            codeIcon: true,
            phoneIcon: true,
        },
        canExchangeForPhone: false,
        canExchangeForCode: false,
        orgcode: '',
        storeid: '',
        channel: '',
        tType: 4,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        if (options.code) {
            self.setData({
                code: options.code,
                canExchangeForCode: true,
            })
        }
        if (options.orgcode) {
            self.data.orgcode = options.orgcode
        }
        if (options.channel) {
            self.data.channel = options.channel
        }
        if (options.type) {
            self.data.tType = options.type
        }
        self.data.storeid = app.globalData.qrcode.storeid



    },
    goback: function () {
        wx.navigateBack({})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        setTimeout(function () {
            self.setData({
                cityName: app.globalData.addressInfo.cityName
            })
            handleBuried()
        }, 1000)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

     // pv埋点
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
          create_time: new Date(),
          page_par: {
           
          },
          currentPageName: recommendObj.currentPageName || "",
          prePageName: recommendObj.prePageName || "",
          pageId: recommendObj.pageIdFirstPage || "",
          isBack: back || "",
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var shareUtil = require('../../common/util/share_utils.js')
        var url = shareUtil.getShareUrl();

        return {
            title: '京东到家',
            path: url
        }
    },

    toExchange: function () {

        if (!self.data.isEnable) {
            return;
        }
        if (self.data.tType == 6) {
            requestNewPeopleCoupon();//门店获客
        } else {
            requestCouponPackage();//请求券包
        }
    },


    toHome: function () {
        goHome();
    },

    changeInput: function (e) {
        var value = e.detail.value;
        var curName = e.target.dataset.name;
        switch (curName) {
            case 'phone':
                self.setData({
                    phone: value,
                });
                if (value.length == 11 && value[0] == '1') {
                    self.data.canExchangeForPhone = true;
                } else {
                    self.data.canExchangeForPhone = false;
                }
                break;
            case 'code':
                self.setData({
                    code: value,
                });
                if (value) {
                    self.data.canExchangeForCode = true;
                } else {
                    self.data.canExchangeForCode = false;
                }
                break;
        }

        if (self.data.canExchangeForCode && self.data.canExchangeForPhone) {
            self.setData({
                isEnable: true
            });
        } else {
            self.setData({
                isEnable: false
            })
        }
    },
    inputFocus: function (e) {
        var iconName = e.target.dataset.name;
        switch (iconName) {
            case 'phone':
                self.setData({
                    'iconToggle.phoneIcon': false
                });
                break;
            case 'code':
                self.setData({
                    'iconToggle.codeIcon': false
                });
                break;
        }
    },
    inputBlur: function (e) {
        var iconName = e.target.dataset.name;
        switch (iconName) {
            case 'phone':
                self.setData({
                    'iconToggle.phoneIcon': true
                });
                break;
            case 'code':
                self.setData({
                    'iconToggle.codeIcon': true
                });
                break;
        }
    },
    clearCodeInput: function (e) {
        self.setData({
            code: '',
            isEnable: false,
            canExchangeForCode: false
        })
    },
    clearPhoneInput: function (e) {
        self.setData({
            phone: '',
            isEnable: false,
            canExchangeForPhone: false
        })
    },
    /* ------------------ 自动化埋点新增逻辑    --------------------  */
    reportCoupop(phone, code) {
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "reportCoupop",
            click_par: {
                phone,
                code,
                "deviceid": util.getUUIDMD5(),
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })

    },
    reportHandleBuried(orgCode, storeid) {
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "reportHandleBuried",
            click_par: {
                "orgcode": app.globalData.qrcode.orgcode || orgCode,
                "storeid": app.globalData.qrcode.storeid || storeid,
                "type": app.globalData.qrcode.type,
                "scene": app.globalData.scene.scene,
                "deviceid": util.getUUIDMD5(),
                "city": app.globalData.qrcode.city,
                "materiel": app.globalData.qrcode.materiel,
                "business": app.globalData.qrcode.business,
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
       
    }
})

function requestCouponPackage() {
    let { recommendObj = {} } = this.data;
    request({
        // 真实接口
        ...FNIDS.getCouponByPushCode,
        body: {
            "exchangeCode": self.data.code,
            "phone": self.data.phone,
            "cityCode": app.globalData.addressInfo.cityId
        },
        preObj: this.data.recommendObj || {}
    }).then(res => {
        wx.showToast({
            title: '领券成功',
        });
        let voucherList = res.data.result;
        if (voucherList && voucherList.length > 0) {
            app.globalData.pushcodes = {
                codes: voucherList,
                phone: self.data.phone,
                orgcode: self.data.orgcode
            };
            wx.redirectTo({
                url: '../coupon/push-coupon?storeId=' + self.data.storeid + "&orgCode=" + self.data.orgcode,
                preObj: recommendObj
            })
        }
        self.reportCoupop(self.data.phone, res.data.code)
        // let funid = "get/getCouponByPushCode";
        // requestBuried(funid, {
        //     phone: self.data.phone,
        //     code: res.data.code,
        //     deviceid: util.getUUIDMD5(),
        // })
    }).catch(err => {
        wx.showModal({
            title: "领券失败",
            content: err.data.msg,
            cancelText: '再试试',
            confirmText: '去逛逛',
            success: function (res) {
                if (res.confirm) {
                    goHome();
                } else {

                }
            }
        })
    })
}


function requestNewPeopleCoupon() {
    let { recommendObj = {} } = this.data;
    request({
      // 真实接口
      ...FNIDS.getHkNewCoupon,
      body: {
        exchangeCode: self.data.code,
        phone: self.data.phone,
        minChannel: self.data.channel,
        longtitude: app.globalData.addressInfo.longitude,
        latitude: app.globalData.addressInfo.latitude,
        cityId: app.globalData.addressInfo.cityId,
      },
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        wx.showToast({
          title: "领券成功",
        });
        let voucherList = res.data.result;
        if (voucherList && voucherList.length > 0) {
          app.globalData.pushcodes = {
            codes: voucherList,
            phone: self.data.phone,
            orgcode: self.data.orgcode,
          };
          wx.redirectTo({
            url:
              "../coupon/push-coupon?storeId=" +
              self.data.storeid +
              "&orgCode=" +
              self.data.orgcode,
            preObj: recommendObj,
          });
        }
      })
      .catch((err) => {
        wx.showModal({
          title: "领券失败",
          content: err.data.msg,
          cancelText: "再试试",
          confirmText: "去逛逛",
          success: function (res) {
            if (res.confirm) {
              goHome();
            } else {
            }
          },
        });
      });
}

function goHome() {

    // if (self.data.orgcode) {
    // app.needLoad = true;
    // wx.navigateBack({
    //   delta: 1
    // })
    // } else {
    //   wx.redirectTo({
    //     url: '../store-list/store-list'
    //   })
    // }
    let { recommendObj = {} } = this.data;
    wx.redirectTo({
        url: '../store/index?storeId=' + self.data.storeid + "&orgCode=" + self.data.orgcode + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
        preObj: recommendObj
    })
}

function handleBuried() {
    var funid = "station/getStationId"
    if (!app.globalData.addressInfo.longitude || !app.globalData.addressInfo.latitude) {
        self.reportHandleBuried('00000000', '00000000')
        // requestBuried(funid, {
        //     "orgcode": app.globalData.qrcode.orgcode || '00000000',
        //     "type": app.globalData.qrcode.type,
        //     "storeid": app.globalData.qrcode.storeid || '00000000',
        //     "scene": app.globalData.scene.scene,
        //     "deviceid": util.getUUIDMD5(),
        //     "city": app.globalData.qrcode.city,
        //     "materiel": app.globalData.qrcode.materiel,
        //     "business": app.globalData.qrcode.business,
        // })
    } else if (app.globalData.qrcode.storeid) {
        self.reportHandleBuried()
        // requestBuried(funid, {
        //     "orgcode": app.globalData.qrcode.orgcode,
        //     "type": app.globalData.qrcode.type,
        //     "storeid": app.globalData.qrcode.storeid,
        //     "scene": app.globalData.scene.scene,
        //     "deviceid": util.getUUIDMD5(),
        //     "city": app.globalData.qrcode.city,
        //     "materiel": app.globalData.qrcode.materiel,
        //     "business": app.globalData.qrcode.business,
        // })
    } else {
        requestStationId(handleStationId)
    }
}

function requestStationId(handleStationId) {
    let qrcode = app.globalData.qrcode || {}, body = null
    if (qrcode.dj_par_key) {
        body = {
            "lgt": app.globalData.addressInfo.longitude,
            "lat": app.globalData.addressInfo.latitude,
            "dj_par_key": qrcode.dj_par_key || ''
        }
    } else {
        body = {
            "orgCode": qrcode.orgcode || '',
            "lgt": app.globalData.addressInfo.longitude,
            "lat": app.globalData.addressInfo.latitude,
        }
    }
    request({
      // 真实接口
      ...FNIDS.nearbyStoreId,
      body: body,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        handleStationId(res);
      })
      .catch(() => {
        handleStationId();
      });

}

function handleStationId(res) {
    var funid = "station/getStationId"
    if (res) {
        if (res.data.code == '0' && res.data.result) {
            self.data.storeid = app.globalData.qrcode.storeid || res.data.result.stationNo
            self.reportHandleBuried(res.data.result.orgCode, res.data.result.stationNo)
            // requestBuried(funid, {
            //     "orgcode": app.globalData.qrcode.orgcode || res.data.result.orgCode,
            //     "type": app.globalData.qrcode.type,
            //     "storeid": app.globalData.qrcode.storeid || res.data.result.stationNo,
            //     "scene": app.globalData.scene.scene,
            //     "deviceid": util.getUUIDMD5(),
            //     "city": app.globalData.qrcode.city,
            //     "materiel": app.globalData.qrcode.materiel,
            //     "business": app.globalData.qrcode.business,
            // })
        } else {
            self.reportHandleBuried('00000000', '00000000')
            // requestBuried(funid, {
            //     "orgcode": app.globalData.qrcode.orgcode || '00000000',
            //     "type": app.globalData.qrcode.type,
            //     "storeid": app.globalData.qrcode.storeid || '00000000',
            //     "scene": app.globalData.scene.scene,
            //     "deviceid": util.getUUIDMD5(),
            //     "city": app.globalData.qrcode.city,
            //     "materiel": app.globalData.qrcode.materiel,
            //     "business": app.globalData.qrcode.business,
            // })
        }
    } else {
        self.reportHandleBuried('00000000', '00000000')
        // requestBuried(funid, {
        //     "orgcode": app.globalData.qrcode.orgcode || '00000000',
        //     "type": app.globalData.qrcode.type,
        //     "storeid": app.globalData.qrcode.storeid || '00000000',
        //     "scene": app.globalData.scene.scene,
        //     "deviceid": util.getUUIDMD5(),
        //     "city": app.globalData.qrcode.city,
        //     "materiel": app.globalData.qrcode.materiel,
        //     "business": app.globalData.qrcode.business,
        // })
    }

}
