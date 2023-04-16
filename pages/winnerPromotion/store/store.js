import {
  djGetLocation,
  djToLogin,
  djIsLogin,
} from "../utils/modules/dj_wx_mini_util";
import { storeDetail } from "../services/index";
import { isIponeX } from "../utils/common";
import { pvLog, clickLog, epLog } from "../utils/log";

wx.setStorageSync('BRAND_ENV', '') // 设置为空访问线上环境 testpdjm.jd.com 第二套 prepdjm.jd.com 第一套 testpdj-three.jd.com 第三套

//Page Object
Page({
  data: {
    showExceptionButton: false, // 接口失败展示重进小程序按钮
    showCouponPopup: false,
    query: {
      storeId: "10006391",
      orgCode: "71598",
      // storeId: "11947304",
      // orgCode: "345618",
      // storeId: '11955793',
      // orgCode: '308036'
    }, // 进入页面参数
    store: {}, // 总量数据
    // storeCouponInfo: {}, // 优惠券信息
    longitude: "",
    latitude: "",

    cateList: [], // 分类信息渲染用
    secondList: [], // 三级分类，渲染用

    flatCatList: [],
    flatCatIndexMap: {},
    defaultOpenCat: "",

    curIndex: 0, // 当前拍平的数组下标
    cateIndex: 0, // 锚中的一级分类
    secondIndex: -1, // 锚中的二级分类
    preOpenIndex: 0, // 前一个打开的分类
    showAllSecondCate: false, // 是否展示二级分类蒙层
    isIpX: isIponeX(),

    preSwiperIndex: 0,
    curSwiperIndex: 0
  },
  onLoad(options) {
    if (options.storeId && options.orgCode) {
      this.setData({
        query: { storeId: options.storeId, orgCode: options.orgCode },
        curIndex: 0 // 这里设置一下是为了判断 如果有curIndex就不在show里init
      });
    }
  },
  onShow() {
    if (!djIsLogin()) {
      djToLogin();
    }
    if (this.data.curIndex == 0) { // 判断如果有操作分类就不重新init
      this.init()
    }
  },
  async init() {
    pvLog('winner_store_info_page', { shop_id: this.data.query.storeId })
    this.setData({
      flatCatList: [],
      flatCatIndexMap: {},
      defaultOpenCat: "",
    });

    // 获取门店数据
    await this.fetchStoreData();
  },
  async fetchStoreData() {
    const { latitude, longitude } = await djGetLocation();

    const res = await storeDetail({
      couponId: "",
      storeId: this.data.query.storeId,
      // skuId: "2019694000",
      orgCode: this.data.query.orgCode,
      activityId: "",
      promotionType: "",
      longitude,
      latitude,
      source: "storeListByKey",
      cateName: "",
      channelBusiness: "",
      channelId: "",
      // keyWord: "旺仔",
      ref: "",
      pageSource: "store",
    });

    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      this.setData({ showExceptionButton: true })
      return
    }

    this.setData({ store: res.result });
    // console.log('this.data.store: ', this.data.store.storeCouponInfo)
    // console.log('ppppp: ', this.data.store.storeCouponInfo.couponModelList.slice(0, 5))
    await this.handleCateList(res.result.cateList);
    const { curIndex, cateList } = this.data;
    let e = {
      detail: {
        currentTarget: {
          dataset: { index: curIndex, item: cateList[curIndex] },
        },
      },
    }; // 初始化第一个分类
    this.clickClassify(e);
  },
  handleToSearch() {
    clickLog('winner_store_info_page__click_search')
    wx.navigateTo({
      url: `/pages/winnerPromotion/search/search?storeId=${this.data.query.storeId}&orgCode=${this.data.query.orgCode}&channelId=`,
    });
  },
  // 处理左侧分类
  handleCateList(cateList = []) {
    const { flatCatList, flatCatIndexMap, defaultOpenCat, curIndex } = this.data;

    cateList.map((item, index) => {
      this.handleAllCate(item, 0, index);
    });
    this.setData({
      cateList,
      flatCatList: flatCatList,
      curIndex: flatCatIndexMap[defaultOpenCat] || 0, // 找到需要锚中的分类index
    });

    // console.log("total", cateList, flatCatList, flatCatIndexMap, curIndex);
  },
  // 递归处理所有分类
  handleAllCate(item, zIndex = 0, index) {
    const { flatCatList, flatCatIndexMap, defaultOpenCat } = this.data;

    // 存储flatCatList数组中catId对应的下标
    // 此处不解析三级菜单 所以加限制 index不超过2级 index.toString().split('-').length < 2
    flatCatIndexMap[item.catId] = flatCatList.length;
    if (item.childCategoryList.length > 0 && index.toString().split('-').length < 2) {
      item.childCategoryList.map((subItem, i) => {
        this.handleAllCate(subItem, zIndex + 1, `${index}-${i}`);
      });
    } else {
      if (item.openCatetory) {
        this.setData({
          defaultOpenCat: item.catId,
        });
      }
      flatCatList.push({
        index: `${index}`,
        zIndex: zIndex,
        catId: item.catId,
        userAction: item.userAction,
        catIds: {
          openCatetory: item.openCatetory,
          catId: item.catId,
          catName: item.title,
          type: item.level,
          skuList: item.skuList || [],
        },
      });
      // reportDataTime(startTime, Date.now(), "handleAllCate");
      // console.log("handleAllCate", Date.now() - startTime);
    }
  },
  // 点击一级分类
  clickClassify(e) {
    console.log("clickClassify", e);

    const { flatCatIndexMap } = this.data;
    let { index, item = null } =
      (e.detail.currentTarget && e.detail.currentTarget.dataset) || {};
    let data = {};
    // 如果当前点击的不是同一个
    if (this.data.preOpenIndex !== index) {
      let catId = item.catId;
      data.curIndex = flatCatIndexMap[catId];
    }
    this.setData(data);
    this.handleCurIndexChange(data.curIndex);
  },
  // 点击二级
  clickSubClassify(e) {
    console.log("clickSubClassify", e);
    const { flatCatIndexMap } = this.data;

    let { item } = e.detail.currentTarget.dataset;
    let catId = item.catId;
    this.setData({
      curIndex: flatCatIndexMap[catId],
    });
    this.handleCurIndexChange(flatCatIndexMap[catId]);
  },
  // 根据点击变化计算滚动与分类信息
  handleCurIndexChange(newVal) {
    let obj = {};
    let current =
      this.data.flatCatList[newVal] || this.data.flatCatList[0] || {};
    let indexArr = (current.index && current.index.split("-")) || [];

    if (indexArr.length) {
      obj = {
        cateIndex: indexArr[0] || 0,
        preOpenIndex: indexArr[0] || 0,
      };
    }

    clickLog('winner_store_info_page__click_cate', { cate: current, orgCode: this.data.query.orgCode, storeId: this.data.query.storeId })

    this.setData({
      ...obj,
      currentCate: current,
      secondIndex: indexArr[1] != undefined ? indexArr[1] : -1,
      secondList:
        indexArr.length > 0
          ? this.data.cateList[indexArr[0]].childCategoryList
          : [],
      showAllSecondCate: false,
    });
  },
  handleCloseCouponPopup() {
    this.setData({ showCouponPopup: false })
  },
  // 点击顶部领券打开优惠券
  handleShowCouponPopup() {
    clickLog('winner_store_info_page__click_coupon_tag')
    this.handleShowCouponPopupImpl()
  },
  // 打开优惠券（真实实现）
  handleShowCouponPopupImpl() {
    this.setData({ showCouponPopup: true })
  },
  handleChangeCoupon(e) {
    const coupon = e.detail
    const { store } = this.data
    const coupons = store.storeCouponInfo.couponModelList.map(i => {
      return i.activityCode === coupon.activityCode ? { ...i, ...coupon } : i
    })
    this.setData({ 'store.storeCouponInfo.couponModelList': coupons })
  },
  // 上一个或下一个分类
  changeSwiper(e) {
    const { curIndex, flatCatList } = this.data
    const { current } = e.detail
    const result = current - this.data.curSwiperIndex
    console.log("result", result, curIndex, flatCatList.length)
    let tmpCurIndex;

    if (result == 1 || result == -2) {
      // 下一个
      tmpCurIndex = curIndex + 1
    }
    if (result == -1 || result == 2) {
      // 上一个
      tmpCurIndex = curIndex - 1
    }

    if (tmpCurIndex < 0 || tmpCurIndex >= flatCatList.length) {
      this.setData({
        curSwiperIndex: this.data.curSwiperIndex,
      });
      return;
    }

    this.setData({
      curIndex: tmpCurIndex,
      curSwiperIndex: current
    })
    this.handleCurIndexChange(tmpCurIndex)
  },
  //展示二级分类蒙层
  showSecondCateMask(e) {
    let { type } = e.detail.currentTarget.dataset;
    this.setData({
      showAllSecondCate: type,
    });
  },
  onReLunch() {
    wx.reLaunch({
      url: `/pages/winnerPromotion/store/store?storeId=${this.data.query.storeId}&orgCode=${this.data.query.orgCode}`,
    });
  }
});
