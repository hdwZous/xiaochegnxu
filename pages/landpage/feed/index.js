import { request, FNIDS } from "../../../common/util/api";
import { djCmsJump } from '../../../common/util/agreementV2';
import { updateGoodsNum } from '../../../common/util/carService'
import { pvBuriedV2_ } from '../../../common/util/BI'
import djBus from '../../../common/util/djBus'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showEmpty: true,
    type: 0, // 列表-类型
    tips: "", // 列表-提示
    btnText: "", // 列表-按钮
    skuId: "",
    storeId: "",
    orgCode: "",
    storeSimpleInfo: {},
    skus: [],
    cartSkuId: '',// 加减购物车ID
    cartType: '',   // 加减车类型
    longitude: '',
    latitude: '',
    toggle: false, //多规格商品的spu选择器
    spuData: {},
    traceId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      skuId:options.skuId,
      storeId:options.storeId,
      orgCode:options.orgCode,
      longitude: options.longitude || '',
      latitude: options.latitude || ''
    },()=>{
      this.getInitData();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  getInitData: function () {
    request({
      functionId: FNIDS.getRecommendSkuInfos.functionId,
      appVersion: FNIDS.getRecommendSkuInfos.appVersion,
      method: "POST",
      body: {
        skuId: this.data.skuId,
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        pageSource: this.data.recommendObj.pageSource,
        refPageSource: this.data.recommendObj.refPageSource,
        refPar: {
          userAction: this.data.recommendObj.preUserAction,
        },
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        if (res.data && res.data.code == 0 && res.data.result) {
          let { skus = [], storeSimpleInfo = {} } = res.data.result;
          this.setData({
            showEmpty: false,
            skus,
            storeSimpleInfo,
            traceId: res.data.traceId,
          });
        } else {
          this.setData({
            showEmpty: true,
            type: 1,
            tips: res.data && res.data.msg,
            btnText: "重新加载",
          });
        }
      })
      .catch((err) => {
        this.setData({
          showEmpty: true,
          type: 1,
          tips: err.data && err.data.msg,
          btnText: "重新加载",
        });
      });;
  },
  // 头部点击
  handleHeaderClick(){
    let obj = Object.assign({}, this.data.storeSimpleInfo, { preObj: this.data.recommendObj })
    djCmsJump(obj)
  },
  // 点击商品item
  handleJump(e){
    const {index}=e.currentTarget.dataset;
    let obj = Object.assign({}, this.data.skus[index], { preObj: this.data.recommendObj })
    djCmsJump(obj)
  },
  onDefaultBtnEvent(e) {
    let type = e.detail.type;
    if (type === 1) {
        this.setData({
            type: 0,
            showEmpty: true,
        });
        this.getInitData();
    }
  },
  /**
   * 埋点方法
   * */
  pvFunc(back) {
    let refPar = {
      traceId: this.data.recommendObj.preTraceId || "",
      userAction: this.data.recommendObj.preUserAction || "",
    };
    pvBuriedV2_({
      page_par: {
        storeId: this.data.storeId,
        ref_par: refPar
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      isBack: back || "",
    })
    this.setData({ refPar })
  },
  _UPDATEGOODSNUM(obj) {
    let { type, data} = obj
    if (type == 'showModel') {
      djBus.emit("mask_spu", this.data.recommendObj);
      this.setData({
        toggle: true,
        spuData: data
      })
      
    } else {
      updateGoodsNum(this, this.data.skus, obj, 'skus') // 更新列表的加减车
      if (type === 'add') {
          this.setData({
            catAnimation: !this.data.catAnimation
          })
      }
      // 刷新购物车
      this.setData({
        refreshMiniCartData: !this.data.refreshMiniCartData,
      });
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
