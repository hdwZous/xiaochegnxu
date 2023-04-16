
import util  from '../../../../common/util/util'
import {  clickBuriedV2_} from "../../../../common/util/BI";
import { mpCmsJump } from "../../../../common/util/agreementV2";
Component({
  properties: {
    newData: {
      type: Object,
      value: {},
      observer: function (result) {
        this.initData(result)
      }
    },
    newNewerAnimation: {
      type: Boolean,
      value: false
    },
    nextPageDataList: {
      type: Array,
      value: [],
      observer: function (arr) {
        if (arr.length > 0) {
          this.setData({
            sugStoreInfoVO: this.data.sugStoreInfoVO.concat(arr)
          })
        }
      }
    },
    imgLazyLoad: {
      type: Object,
      value: {},
      observer: function (newObj) {
        console.log(newObj)
      }
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    price: '0', // 节省器
    bgConfig: {}, // 背景配置
    banner: {}, // 头图
    resultArray: [],
    priceData: [], //价格动画
    sugStoreInfoVO: []
  },
  methods: {
    initData(result) {
      let bgConfig = {}
      let banner = {}
      let resultArray = []
      let partOne = []
      let sugStoreInfoVO = []
      result.configList && result.configList.length > 0 && result.configList.forEach(item => {
        if (item.resourceNo === '101') { // 背景图
          bgConfig = item
        } else if (item.resourceNo == '104') { // banner
          item.imgUrl = util.dealImgUrl(375, 294, item.imgUrl)
          banner = item
        } else if (item.resourceNo == 100 || (item.resourceNo == 103 && item.codeCouponVO)) { // 新人券 + 复购券包
          item.codeCouponVO && item.codeCouponVO.length && item.codeCouponVO.forEach((i) => {
            i.amount = Math.floor(i.amount)
          })
          partOne.push(item)
        } else if (item.resourceNo == 103 && item.couponVO) { // 6+3券包
          item.couponVO.length && resultArray.push(item)
        } else if (item.resourceNo == 106 && item.sugStoreInfoVO) { // 店铺列表
          item.sugStoreInfoVO.length && item.sugStoreInfoVO.forEach(pro => {
            if (pro.productList && pro.productList.length >= 3) {
              pro.productList.forEach(subItem => {
                subItem.imgUrl = util.dealImgUrl(87, 87, subItem.imgUrl)
              })
              pro.productList = pro.productList.slice(0, 3)
            }
          })
          sugStoreInfoVO = item.sugStoreInfoVO
          console.log('sugStoreInfoVO', sugStoreInfoVO)
          resultArray.push(item)
        }
      })
      partOne.length > 0 && resultArray.unshift(partOne)
      this.setData({
        bgConfig: bgConfig,
        banner: banner,
        resultArray: resultArray,
        sugStoreInfoVO: sugStoreInfoVO,
        price: `${Math.floor(result.price)}` || '',
      })
      console.log(this.data.resultArray)
      // 对price处理
      this.setPriceData(this.data.price)
    },
    // 回到首页
    goToHome() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickToMainPage",
        click_par: {
            
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      wx.switchTab({
        url: '/pages/home/home',
        preObj: this.data.buriedObj || null
      });
    },
    // 去领取和去使用
    handleGetOrUse(e) {
      let { userAction = ''} = e.currentTarget.dataset || {}
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickClaimSingleCoupon",
        click_par: {
          userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    // 跳转到门店
    goStore(e) {
      let product = e.currentTarget.dataset.pro
      let isAdd = e.currentTarget.dataset.addcart
      mpCmsJump({
        pageType: "p20",
        params: {
          isAddCart: isAdd ? true : false,
          storeId: product.storeId,
          skuId: product.skuId || "",
          orgCode: product.orgCode,
          couponId: product.couponId,
          isGain: product.isGain,
        },
        preObj: this.data.buriedObj
      });
    },
    // 点击进店
    handleEnterStore(e) {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let { userAction = ''} = e.currentTarget.dataset || {}
      clickBuriedV2_({
        click_id: "clickEnterStore",
        click_par: {
          userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      this.goStore(e)
    },
    // 点击店铺优惠券
    handleCoupon(e) {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let { userAction = ''} = e.currentTarget.dataset || {}
      clickBuriedV2_({
        click_id: "clickStoreCoupon",
        click_par: {
          userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      this.goStore(e)
    },
    // 点击店铺商品
    handleProduct(e) {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let { userAction = ''} = e.currentTarget.dataset || {}
      clickBuriedV2_({
        click_id: "clickStoreGoods",
        click_par: {
          userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      this.goStore(e)
    },
    setPriceData(price) {
      let priceData = []
      let randomNum = ['2 3 4 5 ', '8 7 1 4 ', '7 5 3 9 ']
      price.split('').forEach((value, index) => {
        priceData.push({
          number: value,
          afterContent: randomNum[index] + value
        })
      });
      this.setData({
        priceData: priceData
      })
    }
  }
})
