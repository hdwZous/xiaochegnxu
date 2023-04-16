import { clickBuriedV2_ } from "../../../../../common/util/BI";
import orderPublic from '../../../../../common/util/public.js';
import { requestSign } from '../../../../../common/util/PayTools';
import mp from "../../../../../common/util/wxapi";
import { FNIDS, request } from "../../../../../common/util/api";
import { custom_order } from '../../../../../common/util/tencentBi/report';
import util from '../../../../../common/util/util';
import { djCmsJump } from '../../../../../common/util/agreementV2';
let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
        console.log('initData--val', val)
        const { payStateArray = [], showRemark = 0, showPay = 0 } = val;
        if (showRemark == 1 && Array.isArray(payStateArray)) {
          const payStateItem = payStateArray[0] || {};
          const { countDownTime = 0 } = payStateItem;
          const countTime = countDownTime - Date.now();
          util.newCountDown(countTime, (e) => {
            const { minute, second } = e;
            this.setData({
              minute,
              second
            })
          })
        }
        if (showPay == 1 && Array.isArray(payStateArray)) {
          this.data.payStateArray = payStateArray
          this.dealPayButton(this.data.payStateArray)
        }
      }
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
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {},
      observer (v) {
        console.log(v)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true, // 防止重复提单支付
    minute: 0,
    second: 0,
    payStateArray: [],
    payButton: null,
    mapHeight: '368rpx',
    mapInHeight: '468rpx',
    defaultLogo: 'https://storage.360buyimg.com/wximg/common/logo.jpg',
    isGoToStore: false,
    fee: '', // 支付金额
    orderId: '',
    storeId: '',
    orgCode: '',
    locOrdertype: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打电话
    handleClickCall (ev) {
      let bindData = ev.currentTarget.dataset;
      this.triggerEvent('clickCallBuried', {
        orderId: this.data.initData.orderId,
        type: bindData.type,
        orderState: this.data.initData.orderState
      })

      if (this.data.initData.orderStateMap.isMiddleNumber == 1) {
        this.triggerEvent('showMiddleModal', {
          orderId: this.data.initData.orderId,
          storeId: this.data.initData.storeId
        });
        return;
      }
      wx.showModal({
        title: bindData.type == '0' ? '联系商家' : bindData.type == '2' ? '联系配送员' : '拨打电话',
        content: bindData.number,
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: bindData.number,
              success: function () { }
            })
          }
        }
      })
    },
    // 售后跳转
    handleAfterSaleJumop (ev) {
      this.triggerEvent('clickAfterSaleBarBuried')
      let url = ev.currentTarget.dataset.url;
      let { recommendObj = {} } = this.data;
      wx.navigateTo({
        url: '/pages/h5/index?url=' + encodeURIComponent(url),
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist-listItem1'
        }
      })
      this.handleAfterSaleJumpBi(ev)
    },
    // 售后进度埋点
    handleAfterSaleJumpBi (e) {
      let {orderId = 0, orderState = 0} = e.currentTarget.dataset.initData || {}
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickAfterSaleProgress',
        click_par: {
          orderId,
          orderState
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
    },
    // 拼团跳转至订单详情
    goToGroupOrderDetail (e) {
      let data = e.currentTarget.dataset;
      let orderId = data.orderId;
      let { recommendObj = {} } = this.data;
      wx.navigateTo({
        url: '/pages/groupBuy/orderInfo/index?orderId=' + orderId,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist-listItem2'
        }
      })
    },
    // 跳转订单详情
    gotoOrderDetail (e) {
      this.triggerEvent('clickOrderStateBuried')
      let bindData = e.currentTarget.dataset;
      let orderId = bindData.orderId;
      let orderType = bindData.orderType
      let { recommendObj = {} } = this.data;
      djCmsJump({
        to: 'orderDetail',
        params: {
          orderId: orderId,
          orderType,
          locOrderType: this.data.initData.locOrderType,
          orderState: this.data.initData.orderState
        },
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist-listItem3'
        }
      })
      // wx.navigateTo({
      //   url: `/pages/order/orderdetail/index?orderId=${orderId}`,
      //   preObj: recommendObj,
      //   buried_position: {
      //     currentPageName: 'tabbar-orderlist-listItem3',
      //   },
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) { }
      // });
    },
    // 公用方法
    // gotoStore: orderPublic.gotostore,
    gotoStore (e) {
      e.traceId = this.data.traceId;
      this.gotoStoreBi(e);
      orderPublic.gotostore.call(null, e, this);
    },
    // 点击去门店埋点
    gotoStoreBi (e) {
      let {orderId = 0, storeId = 0, orderState = 0} = e.currentTarget.dataset.order || {}
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickStore',
        click_par: {
          orderId,
          storeId,
          orderState
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
    },

    gotopay (e) {
      var _this = this;
      var dataset = e.currentTarget.dataset
      const locOrdertype = dataset.locOrdertype
      const storeid = dataset.storeid
      const orgCode = dataset.orgCode
      var canClick = dataset.canClick
      var orderId = dataset.orderId;
      var tradeName = dataset.tradeName;
      var busType = dataset.businessType;
      var orderPrice = dataset.realpay.split("¥")[1];
      var payStageType = this.data.initData.payInfo && this.data.initData.payInfo.payStageType ? this.data.initData.payInfo.payStageType : ''
      // 到店订单
      if (locOrdertype == 2) {
        this.triggerEvent('onShowPayPop', {
          showPayPop: true,
          fee: orderPrice,
          orderId: orderId,
          storeId: storeid,
          orgCode: orgCode,
          locOrdertype: locOrdertype
        })
        const { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data;
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'goPay',
          click_par: {
            orderId,
            locOrderType: this.data.initData.locOrderType,
            orderState: this.data.initData.orderState
          },
          currentPageName: currentPageName || "",
          prePageName: prePageName || "",
          pageId: pageIdFirstPage || ""
        })
        return;
      }
      if (canClick) {
        // 腾讯有数埋点
        custom_order({
          orderId: orderId,
          orderDate: new Date(),
          orderPrice: _this.data.initData.productTotalPrice
        }, 'pay')
        this.gotoPayBi(dataset, payStageType)
        requestSign({
          orderId: orderId,
          payName: tradeName,
          payStageType
        }, function () {
          let { recommendObj = {} } = _this.data;
          if (busType == 8) { // 轻松购
            var url = "/pages/easyGo/paySuccess/paySuccess?orderId=" + orderId;
            wx.navigateTo({
              url: url,
              preObj: recommendObj,
              buried_position: {
                currentPageName: 'tabbar-orderlist-listItem4'
              }
            })
          } else {
            wx.navigateTo({
              url: `/pages/order/paySuccess/index?orderId=${orderId}&orderPrice=${orderPrice}&payStageType=${payStageType}`,
              preObj: recommendObj,
              buried_position: {
                currentPageName: 'tabbar-orderlist-listItem11'
              }
            })
          }
          // 腾讯有数埋点
          custom_order({
            orderId: orderId,
            orderDate: new Date(),
            orderPrice: _this.data.initData.productTotalPrice
          }, 'payed')
        }, function () {
          // 腾讯有数埋点
          custom_order({
            orderId: orderId,
            orderDate: new Date(),
            orderPrice: _this.data.initData.productTotalPrice
          }, 'cancel_pay')
        })
      }
    },
    // 去支付埋点
    gotoPayBi (dataset, payStateType) {
      let {orderId = 0, orderState = 0} = dataset || {}
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'goPay',
        click_par: {
          orderId,
          payStateType,
          orderState
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
    },

    // 点击订单条码
    gotoCode (e) {
      app.globalData.needLoadOrder = true;
      let { recommendObj = {} } = this.data;
      var orderId = e.currentTarget.dataset.orderId;
      this.triggerEvent('gotoCode', orderId)
      var url = "/pages/easyGo/paySuccess/paySuccess?orderId=" + orderId;
      wx.navigateTo({
        url: url,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist-listItem14'
        }
      })
    },
    // 拼团按钮点击事件
    clickOrderBtn (e) {
      let data = e.currentTarget.dataset;
      let type = data.btnType;
      let orderId = data.orderId;
      let groupId = data.groupId;
      let { recommendObj = {} } = this.data;
      if (type === 1) { // 再团一个
        // 埋点
        let group_type = '';
        if (data.entrustOrderTag != null && data.entrustOrderTag == 1) {
          group_type = '团长代收'
        } else {
          group_type = '普通拼团'
        }
        this.triggerEvent('clickOrderBtn', {
          deliver_type: data.typedesc,
          store_id: data.storeId,
          sku_id: data.skuId,
          orgcode: data.orgCode,
          group_type: group_type
        })
        wx.navigateTo({
          url: '/pages/groupBuy/groupList/index',
          preObj: recommendObj,
          buried_position: {
            currentPageName: 'tabbar-orderlist-listItem15'
          }
        })
      } else if (type === 2) { // 邀请参团

      } else if (type === 3) { // 立即付款
        this.requestSign({
          orderId: orderId,
          groupId: groupId
        })
      }
    },
    /**
     * 支付
     * @param options
     */
    requestSign (options) {
      let self = this;
      if (!this.data.flag) return;
      this.setData({
        flag: false
      });
      requestSign(options, function () {
        let { recommendObj = {} } = self.data;
        self.groupPayCheck(options.orderId).then(res => {
          self.setData({
            flag: false
          });
          let result = res.data.result;
          if (result) {
            // 校验拼团或参团成功
            wx.navigateTo({
              url: "/pages/groupBuy/paySuccess/index?orderId=" + options.orderId + '&groupId=' + options.groupId,
              preObj: recommendObj,
              buried_position: {
                currentPageName: 'tabbar-orderlist-listItem19'
              }
            })
          } else {
            mp.dialog({
              content: res.data && res.data.msg,
              showCancel: false
            }).then(res => {
              if (res.confirm) {
                // 校验拼团或参团失败
                if (self.data.groupCode) {
                  wx.navigateTo({
                    url: "/pages/groupBuy/join/index?&groupId=" + self.data.groupCode,
                    preObj: recommendObj,
                    buried_position: {
                      currentPageName: 'tabbar-orderlist-listItem20'
                    }
                  })
                } else {
                  wx.navigateTo({
                    url: "/pages/groupBuy/orderInfo/index?&orderId=" + options.orderId,
                    preObj: recommendObj,
                    buried_position: {
                      currentPageName: 'tabbar-orderlist-listItem21'
                    }
                  })
                }
              }
            })
          }
        }).catch(() => {
          self.setData({
            flag: false
          })
        })

      }, function () {
        let { recommendObj = {} } = self.data;
        wx.navigateTo({
          url: "/pages/groupBuy/orderInfo/index?orderId=" + options.orderId,
          preObj: recommendObj,
          buried_position: {
            currentPageName: 'tabbar-orderlist-listItem22'
          }
        })
      });
      this.setData({
        flag: true
      })
    },
    /**
     * 校验参团
     */
    groupPayCheck (orderId) {
      return new Promise((resolve, reject) => {
        request({
          ...FNIDS.groupPayCheck,
          body: {
            orderId: orderId
          },
          pageId: this.data.pageId || "",
          preObj: this.data.recommendObj || {}
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    showShare (e) {
      let data = e.currentTarget.dataset;
      this.triggerEvent('showShare', data)
    },
    pageBuried (e) {
      this.triggerEvent('pageBuried', e.detail)
    },
    jumpHandler (e) {
      const { initData: { orderId, storeId } = {}, currentPageName = '', prePageName = '', pageIdFirstPage = '', recommendObj = {} } = this.data;
      const { to = '', params = {} } = e.currentTarget.dataset;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickWrite',
        click_par: {
          orderId,
          storeId,
          type: 'page'
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
      if (to) {
        djCmsJump({
          to,
          params,
          preObj: recommendObj,
          buried_position: {
            currentPageName: 'tabbar-orderlist-listItem25'
          }
        })
      }
    },
    dealPayButton (lists) {
      let payButton = []
      if (lists.length) {
        lists.map(item => {
          if (item.showCountDownTime && (item.countDownTime - this.data.initData.serverTime > 0)) {
            payButton.push(item)
          } else if (!item.showCountDownTime) {
            payButton.push(item)
          }
        })
        this.setData({ payButton })
      }
    },
    paybuttonback () {
      if (this.data.payStateArray.length) {
        this.data.payStateArray.splice(0, 1)
        if (this.data.payStateArray.length) {
          this.dealPayButton(this.data.payStateArray)
        } else {
          this.setData({ payButton: [] })
        }
      }
    },
    handleAgain (e) {
      let { recommendObj = {} } = this.data;
      let { to, params } = e.currentTarget.dataset
      const { initData = {}, currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickAgainBuy',
        click_par: {
          orderId: initData.orderId,
          locOrderType: initData.locOrderType,
          orderState: initData.orderState,
          storeId: initData.storeId,
          type: initData.locOrderType
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
      if (!e.currentTarget.dataset.clickjumpcheck) {
        djCmsJump({
          to,
          params,
          preObj: recommendObj,
          buried_position: {
            currentPageName: 'tabbar-orderlist-listItem'
          }
        })
      } else {
        request({
          ...FNIDS.singleProductNew,
          isNeedDealError: true,
          body: {
            orderId: this.data.initData.orderId,
            cartUuid: 'C6A0707D39D000018AC7DFA031FE1C8A',
            locOrderType: this.data.initData.locOrderType
          },
          method: 'POST',
          pageId: this.data.pageId || '',
          preObj: this.data.recommendObj || {}
        }).then(res => {
          if (res.data.code == 0) {
            let { result } = res.data;
            let tipMsgObj = {
              2: '该商品已下架，可到门店查看其它相似商品。',
              3: '此商品库存不足',
              4: '此门店已下线，去其它门店逛逛吧。'
            };
            if (result == 0) {
              djCmsJump({
                to: to || 'store',
                params: params || {
                  storeId: this.data.initData.storeId,
                  orgCode: this.data.initData.orgCode
                },
                preObj: recommendObj,
                buried_position: {
                  currentPageName: 'tabbar-orderlist-listItem33'
                }
              })

            } else {
              wx.showModal({
                title: '温馨提示',
                content: tipMsgObj[result] || '该商品已下架，可到门店查看其它相似商品。',
                confirmText: '知道了',
                showCancel: false
              })
            }
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '该商品已下架，可到门店查看其它相似商品。',
              confirmText: '知道了',
              showCancel: false
            })
          }
        }).catch(err => {
          wx.showToast({
            title: err.toString(),
            icon: 'none',
            duration: 3000
          });
        })
      }
      this.handleAgainBi(initData)
    },

    // handleAgain(e) {
    //   let { initData = {} } = this.data;
    //   let skuObj = initData.productList.find(v => {
    //     return v.orderId == initData.orderId;
    //   });
    //   request({
    //     ...FNIDS.checkBeforeToProductDetail,
    //     isNeedDealError: true,
    //     body: {
    //       storeId: initData.storeId,
    //       orderId: initData.orderId,
    //       sku: skuObj.sku
    //     },
    //     method: 'POST',
    //     pageId: this.data.pageId || '',
    //     preObj: this.data.recommendObj || {}
    //   }).then(res => {
    //     if (res.data.code == 0) {
    //       let statusTextObj = {
    //         2: '门店已下线',
    //         3: '商品已删除'
    //       };
    //       if (res.data.result === 1) {
    //         this._handleAgain(e)
    //       } else {
    //         wx.showToast({
    //           title: statusTextObj[res.data.result] || '商品已删除',
    //           icon: 'none',
    //           duration: 3000,
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none',
    //         duration: 3000,
    //       });
    //     }
    //   }).catch(err => {
    //     wx.showToast({
    //       title: err.toString(),
    //       icon: 'none',
    //       duration: 3000,
    //     });
    //   })
    //   this.handleAgainBi(initData)
    // },
    handleAgainBi (item) {
      let {orderId = 0, orderState = 0, storeId = 0, businessType = ''} = item || {}
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickAgainBuy',
        click_par: {
          orderId,
          storeId,
          orderState,
          type: businessType
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
    },
    // handleAgain(e) {
    //   const { initData = {}, currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data;
    //   clickBuriedV2_({
    //     create_time: new Date(),
    //     click_id: 'clickAgainBuy',
    //     click_par: {
    //       orderId: initData.orderId,
    //       locOrderType: initData.locOrderType,
    //       orderState: initData.orderState,
    //       storeId: initData.storeId,
    //       type: initData.locOrderType
    //     },
    //     currentPageName: currentPageName || "",
    //     prePageName: prePageName || "",
    //     pageId: pageIdFirstPage || ""
    //   })
    //   let skuObj = initData.productList.find(v => {
    //     return v.orderId == initData.orderId;
    //   });
    //   request({
    //     ...FNIDS.checkBeforeToProductDetail,
    //     isNeedDealError: true,
    //     body: {
    //       storeId: initData.storeId,
    //       orderId: initData.orderId,
    //       sku: skuObj.sku,
    //       locOrderType: initData.locOrderType
    //     },
    //     method: 'POST',
    //     pageId: this.data.pageId || '',
    //     preObj: this.data.recommendObj || {}
    //   }).then(res => {
    //     if (res.data.code == 0) {
    //       let statusTextObj = {
    //         2: '门店已下线',
    //         3: '商品已删除'
    //       };
    //       if (res.data.result === 1) {
    //         this._handleAgain(e)
    //       } else {
    //         wx.showToast({
    //           title: statusTextObj[res.data.result] || '商品已删除',
    //           icon: 'none',
    //           duration: 3000,
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none',
    //         duration: 3000,
    //       });
    //     }
    //   }).catch(err => {
    //     wx.showToast({
    //       title: err.toString(),
    //       icon: 'none',
    //       duration: 3000,
    //     });
    //   })
    // },
    // 全屏地图开关
    onTapMap (e) {
      console.log('onTapMap', e);
      if (e.type == 'tapMapEvent' && this.data.mapHeight == '100vh') return;
      this.setData({
        mapHeight: this.data.mapHeight == '100vh' ? '368rpx' : '100vh',
        mapInHeight: this.data.mapHeight == '100vh' ? '468rpx' : '100vh'
      })
    },

    // 查看券码
    checkCode () {
      const { currentPageName = '', prePageName = '', pageIdFirstPage = '', initData = {} } = this.data;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickCodeNum',
        click_par: {
          orderId: initData.orderId,
          locOrderType: initData.locOrderType,
          orderState: initData.orderState
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
      this.triggerEvent('handleShowCheckCodePop', {
        orderId: initData.orderId,
        locOrderType: initData.locOrderType,
        orderState: initData.orderState,
        isBtnClick: true
      })
    }
  }
})
