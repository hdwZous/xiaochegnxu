import { request, FNIDS } from "../../../../../../common/util/api";
import { pvBuriedV2_ } from "../../../../../../common/util/BI";
import util from "../../../../../../common/util/util";
import { getMaskOpenPageNameAndPageSource,getCurrentMaskHasOpen,getHalfMaskPageSourceAndPrePageSource } from '../../../../../../common/util/bi/utils'
import emitter from '../../../../../../common/util/events' 
import djBus from '../../../../../../common/util/djBus'
// 1 app 2 h5 5 微信小程序 8 rn 12 商家小程序
const FROM_SOURCE = 5;
// 坐标类型（1-phone,2-qq,3-google,4-baidu）
const POSITION_TYPE = 2;

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    couponListReuqestParam: {
      type: Object,
      value: {},
    },
    showPop: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          this.getAddOnCouponList();
        } else {
          this.setData({
            toTop: "",
          });
        }
        if (newVal) {
          djBus.once('couponPop', (res) => {
            let pageId = util.getPageIdrandom()
            let prePageName = res.currentPageName
            this.setData({
              pageId,
              currentPageName: 'couponListLayer',
              prePageName: prePageName,
              recommendObj: {
                pageIdFirstPage: pageId,
                currentPageName: 'couponListLayer',
                prePageName,
                pageSource: res.pageSource,
                refPageSource: res.refPageSource
              }
            }, () => {
              this.pvFunc()
              let selector = this.generateSel(this.data.biPageName)
              const pageList = getCurrentPages();
              const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
              const prePageId = this.data.preBuried.pageIdFirstPage || ''
              emitter.emit('halfMaskFunc_'+route+'_couponListLayer_'+prePageId,{
                name: 'couponListLayer',
                type: 'open',
                selector,
                buriedObj: this.data.recommendObj 
             })
            })
          })
        } else {
          let selector = this.generateSel(this.data.biPageName)
          const pageList = getCurrentPages();
          const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
          const prePageId = this.data.preBuried.pageIdFirstPage || ''
          emitter.emit('halfMaskFunc_'+route+'_couponListLayer_'+prePageId,{
            name: 'couponListLayer',
            type: 'close',
            selector ,
            buriedObj: this.data.recommendObj 
          })
        }
      },
    },
    fromSource: {
      type: String,
      value: "",
    },
    fromMini: {
      type: Boolean,
      value: false
    },
    refPar: {
      type: Object,
      value: null
    }, 
    biPageName: {
      type: String,
      value: ''
    },
    preBuried: {
      type: Object,
      value: null
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      /*
          这里不需要传入pvRefPageName参数，注意和手动打开/关闭做区分
      */
      if (this.data.showPop) {
        this.getAddOnCouponList();
      }
    },
  },
  attached: function () {
    let { pageSource, refPageSource } = getHalfMaskPageSourceAndPrePageSource()
    this.setData({
      pageSource, 
      refPageSource
    })
  },
  data: {
    // 已领优惠券
    grabCouponList: [],
    // 可领优惠券
    unGrabCouponList: [],
    toTop: "",
    showPopBySelfData: false,
    isHave: true, //是否有优惠券
    pageId: '',
    pageSource: '',
    refPageSource: ''
  },
  methods: {
    pvFunc(back = '') {
      pvBuriedV2_({
        page_par: {
          sotreId: this.data.storeId,
        },
        pageId: this.data.pageId,
        currentPageName: 'couponListLayer',
        prePageName: this.data.prePageName,
        isBack: back
      })
    },
    updateCoupon() {
      this.getAddOnCouponList();
    },
    // 关闭弹层
    hidePop() {
      this.setData({
        showPopBySelfData: false,
        showPop: false,
      });
      // 隐藏优惠券弹层，触发父组件是否展示购物车的逻辑
      setTimeout(() => {
        this.triggerEvent("hideCouponPop");
      }, 300);
    },
    // 获取优惠券列表
    getAddOnCouponList() {
      let {
        storeId = "",
        orgCode = "",
        couponListReuqestParam = {},
      } = this.data;
      let { functionId, appVersion } = FNIDS.getCouponList;
      request({
        method: "POST",
        functionId,
        appVersion,
        body: {
          storeId: storeId,
          orgCode: orgCode,
          couponListReuqestParam,
          positionType: POSITION_TYPE,
          fromSource: FROM_SOURCE,
          pageSource: this.data.pageSource,
          refPageSource: this.data.refPageSource,
          ref_par: this.data.refPar
        },
      })
        .then((res) => {
          let { grabCouponList = [], unGrabCouponList = [] } = res.data.result;
          if (grabCouponList.length > 0 || unGrabCouponList.length > 0) {
            this.setData({
              isHave: true,
            });
          } else {
            this.setData({
              isHave: false,
            });
          }
          this.setData({
            grabCouponList,
            unGrabCouponList,
          });
          this.setData({
            toTop: 0,
            showPopBySelfData: true,
            showPop: true,
          });
        })
        .catch(() => {
          this.setData({
            grabCouponList: [],
            unGrabCouponList: [],
            showPopBySelfData: false,
            showPop: false,
          });
        });
    },
    generateSel(pageName) {
      let selector = ''
      switch (pageName) {
      case 'storeinfo':
        selector = '#store >>> #mini_pop'
        break;
      case 'active':
      case 'storeactivity':
        selector = '#floor >>> #mini_pop'
        break;
      case 'couponTogether':
      case 'feedRecGoods':
      case 'goodsinfo':
      case 'NewCouponBuy':
      case 'coupon_buy':
      case 'coupon_buySearchResult':
      case 'store_search':
      case 'StoreHomeActivity':
      case 'StoreSuitList':
        selector = '#minicart >>> #mini_pop'
        break;
      case 'shopcar':
        selector = '#cart_items >>> #mini_pop'
        break;
      default:
        break;
      }
      return selector
    },
  },
});
