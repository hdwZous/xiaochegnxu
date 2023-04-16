import { request, FNIDS } from "../../../common/util/api";
import { pvBuriedV2_ } from "../../../common/util/BI";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    info: null,
    tip: [],
    selectedId: '',
    supportSpecialInvoice: false,
    titleType: 0,
    tipShow: false,
    personTit: '个人',
    companyTit: '',
    ratepay: '',
    emaliValue: '',
    registerAddress: '',
    registerPhone: '',
    bankName: '',
    bankNumber: '',
    inputFocus: {
      personTit: false,
      companyTit: false,
      ratepay: false,
      emaliValue: false,
      registerAddress: false,
      registerPhone: false,
      bankName: false,
      bankNumber: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptEdit', (res) => {
      let { type, info, tip, selectedId, supportSpecialInvoice } = res
      wx.setNavigationBarTitle({
        title: type == 'newset' ? '新建发票' : type == 'edit' ? '编辑发票' : ''
      })
      let titleType = type == 'newset' ? 0 : info.titleType
      this.setData({ info, tip, type, titleType, selectedId, supportSpecialInvoice })
      if (type == 'edit') {
        this.setData({
          personTit: titleType == 0 ? info.titleContent : '个人',
          companyTit: titleType != 0 ? info.titleContent : '',
          ratepay: titleType != 0 ? info.taxNum : '',
          emaliValue: info.userEmail,
          registerAddress: info.registerAddress || '',
          registerPhone: info.registerPhone || '',
          bankName: info.depositBank || '',
          bankNumber: info.bankAccount || ''
        })
      }
      if (type == 'newset') {
        this.setData({
          personTit: '个人'
        })
      }
    })

  },

  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  pvFunc (back) {
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {}, info } = this.data
    pvBuriedV2_({
      page_par: {
        invoiceId: info && info.invoiceId || ''
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName,
      isBack: back || ""
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  choice (e) {
    let { type } = e.currentTarget.dataset
    this.setData({ titleType: type })
  },

  setInputValue (e) {
    let { types } = e.currentTarget.dataset
    let value = e.detail.value
    this.setData({
      [types]: value
    })
  },

  clearInput (e) {
    let { types } = e.currentTarget.dataset
    this.setData({
      [types]: ''
    })
  },

  setFocus (e) {
    let { types } = e.currentTarget.dataset
    let setr = `inputFocus.${types}`
    this.setData({
      [setr]: true
    })
  },

  setBlur (e) {
    let { types } = e.currentTarget.dataset
    let setr = `inputFocus.${types}`
    this.setData({
      [setr]: false
    })
  },

  creatInvoice () {
    let { titleType, personTit, companyTit, ratepay, emaliValue, registerAddress,
      registerPhone, bankName, bankNumber } = this.data
    if ((titleType == 0 && !personTit.length) || (titleType != 0 && !companyTit.length)) {
      this.showToast(titleType == 0 ? '请输入抬头名称' : '请输入公司名称')
      return
    }
    if (!emaliValue.length) {
      this.showToast('请输入电子邮箱')
      return
    }
    if (titleType !== 0 && !ratepay.length) {
      this.showToast('请输入纳税人识别号')
      return
    }
    if (titleType == 2 && !registerAddress.length) {
      this.showToast('请输入注册地址')
      return
    }
    if (titleType == 2 && !registerPhone.length) {
      this.showToast('请输入注册电话')
      return
    }
    if (titleType == 2 && !bankName.length) {
      this.showToast('请输入开户银行')
      return
    }
    if (titleType == 2 && !bankNumber.length) {
      this.showToast('请输入银行账户')
      return
    }
    if (emaliValue.length) {
      let reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/
      if (!reg.test(emaliValue)) {
        this.showToast('邮箱格式错误')
        return
      }
    }
    this.modifyInvoice()
  },

  modifyInvoice () {
    let { type, titleType, personTit, companyTit, ratepay, emaliValue, registerAddress,
      registerPhone, bankName, bankNumber } = this.data
    let body = {}
    let invoiceId = this.data.info && this.data.info.invoiceId
    if (titleType == 0) {
      body = {
        titleType,
        titleContent: personTit,
        userEmail: emaliValue
      }
    } else if (titleType == 1) {
      body = {
        titleType,
        titleContent: companyTit,
        taxNum: ratepay,
        userEmail: emaliValue
      }
    } else if (titleType == 2) {
      body = {
        titleType,
        titleContent: companyTit,
        taxNum: ratepay,
        userEmail: emaliValue,
        registerAddress,
        registerPhone,
        depositBank: bankName,
        bankAccount: bankNumber
      }
    }
    if (type == 'edit') {
      body = Object.assign({}, body, { invoiceId })
    }
    let functionPath = type == 'newset' ? FNIDS.insertInvoiceInfo : FNIDS.updateInvoiceInfo
    let colorFunctionId = type == 'newset' ? 'dj_invoiceweb_insertInvoiceInfo' : 'dj_invoiceweb_updateInvoiceInfo'
    let { recommendObj = {} } = this.data
    request({
      ...functionPath,
      colorFunctionId: colorFunctionId,
      method: 'POST',
      isNeedDealError: true,
      body,
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        let pages = getCurrentPages()
        let current = pages[pages.length - 2]
        let invoiceId = type == 'newset' ? res.data.result.invoiceId : this.data.info.invoiceId
        if (type == 'newset') { current.setData({ selectedId: invoiceId }) }
        current.refreshData()
        wx.navigateBack({
          delta: 1
        })
      } else {
        let msg = res.data.msg
        this.showToast(msg)
      }
    })
      .catch(err => {
        console.log(err)
      })
  },

  deleteInvoice () {
    let { invoiceId } = this.data.info
    let { recommendObj = {} } = this.data
    request({
      ...FNIDS.deleteInvoiceInfo,
      colorFunctionId: 'dj_invoiceweb_deleteInvoiceInfo',
      isNeedDealError: true,
      body: {
        invoiceId
      },
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        let pages = getCurrentPages()
        let current = pages[pages.length - 2]
        if (invoiceId == this.data.selectedId) {
          current.setData({ selectedId: '' })
        }
        current.refreshData()
        wx.navigateBack({
          delta: 1
        })
      }
    })
      .catch(res => {
        let msg = res && res.data && res.data.msg || "网络错误"
        this.showToast(msg)
      })
  },

  showToast (title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2500
    })
  },

  showRule () {
    this.setData({
      tipShow: !this.data.tipShow
    })
  }
});
