import util from '../../../common/util/util'
import {
    FNIDS,
    request
} from "../../../common/util/api";
import { pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
import orderPublic from '../../../common/util/public.js'
import mp from "../../../common/util/wxapi";
import {
    requestSign
} from "../../../common/util/PayTools";
import {
    getGroupShareImg
} from "../common/public.js"
let app = getApp(),
    that;
Page({
    // 埋点数据
    buried: {
        order_id: "",
        store_id: "",
        deliver_type: "",
        group_type: "",
        sku_id: "",
        orgcode: "",
        type: "",
        promotionId:"",
        groupId:"",
        
        
        
    },
    /**
     * 页面的初始数据
     */
    data: {
        // data:{},
        cutdown: {
            hour: '00',
            minute: '00',
            second: '00',
            timer: null
        },
        orderId: "",
        data: {},
        // 展示分享微信朋友圈弹层
        showShare2WxDialog: false,
        // 朋友圈分享图片
        momentsShareImgSrc: "",
        // 保存分享图片弹层
        showShare2MomentsDialog: false,
        // 点击保存图片埋点信息
        savePicDialogReportData: {},
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this
        that.setData({
            orderId: options.orderId || ''
        })
        this.getOrderInfo(true);
        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //下拉进来的页面都返回到首页
        if (util.goHome()) {
            let { recommendObj = {} } = this.data;
            wx.switchTab({
                url: "/pages/home/home",
                preObj: recommendObj
            });
            return;
        }

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
    onShareAppMessage: function (e) {
        let product = that.data.data.orderProductList[0],
            price = product.price / 100 || "",
            basicPrice = product.basicPrice / 100 || "",
            title = '快！' + price + '元拼【原价' + basicPrice + '元】' + product.name;
        this.buried.deliver_type = that.data.deliveryType == 1 ? "商家自送" : "到店自提";
        this.buried.store_id = that.data.data.storeId;
        this.buried.sku_id = product.sku;
        this.buried.orgcode = that.data.data.orgCode;
        this.buried.type = e.from == "button" ? 1 : 0;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickInviteCollage",
            click_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        this.setData({
            showShare2WxDialog: false
        });
        return {
            //【1.0元拼（原价12元）】中国京欣大西瓜
            title: title,
            path: "/pages/groupBuy/join/index?groupId=" + that.data.data.groupCode + "&channel=2",
            imageUrl: that.data.data.shareImgUrl || ""
        }
    },
    countDown(time) {
        if (time > 0) {
            //时间  回调方法  当前实例
            util.countDown(time, this.countDownCallBack, this)
        }
    },
    //自定义 倒计时回调
    countDownCallBack(timeObj, that) {
        if (!timeObj.isOver) {
            that.setData({
                'cutdown.hour': timeObj.hour,
                'cutdown.minute': timeObj.minute,
                'cutdown.second': timeObj.second
            })
        } else {
            this.getOrderInfo()
        }
    },
    /**
     * 获取地址列表
     */
    getOrderInfo(onload) {
        let time = onload ? 0 : 500
        setTimeout( () =>{
            request({
              ...FNIDS.orderInfo,
              body: {
                orderId: that.data.orderId,
              },
              preObj: this.data.recommendObj || {},
            })
              .then((res) => {
                if (res && res.data.result) {
                  let data = res.data.result;
                  if (data && data.deliveryInfoList) {
                    data.deliveryInfoList.forEach((item) => {
                      //"value":"邓树海 185****8020<br/>北京市大兴区亦城财富中心财富大厦B-11",
                      if (item.value && item.value.indexOf("<br/>") > 0) {
                        item.value = item.value.replace("<br/>", "\n");
                        item.isAddress = true;
                      }
                    });
                  }
                  that.setData({
                    data: data,
                  });
                  //代付款
                  if (data.mainOrderState.orderState == 1) {
                    that.countDown(data.payEndTime - data.serverTime);
                    //带拼团
                  } else if (data.mainOrderState.orderState == 11) {
                    that.countDown(data.groupEndTime);
                    //待提货时间
                  } else if (data.mainOrderState.orderState == 12) {
                    that.countDown(data.selfPickEndTime - data.serverTime);
                  }
                  // 埋点上报
                  // 埋点
                  this.buried.order_id = data.orderId;
                  this.buried.store_id = data.storeId;
                  this.buried.deliver_type = data.deliveryType || "";
                  this.buried.group_type = data.groupType || "";

                  this.buried.promotionId = data.promotionId || "";
                  this.buried.groupId = data.groupCode || "";
                  this.buried.status =
                    (data.mainOrderState && data.mainOrderState.orderState) ||
                    "";

                  let product = data.orderProductList[0] || {};
                  this.buried.sku_id = product.sku;
                  this.buried.orgcode = data.orgCode;
                }
              })
              .catch((e) => {
                console.log(e);
              });
        }, time)
    },
    //取消订单
    // cancelOrder: orderPublic.cancelOrder,
    cancelOrder(e) {
        //埋点
        clickBuriedV2_({
            click_id: "ClickCancelOrder",
            click_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        orderPublic.cancelOrder(e);
    },
    //删除订单
    deleteOrder: orderPublic.deleteOrder,
    //再拼一次
    pinGroupAgain() {
        let product = that.data.data.orderProductList[0];
        let recommendObj = this.data.recommendObj || {};
        wx.navigateTo({
          url: "/pages/groupBuy/groupList/index",
          preObj: recommendObj,
          buried_position: "groupBuy-orderInfo1",
        });
        // 埋点
        this.buried.deliver_type = that.data.deliveryType == 1 ? "商家自送" : "到店自提";
        this.buried.store_id = that.data.data.storeId;
        this.buried.sku_id = product.sku;
        this.buried.orgcode = that.data.data.orgCode;
        clickBuriedV2_({
            click_id: "ClickCollageAgain",
            click_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    //支付
    gotopay: function () {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_pay",
            click_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (this.data.paying) {
            return;
        }
        this.setData({
            paying: true
        })
        let options = {
            orderId: this.data.orderId
        }
        let self = this;

        requestSign(options, function () {
            self.setData({
                paying: false
            })
            self.groupPayCheck(options.orderId).then(res => {
                let result = res.data.result;
                if (result) {
                    self.getOrderInfo()
                } else {
                    mp.dialog({
                        content: res.data.msg,
                        showCancel: false
                    }).then(res => {
                        if (res.confirm) {
                            // 校验拼团或参团失败
                            if (self.data.groupCode) {
                                wx.redirectTo({
                                  url:
                                    "../join/index?&groupId=" +
                                    self.data.groupCode,
                                  preObj: recommendObj,
                                  buried_position: "groupBuy-orderInfo",
                                });
                            }
                        }
                    })
                }
            }).catch(err => {

            })

        }, function () {
            self.setData({
                paying: false
            })
            self.getOrderInfo()
        });
        this.setData({
            showDialog: false
        })
    },
    /**
     * 校验参团
     */
    groupPayCheck(orderId) {
        return new Promise((resolve, reject) => {
            request({
              ...FNIDS.groupPayCheck,
              body: {
                orderId: orderId,
              },
              preObj: this.data.recommendObj || {},
            })
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
        })
    },
    //
    calling() {
        if (that.data.data.storePhone) {
            wx.makePhoneCall({
                phoneNumber: that.data.data.storePhone,
                success: function () { },
                fail: function () { }
            })
        }
    },
    //去门店的地图
    toMap(e) {
        let latitude = e.currentTarget.dataset.latitude,
            longitude = e.currentTarget.dataset.longitude;
        if (latitude && longitude) {
            wx.openLocation({
                latitude: latitude,
                longitude: longitude,
                scale: 28
            })
            // 埋点
            this.buried.order_id = that.data.orderId;
            this.buried.store_id = that.data.storeId;
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickCollStoreAdd",
                click_par: {
                    order_id: this.buried.order_id || "",
                    store_id: this.buried.store_id || "",
                    orgcode: this.buried.orgcode || "",
                    deliver_type: this.buried.deliver_type || "",
                    group_type: this.buried.group_type || "",
                    groupId: this.buried.groupId || "",
                    promotionId: this.buried.promotionId || "",
                    type: this.buried.type || "",
                    status: this.buried.status || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        }
    },
    requestData() {
        this.getOrderInfo()
    },
    //去详情页面
    goDetailInfo(e) {
        let {
            type,
            data
        } = e.detail;
        let recommendObj = this.data.recommendObj || {};
        wx.navigateTo({
          url:
            "/pages/groupBuy/goodDetail/index?orgCode=" +
            data.orgCode +
            "&promotionId=" +
            data.promotionId +
            "&skuId=" +
            data.skuId +
            "&storeId=" +
            data.storeId,
          preObj: recommendObj,
          buried_position: "groupBuy-orderInfo2",
        });
    },
    //去状态页面
    goOrderStatu() {
        let recommendObj = this.data.recommendObj || {};
        wx.navigateTo({
          url: `/pages/order/orderstatus/index?orderId=${this.data.orderId}`,
          preObj: recommendObj,
          buried_position: "groupBuy-orderInfo3",
        });
    },
    // 邀请好友
    inviteFriend() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickInviteCollage",
            click_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        this.setData({
            showShare2WxDialog: true

        })
    },
    // 点击朋友圈分享
    share2Moments(e) {
        let data = this.data.data;
        console.log(data)
        // 请求生成朋友圈图片接口
        mp.loading_cover();
        let params = {
          groupId: data.groupCode,
          channel: "1",
          storeId: data.storeId,
          orgCode: data.orgCode,
          skuId: data.orderProductList[0].sku,
          preObj: this.data.recommendObj || {},
        };
        this.setData({
            savePicDialogReportData: {
                create_time: new Date(),
                click_id: "ClickSavePicture",
                click_par: {
                    // origin: data.leader,
                }
            }
        })
        getGroupShareImg(params).then(res => {
            if (res.data.code == 0 && res.data.result) {
                this.setData({
                    showShare2WxDialog: false,
                    showShare2MomentsDialog: true,
                    momentsShareImgSrc: res.data.result,
                });
            } else {
                this.hintRequestShareMomentsPicFailed();
            }
        }).catch(err => {
            mp.hideLoading();
            let msg = (err && err.data) ? err.data.msg : "今日分享朋友圈机会已用完，请直接分享好友";
            this.hintRequestShareMomentsPicFailed(msg);
        })
    },
    //获取分享朋友圈图片失败提示
    hintRequestShareMomentsPicFailed(msg) {
        this.setData({
            showShare2WxDialog: false,
        });
        mp.toast({
            title: msg || "获取到分享朋友圈图片失败,稍后重试",
        });
    },
    // pv埋点上报
    // pv() {
    //
    // }
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
})
