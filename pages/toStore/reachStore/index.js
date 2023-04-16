import util from "../../../common/util/util.js";
import djBus from "../../../common/util/djBus";
import { request, FNIDS } from "../../../common/util/api";
import { getDaoJiaLocation } from "../../../common/util/services";
import { getLocation } from "../../../common/util/wxapi";
import { pvBuriedV2_ } from "../../../common/util/BI.js";
import { maidian } from "./public.js";

let app = getApp();

Page({
  data: {
    isLogin: util.isLogin(),
    defaultType: 0, // 默认页-类型
    defaultObj: {},
    showDefault: false, // 主页面是否展示错误页
    showEmpty: false, // 第二个接口报错
    showLoading: true, // 是否展示loading
    scrollTop: 0, // 页面滚动距离
    tabIsCiel: false, // 门店tab是否吸顶
    storeInfo: {},
    tabs: [], // 门店tab
    curIndex: 0, // 当前选中的门店tab
    couponSimpleInfo: [], // 门店头部优惠券标签和挽留弹层券信息
    showCouponMore: false, // 门店头是否展示查看更多
    storeCouponPop: {}, // 券半弹层数据
    showServiceHalf: false, // 是否展示商家服务服务半弹层
    showFloatBall: true, // 是否展开悬浮球
    showCouponMap: false, // 是否展示优惠券半弹层
    showStoreEducation: false, // 是否展示教育弹层
    opacity: 0,
    bgType: "jdToStore",
    clickTabFlag: false, // 是否是点击tab，如果点击tab则不让触发onPageCroll方法
    storeDetailTraceId: "", // 主接口traceId
    homePageTraceId: "", // 第二个接口的traceId
    tabFixedTop: 0, // tab吸顶时距离顶部的距离
  },
  onLoad(options) {
    let obj = {};
    let capsule = util.getCapsule();
    let addressInfo = wx.getStorageSync("address_info") || {};
    if (addressInfo.longitude) {
      obj.showDefault = false;
    }
    this.setData({
      storeId: options.storeId,
      orgCode: options.orgCode,
      bgType: options.bgType,
      keyword: options.keyword,
      capsule,
      navHeight: capsule.top + capsule.height + 10,
      isLogin: util.isLogin(),
      tabFixedTop: capsule.top + capsule.height,
      ...obj,
    });
    // 如果有地理位置信息
    if (addressInfo.longitude) {
      this.init();
    } else if (options.longitude && options.latitude) {
      getDaoJiaLocation(
        {
          longitude: options.longitude,
          latitude: options.latitude,
        },
        this.handleAddress,
        {}
      );
    } else {
      this.handleLocation();
    }
  },
  onShow() {
    // 监听登录态，如果变了需要刷新页面
    if (util.isLogin() && this.data.isLogin != util.isLogin()) {
      console.log('哈哈，进来登录态改变了')
      this.init();
    }
  },
  onPageScroll(e) {
    if (!this.data.showDefault) {
      this.data.scrollTop = e.scrollTop;
      let opacity = this.data.opacity;
      let tabIsCiel = this.data.tabIsCiel;

      if (e.scrollTop > 32) {
        opacity = (e.scrollTop - 32) / 32;
        opacity = opacity < 1 ? opacity : 1;
      } else {
        opacity = 0;
      }
      if (this.data.opacity != opacity) {
        this.setData({
          opacity: opacity,
        });
      }
      let { tabTop, navHeight = 33 } = this.data;
      // 门店tab吸顶
      if (e.scrollTop >= tabTop - navHeight) {
        tabIsCiel = true;
      } else {
        tabIsCiel = false;
      }
      if (tabIsCiel != this.data.tabIsCiel) {
        this.setData({
          tabIsCiel: tabIsCiel,
        });
      }
      // 滑动页面，右侧悬浮球
      this.computeFloatBall(e.scrollTop);
      
      if (!this.data.clickTabFlag) {
        // 滑动页面，同步门店tab选中状态
        this.computeDis(e.scrollTop);
      }
      
    }
  },
  async init() {
    let code = await this.fetchReachStore();
    code == 0 && this.fetchReachHome();
  },
  // 到店门店主接口
  fetchReachStore() {
    let {
      functionId = "",
      appVersion = "",
      method,
    } = FNIDS.reachStoreDetail || {};
    let recommendObj = this.data.recommendObj || {};
    return new Promise((resolve) => {
      request({
        functionId: functionId,
        appVersion: appVersion,
        method: method,
        isNeedDealError: true,
        isForbiddenDialog: true,
        pageId: recommendObj.pageIdFirstPage || "",
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          ref: recommendObj.prePageName || this.data.ref || "",
          pageSource: recommendObj.pageSource || "store",
          refPageSource: recommendObj.refPageSource || "",
          ref_par: {
            userAction: recommendObj.preUserAction || "",
            traceId: recommendObj.preTraceId || "",
          },
        },
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let { code, result, traceId} = res.data || {};
          if (code == 0 && result) {
            if (!result.storeInfo.logoUrl) {
              result.storeInfo.logoUrl = 'https://storage.360buyimg.com/wximg/common/reachStoreLogo.png'
            }
            if (!result.storeInfo.backgroundImage) {
              result.storeInfo.backgroundImage = 'https://storage.360buyimg.com/wximg/common/reachStoreBg.png'
            }
            let {
              storeInfo,
              storeCouponPop = {},
              storeCommentVO,
              switchStore,
            } = result || {};
            let obj = {};

            // 缓存里是否有弹出记录
            let storeEducation = wx.getStorageSync("storeEducation");
            if (result.switchStore && result.switchStore.btnName && !storeEducation) {
              obj.showStoreEducation = true;
            }
            this.setData({
              showLoading: false,
              showDefault: false,
              storeInfo,
              storeId: storeInfo.storeId || this.data.storeId,
              orgCode: storeInfo.orgCode || this.data.orgCode,
              couponSimpleInfo: storeCouponPop.smallCouponList || [],
              showCouponMore: storeCouponPop.couponShowTotal || false, // 门店头优惠券展示查看更多
              storeCouponPop, // 优惠券弹层数据
              storeCommentVO: storeCommentVO || {}, // 门店评价
              switchStore: switchStore || null, // 切换按钮
              storeDetailTraceId: traceId,
              ...obj,
            });
            resolve(code);
            maidian('getActMixType', {actMixType: storeInfo.storeBusinessType}, this.data.recommendObj)
          } else {
            resolve(-1);
            this.setData({
              showLoading: false,
              showDefault: true,
              defaultType: 1,
              defaultObj: {
                imgType: res.data.imgType,
                title: res.data.title,
                msg: res.data.msg,
                errorCode: res.data.errorCode,
                btnArr: res.data.btnArr,
                method: "fetchReachStore",
              },
            });
          }
        })
        .catch((err) => {
          resolve(-1);
          this.setData({
            showLoading: false,
            showDefault: true,
            defaultType: 2,
            defaultObj: {
              title: "网络请求失败",
              msg: "网络离家出走啦？我要把TA找回来~",
              btnArr: [
                {
                  btnName: "重新加载",
                  type: 1,
                },
              ],
              method: "fetchReachStore",
            },
          });
        });
    });
  },
  // 到店门店楼层接口
  fetchReachHome() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    let {
      functionId = "",
      appVersion = "",
      method,
    } = FNIDS.reachStoreHomepage || {};
    let recommendObj = this.data.recommendObj || {};
    let { storeId, orgCode, storeInfo } = this.data || {}
    request({
      functionId: functionId,
      appVersion: appVersion,
      method: method,
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: recommendObj.pageIdFirstPage || "",
      body: {
        storeId: storeId || "",
        orgCode: orgCode || "",
        storeArea: storeInfo.storeArea || '',
        ref: recommendObj.prePageName || this.data.ref || "",
        pageSource: recommendObj.pageSource || "store",
        refPageSource: recommendObj.refPageSource || "",
        ref_par: {
          userAction: recommendObj.preUserAction || "",
          traceId: recommendObj.preTraceId || "",
        },
      },
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        wx.hideLoading();
        let { code, result, traceId } = res.data || {};
        if (code == 0 && result) {
          let { data = [] } = result || {};
          this.setData(
            {
              floorList: data,
              showEmpty: false,
              homePageTraceId: traceId
            },
            () => {
              // 获取门店tag距离页面顶部的距离
              this.getStoreTabRect();
              this.getFloorTop();
            }
          );
        } else {
          this.setData({
            showEmpty: true,
            defaultType: 1,
            defaultObj: {
              imgType: res.data.imgType,
              title: res.data.title,
              msg: res.data.msg,
              errorCode: res.data.errorCode,
              btnArr: res.data.btnArr,
              method: "fetchReachHome",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        this.setData({
          showEmpty: true,
          defaultType: 2,
          defaultObj: {
            title: "网络请求失败",
            msg: "网络离家出走啦？我要把TA找回来~",
            btnArr: [
              {
                btnName: "重新加载",
                type: 1,
              },
            ],
            method: "fetchReachHome",
          },
        });
      });
  },
  // 获取门店tag距离页面顶部的距离以及自身的高度
  getStoreTabRect() {
    wx.createSelectorQuery()
      .select(".reach-store-tab")
      .boundingClientRect((rect) => {
        this.data.tabTop = rect.top;
        this.data.tabHeight = rect.height;
      })
      .exec();
  },
  // 获取各楼层的标题距离页面顶部的距离
  getFloorTop() {
    wx.createSelectorQuery()
      .selectAll(".tostore-floor")
      .boundingClientRect((rects) => {
        let allFloorTopArr = [];
        let { tabHeight = 55, navHeight = 33 } = this.data;
        rects &&
          rects.length &&
          rects.forEach((item) => {
            let top = item.top - tabHeight - navHeight;
            allFloorTopArr.push(top);
          });
        allFloorTopArr.length && allFloorTopArr.unshift(0);
        allFloorTopArr.length && allFloorTopArr.push(Infinity);
        this.data.allFloorTopArr = allFloorTopArr;
      })
      .exec();
  },
  // 点击门店tab
  clickTab(e) {
    let { index, jumpIndex } = e.currentTarget.dataset || {};
    this.setData({
      curIndex: index,
    });
    this.data.clickTabFlag = true
    wx.pageScrollTo({
      selector: `.floor_${jumpIndex}`,
      offsetTop: -(this.data.tabHeight + this.data.tabFixedTop),
      duration: 300,
      complete: () => {
        setTimeout(() => {
          this.data.clickTabFlag = false
        }, 100)
      }
    });
  },
  // 滑动页面，同步门店tab选中状态
  computeDis(scrollTop) {
    console.log('---')
    let { allFloorTopArr = [] } = this.data;
    let curIndex = this.data.curIndex;
    for (let i = 0; i < allFloorTopArr.length - 1; i++) {
      const curTop = allFloorTopArr[i];
      const nextTop = allFloorTopArr[i + 1];
      if (scrollTop >= curTop && scrollTop < nextTop) {
        curIndex = i;
        break;
      }
    }
    if (this.data.curIndex == curIndex) return;
    this.setData({
      curIndex,
    });
    // 示例
    // if(top < 544) {
    //   curIndex = 0
    // }else if(top >= 544 && top < 806) {
    //   curIndex = 1
    // }else if(top >= 806 && top < 1252) {
    //   curIndex = 2
    // }else {
    //   curIndex = 3
    // }
  },
  // 处理悬浮球
  computeFloatBall(scrollTop) {
    // 处理悬浮球
    if (this.data.showFloatBall) {
      this.setData({
        showFloatBall: false,
      });
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (scrollTop == this.data.scrollTop) {
        this.setData({
          showFloatBall: true,
        });
      } else {
        this.setData({
          showFloatBall: false,
        });
      }
      clearTimeout(this.timer);
    }, 800);
  },
  // 展示优惠信息半弹层
  showCouponHalf() {
    djBus.emit("mask_newCouponLayer", this.data.recommendObj);
    this.setData({
      showCouponMap: true,
    });
  },
  widgetEvent(e) {
    let type = e.detail.type;
    let data = e.detail.data;
    // 展开商家服务半弹层
    if (type == "orgServiceHalf") {
      let { storeInfo, storeCommentVO } = this.data;
      if (storeInfo && storeCommentVO) {
        djBus.emit("mask_shopService", this.data.recommendObj);
        this.setData({
          showServiceHalf: true,
        });
      }
    }
    // 关闭商家服务半弹层
    else if (type == "closeOrgServiceHalf") {
      this.setData({
        showServiceHalf: false,
      });
    }
    // 展开优惠券半弹层
    else if (type == "couponHalf") {
      this.showCouponHalf();
    }
    // 关闭优惠券半弹层
    else if (type == "closeCouonHalf") {
      this.setData({
        showCouponMap: false,
      });
    }
    // 关闭教育弹层
    else if (type == "closeEducationPop") {
      this.setData({
        showStoreEducation: false,
      });
    }
    // 关闭优惠券弹层 需要异步刷新券接口
    else if (type == "asyncFreshStoreCoupon") {
      this.asyncFetchCoupon();
    }
  },
  // 获取到家地理位置信息
  handleAddress(addressInfo) {
    if (addressInfo == null) {
      //定位失败，展示错误地址页
      this.setData({
        showDefault: true,
        defaultType: 3,
      });
    } else {
      app.globalData.refreshHomeFlag = true;
      app.saveAddress(addressInfo);
      this.setData({
        showDefault: false,
        defaultType: 0,
      });
      this.init();
    }
  },
  // 获取微信经纬度
  handleLocation() {
    getLocation()
      .then((res) => {
        getDaoJiaLocation(
          {
            longitude: res.longitude,
            latitude: res.latitude,
          },
          this.handleAddress,
          {}
        );
      })
      .catch((err) => {
        this.setData({
          showDefault: true,
          defaultType: 3,
        });
      });
  },
  // 缺省页按钮回调
  onDefaultBtnEvent(e) {
    let { type, defaultObj = {} } = e.detail;
    if (type == 1 || type == 2) {
      if (defaultObj.method == "fetchReachStore") {
        this.init();
      } else if (defaultObj.method == "fetchReachHome") {
        this.fetchReachHome();
      }
    }
  },
  // 异步刷新券接口
  asyncFetchCoupon() {
    let { functionId, appVersion, method } = FNIDS.asyncFreshStoreCoupon;
    let recommendObj = this.data.recommendObj || {};
    request({
      functionId: functionId,
      appVersion: appVersion,
      method: method,
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: recommendObj.pageIdFirstPage || "",
      body: {
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        ref: recommendObj.prePageName || this.data.ref || "",
        pageSource: recommendObj.pageSource || "store",
        refPageSource: recommendObj.refPageSource || "",
        ref_par: {
          userAction: recommendObj.preUserAction || "",
          traceId: recommendObj.preTraceId || "",
        },
        bgType: this.data.bgType,
      },
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let { code, result } = res.data || {};
        if (code == 0 && result) {
          let storeCouponPop = result;
          this.setData({
            couponSimpleInfo: storeCouponPop.smallCouponList || [],
            storeCouponPop,
          });
        }
      })
      .catch((err) => {});
  },
  pvFunc(back) {
    let { storeBusinessType = 2 } = this.data.storeInfo || {};
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: this.data.storeId || "",
        // businessType: storeBusinessType,
        keyword: this.data.keyword,
        storeStyle: 'new',
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        },
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
    // this.setData({
    //   refPar: {
    //     userAction: recommendObj.preUserAction,
    //     traceId: recommendObj.preTraceId,
    //   },
    // });
  },
});
