/* eslint-disable */
import { djCmsJump } from "../../../../common/util/agreementV2";
import { updatePageNums, _getSingleCart, _dealResults } from '../../../../common/util/carService'
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { request, FNIDS } from '../../../../common/util/api'
import util from "../../../../common/util/util";
import mp from "../../../../common/util/wxapi";
import djBus from '../../../../common/util/djBus';
const app = getApp();

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.cart-items'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Object,
      value: null,
      observer(vals) {
        if (vals && vals.itemList) {
          this.dealRequestResult(vals)
        }
      }
    },
    showGoods: {
      type: Number,
      value: 5
    },
    shopType: {
      type: String,
      value: ''
    },
    subIndex: {
      type: Number,
      value: 0
    },
    traceId: {
      type: String,
      value: ''
    },
    pullDownFlag: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    pageSource: {
      type: String,
      value: ''
    },
    refPageSource: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  observers: {
    'datas': function(vals) {
      if (vals && vals.itemList && vals.itemList.length) {
        this.computeFold(vals.itemList)
      }
    }
  },

  pageLifetimes: {
    show() {
      if (app.globalData.refreshShopid && app.globalData.refreshShopid == this.data.datas.storeId) {
        this.getCartData()
        app.globalData.refreshShopid = null
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 购物车数据
    datas: null,
    // 换赠弹窗数据(与datas区分开，因为datas会计算当前最多可以展示的商品数)
    giftDatas: null,
    cartType: 20,
    showModify: false,
    modifyGoodsInfo: null,
    // 去凑单优惠券弹层，默认不展示
    isShowCouponPop: false,
    // 优惠券弹层置顶参数
    couponListReuqestParam: {},
    // 兑换弹窗标识
    showGiftPop: false,
    // 8.8.5新增一键免费开通弹层
    oneKeyOpen: false,
    // 结束防止多次点击
    flag: true,
    prevTotalNum: null,
    // 折叠区域
    tempList: [],
    tempInva: [],
    // 原有全部列表
    originList: [],
    originInva: [],
    // 展开全部商品flag
    lookMore: false,
    handleOpen: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取购物车数据
    getCartData() {
      let params = {
        lat: app.globalData.addressInfo.latitude || '',
        lng: app.globalData.addressInfo.longitude || '',
        orgCode: this.data.datas.orgCode,
        storeId: this.data.datas.storeId,
        pageSource: this.data.pageSource,
        refPageSource: this.data.refPageSource,
        cartType: this.data.cartType
      }
      _getSingleCart(params)
        .then(res => {
          let result = res.data.result
          if (res.data.code == 0 && res.data.result) {
            if (result.itemList && result.itemList.length) {
              this.triggerEvent('updateInfos', {
                storeId: this.data.datas.storeId,
                shopType: this.data.shopType,
                subIndex: this.data.subIndex,
                carResult: result
              })
            } else {
              this.triggerEvent('noticeRemove', {
                storeId: result.storeId,
                shopType: this.data.shopType
              })
            }
          } else {
            mp.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        })
        .catch(err => {
          mp.showToast({
            title: '网络异常',
            icon: 'none'
          })
        })
    },
    dealRequestResult(result) {
      // 假如门店商品列表为0时,需要删除当前门店
      if (result.itemList && result.itemList.length) {
        let {
          couponDesc,
          invalidData,
          isSelectAll,
          isSelectAllDisabled,
          grabCouponList,
          hasCouponsTips,
          discountTipInfo,
          discountTipStr,
          couponListReuqestParam,
          hideRemoveAllGoodsEntryFlag
        } = _dealResults(result)
        // set数据
        this.setData({
          datas: result,
          giftDatas: result,
          couponDesc,
          isSelectAll: isSelectAll,
          isSelectAllDisabled: isSelectAllDisabled,
          grabCouponList,
          hasCouponsTips,
          discountTipInfo,
          discountTipStr,
          couponListReuqestParam,
          hideRemoveAllGoodsEntryFlag,
          prevTotalNum: result.totalNum,
          originList: result.itemList,
          originInva: invalidData
        });
      }
    },
    onRefreshCart(e) {
      let { result = {} } = e.detail
      if (result.itemList && result.itemList.length) {
        this.triggerEvent('updateInfos', {
          storeId: this.data.datas.storeId,
          shopType: this.data.shopType,
          subIndex: this.data.subIndex,
          carResult: result
        })
      } else {
        this.triggerEvent('noticeRemove', {
          storeId: result.storeId,
          shopType: this.data.shopType
        })
      }
    },
    // 加减车
    onAddMinControllerChange(e) {
      let { cartResult } = e.detail
      if (cartResult != null && cartResult.itemList && cartResult.itemList.length) {
        this.triggerEvent('updateInfos', {
          storeId: this.data.datas.storeId,
          shopType: this.data.shopType,
          subIndex: this.data.subIndex,
          carResult: cartResult
        })
      } else {
        this.triggerEvent('noticeRemove', {
          storeId: cartResult.storeId,
          shopType: this.data.shopType
        })
      }
    },
    // 修改数量弹层
    onShowModify(e) {
      let { infos = {} } = e.detail
      this.setData({
        showModify: true,
        modifyGoodsInfo: infos
      })
    },
    closeModify(e) {
      let { refreshCar = '', result = {} } = e.detail || {}
      if (refreshCar == true) {
        this.triggerEvent('updateInfos', {
          storeId: this.data.datas.storeId,
          shopType: this.data.shopType,
          subIndex: this.data.subIndex,
          carResult: result
        })
      }
      this.setData({
        showModify: false
      })
    },
    // 跳转门店
    goToStore() {
      let { storeId = '', orgCode = '' } = this.data.datas
      wx.navigateTo({
        url: `/pages/store/index?storeId=${storeId}&orgCode=${orgCode}`,
        preObj: this.data.buriedObj,
        success() {
          // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
          app.globalData.refreshShopid = storeId
        }
      })
    },
    // 优惠券弹层
    getCoupon() {
      djBus.emit('couponPop', this.data.buriedObj)
      this.setData({
        isShowCouponPop: true
      })
    },
    // 换购弹层
    goDosomething(e) {
      let { suittype } = e.detail
      this.setData({
        giftPopType: suittype,
        showGiftPop: true
      })
    },
    // 优惠券弹层隐藏的接收逻辑
    handleHideCouponPop() {
      this.setData({
        isShowCouponPop: false
      })
    },
    // 全选
    selectAllToggle() {
      if (!this.data.isSelectAllDisabled) {
        let isSelectAll = !this.data.isSelectAll;
        let functionId = isSelectAll ? FNIDS.miniCartCheckAllItem.functionId : FNIDS.miniCartUnCheckAllItem.functionId
        let appVersion = isSelectAll ? FNIDS.miniCartCheckAllItem.appVersion : FNIDS.miniCartUnCheckAllItem.appVersion
        request({
          functionId,
          method: 'POST',
          body: {
            isReturnCart: true,
            positionType: "2",
            orgCode: this.data.datas.orgCode,
            storeId: this.data.datas.storeId,
            lat: app.globalData.addressInfo.latitude || '',
            lng: app.globalData.addressInfo.longitude || '',
            cartOpenFlag: true,
            fromSource: 5,
            pageSource: this.data.pageSource,
            refPageSource: this.data.refPageSource,
            cartType: this.data.cartType
          },
          appVersion,
          pageId: this.data.pageId,
          preObj: this.data.buriedObj
        })
          .then((res) => {
            let result = res.data.result;
            if (result) {
              this.triggerEvent('updateInfos', {
                storeId: this.data.datas.storeId,
                shopType: this.data.shopType,
                subIndex: this.data.subIndex,
                carResult: result
              })
              // 更新全选flag
              this.setData({
                isSelectAll: isSelectAll,
              });
            }
          })
          .catch((err) => {
            console.log(err);
           });
      }
    },
    // 删除所有商品
    removeAllGoods() {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'delete_all',
        click_par: {
          storeId: this.data.datas.storeId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      mp.dialog({
        content: '清空购物车中所有商品？'
      }).then(res => {
        if (res.confirm) {
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'click_delete',
            click_par: {
              storeId: this.data.datas.storeId
            },
            pageId: this.data.pageId,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          })
          let { functionId, appVersion } = FNIDS.miniCartRemoveAllItem
          request({
            functionId,
            method: 'POST',
            body: {
              isReturnCart: true,
              orgCode: this.data.datas.orgCode,
              storeId: this.data.datas.storeId,
              lat: app.globalData.addressInfo.latitude || '',
              lng: app.globalData.addressInfo.longitude || '',
              positionType: "2",
              cartType: this.data.cartType,
              pageSource: this.data.pageSource,
              refPageSource: this.data.refPageSource
            },
            appVersion,
            pageId: this.data.pageId,
            preObj: this.data.buriedObj
          })
          .then((res) => {
            let result = res.data.result;
            if (result) {
              updatePageNums({ type: 'clear', data: { storeId: result.storeId } })
              this.triggerEvent('noticeRemove', {
                storeId: result.storeId,
                shopType: this.data.shopType
              })
            }
          })
          .catch((err) => { 
            console.log(err);
           });
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 小黄条点击去凑单
    goToAddOn() {
      let { addOnOff, tradePieceOffDesc = '' } = this.data.discountTipInfo;
      switch (addOnOff) {
        // 优惠券弹层
        case 3:
          djBus.emit('couponPop', this.data.buriedObj)
          this.setData({
            isShowCouponPop: true,
          })
          break;
        // 换赠弹层
        case 4:
          this.setData({
            giftPopType: 'wholestore',
            showGiftPop: true,
          })
          break;
        case 1:
        case 2:
        case 5:
        case 6:
        case 7:
          let { to, params } = this.data.discountTipInfo
          let orgCode = this.data.datas.orgCode
          orgCode ? params.orgCode = orgCode : ''
          djCmsJump({
            to,
            params,
            preObj: this.data.buriedObj
          })
          // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
          app.globalData.refreshShopid = this.data.datas.storeId
          break
        default:
          break;
      }

      // 埋点
      let click_par = {
        position: 'fold',
        text: tradePieceOffDesc,
        storeId: this.data.datas.storeId,
        addOnOff: addOnOff,
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'miniCartSelect',
        click_par,
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 开通会员
    openMembers(e) {
      let { open, to, params, freeMember } = e.currentTarget.dataset
      // 根据会员弹层信息是否存在判断是否是免费开通会员
      let memberBenefitInfo = this.data.datas.estimatedPriceVo && this.data.datas.estimatedPriceVo.memberBenefitInfo || ''
      if (memberBenefitInfo) {
        // 免费开通
        this.setData({ oneKeyOpen: true })
      } else {
        if (open) {
          // 如果是跳转h5,但是没下发url则不跳转
          if (to == 'web' && (!params || !params.url)) return
          // 跳转协议
          djCmsJump({
            to,
            params,
            preObj: this.data.buriedObj
          })
        }
      }
      clickBuriedV2_({
        click_id: 'clickMember',
        click_par: {
          storeId: this.data.datas.storeId,
          memberType: freeMember ? 'free' : 'pay'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    memberToastopen() {
      let { functionId, appVersion } = FNIDS.shopCartOnClick
      request({
        functionId,
        appVersion,
        method: 'POST',
        body: {
          storeId: this.data.datas.storeId,
          orgCode: this.data.datas.orgCode,
          source: 'cartoneclick'
        },
        pageId: this.data.pageId,
        preObj: this.data.buriedObj
      }).then(res => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '开通会员成功',
            icon: "none",
            duration: 3000
          });
          this.getCartData();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000
          });
        }
      }).catch(err => {
        wx.showToast({
          title: '网络异常',
          icon: "none",
          duration: 3000
        });
      })
    },
    // 点击按钮 根据按钮类型进行跳转
    handleClickBt(e) {
      let { buttonType, buttonState, buttonName } = e.currentTarget.dataset
      if (!this.data.flag) return
      this.setData({
        flag: false
      });
      switch (buttonType) {
        case 9:
          this.goToBill(buttonState, buttonName)
          break;
        case 10:
          this.setData({
            flag: true
          });
          let { storeId = '', orgCode = '' } = this.data.datas
          wx.navigateTo({
            url: `/pages/store/index?storeId=${storeId}&orgCode=${orgCode}`,
            preObj: this.data.buriedObj,
            success() {
              // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
              app.globalData.refreshShopid = storeId
            }
          })
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'goShop',
            click_par: {
              storeId: storeId,
              btnName: buttonName
            },
            pageId: this.data.pageId,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          })
          break
        case 12:
          this.setData({
            flag: true
          });
          let pages = getCurrentPages()
          let route = pages[pages.length - 1].route
          let options = pages[pages.length - 1].options
          let params = ''
          if (Object.keys(options).length) {
            Object.keys(options).forEach((item, index) => {
              if (index == 0) {
                params += `${item}=${options[item]}`
              } else {
                params += `&${item}=${options[item]}`
              }
            })
          }
          let navigatePath = `/${route}?${params}`
          wx.navigateToMiniProgram({
            appId: 'wxffb7d80f8c50ac5c',
            path: navigatePath
          })
          break
        default:
          break;
      }
    },
    goToBill(buttonState, buttonName) {
      if (util.isLogin()) {
        if (buttonState === 0) {
          this.goToBillImpl();
          // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
          app.globalData.refreshShopid = this.data.datas.storeId
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'goCart',
            click_par: {
              storeId: this.data.datas.storeId,
              buttonName
            },
            pageId: this.data.pageId,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          })
        } else {
          this.setData({
            flag: true
          });
        }
      } else {
        this.setData({
          flag: true
        });
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj
        })
      }
    },
    goToBillImpl() {
      let { functionId, appVersion } = FNIDS.verifySettle
      request({
        functionId,
        method: 'POST',
        isNeedDealError: true,
        body: {
          orgCode: this.data.datas.orgCode,
          positionType: "2",
          storeId: this.data.datas.storeId,
          pageSource: this.data.pageSource,
          refPageSource: this.data.refPageSource
        },
        appVersion,
        pageId: this.data.pageId,
        preObj: this.data.buriedObj
      })
        .then((res) => {
          const { result } = res.data
          if (res.data.code == "0") {
            let { datas, grabCouponList, buriedObj } = this.data;
            let { storeId = '', orgCode = '', storeName = '' } = datas
            wx.navigateTo({
              url: `/pages/settlementV2/index?storeId=${storeId}&orgCode=${orgCode}&storeName=${storeName}&grabCouponList=${JSON.stringify(grabCouponList)}`,
              preObj: buriedObj
            })
          } else if (res.data.code == "30910") {
            this.setData({
              isShowAuthoryDialog: true,
              authoryDialogContent: res.data.result.popupWindow.content.replace(
                /<br\/>/g,
                "\r\n"
              ),
            });
          } else if (result.popupWindow && result.popupWindow.type == 3) {
            // 上一页是门店
            let { param, to } = result.popupWindow.buttons[1]
            let anchorCateId = param.anchorCateId
            wx.setStorageSync('miniCartMustOrder', {
              toast: result.popupWindow.title,
              anchorCateId: anchorCateId
            })
            if (this.data.preBuried.prePageName == 'storeinfo' || this.data.preBuried.prePageName == 'storeSearch') {
              wx.navigateBack()
            } else if (this.data.preBuried.currentPageName == 'storeinfo') {
              mp.toast({
                title: res.data.msg,
                duration: 1500,
              });
              this.triggerEvent('miniCartMustOrderFn')
            } else {
              djCmsJump({
                params: param,
                to: to
              })
            }
          } else if (result.popupWindow && result.popupWindow.type == 1 || result.popupWindow && result.popupWindow.type == 2) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
            });

          } else {
            if (result.popupWindow && result.popupWindow.buttons && result.popupWindow.buttons.length > 0) {
              if (result.popupWindow.buttons && result.popupWindow.buttons[1]) {
                let { param = '' } = result.popupWindow.buttons[1]
                let anchorCateId = param.anchorCateId
                wx.setStorageSync('miniCartMustOrder', {
                  toast: result.popupWindow.title,
                  anchorCateId: anchorCateId
                })
              }
              this.triggerEvent('showPopUp', {
                popupWindow: result.popupWindow
              })
            }
          }
          setTimeout(() => {
            this.setData({
              flag: true,
            });
          }, 2000);
        })
        .catch(() => {
          setTimeout(() => {
            this.setData({
              flag: true,
            });
          }, 2000);
        });
    },

    // 关闭换赠弹窗
    giftPopClose() {
      this.setData({
        showGiftPop: false
      })
    },
    async addGiftSuccess() {
      this.setData({
        showGiftPop: false
      }, () => {
        this.getCartData()
      })
    },
    // 点击展开全部按钮
    showMoreGoods() {
      let handleOpen = !this.data.handleOpen
      // handleOpen为true时，还原全部商品列表
      this.setData({
        'datas.itemList': handleOpen ? this.data.originList : this.data.tempList,
        invalidData: handleOpen ? this.data.originInva : this.data.tempInva,
        handleOpen
      })
    },
    // 计算折叠区域
    computeFold(itemList) {
      let size = this.data.showGoods, tempList = [], inalite = [], count = 0, lookMore = false
      let cyLists = JSON.parse(JSON.stringify(itemList))

      cyLists.map((item,index) => {
        if (count < size) {
          tempList.push(item)
          for (let i = index; i < tempList.length; i++) {
            let subItem = tempList[i]
            let tempSku = []
            if (subItem.suitType == 'invalidate') {
              if (subItem.suitName == '套装') {
                _dealCombination(subItem)
              } else {
                _dealSingle(subItem, tempSku)
              }
            } else {
              if (subItem.suitType == 'combination') {
                // 套装
                _dealCombination(subItem)
              }
              if (subItem.giftList && subItem.giftList.length) {
                // 换购
                _dealGift(subItem)
                _dealSingle(subItem, tempSku)
              } else {
                _dealSingle(subItem, tempSku)
              }
            }
            tempList[i] = subItem
            if (subItem.suitType == 'invalidate') inalite.push(subItem)
          }
        } else {
          lookMore = true
        }
      })

      /* 公共方法区域 --START */
      function _dealSingle(subItem, tempSku) {
        subItem.skuList && subItem.skuList.map((its) => {
          if (count < size) {
            if (!its.giftMap) {
              // 假如没有赠品
              count++
              tempSku.push(its)
            } else {
              count += 1
              if (count + its.giftMap.length <= size) {
                tempSku.push(its)
                count += its.giftMap.length
              } else {
                its.giftMap.splice(size - count, its.giftMap.length)
                count += its.giftMap.length
                tempSku.push(its)
                lookMore = true
              }
            }
          } else {
            lookMore = true
          }
        })
        subItem.skuList = tempSku
      }

      function filterGift(gift) {
        let temp = []
        gift.forEach(item => {
          if (item.checkType == 1) {
            temp.push(item)
          }
        })
        return temp
      }

      function _dealGift(subItem) {
        // giftList中checkType==1是选中的换购品
        let validGift = filterGift(subItem.giftList)
        if (count < size) {
          if (count + validGift.length <= size) {
            count += validGift.length
          } else {
            validGift.splice(size - count, validGift.length)
            count += validGift.length
            subItem.giftList = validGift
            lookMore = true
          }
        } else {
          lookMore = true
        }
      }

      function _dealCombination(subItem) {
        if (count < size) {
          let skuInfoList = subItem.combinationSkuInfo && subItem.combinationSkuInfo.skuInfoList
          if (count + skuInfoList.length <= size) {
            count += skuInfoList.length
          } else {
            skuInfoList.splice(size - count, skuInfoList.length)
            count += skuInfoList.length
            subItem.combinationSkuInfo.skuInfoList = skuInfoList
            lookMore = true
          }
        } else {
          lookMore = true
        }
      }
      /* 公共方法区域 --END */
      this.setData({
        tempList: tempList,
        tempInva: inalite
      })
      if (lookMore == true && this.data.handleOpen == false) this.setData({ 'datas.itemList': tempList })
      // 重置
      if (lookMore != this.data.lookMore) this.setData({ lookMore, handleOpen: false })
      if (lookMore == true && this.data.handleOpen == true && this.data.invalidData.length) return
      this.setData({ invalidData: inalite })
    }
  },
});
