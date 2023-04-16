import util from '../../../common/util/util';
import mp from "../../../common/util/wxapi";
import {
    request,
    FNIDS
} from '../../../common/util/api'
import {
    getShareUrl
} from '../../../common/util/share_utils.js';
import {
    getGroupShareImg
} from "../common/public";
import { pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
let app = getApp();
Page({
    // 埋点数据
    buried: {
        is_default: "",
        type: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        status: "",
        type: ""
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 是否展示空白页
        showEmpty: true,
        // 老带新团数据
        oldInviteNewList: [],
        // 超值优惠团数据
        valueGroupList: [],
        // 当前tab值,1:老带新，2：超值优惠团
        currentTab: 1,
        // 页面来源：person:做特殊处理
        from: "",
        //当前页码
        currentPage: 1,
        // 一页数据量
        pageSize: 10,
        // 是否有更多数据
        hasMoreData: true,
        // 底部提示文字
        loadTip: "",
        // 分享数据
        shareData: {},
        //是否展示分享到微信对话框
        showShare2WxDialog: false,
        //是否展示分享到朋友圈
        showShare2MomentsDialog: false,
        //分享到朋友圈图片地址
        momentsShareImgSrc: "",
        // 保存图片埋点数据
        savePicDialogReportData: {},
        // 默认页数据
        // 列表-类型
        type: 0,
        // 列表-提示
        tips: '',
        // 列表-按钮
        btnText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            currentTab: options.tabIndex || 1,
            from: options.from || ""
        })
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
        if (util.isLogin()) {
            this.initTabRequest()
        } else {
            //去登录
            this.showDefaultPage("您还没有登录哦", 2, '去登录')
        }
    },
    // 初始化tab请求
    initTabRequest(id) {
        let index = this.data.currentTab;
        if (id && id !== index) {
            index = id
        } else if (id == index) {
            return
        }
        this.setData({
            currentPage: 1,
            oldInviteNewList: [],
            valueGroupList: [],
            currentTab: index,
            loadTip: '',
            showEmpty: true,
            type: 0,
        })
        if (index == 1) {
            // 请求老带新团订单接口
            this.getMyOldInviteNewOrder(true)
        } else if (index == 2) {
            // 请求超值优惠团接口
            this.getValueOrder(true)
        }
    },
    // 点击tab切换
    clickTab(e) {
        let index = e.currentTarget.dataset.index;
        if (index == 1) {
            this.clickTabA()
        } else if (index == 2) {
            this.clickTabB()
        }
        this.initTabRequest(index)
    },
    // 埋点
    clickTabA() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "Clickoldandnew",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 埋点
    clickTabB() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "Clickordinarygroup",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 获取老带新订单
    getMyOldInviteNewOrder(needReportPv) {
        let data = this.data;
        if (data.currentPage > 1) {
            mp.loading_cover()
        }
        request({
          ...FNIDS.myOldInviteNewOrder,
          body: {
            currentPage: data.currentPage,
            dataSize: data.pageSize,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            mp.hideLoading();
            let result = res.data.result || [];
            if (result && result.length > 0) {
              let newData = this.data.oldInviteNewList.concat(result);
              this.setData({
                showEmpty: false,
                oldInviteNewList: newData,
              });

              if (result.length < this.data.pageSize) {
                this.setData({
                  hasMoreData: false,
                  loadTip: "已显示全部",
                });
              }
            } else {
              if (this.data.currentPage <= 1) {
                if (this.data.from == "person") {
                  this.setData({
                    from: "",
                  });
                  // 请求超值优惠团订单
                  this.initTabRequest(2);
                } else {
                  this.showDefaultPage(
                    "暂无订单，快去拼团享优惠吧~",
                    4,
                    "去拼团"
                  );
                }
              } else {
                this.setData({
                  showEmpty: false,
                  hasMoreData: false,
                  loadTip: "已显示全部",
                });
              }
            }
          })
          .catch((err) => {
            mp.hideLoading();
            this.showDefaultPage(err.msg, 1, "重新加载");
          });
    },
    // 获取超值优惠团订单
    getValueOrder(needReportPv) {
        let data = this.data;
        if (data.currentPage > 1) {
            mp.loading_cover()
        }
        request({
          ...FNIDS.groupOrderList,
          body: {
            currentPage: data.currentPage,
            dataSize: data.pageSize,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            mp.hideLoading();
            let result = res.data.result || [];
            if (result && result.length > 0) {
              let newData = this.data.valueGroupList.concat(result);
              this.setData({
                showEmpty: false,
                valueGroupList: newData,
              });

              // 判断是否加载更多
              if (result.length < this.data.pageSize) {
                this.setData({
                  hasMoreData: false,
                  loadTip: "已显示全部",
                });
              }
            } else {
              if (this.data.currentPage <= 1) {
                this.showDefaultPage(
                  "暂无订单，快去拼团享优惠吧~",
                  4,
                  "去拼团"
                );
              } else {
                this.setData({
                  showEmpty: false,
                  hasMoreData: false,
                  loadTip: "已显示全部",
                });
              }
            }
          })
          .catch((err) => {
            mp.hideLoading();
            this.showDefaultPage(err.msg, 1, "重新加载");
          });
    },
    // 加载更更多
    loadMore() {
        let index = this.data.currentTab;
        this.data.currentPage = this.data.currentPage + 1;
        if (this.data.hasMoreData) {
            if (index == 1) {
                this.getMyOldInviteNewOrder(false)
            } else {
                this.getValueOrder(false)
            }
        }
    },
    /**
     * @param err 错误信息
     * @param errorType 0 网络或者后端错误 ;1 没有可以展示的数据
     */
    showDefaultPage(err, errorType, btnTxt) {
        if (this.data.oldInviteNewList.length > 0 || this.data.valueGroupList.length > 0) {
            return;
        }
        let msg = err ? err : "";
        this.setData({
            // 默认页-是否展示
            showEmpty: true,
            // 默认页-提示
            tips: msg,
            // 默认页-按钮
            btnText: btnTxt || '重新加载',
            // 默认页-类型
            type: errorType,
        })
    },
    // 页面上报
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                is_default: this.buried.is_default || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    // 默认页处理
    onDefaultBtnEvent(e) {
        let type = e.detail.type;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickToCollage",
            click_par: {
                type: type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (type == 1) { //网络请求失败
            this.initTabRequest()
        } else if (type == 2) { //未登录

            wx.navigateTo({
              url: `/pages/newLogin/login/login`,
              preObj: recommendObj,
              buried_position: "groupBuy-groupOrder2",
            });
        } else if (type == 4) { //没有数据，去拼团列表
            this.buried.type = this.data.currentTab == 1 ? 1 : 2;
            wx.redirectTo({
              url: "/pages/groupBuy/groupList/index",
              preObj: recommendObj,
              buried_position: "groupBuy-groupOrder",
            });
        }
    },
    // 列表组件事件处理
    onListHandle(e) {
        let type = e.detail.type;
        let data = e.detail.data;
        if (type == 'refresh') {
            this.initTabRequest()
        } else if (type == 'shareApp') {
            console.log("e.detail-----", e.detail)
            this.setData({
                shareData: data.shareData,
                showShare2WxDialog: true
            })
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
        this.loadMore()
    },
    // 判断团状态
    getStatusStr(status) {
        // 拼团状态 0：待成团 1：已成团 2：团失败
        let statusStr = '';
        if (status == 0) {
            statusStr = '分享';
        } else if (status == 1) {
            statusStr = '成功';
        } else if (status == 2) {
            statusStr = '失败';
        }
        return statusStr;
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var url = getShareUrl();
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickMyCollageArea",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                type: this.buried.type || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (res.from === 'button') {
            // 拼团分享
            let from = res.target.dataset.from;
            if (from === 'groupBuy') {
                this.setData({
                    showShare2WxDialog: false
                });
                let shareData = this.data.shareData;
                let imgUrl = shareData.shareImgUrl;
                let skuName = shareData.skuName;
                let basicPrice = shareData.basicPrice;
                let price = shareData.groupPrice;
                let shareTitle = '快！' + price + '元拼【原价' + basicPrice + '元】' + skuName;
                return {
                    title: shareTitle,
                    path: '/pages/groupBuy/join/index?groupId=' + shareData.groupCode + "&channel=2",
                    imageUrl: imgUrl
                }
            } else {
                let data = res.target.dataset;
                let groupId = data.groupId;
                let skuName = data.skuName;
                let basicPrice = data.basicPrice;
                let groupPrice = data.groupPrice;
                let shareTitle = '快！' + groupPrice + '元拼【原价' + basicPrice + '元】' + skuName;
                let skuId = data.skuId || '';
                let storeId = data.storeId || '';
                let orgCode = data.orgCode || '';
                let status = data.status || '';
                // 埋点
                this.buried.store_id = storeId;
                this.buried.sku_id = skuId;
                this.buried.orgcode = orgCode;
                this.buried.status = this.getStatusStr(status);
                this.buried.type = this.data.currentTab == 1 ? 1 : 2;
                return {
                    title: shareTitle,
                    path: `/pages/groupBuy/oldInviteNew/fuel/index?promotionId=${data.promotionId}&groupId=${groupId}&storeId=${storeId}`,
                    imageUrl: data.shareImgUrl
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
        let orderData = this.data.shareData;
        mp.loading_cover();
        let params = {
          groupId: orderData.groupCode,
          channel: "1",
          storeId: orderData.storeId,
          orgCode: orderData.orgCode,
          skuId: orderData.skuId,
          preObj: this.data.recommendObj || {},
        };
        this.setData({
            savePicDialogReportData: {
                create_time: new Date(),
                click_id: "ClickSavePicture",
                click_par: {
                    origin: orderData.roleType,
                }
            }
        })
        // 请求生成朋友圈图片接口
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
})