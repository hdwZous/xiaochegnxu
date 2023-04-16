import { request, FNIDS } from "../../../common/util/api";
import emitter from '../../../common/util/events'
import { pvBuriedV2_, clickBuriedV2_ } from '../../../common/util/BI';
let app = getApp()
const defaultError = {
  loading: {
    // 默认页-类型
    type: 0,
    // 默认页-图标
    src: "",
    // 默认页-按钮
    btnText: "",
    // 默认页-按钮
    tips: "",
  },
  netError: {
    // 默认页-展示
    // 默认页-类型
    type: 1,
    // 默认页-图标
    src:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
    // 默认页-按钮
    btnText: "重新加载",
    // 默认页-按钮
    tips: "网络异常",
  },
};

Page({
  buried: {
    orderId: "",
    orderState: ""
  },
  /**
   * 页面的初始数据
   */
  data: {
    defaultError: defaultError.loading,
    showRemarkDialog: false,
    focus: false,
    remarkContent: "",
    selectAddress: {},
    orderId: "",
    topHint: "",
    remarkModel: {},
    currentPickAddress: {},
    optionPickAddress: {},
    disabledPickAddress: {},
    isIPX: app.globalData.isIpx,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.orderId = options.orderId;
    this.data.orderState = options.orderState;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInitData();
    emitter.addListener('addAddress', (val) => {
      setTimeout(() => {
        let { address = [] } = this.data.optionPickAddress;
        let selectAddress = address.filter(item => item.id == val.id)[0];
        // console.log('selectAddress',selectAddress)
        if (selectAddress && selectAddress.id) {
          this.setRequestStoreage({ addressId: val.id })
          this.getSettleData()
          this.setData({
            selectAddress
          })
        }
      }, 1500)
    })
    
  },
  pvFunc(back) {
    let {orderId = '', recommendObj = {}} = this.data;
    pvBuriedV2_({
      page_par: {
        orderId: orderId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      'isBack': back || ''
    })
  },
  onDefaultBtnEvent() {
    this.getInitData();
  },
  getInitData() {
    let {recommendObj ={}} = this.data;
    request({
      functionId: FNIDS.reviseOrderPage.functionId,
      appVersion: FNIDS.reviseOrderPage.appVersion,
      body: {
        orderId: this.data.orderId,
      },
      pageId: recommendObj.pageIdFirstPage || "",
      preObj: recommendObj
    }).then((res) => {
      if (res && res.data && res.data.code == 0) {
        let {
          topHint = "",
          remarkModel = {},
          currentPickAddress = {},
          optionPickAddress = {},
          disabledPickAddress = {},
        } = res.data.result;
        this.setData({
          topHint,
          remarkModel,
          currentPickAddress,
          optionPickAddress,
          disabledPickAddress,
          defaultError: null,
        });
        if (remarkModel.text) {
          this.setData({
            remarkContent: remarkModel.text
          })
        }
      }
    });
  },
  // 选择地址
  handleSelectAddress(e) {
    let { item } = e.currentTarget.dataset;
    let { orderId='',orderState='',recommendObj = {} } = this.data;
    this.setData({
      selectAddress: item
    })
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectReceiveAddress',
      click_par: {
        orderId: orderId || '',
        orderState: orderState || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })

  },
  // 新建地址
  handleAddNewAddress() {
    let { disabledPickAddress, optionPickAddress } = this.data;
    let {orderId='',orderState='', recommendObj={} } = this.data
    if (disabledPickAddress.address.length + optionPickAddress.address.length >= 20) {
      wx.showToast({
        title: '收货地址已达最大数量',
        icon: "none",
        duration: 2000,
      });
    } else {
      wx.removeStorageSync("address_edit_info")
      wx.navigateTo({
        url: "/pages/address/createOrEdit/index?pageSource=reviseOrder",
        preObj: recommendObj,
        buried_postion: "order-revise"
      })
    }
    
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickAddAddress',
      click_par: {
        orderId: orderId || '',
        orderState: orderState || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  // 编辑地址
  handleEditAddress(e) {
    let { item } = e.currentTarget.dataset;
    let { orderId='',orderState='',recommendObj = {} } = this.data;
    // console.log('item',item)
    wx.setStorageSync("address_edit_info", item)
    wx.navigateTo({
      url: "/pages/address/createOrEdit/index?from=edit&pageSource=reviseOrder",
      preObj: recommendObj,
      buried_postion: "order-revise2"
    })
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickEditAddress',
      click_par: {
        orderId: orderId || '',
        orderState: orderState || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  // 确定
  handleSureClick() {
    let { selectAddress, remarkContent } = this.data;
    let params = {}
    this.clickConfirmBuriedV2();
    if (!selectAddress.id && !remarkContent) {
      wx.showToast({
        title: '您本次没有修改任何内容',
        icon: "none",
        duration: 2000,
      });
      params = {
        msg: '您本次没有修改任何内容'
      }
      this.getConfirmStatusBuriedV2(params)
      wx.navigateBack({})
    } else {
      // return
      request({
        functionId: FNIDS.reviseOrderSubmit.functionId,
        appVersion: FNIDS.reviseOrderSubmit.appVersion,
        method: 'post',
        body: {
          orderId: this.data.orderId,
          remark: this.data.remarkContent,
          addressId: this.data.selectAddress.id
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
      }).then(res => {
        if (res.data && res.data.code == 0) {
          let { status, dialogModel = {}, toast = "" } = res.data.result;
          if (!status) {
            wx.showModal({
              showCancel: false,
              title: dialogModel.title,
              content: dialogModel.content,
              confirmText: dialogModel.buttonText,
              confirmColor: '#47b34f'
            })
          } else {
            wx.showToast({
              title: toast || '订单修改成功',
              icon: "none",
              duration: 2000,
            })
            
            setTimeout(() => {
              wx.navigateBack()
            }, 1000)
          }
          params = {
            msg: res.data.msg,
            code: res.data.code,
            status: status
          }
        } else {
          let {msg = '',code='' , result= {} } = res.data;
          let { status = false } = result;
          params = {
            msg: msg,
            code: code,
            status: status
          }
        }
        this.getConfirmStatusBuriedV2(params)
      }).catch(v=>{
        let {msg = '',code='' , result= {} } = v.data;
        let { status = false } = result;
        let params = {
            msg: msg,
            code: code,
            status: status
        }
        this.getConfirmStatusBuriedV2(params)
      });
    }
  },
  getConfirmStatusBuriedV2(res){
    let {orderId='', orderState='', recommendObj} = this.data;
    let {code= '', status='', msg=''} = res;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'getConfirmStatus',
      click_par: {
        orderId: orderId,
        orderState: orderState,
        code,
        status,
        msg
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  clickConfirmBuriedV2(){
    let {orderId='', orderState='', recommendObj} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickConfirm',
      click_par: {
        orderId: orderId,
        orderState: orderState
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  // 点击备注
  handleRemarkClick(e) {
    const { status, toast } = e.currentTarget.dataset;
    if (status == 1) {
      wx.showToast({
        title: toast,
        icon: "none",
        duration: 2000,
      });
    } else if (status == 0) {
      this.setData({
        showRemarkDialog: true
      })
      if (!this.data.remarkModel.text && !this.data.remarkContent) {  // 如果备注内容为空的时候
        this.setData({ remarkContent: "请输入" }, () => {
          let timeout = setTimeout(() => {
            this.setData({ remarkContent: "" })
            clearTimeout(timeout)
          }, 50)
        })  // 解决初始化placehold样式不起作用问题
        setTimeout(() => {
          this.setData({
            focus: true
          })
        }, 300)
      }
      if (!this.data.remarkContent && this.data.remarkModel.text) {
        this.setData({
          remarkContent: this.data.remarkModel.text
        })
      }
    }
    let {orderId='',orderState='', recommendObj={} } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickNote',
      click_par: {
        orderId: orderId || '',
        orderState: orderState || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  onRemarkInput(e) {
    this.setData({
      remarkContent: e.detail.value
    })
  },
  // 备注点确定
  onRemarkCompleted() {
    request({
      functionId: FNIDS.orderRemarkCheck.functionId,
      appVersion: FNIDS.orderRemarkCheck.appVersion,
      method: "post",
      body: {
        text: this.data.remarkContent,
        pageSource: "orderMark"
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then(res => {
      //  console.log('res',res)
      if (res && res.data && res.data.code == 0) {
        let { status, toast } = res.data.result;
        if (status) {
          this.setData({
            showRemarkDialog: false,
          });
        }
        if (!status && toast) {
          wx.showToast({
            title: toast,
            icon: "none",
            duration: 2000,
          });
        }
      }

    })
  },
  onRemarkCancel() {
    this.setData({
      remarkContent: ""
    })
  },
  // 获取结算页面数据
  getSettleData() {
    let { functionId = '', appVersion = '' } = FNIDS.settleAccount;
    let params = wx.getStorageSync('settleParams')
    if (!(params && Object.keys(params).length > 0)) return;
    request({
      functionId,
      method: 'POST',
      isNeedDealError: true,
      appVersion,
      body: params,
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then(res => {
      if (res.data.code == '0' && res.data.result) {
        let result = res.data.result;
        // 处理提示，toast等信息
        this.dealBaseInfo(result)
        result.newModules && result.newModules.forEach((item) => {
          switch (item.moduleKey) {
          case 'receiptAddress':
            // 处理收货人地址   
            this.dealReceiptAddress(item)
            break;
          default:
            break;
          }
        })
      }
    })
  },
  dealReceiptAddress(module) {
    this.setData({
      addressId: module.data.addressVo && module.data.addressVo.addressId || '0',
      lastAddressId: module.data.addressVo && module.data.addressVo.addressId || ''
    }, () => {
      this.setRequestStoreage({
        addressId: this.data.addressId,
        lastAddressId: this.data.lastAddressId
      })
    })
  },
  dealBaseInfo(result) {
    if (result.toast) { // 如果下发toast，比如配送费发生变化
      wx.showToast({
        title: result.toast,
        icon: 'none',
        duration: 2500
      })
    }
    this.setData({
      lastDeliverFee: result.deliverFee,
    }, () => {
      this.setRequestStoreage({
        lastDeliverFee: this.data.lastDeliverFee,
      })
    })
  },
  
  // 设置请求数据缓存
  setRequestStoreage(obj) {
    let requestData = wx.getStorageSync('settleParams')
    Object.assign(requestData, obj)
    wx.setStorageSync("settleParams", requestData)
  },
});

