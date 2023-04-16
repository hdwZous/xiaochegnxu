import {
    request,
    FNIDS
} from '../../../common/util/api'
import mp from '../../../common/util/wxapi'
import {
    isLogin
} from '../../../common/util/loginUtil'
import { pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
import {
    getGroupShareImg
} from "../common/public.js"
import orderPublic from '../../../common/util/public.js'

// 埋点描述文件
let app = getApp();
Page({
    // 埋点描述文件
    // 埋点数据
    buried: {
        type: '',
        status: '',
        order_id: '',
        store_id: '',
        sku_id: '',
        orgcode: '',
        deliver_type: '',
        group_type: '',
        storeId: "",
        title: "",
        promotionId:"",
        groupId:"",
        
        
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        orderId: "",
        data: {},
        isLogin: false,
        showPop: false,
        // 展示分享微信朋友圈弹层
        showShare2WxDialog: false,
        // 朋友圈分享图片
        momentsShareImgSrc: "",
        // 保存分享图片弹层
        showShare2MomentsDialog: false,
        // 点击保存图片埋点信息
        savePicDialogReportData: {},
        
    },

    // 生命周期函数--监听页面加载
    onLoad(options) {
        this.setData({
            orderId: options.orderId || ""
        })
        this.groupPayFinish(options.orderId);
        
        
    },
    // 支付结果
    groupPayFinish(orderId) {
        let self = this;
        request({
          ...FNIDS.groupPayFinish,
          body: {
            orderId: orderId || this.data.orderId || "",
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let result = res.data.result;
            if (!result.userInfoList) {
              result.userInfoList = [null];
            }
            if (result) {
              if (result.type === 1) {
                // 开团
                result.title =
                  '还差<span class="num">' +
                  result.leftMembers +
                  "人</span>成团";
                result.btnText = "邀请好友参团，一起享超级优惠";
                result.tips = "偷偷告诉你，分享到两个微信群，成功率高达99%";
                if (result.status !== 1) {
                  mp.dialog({
                    content: result.failReason,
                    showCancel: false,
                  })
                    .then((res) => {})
                    .catch((err) => {});
                } else {
                  // 埋点
                  this.buried.type = 1;
                  this.buried.status = "开团成功";
                  this.buried.order_id = self.data.orderId;
                  this.buried.store_id = result.storeId;
                  this.buried.sku_id = result.skuId;
                  this.buried.orgcode = result.orgCode;
                  this.buried.deliver_type = result.deliveryType;
                  this.buried.group_type = result.groupMode;
                }
              } else if (result.type === 2) {
                // 参团
                if (result.status && result.status === 1) {
                  // 参团成功
                  // 埋点
                  this.buried.type = 2;
                  this.buried.status = "未成团";
                  this.buried.order_id = self.data.orderId;
                  this.buried.store_id = result.storeId;
                  this.buried.sku_id = result.skuId;
                  this.buried.orgcode = result.orgCode;
                  this.buried.deliver_type = result.deliveryType;
                  this.buried.group_type = result.groupMode;
                  if (result.type == 2) {
                    result.title = "参团成功";
                    result.failReason = "";
                    result.btnText = "邀请好友参团，一起享超级优惠";
                    result.tips = "偷偷告诉你，分享到两个微信群，成功率高达99%";
                  } else {
                    result.title = "参团成功";
                    result.failReason = "等待成团后凭提货码到门店取货";
                    result.btnText = "邀请好友参团，一起享超级优惠";
                    result.tips = "偷偷告诉你，分享到两个微信群，成功率高达99%";
                  }
                  // 拼团成功判断是否展示新人券
                  self.showCoupon();
                } else if (result.status && result.status === 2) {
                  // 拼团成功
                  // 埋点
                  this.buried.type = 2;
                  this.buried.status = "已成团";
                  this.buried.order_id = self.data.orderId;
                  this.buried.store_id = result.storeId;
                  this.buried.sku_id = result.skuId;
                  this.buried.orgcode = result.orgCode;
                  this.buried.deliver_type = result.deliveryType;
                  this.buried.group_type = result.groupMode;
                  if (result.type == 2) {
                    result.title = "拼团成功";
                    result.txtBtn = "";
                    result.remainTime = 0;
                    result.failReason = "";
                  } else {
                    result.title = "拼团成功";
                    result.txtBtn = "请去订单详情查看提货码>";
                    result.remainTime = 0;
                    result.failReason =
                      "请凭提货码" + result.pickTime + "小时内到店取货";
                  }
                  // 拼团成功判断是否展示新人券
                  self.showCoupon();
                } else {
                  mp.dialog({
                    content: result.failReason,
                    showCancel: false,
                  })
                    .then((res) => {})
                    .catch((err) => {});
                }
              }
              // 埋点
              this.buried.store_id = result.storeId;
              this.buried.sku_id = result.skuId;
              this.buried.orgcode = result.orgCode;
              this.buried.deliver_type = result.deliveryType;
              this.buried.group_type = result.groupMode;
              this.buried.groupId = result.groupId;
              this.buried.promotionId = result.promotionId;

              // 更新数据
              this.setData({
                data: result,
                type: result.type,
              });
            }
          })
          .catch((err) => {});
    },
    // pv埋点上报
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                type: this.buried.type || "",
                status: this.buried.status || "",
                order_id: this.buried.order_id || "",
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    // 组件事件监听
    widgetEvent(e) {
        let type = e.detail.type;
        let data = e.detail.data;
        console.log(e)
        if (type === 'groupClickTxtBtn') {
            this.goToOrderDetail()
        } else if (type == 'groupClickBtn') {
            this.setData({
                showShare2WxDialog: true
            })
            this.clickInvite()
        }
    },
    clickInvite(){
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickInvite",
            click_par: {
                sku_id: this.buried.sku_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                leader: this.buried.leader || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 去订单详情
    goToOrderDetail() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickorder",
            click_par: {
                sku_id: this.buried.sku_id || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                leader: this.buried.leader || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        wx.navigateTo({
          url: "/pages/groupBuy/orderInfo/index?orderId=" + this.data.orderId,
          preObj: recommendObj,
          buried_position: "groupBuy-paySucess1",
        });
    },
    //去拼团详情
    goToGroupBuyDetail() {
        wx.navigateTo({
          url:
            "/pages/groupBuy/collection/myCollectionDetail/index?orderId=" +
            this.data.orderId,
          preObj: this.data.recommendObj,
          buried_position: "groupBuy-paySucess2",
        });
    },
    // 去首页
    goToHome() {
        let app = getApp(),
            data = this.data.data;
        this.buried.storeId = data.storeId || "";
        this.buried.sku_id = data.skuId || "";
        this.buried.orgcode = data.orgCode || "";
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickstore",
            click_par: {
                storeId: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                leader: this.buried.leader || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        // 经首页到门店主页
        if (data.storeId && data.orgCode) {
            app.globalData.jumpType = "p20";
            app.globalData.jumpParams = {
                storeId: data.storeId,
                orgCode: data.orgCode
            };
        }
        wx.switchTab({
            url: '/pages/home/home',
            preObj: recommendObj
        })
    },
    // 拼团分享
    onShareAppMessage(res) {
        let data = this.data.data;
        let groupId = data.groupId;
        let skuName = data.skuName;
        let basicPrice = data.basicPrice;
        let actPrice = data.actPrice;
        let shareTitle = '快！' + actPrice + '元拼【原价' + basicPrice + '元】' + skuName;

        //【1.0元拼（原价12元）】中国京欣大西瓜
        if (res.from === 'button') {
            // 埋点
            let status = '';
            if (data.type == 1) {
                status = '开团成功'
            } else if (data.type == 2 && data.status == 1) {
                status = '未成团'
            }
            this.setData({
                showShare2WxDialog: false
            });
            // 埋点
            this.buried.status = status;
            this.buried.order_id = this.data.orderId;
            this.buried.deliver_type = this.data.type == 1 ? "商家自送" : "到店自提";
            this.buried.store_id = data.storeId;
            this.buried.sku_id = data.skuId;
            this.buried.orgcode = data.orgCode;
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickInviteCollage",
                click_par: {
                    status: this.buried.status || "",
                    order_id: this.buried.order_id || "",
                    deliver_type: this.buried.deliver_type || "",
                    store_id: this.buried.store_id || "",
                    orgcode: this.buried.orgcode || "",
                    sku_id: this.buried.sku_id || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
            return {
                title: shareTitle,
                path: '/pages/groupBuy/join/index?groupId=' + groupId + "&channel=2",
                imageUrl: this.data.data.shareImgUrl
            }
        } else {
            return {
                title: shareTitle,
                path: '/pages/groupBuy/join/index?groupId=' + groupId,
                imageUrl: this.data.data.shareImgUrl
            }
        }
    },
    // 参团，拼团成功后判断是否展示新人券
    showCoupon() {
        let isLogin = getApp().globalData.loginStateInfo && getApp().globalData.loginStateInfo.o2o_m_h5_sid
        // 拼团成功判断是否展示新人券
        if (isLogin) {
            orderPublic.judgeNewPerson().then(res => {
                let result = res.data.result;
                let showPop = false;
                if (res.data.code == "0") {
                    if (result.layerType == "3" || result.layerType == "6") {
                        showPop = true
                    } else {
                        showPop = false
                    }
                } else {
                    showPop = false
                }
                this.setData({
                    showPop: showPop,
                    isLogin: true
                })
            })
            // 埋点
            this.buried.title = '15元红包待使用弹层'
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickInviteCollage",
                click_par: {
                    title: '15元红包待使用弹层',
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        } else if (!isLogin) {
            this.setData({
                showPop: true,
                isLogin: false
            })
            // 埋点
            this.buried.title = '15元红包待使用弹层'
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickInviteCollage",
                click_par: {
                    title: '15元红包待使用弹层',
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        }
    },
    // 点击朋友圈分享
    share2Moments(e) {
        let data = this.data.data;
        console.log(data)
        // 请求生成朋友圈图片接口
        mp.loading_cover();
        let params = {
          groupId: data.groupId,
          channel: "1",
          storeId: data.storeId,
          orgCode: data.orgCode,
          skuId: data.skuId,
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
    pageBuried(e) {
        const { title, type, types } = e.detail;
        if (type == 1 || type == 2 || type == 3) {
            this.layerBuried(title)
        }
        if (type == 4 || type == 5 || type == 6) {
            this.closeBuried(title, types)
        }
    },
    layerBuried(title) {
        this.buried.title = title
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "layer",
            click_par: {
                title: this.buried.title || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    closeBuried(title, type) {
        this.buried.title = title
        this.buried.type = type
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "layer",
            click_par: {
                title: title || "",
                type: type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    }
});