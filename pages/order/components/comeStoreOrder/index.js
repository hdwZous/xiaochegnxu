
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { request, FNIDS } from '../../../../common/util/api';
import { djCmsJump } from '../../../../common/util/agreementV2';

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {}
    },
    locCodeFloorInfo: {
      type: Object,
      value: {}
    },
    from: { // 组件应用的来源
      type: String,
      value: ""
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
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFold: true,
    productInfos: [],
    // tip提示组件相关信息
    tipDialog: {
      show: false,
      types: 0,
      title: '',
      desc: '',
      readmeList: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleContact () {
      if(!this.data.initData || !this.data.initData.contactList || !this.data.initData.contactList.length) {
        return
      }
      let phoneNumber = this.data.initData.contactList.filter(item => item.code == 20);
      if (phoneNumber.length > 0) {
        wx.showModal({
          title: '联系商家',
          content: phoneNumber[0].phoneNum,
          success: (res) => {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: phoneNumber[0].phoneNum,
                success: function () { }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '获取商家电话失败',
          icon: 'none'
        })
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "click_org_call",
        click_par: {},
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    },
    handleFold () {
      this.setData({
        isFold: !this.data.isFold
      })
    },
    // 跳转门店
    handleGotoStore () {
      if (!this.data.initData.medicineTag) { // 非医药
        let order = this.data.initData
        request({
          ...FNIDS.checkStoreStatus,
          body: {
            storeId: order.storeId,
            locOrderType: order.locOrderType || 1
          },
          pageId: this.data.pageId,
          method: "POST",
          preObj: this.data.recommendObj || {}
        }).then(res => {
          if (res.data.result == 2) {
            wx.showModal({
              title: '温馨提示',
              content: '此门店已下线，去其他门店逛逛吧。',
              confirmText: '知道啦',
              showCancel: false
            })
          } else {
            let { recommendObj = {}, initData = {} } = this.data;
            const { to, params } = initData.storeJumpDic
            if (to) {
              djCmsJump({
                to,
                params,
                preObj: recommendObj
              })
            }
          }
        }).catch(err => {
          wx.showToast({
            title: err.data && err.data.msg,
            image: '/images/common_icon_warn.png'
          })
        })
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "click_to_store",
        click_par: {},
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    },
    // 跳转商品详情页面
    handleGotoProductDetail (ev) {
      let skuId = ev.currentTarget.dataset.skuid;
      let orderType = ev.currentTarget.dataset.orderType;
      let orgCode = ev.currentTarget.dataset.orgCode;
      let jumpParams = ev.currentTarget.dataset.jumpParams
      let jumpTo = ev.currentTarget.dataset.jumpTo
      let tipMsgObj = {
        2: '此门店已下线，去其它门店逛逛吧。',
        3: '该商品已下架，可到门店查看其它相似商品。'
      };
      this.checkBeforeToProductDetail(skuId, orderType, orgCode).then(res => {
        let { result } = res.data || -1;
        if (result == 1) {
          if (!this.data.initData.medicineTag) { // 非医药
            let { recommendObj = {}, initData = {} } = this.data;
            if (initData.locOrderType == 2) {
              if (jumpTo) {
                djCmsJump({
                  to: jumpTo,
                  params: jumpParams,
                  preObj: recommendObj
                })
              }
            } else {
              wx.navigateTo({
                url: `/pages/product/index?storeId=${this.data.initData.storeId}&skuId=${skuId}&orgCode=${this.data.initData.orgCode}`,
                preObj: recommendObj
              });
            }
          }
        } else {
          wx.showModal({
            title: '温馨提示',
            content: tipMsgObj[result] || '该商品已下架，可到门店查看其它相似商品。',
            confirmText: '知道了',
            showCancel: false
          })
        }
      }).catch(() => {
        wx.showModal({
          title: '温馨提示',
          content: '该商品已下架，可到门店查看其它相似商品~',
          confirmText: '知道了',
          showCancel: false
        })
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "click_to_detail",
        click_par: {},
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    },

    // 跳转前校验订单状态
    checkBeforeToProductDetail (sku, orderType, orgCode) {
      let { storeId } = this.data.initData || {};
      let pageId = this.data.pageId || "";
      return new Promise((resolve, reject) => {
        request({
          ...FNIDS.checkBeforeToProductDetail,
          body: {
            storeId,
            sku,
            locOrderType: orderType || 1,
            orgCode
          },
          pageId,
          method: "POST",
          preObj: this.data.recommendObj || {}
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    onDeliverFeeClick: function (e) {
      let index = e.currentTarget.dataset.id;
      let title = e.currentTarget.dataset.title
      // console.log(index);
      // console.log('-------');
      this.setData({
        noticeDialogVisible: true,
        noticeDialogData: this.data.initData.priceInfoList[index]
      })
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickExplainIcon",
        click_par: {
          iconName: title
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    },
    handelServiceClick: function (e) {
      let { dialog } = e.currentTarget.dataset
      this.setData({
        serviceDialogVisible: true,
        serviceDialogData: dialog
      })
    },
    showGuardRule (e) {
      let { readmeList } = e.currentTarget.dataset
      let obj = {
        show: true,
        types: 1,
        readmeList
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '预售协议'
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      this.setTipDialog(obj)
    },

    setTipDialog (obj) {
      let tipDialog = Object.assign({}, this.data.tipDialog, obj)
      this.setData({ tipDialog })
    },

    tipClose () {
      this.setTipDialog({ show: false })
    },
    onNoticeDialogVisible (e) {
      this.setData({
        noticeDialogVisible: e.detail.noticeDialogVisible
      })
    },
    onServiceDialogVisible (e) {
      this.setData({
        serviceDialogVisible: e.detail.serviceDialogVisible
      })
    },

    reloadCode () {
      const { initData: { orderId = '', locOrderType = '', orderState = '' } = {} } = this.data
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickRefresh",
        click_par: {
          orderId,
          locOrderType,
          orderState
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
      this.triggerEvent('reloadCode');
    },

    afterSale (e) {
      const { to, params } = e.currentTarget.dataset.jumpParams
      const { initData: { orderId = '', locOrderType = '', orderState = '' } = {}, recommendObj } = this.data
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickAgainBuy",
        click_par: {
          locOrderType: locOrderType,
          orderId: orderId,
          orderState: orderState
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || ""
      })
      if (to) {
        djCmsJump({
          to,
          params,
          preObj: recommendObj
        })
      }
    }
  }
})
