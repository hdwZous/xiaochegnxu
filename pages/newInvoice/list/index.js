import { request, FNIDS } from "../../../common/util/api";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoiceInfo: {},
    invoiceData: {},
    invoiceInfoVOList: [],
    tipShow: false,
    selectedId: '',
    distributionFee: false, //配送费发票标识
		distributionService: false, //增值服务发票标识
    supportNewInvoice: true, // 是否支持新增发票
    supportShowNoNeedInvoice: true, // 是否显示不需要按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let invoiceInfo = {}
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptSettle', (res) => {
      invoiceInfo = res.postInfo
      let { invoiceId = '', distributionFee = false, distributionService = false, orderId = '', 
            selectIdData: { titleType = '' } = {}
          } = invoiceInfo
      this.setData({ 
        invoiceInfo, 
        selectedId: invoiceId, 
        distributionFee, 
        distributionService 
      }, () => {
        setTimeout(()=> {
          let { 
            recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {}
          } = this.data
          clickBuriedV2_({
            click_id: "selectInvoice",
            click_par: {
              orderId,
              invoiceId,
              titleType: titleType === '' ? -1 : titleType,
              state: 0
            },
            currentPageName,
            prePageName,
            pageId: pageIdFirstPage,
          });
        },500)
      })
      if (invoiceInfo.source == 'settle') {
        return this.fetchInvoiceList()
      }
      if (invoiceInfo.source == 'order') {
        this.fetchOrderInvoice()
      }
    })
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  pvFunc(back) {
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    pvBuriedV2_({
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName,
      isBack: back || "",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  onUnload() { },

  onDefaultBtnEvent(e) {
    let { type } = e.detail
    if (type == 1) {
      this.setData({
        pageError: {
          showError: false
        },
      })
      
    }
  },

  fetchInvoiceList() {
    let { recommendObj = {} } = this.data
    request({
      ...FNIDS.getInvoiceInfo,
      colorFunctionId: 'dj_invoiceweb_getInvoiceInfo',
      isNeedDealError: true,
      body: {},
      method: 'POST',
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        let result = res.data.result
        let invoiceInfoVOList = result.invoiceInfoVOList
        invoiceInfoVOList.length && invoiceInfoVOList.map(item => {
          item.titleFlagLeft = item.titleFlagContent.slice(0, 2)
          item.titleFlagRight = item.titleFlagContent.slice(2)
        })
        this.setData({
          invoiceData: result,
          invoiceInfoVOList
        })
        this.forceUpdate()
      } else {
        this.showToast(res.data.msg)
      }
    }) 
    .catch(err => {
      console.log('catch!!!!!', err);
      this.showToast(err.data && err.data.msg || '网络错误')
    }) 
  },

  fetchOrderInvoice() {
    let { orderId = '', storeId = '' } = this.data.invoiceInfo
    let { recommendObj = {} } = this.data
    request({
      ...FNIDS.getSupplementInvoice,
      colorFunctionId: 'dj_invoiceweb_getSupplementInvoice',
      isNeedDealError: true,
      body: {
        orderId,
        storeId
      },
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        let result = res.data.result
        let invoiceInfoVOList = result.invoices
        invoiceInfoVOList.length && invoiceInfoVOList.map(item => {
          item.titleFlagLeft = item.titleFlagContent.slice(0, 2)
          item.titleFlagRight = item.titleFlagContent.slice(2)
        })
        let invoiceInfo = Object.assign({}, this.data.invoiceInfo, result.invoiceResp)
        this.setData({
          invoiceData: result,
          invoiceInfoVOList,
          invoiceInfo,
          supportNewInvoice: result.supportNewInvoice,
          supportShowNoNeedInvoice: result.supportShowNoNeedInvoice
        })
      } else {
        this.showToast(res.data.msg)
      }
    }) 
    .catch(err => {
      this.showToast(err.data && err.data.msg || '网络错误')
    }) 
  },

  repairInvoice(body) {
    let { recommendObj = {} } = this.data
    request({
      ...FNIDS.insertSupplementInvoice,
      colorFunctionId: 'dj_invoiceweb_insertSupplementInvoice',
      isNeedDealError: true,
      method: 'POST',
      body,
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        wx.navigateBack({
          delta: 1
        })
      } else {
        this.showToast(res.data.msg || '提交失败，请重试...')
      }
    }) 
    .catch(err => {
      this.showToast(err.data && err.data.msg || '提交失败，请重试...')
    }) 
  },

  refreshData() {
    if (this.data.invoiceInfo.source == 'settle') {
      this.fetchInvoiceList()
    }
    if (this.data.invoiceInfo.source == 'order') {
      this.fetchOrderInvoice()
    }
  },

  selectItem(e) {
    let { ids = '', titleType = '' } = e.currentTarget.dataset
    let { supportSpecialInvoice = false } = this.data.invoiceInfo
    if (titleType === 2 && !supportSpecialInvoice) {
      this.showToast('该商家暂不支持开增值税专用发票')
      return
    }
    this.setData({
      selectedId: ids
    })
    let { 
      recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {},
      invoiceInfo: { orderId = '' } = {}
    } = this.data
    clickBuriedV2_({
      click_id: "selectInvoice",
      click_par: {
        orderId,
        invoiceId: ids,
        titleType: titleType === '' ? -1 : titleType
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage,
    });
  },

  confirm() {
    if (this.data.invoiceInfo.source == 'settle') {
      this.forceUpdate(true)
      wx.navigateBack({
        delta: 1
      })
    }
    if (this.data.invoiceInfo.source == 'order') {
      let { distributionFee, distributionService, selectedId , invoiceInfoVOList, invoiceData, invoiceInfo } = this.data
      let info = {}
      if (invoiceData.openedInvoice == true) {
        info = invoiceInfoVOList[0]
      } else {
        info = invoiceInfoVOList.find(value => value.invoiceId == selectedId) || {};
      }
      let { orderId = '' } = invoiceInfo
      try {
        let { recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {} } = this.data
        let { titleType = '' } = info
        clickBuriedV2_({
          click_id: "clickSubmit",
          click_par: {
            orderId,
            invoiceId: selectedId,
            titleType: titleType === '' ? -1 : titleType,
            invoiceMoney: invoiceData.invoiceResp.invoiceMoney,
            invoiceTopType: invoiceData.invoiceResp.invoiceTopType,
            isSelectServiceInvoice: distributionService ? 1 : 0,
            isSelectFreightInvoice: distributionFee ? 1 : 0
          },
          currentPageName,
          prePageName,
          pageId: pageIdFirstPage,
        });
      } catch (error) {}
      if (!invoiceData.openedInvoice && !selectedId) {
        wx.navigateBack({
          delta: 1
        })
        return
      }
      const options = {
        orderId,
        titleType: info.titleType,
        titleContent: info.titleContent,
        taxNum: info.taxNum || null,
        userEmail: info.userEmail,
        invoiceMoney: invoiceData.invoiceResp.invoiceMoney,
        invoiceStoreRemark: invoiceData.invoiceResp.invoiceStoreRemark,
        invoiceEType: invoiceData.invoiceResp.invoiceEType,
        invoiceTopType: invoiceData.invoiceResp.invoiceTopType,
        freightInvoiceMoney: distributionFee === true ? invoiceData.invoiceResp.freightInvoiceMoney : null, // 0不开运费票；1开运费票（只有运费也是1）
        serviceInvoiceMoney: distributionService == true ? invoiceData.invoiceResp.serviceInvoiceMoney : null,
      };
      this.repairInvoice(options)
    }
  },

  forceUpdate(report = false) {
    let pages = getCurrentPages()
    let current = pages.find(item => {
      return item.route == 'pages/settlementV2/index'
    })
    let invoiceData = {}
    let { selectedId = '', distributionFee = '', distributionService = '', invoiceInfo: { invoiceMoney = '' }} = this.data
    if (selectedId) {
      invoiceData = this.data.invoiceInfoVOList.find(value => value.invoiceId == selectedId);
    }
    let obj = {
      invoiceId: selectedId,
			invoiceData,
			distributionFee: distributionFee,
			distributionService: distributionService
    }
    current && current.postInvoiceMsg && current.postInvoiceMsg({ data: obj })
    if (!report) return
    let { recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {} } = this.data
    let { titleType = '' } = invoiceData
    clickBuriedV2_({
      click_id: "clickSubmit",
      click_par: {
        invoiceId: selectedId,
        titleType: titleType === '' ? -1 : titleType,
        invoiceMoney,
        isSelectServiceInvoice: distributionService ? 1 : 0,
        isSelectFreightInvoice: distributionFee ? 1 : 0
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage,
    });
  },

  goEdit(e) {
    let { type, info = null } = e.currentTarget.dataset
    let tip = this.data.invoiceData.taxNumTip
    let selectedId = this.data.selectedId
    let { supportSpecialInvoice } = this.data.invoiceInfo
    let { recommendObj = null } = this.data
    wx.navigateTo({
      url: `/pages/newInvoice/edit/index`,
      success(res) {
        res.eventChannel.emit('acceptEdit', {
          type,
          info,
          tip,
          selectedId,
          supportSpecialInvoice
        })
      },
      preObj: recommendObj
    })
  },

  showRule() {
    if (!this.data.tipShow) {
      let { recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {} } = this.data
      clickBuriedV2_({
        click_id: "clickExplainIcon",
        click_par: {
          iconName: '发票须知',
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    }
    this.setData({
      tipShow: !this.data.tipShow
    })
  },

  showToast(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2500
    })
  },

  checkBox(e) {
    let { types, status } = e.currentTarget.dataset
    let keys = types == 'freightFee' ? 'distributionFee' : types == 'service' ? 'distributionService' : ''
    let values = status == true ? false : true
    this.setData({
      [keys]: values
    })
    let { recommendObj: { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = {} } = this.data
    let { orderId = '' } = this.data.invoiceInfo
    clickBuriedV2_({
      click_id: "selectModule",
      click_par: {
        orderId,
        type: types == 'freightFee' ? 'freightInvoice' : types == 'service' ? 'serviceInvoice' : '',
        status: status == true ? '0' : '1'
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage,
    });
  }
});
