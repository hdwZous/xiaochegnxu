import { request, FNIDS } from "../../../../common/util/api";
import { djCmsJump } from '../../../../common/util/agreementV2'
import mp from '../../../../common/util/wxapi'
import { updateGoodsNum } from "../../../../common/util/carService";
import djBus from "../../../../common/util/djBus";
let app = getApp()
Page({
  // 页面的初始数据
  data: {
    showEmpty: false,
    showGoodListEmpty: false,
    showLoading: true,
    type: 0,
    tips: "",
    btnText: '',
    // 默认页-默认图
    defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",

    storeId: "",
    orgCode: "",

    // 刷新mini购物车
    refreshMiniCartData: false,
    catAnimation: false, // 执行购物车动画
    //多规格商品的spu选择器
    toggle: false,
    isRefresh: false,

    suitList: [],
    pageId: 'suit',
    // 是否是iphoneX
    isIpx: false,
  },
  onLoad(options) {
    this.setData({
      isIpx: app.globalData.isIpx,
      storeId: options.storeId || "11787145",
      orgCode: options.orgCode || "328048",
      refreshMiniCartData: !this.data.refreshMiniCartData,
      refPar: {}
    })
    this.fetchData().then((result => {
      this.handleSucceData(result)
    })).catch((res) => {
      this.handleErrData(res)
    })
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
    this.setData({
      isRefresh: true
    })
  },
  onUnLoad() {
  },
  fetchData() {
    mp.loading_cover()
    return new Promise((resolve, reject) => {
      request({
        ...FNIDS.getFloatLayerPromotion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId,
          orgCode: this.data.orgCode,
          pn: 1,
          ps: 10,
        },
        pageId:
          (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||
          "",
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          mp.hideLoading();
          let { code, result = {} } = res.data;
          if (code == 0 && result) {
            resolve(result);
          } else {
            reject(res);
            this.setData({
              showEmpty: true,
              type: 1,
              btnText: "重新加载",
              tips: res.data && res.data.msg,
            });
          }
        })
        .catch((err) => {
          mp.hideLoading();
          this.setData({
            showEmpty: true,
            type: 1,
            tips: (err && err.data && err.data.msg) || "获取商品信息失败",
            btnText: "重新加载",
          });
        });
    })
  },
  // 处理成功数据
  handleSucceData(result) {
    this.setData({
      showEmpty: false,
      showGoodListEmpty: !(result.suitInfoList && result.suitInfoList.length),
      suitList: result.suitInfoList || [],
      type: 1,
      btnText: "重新加载",
      tips: "抱歉，未能找到您想要的商品"
    })
  },
  // 处理接口异常信息
  handleErrData(res) {
    this.setData({
      showEmpty: true,
      type: 1,
      btnText: "重新加载",
      tips: res.data && res.data.msg || "获取商品信息失败",
    });
  },
  // 点击立即购买
  clickBuy(e) {
    let { index } = e.currentTarget.dataset 
    this.setData({
      [`suitList[${index}].isAddCart`]: true
    })
  },
  // 商品跳转到详情
  goToDetail(e) {
    let { to, params, userAction } = e.currentTarget.dataset.item
    djCmsJump({
      to: to,
      params: params,
      userAction: userAction,
      traceId: this.data.traceId || "",
      preObj: this.data.recommendObj,
      buried_position: {
        key: `store-suitList-1`,
        options: this.data.options,
      },
    });
  },
  // 更新商品列表数量
  _UPDATEGOODSNUM(obj) {
    if (obj.type == "add" || obj.type == "min") {
      this.setData({
        catAnimation: !this.data.catAnimation,
        refreshMiniCartData: !this.data.refreshMiniCartData,
      });
    } else if (obj.type == "showModel") {
      djBus.emit("mask_spu", this.data.recommendObj);
      this.setData({
        toggle: true,
        spuData: obj.data,
      });
    }
    updateGoodsNum(this, this.data.suitList, obj, "suitList");
  },
  onDefaultBtnEvent: function (e) {
    let type = e.detail.type;
    if (type == 1) { // 网络请求失败
      this.fetchData()
    }
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