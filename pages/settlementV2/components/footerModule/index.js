/* eslint-disable camelcase */
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderMark: {
      type: Object,
      value: {}
    },
    lackGoodsInfo: {
      type: Object,
      value: null,
      observer: function (val) {
        if (val && val.data) {
          this.setData({
            pickerOptionList: val.data.pickerOptionList || [],
            pickerTitle: val.data.pickerTitle
          }, () => {
            this.setData({
              selectedLackGoods: this.data.pickerOptionList[this.data.lackGoodsIndex]
            })
            this.triggerEvent('setLackGoods', {
              selectedLackGoods: this.data.pickerOptionList[this.data.lackGoodsIndex]
            })
          })
        }
      }
    },
    invoice: {
      type: Object,
      value: {}
    },
    invoiceRightValue: {
      type: String,
      value: '未选择'
    },
    invoiceData: { // 发票页面传过来的数据
      type: Object,
      value: {}
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
    // 餐具数据
    tableWareData: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lackGoodsIndex: 0,
    dialogRemarkContent: "",
    selectedLackGoods: "",
    focus: false,
    pickerOptionList: [],
    pickerTitle: ''
  },
  pageLifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onRemarkClick: function () {
      // 两种方式都行，但是dialog有textarea导致的滑动穿透问题，无解
      this.setData({
        dialogRemarkContent: this.data.remarkContent || "",
        showRemarkDialog: true
      }, () => {
        setTimeout(() => {
          this.setData({
            focus: true
          })
        }, 300)
      });
    },
    onRemarkInput (e) {
      this.data.dialogRemarkContent = e.detail.value;
    },
    onRemarkCompleted: function () {
      this.setData({
        remarkContent: this.data.dialogRemarkContent,
        dialogRemarkContent: this.data.dialogRemarkContent,
        showRemarkDialog: false
      }, () => {
        this.triggerEvent('setRemarkContent', {
          remarkContent: this.data.dialogRemarkContent
        })
      }
      );
    },
    onRemarkCancel () {
      this.setData({
        showRemarkDialog: false
      })
    },
    showLackGoodDialog () {
      this.setData({
        showLackGood: true
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'showLayer',
        click_par: {
          type: 'outStock'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 缺货选择
    handleSelect (e) {
      let { data } = e.detail;
      this.setData({
        selectedLackGoods: data.value,
        lackGoodsIndex: data.index
      }, () => {
        this.triggerEvent('setLackGoods', {
          selectedLackGoods: data.value,
          lackGoodsIndex: data.index
        })
      })
    },
    // 发票
    handleInvoiceClick () {
      if (this.data.invoice.data.supportClickInvoice) {
        this.triggerEvent('handleInvoiceClick')
      }
    },
    closeLackGood () {
      this.setData({
        showLackGood: false
      });
    },
    // 打开餐具选择框
    openTableWare () {
      console.log('打开餐具0');
      if (this.data.tableWareData.data.arrowStatus) {
        clickBuriedV2_({
          click_id: 'showLayer',
          click_par: {
            type: 'tableware',
            storeId: this.data.storeId
          },
          pageId: this.data.pageId || "",
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        })
        this.triggerEvent('handleTableWare')
      }
    }
  }
});
