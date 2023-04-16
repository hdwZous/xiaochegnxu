import { djCmsJump } from "../../../../common/util/agreementV2.js";
import {
  request,
  FNIDS
} from '../../../../common/util/api'
import util from "../../../../common/util/util";
import { pvBuriedV2_ } from '../../../../common/util/BI';
import emitter from '../../../../common/util/events'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderId: {
      type: String,
      value: '',
      observer: function () {
        //  console.log('newVal',newVal)
      }
    },
    isMiddleNumber: {
      type: Number,
      value: 0
    },
    pageId: {
      type: String,
      value: ''
    },
    preObj: {
      type: Object,
      value: {}
    },
    orderState:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maskVisible: false,
    cancelType: 0,
    rationPickerVisible: false,
    rationInitData: null,
    cancelTip: null,
    rationTitle: '',
    pickerType: 1,
    modalType: 0, // 1 一级取消弹窗  2 二级取消弹窗 
    initData: {}, // 初始数据
    firstPageData: {}, // 一级页面数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopPropagation() { },
    cancelOrder() {
      // console.log('获取取消订单列表～')
      request({
        functionId: FNIDS.cancelOrderReason.functionId,
        appVersion: FNIDS.cancelOrderReason.appVersion,
        body: {
          "orderId": this.data.orderId
        },
        pageId: this.data.pageId,
        preObj: this.data.preObj || {}
      }).then(res => {
        if (res.data.code == '0') {
          if (res.data.result.type == 2) { // 二级页面
            this.setData({
              rationPickerVisible: true,
              rationInitData: res.data.result.node.reasonModels,
              cancelTip: res.data.result.node.cancelTip,
              rationTitle: res.data.result.node.title,
              pickerType: this.handlePickerType(res.data.result.node.reasonModels)
            })
            
          } else if (res.data.result.type == 1) { // 一级页面
            this.setData({
              maskVisible: true,
              modalType: 1,
              firstPageData: res.data.result.node
            })
          } else if (res.data.result.type == 3) {
            this.setData({
              modalType: 2,
              maskVisible: true,
              initData: res.data.result,
            })
          }
          this.cancelOrderPv();
        }
      })
    },
    cancelOrderPv(){
      let {preObj ={}}= this.data;
      this.setData(
        {
          recommendObj: {
            prePageName: preObj && preObj.currentPageName,
            currentPageName: 'cancelOrder',
            pageSource: preObj && preObj.pageSource,
            refPageSource: preObj && preObj.refPageSource,
            pageIdFirstPage: util.getPageIdrandom(),
          },
        },
        () => {
          this.pvFunc();
          const pageList = getCurrentPages();
          const route =
            (pageList &&
              pageList.length &&
              pageList[pageList.length - 1].route) ||
            "";
          const prePageId = this.data.pageId || "";
          emitter.emit(`halfMaskFunc_${route}_cancelOrder_${prePageId}`, {
            name: "cancelOrder",
            type: "open",
            selector: "cancelOrder", // 用于页面找打半弹层
            buriedObj: this.data.recommendObj,
          });
        }
      );
    },
    pvFunc(back){
        let {orderId = '', recommendObj = {}, orderState = 0} = this.data;
        pvBuriedV2_({
          page_par: {
            orderId: orderId,
            orderState: orderState,
            ref_par: {
              traceId: recommendObj.preTraceId || "",
              userAction: recommendObj.preUserAction || "",
            }
          },
          pageId: recommendObj.pageIdFirstPage || "",
          currentPageName: recommendObj.currentPageName,
          prePageName: recommendObj.prePageName,
          'isBack': back || ''
        })
    },
    // 关闭弹窗
    handleCloseRationPicker: function () {
      this.setData({
        rationPickerVisible: false
      })
      this.triggerEvent('closeRationPicker')
    },
    // 二级页面点击提交时候的回调，会弹出最终弹层
    handleSelect: function (ev) {
      // console.log('handleSelect', ev.detail.selectItem)
      if (ev.detail.selectItem.code == -1) { // 选择其他，无挽留弹层，直接取消
        if (ev.detail.txtValue.length >= 6) {
          this.triggerEvent('confirmCancel', { cancelReason: -1, txtValue: ev.detail.txtValue })
        }
      } else { // 显示挽留弹层
        this.setData({
          modalType: 2,
          maskVisible: true,
          initData: ev.detail.selectItem,
          rationPickerVisible: false
        })
      }
    },
    // 一级页面选择
    handleFirstPageSelect: function (ev) {
      // console.log(ev)
      this.setData({
        maskVisible: false,
        rationPickerVisible: true,
        rationInitData: ev.currentTarget.dataset.item.reasonModels,
        rationTitle: ev.currentTarget.dataset.item.title,
        pickerType: this.handlePickerType(ev.currentTarget.dataset.item.reasonModels)
      })
    },
    handleOperationBtn: function (ev) {
      // console.log('操作按钮',ev)
      // 1 暂不取消/我再看看 2狠心取消 3电话 4im
      let hrefInfo = ev.currentTarget.dataset.hrefinfo
      if (hrefInfo.type == 1) {
        this.colseMask()
      } else if (hrefInfo.type == 2) {
        this.triggerEvent('confirmCancel', { cancelReason: this.data.initData.code })
        this.colseMask()
      } else if (hrefInfo.type == 3) {
        this.colseMask()
        if (this.data.isMiddleNumber == 1) {
          this.triggerEvent('showMiddleModal', {
            orderId: this.data.orderId
          });
          return;
        }
        if (hrefInfo.phone) {
          wx.makePhoneCall({
            phoneNumber: hrefInfo.phone
          })
        }
      } else if (hrefInfo.type == 5) {
        hrefInfo.preObj = this.data.preObj;
        djCmsJump(hrefInfo)
        this.colseMask()
      }
    },
    // 关闭弹层
    colseMask() {
      this.setData({
        maskVisible: false
      })
      this.triggerEvent('closeRationPicker')
    },
    // 判断pickerType 的类型
    handlePickerType(arr) {
      let pickerType = 1
      arr.forEach(item => {
        if (item.canSelect == 0) {
          pickerType = 2
        }
      });
      return pickerType
    }
  }
})
