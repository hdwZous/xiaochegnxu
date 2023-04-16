import { request, FNIDS } from '../../../../common/util/api'
import { isLogin, goToLogin } from '../../../../common/util/loginUtil'
import mp from '../../../../common/util/wxapi'
import { clickBuriedV2_ } from "../../../../common/util/BI"
import { mpCmsJump } from "../../../../common/util/agreementV2";
let app = getApp()
let flag = true
Component({
  properties: {
    newData: {
      type: Object,
      value: {},
      observer: function (result) {
        this.initData(result)
      }
    },
    imgLazyLoad: {
      type: Object,
      value: {},
      observer: function (newObj) {
        console.log(newObj)
      }
    },
    nextPageDataList: {
      type: Array,
      value: [],
      observer: function (arr) {
        console.log(arr)
        if (arr.length > 0) {
          let productList = []
          this.data.sourceList.forEach(item => {
            if (item.resourceNo == 102 && item.productList && item.productList.length > 0) {
              productList = productList.concat(arr)
            }
          })
          this.setData({
            sourceList: this.data.sourceList
          })
        }
      } 
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    // 节省器
    price: 0,
    // 背景配置
    bgConfig: {},
    // 资源位列表
    sourceList: []
  },
  methods: {
    initData(result) {
      let bgConfig = {}
      let sourceList = []
      let configList = result.configList || []
      configList.forEach(item => {
        if (item.resourceNo === '101') {
          bgConfig = item
        } else {
          sourceList.push(item)
        }
      })
      this.setData({
        bgConfig: bgConfig,
        sourceList: sourceList,
        price: result.price || ''
      })
      console.log(this.data.sourceList)
    },
    // 领取优惠券
    getCoupon(e) {
      if (isLogin()) {
        let status = e.currentTarget.dataset.status;
        let couponCode = e.currentTarget.dataset.couponCode;
        if (status === 2) { // 未领取
          request({
            ...FNIDS.grabCoupon,
            body: {
              "code": couponCode,
              "fromSource": 5,
              "isFloor": 1,
              "needCouponGo": true
            },
            method: "POST",
          }).then(res => {
            let result = res.data.result;
            if (res.data.code === '0' && result && result.busiCode === '0') {
              // 领券成功，刷新页面
              this.triggerEvent('getData')
            } else {
              mp.toast({
                title: result.message || '领券失败！'
              })
            }
          }).catch(err => {
            mp.toast({
              title: err.message || '领券失败！'
            })
          })
        }
      } else {
        goToLogin()
      }
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "claimFreightCoupon",
        click_par: {
          isLogin: isLogin()
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    // 领取新人券
    getNewerCoupon(e) {
      if (isLogin()) {
        let status = e.currentTarget.dataset.status;
        if (status === 2) {
          let location = wx.getStorageSync('address_info');
          let cityId = location.cityId || '';
          request({
            ...FNIDS.newUserGrabCoupon,
            isNeedDealError: true,
            body: {
              cityId: cityId
            }
          }).then(res => {
            if (res.data.code === '0') {
              this.triggerEvent('getData')
            } else {
              mp.toast({
                title: res.data.msg || '领券失败！'
              })
            }
          }).catch(err => {
            mp.toast({
              title: err.msg || '领券失败！'
            })
          })
        }
      } else {
        goToLogin()
      }
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "claimNewUserCoupon",
        click_par: {
          isLogin: isLogin()
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    // 单品加车接口
    addCart({ skuId = '', orgCode = '', storeId = '' } = {}) {
      return new Promise((resolve, reject) => {
        if (isLogin()) {
          try {
            let location = wx.getStorageSync('address_info');
            let latitude = location.latitude || '';
            let longitude = location.longitude || '';
            request({
              ...FNIDS.uncheckAddGoods,
              isForbiddenDialog: true,
              body: {
                skus: [{ id: skuId, num: 1 }],
                lng: longitude,
                lat: latitude,
                storeId: storeId,
                orgCode: orgCode
              }
            }).then(res => {
              if (res.data.code == '0') {
                resolve()
              } else {
                reject(res.data.msg || '哎呀开小差了，稍后再试！')
              }
            }).catch(err => {
              reject(err.data.msg || '哎呀开小差了，稍后再试！')
            })
          } catch (e) {
            reject('哎呀开小差了，请稍后再试！')
          }
        } else {
          goToLogin()
        }
      })
    },
    // 监听默认事件
    defaultBtnEvent(e) {
      console.log('defaultBtnEvent==>', e);
      let type = e.detail.type;
      if (type === 1) { // 授权地理位置，跳转至首页授权。
        wx.switchTab({
          url: '/pages/home/home',
          preObj: this.data.buriedObj
        })
      } else if (type === 2) { // 刷新页面
        this.triggerEvent('getData')
      }
    },
    goToHome() { // 回到首页
      wx.switchTab({
        url: '/pages/home/home',
        preObj: this.data.buriedObj
      });
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickToMainPage",
        click_par: {
          isLogin: isLogin()
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    // 点击商品
    onClickProduct(e) {
      let params = e.currentTarget.dataset;
      let type = params.type;
      let skuId = params.skuId;
      let orgCode = params.orgCode;
      let storeId = params.storeId;
      let storeName = params.storeName;
      if (type === '1') { // 去订单结算
        this.addCart({
          skuId,
          orgCode,
          storeId
        }).then(() => {
          wx.navigateTo({
            url: '/pages/settlementV2/index?' + "storeId=" + storeId + "&orgCode=" + orgCode + "&storeName=" + storeName + "&addressId=" + "110115",
            preObj: this.data.buriedObj
          })
        }).catch(err => {
          mp.toast({
            title: err
          })
        })
      } else if (type === '2') { // 去门店
        mpCmsJump({
          pageType: "p20",
          params: {
            isAddCart: true,
            storeId: storeId,
            skuId: skuId,
            orgCode: orgCode,
            couponId: params.couponId,
            isGain: params.isGain,
          },
          preObj: this.data.buriedObj
        });
      }
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickGoods",
        click_par: {
          to: type === '2' ? '去门店页' : '去订单页',
          skuId: skuId,
          isLogin: isLogin()
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    }
  }
});
