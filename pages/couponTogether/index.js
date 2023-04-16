import { request, FNIDS } from "../../common/util/api.js";
import { updateGoodsNum } from "../../common/util/carService";
import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI.js";
const leftCateHeight = 120;
Page({
  scopeData: {
    isFirst: true,
  },
  data: {
    showLoading: true,
    type: 0,
    tips: "",
    btnText: "",
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
    showDefault: false,

    storeId: "",
    orgCode: "",
    skuId: "",

    leftCateList: [], //左侧分类
    topBIList: [], // 三级分类列表
    productList: [],
    anchorInfo: {}, // 锚点信息
    redBar: {}, // 小红条信息
    topImgUrl: "",

    cateMapList: [], // 左侧分类映射数组

    curIndex: 0, // 当前一级分类下标
    curSubIndex: 0, // 当前二级分类下标
    curThirdIndex: 0, // 当前三级分类下标

    thirdCode: null, // 三级分类id
    lastSecondPromotionId: "",

    leftScrollTop: 0, // 左侧分类滚动条滚动的位置
    scrollLeft: 0, // 三级分类滚动条位置
    showAllThirdCate: false, // 是否展示三级分类蒙层
    productSwiperIndex: 0,

    refreshMiniCartData: false, // 刷新mini购物车
    catAnimation: false, // 执行购物车动画
    traceId: "", // 主接口traceId
    goodTraceId: "",
    ipx: false,
    isCart: true,
    toggle: false, //多规格商品的spu选择器
    spuData: {},
  },
  onLoad(options) {
    this.setData({
      orgCode: options.orgCode || "",
      storeId: options.storeId || "",
      ipx: getApp().globalData.isIpx,
      options: options, // 定位埋点问题
    });
    this.initData(options.limitId || options.couponId || "");
  },
  onHide() {
    this.scopeData.isFirst = false;
  },
  pvFunc(back) {
    let {
      preUserAction,
      preTraceId,
      pageIdFirstPage,
      prePageName,
      currentPageName,
    } = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        couponId: this.data.couponId,
        storeId: this.data.storeId,
        ref_par: {
          userAction: preUserAction,
          traceId: preTraceId,
        },
      },
      pageId: pageIdFirstPage,
      prePageName,
      currentPageName,
      isBack: back || "",
    });
    this.setData({
      refPar: {
        userAction: preUserAction,
        traceId: preTraceId,
      },
    });
  },
  // 初始化页面
  initData(couponId) {
    let { functionId = "", appVersion = "" } = FNIDS.initFullPromotion || {};
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    request({
      functionId,
      appVersion,
      method: "POST",
      body: {
        promotionSource: 1,
        promotionType: 1,
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        promotionId: couponId || "",
        pageSource: pageSource || "promotionGoodsList",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let { code, result, traceId } = res.data || {};
        if (code == 0 && result) {
          let {
            pageName,
            anchorInfo = {},
            leftBIAndCouponInfo = [],
            topBIList = [],
            productInfos = [],
            isCart = true,
          } = result;
          wx.setNavigationBarTitle({
            title: pageName || "超惠买",
          });
          let curIndex = 0,
            curSubIndex = 0,
            goodList = [],
            thirdCode = (topBIList.length && topBIList[0].code) || "",
            thirdName = (topBIList.length && topBIList[0].name) || "",
            cateMapList = [],
            lastSecondPromotionId = "";
          // 初始进来没有下发锚中信息，需要自己手动锚中
          if (anchorInfo.firstBiCode === null) {
            let firstCateItem = leftBIAndCouponInfo[0];
            result.anchorInfo = {
              firstBiCode: firstCateItem.code,
              secondPromotionId: firstCateItem.promotionInfoList[0].promotionId,
              promotionType: firstCateItem.promotionInfoList[0].type,
            };
          }

          leftBIAndCouponInfo.forEach((item, index) => {
            item.promotionInfoList.forEach((subItem, subIndex) => {
              // 左侧分类映射关系
              cateMapList.push(`${index}-${subIndex}`);
              // 找到锚中的一级分类和二级分类下标
              if (
                anchorInfo.firstBiCode == item.code &&
                anchorInfo.secondPromotionId == subItem.promotionId
              ) {
                curIndex = index;
                curSubIndex = subIndex;
                item.showAll = true;
                result.anchorInfo.firstName = item.name;
                result.anchorInfo.secondName = subItem.firstName;
              }
            });
          });

          // 找到最后一个分类，用于临界判断
          if (cateMapList.length) {
            let arr = cateMapList[cateMapList.length - 1].split("-");
            lastSecondPromotionId =
              leftBIAndCouponInfo[arr[0]].promotionInfoList[arr[1]];
          }

          // 找到第一个三级分类下的商品列表
          topBIList.length &&
            productInfos.forEach((item) => {
              if (item.thirdCode == topBIList[0].code) {
                goodList = item.promotionGoods;
                thirdCode = item.thirdCode;
                thirdName = topBIList[0].name;
              }
            });
          this.setData(
            {
              showLoading: false,
              leftCateList: leftBIAndCouponInfo || [],
              anchorInfo: result.anchorInfo || {},
              topBIList: topBIList || [],
              productList: goodList || [],
              topImgUrl: result.topImgUrl || "",
              thirdCode: thirdCode || "",
              curIndex,
              curSubIndex,
              cateMapList,
              lastSecondPromotionId,
              traceId,
              goodTraceId: traceId || "",
              isCart,
            },
            () => {
              this.setData({
                leftScrollTop: this.leftCateAnimation(
                  curSubIndex ? curSubIndex : curIndex,
                  curSubIndex ? 2 : 1
                ),
              });
            }
          );
          isCart && this.fetchRedTip();
          let { pageIdFirstPage, prePageName, currentPageName } =
            this.data.recommendObj || {};
          clickBuriedV2_({
            click_id: "click_blist",
            click_par: {
              biName: result.anchorInfo.firstBiCode,
              biCode: result.anchorInfo.firstName,
              state: 0,
            },
            pageId: pageIdFirstPage,
            prePageName,
            currentPageName,
          });
          clickBuriedV2_({
            click_id: "click_slist",
            click_par: {
              biName: result.anchorInfo.firstBiCode,
              biCode: result.anchorInfo.firstName,
              couponId: result.anchorInfo.secondPromotionId,
              couponName: result.anchorInfo.secondName,
              state: 0,
            },
            pageId: pageIdFirstPage,
            prePageName,
            currentPageName,
          });
          if (topBIList.length) {
            clickBuriedV2_({
              click_id: "click3cate",
              click_par: {
                biName: result.anchorInfo.firstName,
                biCode: result.anchorInfo.firstBiCode,
                couponId: result.anchorInfo.secondPromotionId,
                couponName: result.anchorInfo.secondName,
                thirdcode: thirdCode,
                thirdName: thirdName,
                state: 0,
              },
              pageId: pageIdFirstPage,
              prePageName,
              currentPageName,
            });
          }
        } else {
          this.setData({
            showLoading: false,
            showDefault: true,
            type: 7,
            tips: "暂无优惠信息",
            redBar: {}
          });
        }
      })
      .catch(() => {
        this.setData({
          showLoading: false,
          showDefault: true,
          type: 7,
          tips: "暂无优惠信息",
          redBar: {},
        });
      });
  },
  // 获取商品或三级分类
  fetchGoodList(thirdBIcode, level) {
    let { functionId = "", appVersion = "" } = FNIDS.initPromotion || {};
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    request({
      functionId,
      appVersion,
      method: "POST",
      body: {
        promotionSource: 2,
        promotionType: 1,
        storeId: this.data.storeId || "",
        firstBIcode: this.data.anchorInfo.firstBiCode || "",
        secondPromotionId: this.data.anchorInfo.secondPromotionId || "",
        thirdBIcode: thirdBIcode || "",
        orgCode: this.data.orgCode || "",
        pageSource: pageSource || "promotionGoodsList",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let { code, result, traceId } = res.data || {};
        if (code == 0 && result) {
          let { topBIList = [], productInfos = [], isCart = true } = result;
          let goodList = [],
            thirdCode = (topBIList.length && topBIList[0].code) || "",
            thirdName = (topBIList.length && topBIList[0].name) || "";
          // 如果点击三级分类，不需要更新三级分类数据
          if (level && level == 3) {
            productInfos.forEach((item) => {
              if (item.thirdCode == thirdBIcode) {
                goodList = item.promotionGoods;
              }
            });
            this.setData({
              productList: goodList || [],
              thirdCode: thirdBIcode || "",
              goodTraceId: traceId || "",
              isCart,
            });
          } else {
            // 找到第一个三级分类下的商品列表
            topBIList.length &&
              productInfos.forEach((item) => {
                if (item.thirdCode == topBIList[0].code) {
                  goodList = item.promotionGoods;
                  thirdCode = item.thirdCode;
                }
              });
            this.setData({
              productList: goodList || [],
              thirdCode: thirdCode || "",
              topBIList: topBIList || [],
              topImgUrl: result.topImgUrl || "",
              goodTraceId: traceId || "",
              isCart,
            });

            let { pageIdFirstPage, prePageName, currentPageName } =
              this.data.recommendObj || {};
            topBIList.length &&
              clickBuriedV2_({
                click_id: "click3cate",
                click_par: {
                  biName: this.data.anchorInfo.firstName,
                  biCode: this.data.anchorInfo.firstBiCode,
                  couponId: this.data.anchorInfo.secondPromotionId,
                  couponName: this.data.anchorInfo.secondName,
                  thirdcode: thirdCode,
                  thirdName: thirdName,
                },
                pageId: pageIdFirstPage,
                prePageName,
                currentPageName,
              });
            isCart && this.fetchRedTip();
          }
        } else {
          this.setData({
            topBIList: [],
            redBar: {},
          });
          // this.fetchRedTip();
        }
      })
      .catch(() => {
        this.setData({
          topBIList: [],
          redBar: {},
        });
        // this.fetchRedTip();
      });
  },
  // 小红条信息
  fetchRedTip() {
    let { functionId = "", appVersion = "" } = FNIDS.redTip || {};
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    request({
      functionId,
      appVersion,
      method: "POST",
      body: {
        orgCode: this.data.orgCode || "",
        storeId: this.data.storeId || "",
        promotionId: this.data.anchorInfo.secondPromotionId || "",
        skuId: this.data.skuId || "",
        pageSource: pageSource || "promotionGoodsList",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let { code, result } = res.data || {};
        if (code == 0 && result) {
          this.setData({
            redBar: result,
          });
        }
      })
      .catch(() => {});
  },
  // 点击一级分类
  clickClassify(e) {
    let {
      code,
      name,
      promotionInfoList = [],
      showAll,
    } = e.currentTarget.dataset.item || {};
    let index = e.currentTarget.dataset.index;
    // 点击的是同一个
    if (index == this.data.curIndex) {
      this.setData({
        [`leftCateList[${index}].showAll`]: !showAll, // 展开||收起二级分类
      });
      return;
    }
    let data = {
      curIndex: index,
      curSubIndex: 0,
      curThirdIndex: 0,
      leftScrollTop: this.leftCateAnimation(index, 1),
      anchorInfo: {
        firstBiCode: code,
        firstName: name,
        secondPromotionId: promotionInfoList[0].promotionId,
        secondName: promotionInfoList[0].firstName,
      },
    };
    // 上一个分类收起， 当前分类展开
    data[`leftCateList[${this.data.curIndex}].showAll`] = false;
    data[`leftCateList[${index}].showAll`] = true;
    this.setData(data);
    this.fetchGoodList();

    let { pageIdFirstPage, prePageName, currentPageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_blist",
      click_par: {
        biName: name,
        biCode: code,
      },
      prePageName,
      currentPageName,
      pageId: pageIdFirstPage,
    });
    clickBuriedV2_({
      click_id: "click_slist",
      click_par: {
        biName: name,
        biCode: code,
        couponId: promotionInfoList[0].promotionId,
        couponName: promotionInfoList[0].firstName,
      },
      prePageName,
      currentPageName,
      pageId: pageIdFirstPage,
    });
  },
  // 点击二级分类
  clickSubClassify(e) {
    let { promotionId = "", firstName = "" } =
      e.currentTarget.dataset.item || {};
    let code = e.currentTarget.dataset.code || "";
    let name = e.currentTarget.dataset.name || "";
    let subIndex = e.currentTarget.dataset.subIndex;
    if (subIndex == this.data.curSubIndex) return;
    this.setData({
      curSubIndex: subIndex,
      curThirdIndex: 0,
      leftScrollTop: this.leftCateAnimation(subIndex, 2),
      anchorInfo: {
        firstBiCode: this.data.anchorInfo.firstBiCode,
        firstName: name,
        secondPromotionId: promotionId,
        secondName: firstName,
      },
    });

    let { pageIdFirstPage, prePageName, currentPageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_slist",
      click_par: {
        biName: name,
        biCode: code,
        couponId: promotionId,
        couponName: firstName,
      },
      prePageName,
      currentPageName,
      pageId: pageIdFirstPage,
    });
    this.fetchGoodList();
  },
  // 点击三级分类
  clickThirdClassify(e) {
    let { code = "", name = "" } = e.currentTarget.dataset.item || {};
    let thirdIndex = e.currentTarget.dataset.thirdIndex;
    if (thirdIndex == this.data.curThirdIndex) return;
    this.setData({
      thirdCode: code,
      curThirdIndex: thirdIndex,
    });
    this.fetchGoodList(this.data.thirdCode, 3);
    let { pageIdFirstPage, prePageName, currentPageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click3cate",
      click_par: {
        biName: this.data.anchorInfo.firstName,
        biCode: this.data.anchorInfo.firstBiCode,
        couponId: this.data.anchorInfo.secondPromotionId,
        couponName: this.data.anchorInfo.secondName,
        thirdcode: code,
        thirdName: name,
      },
      pageId: pageIdFirstPage,
      prePageName,
      currentPageName,
    });
  },
  //展示三级分类蒙层
  showThirdCateMask(e) {
    let { type } = e.currentTarget.dataset;
    this.setData({
      showAllThirdCate: type,
    });
  },
  // 滑动右侧商品
  swiperChange(e) {
    let { current, source } = e.detail;
    // 非用户滚动触发
    if (source == "") return;
    let {
      curIndex,
      curSubIndex,
      curThirdIndex,
      topBIList = [],
      cateMapList = [],
      productSwiperIndex,
    } = this.data;
    // 当前swiper的下标
    let index = current - this.data.productSwiperIndex;
    // 向下切换
    if (index == 1 || index == -2) {
      let lastKey = cateMapList[cateMapList.length - 1];
      let lastArr = lastKey.split("-");

      // 当前选中的是最后一个三级分类，再继续滑动可能会临界或者切换到下一个二级分类
      if (curThirdIndex >= topBIList.length - 1) {
        // 临界情况（左侧分类是最后一个）
        if (curIndex == lastArr[0] && curSubIndex == lastArr[1]) {
          this.setData({
            productSwiperIndex: productSwiperIndex,
          });
          return;
        }
        // 当前的下标
        let i = cateMapList.indexOf(`${curIndex}-${curSubIndex}`);
        // 即将切换的分类的下标
        let i2 = cateMapList[i + 1];
        let iArr = i2.split("-");
        this.toggleLeftCate(current, curIndex, iArr);
      } else {
        // 在三级分类内切换
        this.toggleThird(current, topBIList, this.data.curThirdIndex + 1);
      }
    }
    // 向上切换
    else if (index == -1 || index == 2) {
      // 当前选中的是第一个三级分类,会遇到临界或者切换到上一个二级分类
      if (curThirdIndex == 0) {
        let i = cateMapList.indexOf(`${curIndex}-${curSubIndex}`);
        // 临界情况（当前是左侧分类的第一个分类）
        if (i == 0) {
          this.setData({
            productSwiperIndex: productSwiperIndex,
          });
          return;
        }
        let i2 = cateMapList[i - 1];
        let iArr = i2.split("-");
        this.toggleLeftCate(current, curIndex, iArr);
      } else {
        // 在三级分类内切换
        this.toggleThird(current, topBIList, this.data.curThirdIndex - 1);
      }
    }
  },
  leftCateAnimation(current = 0, level = 1) {
    let leftScrollTop = this.data.leftScrollTop;
    if (level == 1) {
      leftScrollTop = leftCateHeight * current - 150;
    } else if (level == 2) {
      leftScrollTop =
        leftCateHeight * this.data.curIndex + leftCateHeight * current - 180;
    }
    return leftScrollTop;
  },
  // 加减车操作
  _UPDATEGOODSNUM(e) {
    let { type, data = {} } = e || {};
    let obj = {};
    if (type == "add" || type == "min" || type == "clear") {
      obj.refreshMiniCartData = !this.data.refreshMiniCartData;
      if (type == "add") {
        obj.catAnimation = !this.data.catAnimation;
      }
      updateGoodsNum(this, this.data.productList, e, "productList");
      this.setData({
        skuId: data.skuId || "",
      });
      if (this.data.isCart) {
        this.fetchRedTip();
      }
    } else if (type == "showModel") {
      obj.toggle = true;
      obj.spuData = data;
    }
    this.setData(obj);
  },
  // 切换swiper，同步三级分类
  toggleThird(current, topBIList, value) {
    this.setData({
      productSwiperIndex: current,
      curThirdIndex: value,
      thirdCode: topBIList[value].code,
    });
    this.fetchGoodList(this.data.thirdCode, 3);
  },
  // 切换swiper，同步左侧分类
  toggleLeftCate(current, curIndex, iArr) {
    let data = {
      curIndex: iArr[0],
      curSubIndex: iArr[1],
      curThirdIndex: 0,
      thirdCode: "",
      leftScrollTop: this.leftCateAnimation(iArr[1], 2),
      anchorInfo: {
        firstName: this.data.leftCateList[iArr[0]].name,
        firstBiCode: this.data.leftCateList[iArr[0]].code,
        secondPromotionId:
          this.data.leftCateList[iArr[0]].promotionInfoList[iArr[1]]
            .promotionId,
        secondName:
          this.data.leftCateList[iArr[0]].promotionInfoList[iArr[1]].firstName,
      },
      productSwiperIndex: current,
    };
    if (iArr[0] != curIndex) {
      data[`leftCateList[${curIndex}].showAll`] = false;
      data[`leftCateList[${iArr[0]}].showAll`] = true;
    } else {
      data[`leftCateList[${iArr[0]}].showAll`] = true;
    }
    this.setData(data);
    this.fetchGoodList();
  },
  onSpuSelectorEvent(e) {
    let {type, data} = e.detail || {}
    if (type == 'closeSpu') {
      this.setData({
        toggle: false
      })
    }
  }
});
