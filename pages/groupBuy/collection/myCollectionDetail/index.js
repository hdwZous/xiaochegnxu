import mp from "../../../../common/util/wxapi";
import { FNIDS, request } from "../../../../common/util/api";
import util from "../../../../common/util/util";
import { getGroupShareImg } from "../../common/public";
import { requestSign } from "../../../../common/util/PayTools";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI";
let app = getApp();
Page({
    buried: {
        store_id: '',
        sku_id: '',
        orgcode: '',
        deliver_type: '',
        status: '',
        group_type: '',
        title: "",
        
        
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        orderId: '',
        orderData: {},
        pickCodeList: [],
        showPickCodeList: [],
        currentPickCodeList: [],
        isLoadMore: false,
        loadMoreStatus: false,
        btnTxt: '展示完整信息',
        timeObj: {
            hour: '00',
            minute: '00',
            second: '00'
        },
        timer: {},
        candleOnceMore: true,
        // 展示分享微信朋友圈弹层
        showShare2WxDialog: false,
        // 朋友圈分享图片
        momentsShareImgSrc: "",
        // 保存分享图片弹层
        showShare2MomentsDialog: false,
        // 点击保存图片埋点信息
        savePicDialogReportData: {},
        // 是否已经提交支付
        isPay: false,
        
    },

    // 生命周期函数--监听页面加载
    onLoad(options) {
        this.setData({
            orderId: options.orderId || ""
        });
        this.init();
        
        
    },
    // 生命周期函数--监听页面显示
    onShow() {
    },
    // 初始化
    init() {
        let orderId = this.data.orderId;
        this.getOrderInfo(orderId);
    },
    // 获取订单详情
    getOrderInfo(orderId) {
        // 重置时间
        let params = {
            orderId: orderId
        };
        let self = this;
        mp.loading();
        request({
          ...FNIDS.groupOrderDetail,
          body: params,
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            mp.hideLoading();
            let data = res.data;
            if (data.result.status == 1) {
              util.countDown(
                data.result.payRemainTime,
                self.timeCallback,
                self
              );
            }
            if (data.result.status == 2) {
              util.countDown(data.result.remainTime, self.timeCallback, self);
            }
            if (data.code == "0") {
              this.setData({
                orderData: data.result,
                pickCodeList: data.result.pickCodeList || [],
                orderList: data.result,
                isPay: false,
              });
              this.loadMoreDataHandle(this.deepClone(data.result.pickCodeList));
            }
            // 埋点上报
            let result = data.result;
            // 埋点
            this.buried.store_id = result.storeId || "";
            this.buried.sku_id = result.skuId || "";
            this.buried.orgcode = result.orgCode || "";
            this.buried.deliver_type = result.deliveryType || "";
            this.buried.status = result.status || "";
            this.buried.group_type = result.groupMode || "";
            this.buried.groupId = result.groupCode || "";
            this.buried.promotionId = result.promotionId || "";
          })
          .catch((err) => {
            mp.hideLoading();
          });
    },
    // 加载更多
    loadMore(e) {
        let status = e.currentTarget.dataset.status;
        if (status == "open") {
            this.setData({
                loadMoreStatus: !this.data.loadMoreStatus,
                currentPickCodeList: this.data.showPickCodeList
            });
        } else {
            this.setData({
                loadMoreStatus: !this.data.loadMoreStatus,
                currentPickCodeList: this.data.pickCodeList
            });
        }
    },
    // 处理加载更多的数据
    loadMoreDataHandle(data) {
        if (!data) {
            return;
        }
        if (data.length <= 2) {
            this.setData({
                showPickCodeList: data,
                currentPickCodeList: this.deepClone(data)
            });
        } else if (data.length > 2) {
            data.length = 2;
            this.setData({
                showPickCodeList: data,
                currentPickCodeList: this.deepClone(data),
                isLoadMore: true
            });
        } else {
        }
    },
    // 深拷贝
    deepClone(obj) {
        // 只拷贝对象
        if (typeof obj !== 'object') return;
        var newObj = obj instanceof Array ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    },
    // 再拼一次
    noceMore() {
        let recommendObj = this.data.recommendObj || {};
        wx.navigateTo({
          url: "../../groupList/index",
          preObj: recommendObj,
          buried_position: "groupBuy-collection",
        });
        // 埋点上报
        let result = this.data.orderData;
        // 埋点
        this.buried.store_id = result.storeId || '';
        this.buried.sku_id = result.skuId || '';
        this.buried.orgcode = result.orgCode || '';
        this.buried.deliver_type = result.deliveryType || '';
        this.buried.status = result.status || '';
        this.buried.group_type = result.groupMode || '';
        clickBuriedV2_({
            click_id: "ClickCollageAgain",
            click_par: {
                store_id: result.storeId || "",
                sku_id: result.skuId || "",
                orgcode: result.orgCode || "",
                deliver_type: result.deliveryType || "",
                status: result.status || "",
                group_type: result.groupMode || "",
                groupId: result.groupId || "",
                promotionId: result.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 时间回调函数
    timeCallback(timeObj, that) {
        if (!timeObj.isOver) {
            let index = 'timeObj';
            let hourIndex = index + '.hour',
                minuteIndex = index + '.minute',
                secondIndex = index + '.second';
            that.setData({
                [hourIndex]: timeObj.hour,
                [minuteIndex]: timeObj.minute,
                [secondIndex]: timeObj.second
            });
        } else {
            clearInterval(that.data.timer);
            that.getOrderInfo(that.data.orderId);
        }
    },
    // 取消订单
    candleOrder() {
        if (!this.data.candleOnceMore) {
            return false;
        }
        // 防止重复取消
        this.setData({
            candleOnceMore: false
        });
        wx.showModal({
            title: '提示',
            content: '是否取消订单？',
            confirmText: '取消',
            cancelText: '返回',
            success: (res) => {
                if (res.confirm) {
                    // 请求接口
                    let params = {};
                    params.orderId = this.data.orderData.orderId || "";
                    mp.loading();
                    request({
                      ...FNIDS.candleOrder,
                      body: params,
                      preObj: this.data.recommendObj || {},
                    })
                      .then((res) => {
                        mp.hideLoading();
                        if (res.data.code == "0") {
                          mp.toast({
                            title: "取消订单成功",
                          });
                          setTimeout(() => {
                            this.getOrderInfo(this.data.orderId);
                          }, 2000);
                        } else {
                          this.setData({
                            candleOnceMore: true,
                          });
                          mp.toast({
                            title: res.data.msg,
                          });
                        }
                      })
                      .catch((err) => {
                        mp.hideLoading();
                        this.setData({
                          candleOnceMore: true,
                        });
                      });
                    // 埋点上报
                    this.updataClick();
                } else {
                    this.setData({
                        candleOnceMore: true
                    });
                }
            }
        });
        // 埋点上报
        let data = this.data.orderData;
    
        // 埋点
        this.buried.store_id = data.storeid || '';
        this.buried.sku_id = data.skuId || '';
        this.buried.orgcode = data.orgCode || '';
        this.buried.deliver_type = data.deliveryType || '';
        this.buried.status = data.status || '';
        this.buried.group_type = data.groupMode || '';
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickCancelOrder",
            click_par: {
                store_id: result.storeId || "",
                sku_id: result.skuId || "",
                orgcode: result.orgCode || "",
                deliver_type: result.deliveryType || "",
                status: result.status || "",
                group_type: result.groupMode || "",
                groupId: result.groupId || "",
                promotionId: result.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 分享组件
    showShare(e) {
        let data = e.currentTarget.dataset;
        this.setData({
            showShare2WxDialog: true,
            groupShareData: data
        });
        let result = this.data.orderData;
        // 埋点
        this.buried.store_id = result.storeid || '';
        this.buried.sku_id = result.skuId || '';
        this.buried.orgcode = result.orgCode || '';

        this.buried.deliver_type = result.deliveryType || '';
        this.buried.status = result.status || '';
        this.buried.group_type = result.groupMode || '';
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickInviteCollage",
            click_par: {
                store_id: result.storeId || "",
                sku_id: result.skuId || "",
                orgcode: result.orgCode || "",
                deliver_type: result.deliveryType || "",
                status: result.status || "",
                group_type: result.groupMode || "",
                groupId: result.groupId || "",
                promotionId: result.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 分享数据注入
    onShareAppMessage: function (res) {
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "share_fission_coupon",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                status: this.buried.status || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        let shareUtil = require('../../../../common/util/share_utils.js');
        let url = shareUtil.getShareUrl();
        let self = this;
        if (res.from === 'button') {
            // 拼团分享
            let dataSet = res.target.dataset;
            let from = dataSet.from;
            if (from === 'groupBuy') {
                this.setData({
                    showShare2WxDialog: false
                });
                let orderData = self.data.orderData;
                let imgUrl = orderData.shareImgUrl;
                let skuName = orderData.skuName;
                let basicPrice = orderData.basicPrice;
                let price = orderData.groupPrice;
                let shareTitle = '快！' + price + '元拼【原价' + basicPrice + '元】' + skuName;
                return {
                    title: shareTitle,
                    path: '/pages/groupBuy/join/index?groupId=' + orderData.groupCode + "&channel=2",
                    imageUrl: imgUrl
                }
            } else {
                return {
                    title: self.data.shareTitle,
                    path: self.data.sharePath,
                    imageUrl: self.data.shareImg
                }
            }
        } else {
            return {
                title: '京东到家',
                path: url
            }
        }
    },
    // 点击朋友圈分享
    share2Moments(e) {
        let orderData = this.data.orderData;
        // 请求生成朋友圈图片接口
        mp.loading_cover();
        let params = {
            groupId: orderData.groupId,
            channel: "1",
            storeId: orderData.storeId,
            orgCode: orderData.orgCode,
            skuId: orderData.skuId,
            preObj: this.data.recommendObj || {}
        }
        this.setData({
            savePicDialogReportData: {
                create_time: new Date(),
                click_id: "ClickSavePicture",
                click_par: {
                    origin: orderData.roleType,
                }
            }
        });
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
    // 支付
    rePay(e) {
        if (this.data.isPay) {
            return false;
        }
        this.setData({
            isPay: true
        });
        let orderId = e.currentTarget.dataset.orderId;
        let groupMode = e.currentTarget.dataset.groupMode;
        let that = this;
        let options = {
            orderId: orderId,
            groupMode: groupMode
        };
        // 支付
        requestSign(options, function (res) {
            mp.toast({
                title: "支付成功"
            });
            setTimeout(() => {
                that.getOrderInfo(options.orderId);
            }, 2000);
        }, function (res) {
            that.setData({
                isPay: false
            });
        });

        // 埋点上报
        let result = this.data.orderData;
        // 埋点
        this.buried.store_id = result.storeid || '';
        this.buried.sku_id = result.skuId || '';
        this.buried.orgcode = result.orgCode || '';
    

        this.buried.deliver_type = result.deliveryType || '';
        this.buried.status = result.status || '';
        this.buried.group_type = result.groupMode || '';
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_pay",
            click_par: {
                store_id: result.storeId || "",
                sku_id: result.skuId || "",
                orgcode: result.orgCode || "",
                deliver_type: result.deliveryType || "",
                status: result.status || "",
                group_type: result.groupMode || "",
                groupId: result.groupId || "",
                promotionId: result.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 支付成功
    paySuccess(orderId) {
        this.getOrderInfo(orderId);
    },
    // 支付失败
    payFail() {
        this.setData({
            isPay: false
        });
        mp.toast({
            title: '支付失败'
        });
    },
    //  跳转到商品详情
    toGoodsDeta() {
        let orderData = this.data.orderData;
        let recommendObj = this.data.recommendObj || {};
        wx.navigateTo({
          url: `/pages/groupBuy/goodDetail/index?orgCode=${orderData.orgCode}&promotionId=${orderData.promotionId}&skuId=${orderData.skuId}&storeId=${orderData.storeId}`,
          preObj: recommendObj,
          buried_position: "groupBuy-collection2",
        });
    },
    toMyOrderList() {
        let recommendObj = this.data.recommendObj || {};
        wx.switchTab({
            url: '/pages/tabBar/orderlist/index',
            preObj: recommendObj
        })
    },
    // pv上报方法
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                status: this.buried.status || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    // click上报方法
    updataClick() {
        // this.buried.title = "是否取消订单";
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ExposureLayer",
            click_par: {
                title: "是否取消订单",
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                status: this.buried.status || "",
                group_type: this.buried.group_type || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    /**
     * 清除计时器
     */
    clearInterval() {
        let timerObj = this.data.timer
        let timerArr = Object.keys(timerObj)
        timerArr.forEach(item => {
            clearInterval(timerObj[item])
        })
    }
})
