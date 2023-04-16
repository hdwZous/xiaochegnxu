import { isLogin } from "../../../../common/util/loginUtil";
import { request, FNIDS } from "../../../../common/util/api";
let app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    storeId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    },
    receiptAddress: {
      type: Object,
      value: null
    },
    settlementBusinessTag: {
      type: Number,
      value: 0
    }
  },

  observers: {
    'isShow': function(newVal) {
      if (newVal) {
        this.getAddressData()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showContent: false,
    isIPX: app.globalData.isIpx,
    inAddress:[],
    outAddress:[],
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      if (this.data.isShow) {
        this.onShow()
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {
      this.getAddressData()
    },
    show() {
      this.setData({
        isShow: true
      })
    },
    hide() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('popStatus', {
        types: 'selectaddress',
        flag: false
      })
    },
    onDefaultBtnEvent(e) {
      // // 跳转至编辑或新建地址页
      // wx.navigateTo({
      //     url: "/pages/address/createOrEdit/index?from="
      // })
      let type = e.detail.type
      if (type === 6) { // 去登录
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_address_onDefaultBtnEvent'
          }
        })
      } else if (type === 7) {
        // 跳转至编辑或新建地址页
        // this.goToEditAddress(e)
        // 跳转至编辑或新建地址页
        wx.navigateTo({
          url: "/pages/address/createOrEdit/index?pageSource=settlement",
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_address_onDefaultBtnEvent'
          }
        })
      } else if (type === 2) {
        // 获取地址列表
        this.getAddressData()
      }
    },
    /**
     * 选择地址，返回上一页
     */
    selectAddress(e) {
      let data = e.currentTarget.dataset
      let cityId = data.cityId
      let cityName = data.cityName
      let countyName = data.countyName
      let latitude = data.latitude
      let longitude = data.longitude
      let poi = data.poi
      let addressName = data.addressName
      let name = data.name
      let mobile = data.mobile
      let addressId = data.id
      let from = this.data.from

      let addressObj = {
        cityId: cityId,
        cityName: cityName,
        countyName: countyName,
        latitude: latitude,
        longitude: longitude,
        poi: poi
      }

      let app = getApp();
      let settlementAddress = app.globalData.settlement
      settlementAddress.isGet = false
      settlementAddress.addressInfo.name = name
      settlementAddress.addressInfo.mobile = mobile
      settlementAddress.addressInfo.fullAddress = addressName
      settlementAddress.addressInfo.addressId = addressId
      // 保存地址类型
      app.setAddressType(false)
      this.hide()
      this.triggerEvent('selectdAddress', {
        data: settlementAddress
      })
    },
    /**
     * 去编辑或新建地址页
     */
    goToEditAddress(e) {
      let data = e.currentTarget.dataset
      // 来源
      let from = data.from || ""
      // 经度
      let longitude = data.longitude || ""
      // 纬度
      let latitude = data.latitude || ""
      // 城市ID
      let cityId = data.cityId || ""
      // 所在城市
      let cityName = data.cityName || ""
      // 区
      let countyName = data.countyName || ""
      // 具体位置
      let poi = data.poi || ""
      // 县级ID
      let countyId = data.countyId || ""
      // 地址主键
      let id = data.id || ""
      // 楼号-门牌号
      let addressDetail = data.addressDetail || ""
      // 收货人
      let name = data.name || ""
      // 联系电话
      let mobile = data.mobile || ""
      // 标签
      let tags = data.tags || 0
      // 配送范围
      let canDelivery = data.canDelivery

      // 设置缓存（地图和搜索返回用onShow周期用到）
      try {
        wx.setStorageSync("address_edit_info", {
          longitude: longitude,
          latitude: latitude,
          cityId: cityId,
          cityName: cityName,
          countyName: countyName,
          poi: poi,
          coordType: 1,
          countyId: countyId,
          id: id,
          addressDetail: addressDetail,
          name: name,
          mobile: mobile,
          tags: tags,
          canDelivery: canDelivery
        })

      } catch (e) {

      }
      if (from === "edit") {
        
      } else {
        // 地址大于20条，toast
        let addressLen = this.data.inAddress.length + this.data.outAddress.length
        if (addressLen > 19) {
          wx.showToast({
            title: "收货地址已到最大数量",
            icon: "none",
            duration: 2000
          })
          return
        }
      }
      // 跳转至编辑或新建地址页
      if (from == 'order_settle') {
        wx.navigateTo({
          url: `/pages/address/createOrEdit/index?from=${from}&storeId=${this.data.storeId}&pageSource=settlement`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_address_goToEditAddress'
          }
        })
      } else {
        wx.navigateTo({
          url: `/pages/address/createOrEdit/index?from=${from}&pageSource=settlement`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_address_goToEditAddress'
          }
        })
      }
    },
    /**
     * 获取地址列表
     */
    getAddressData() {
      let self = this
      if (isLogin()) {
        // 请求参数
        let body = {}
        // 如果是订单选择地址（区分可配送范围地址）
        if (this.data.storeId) {
          body = {
            storeId: this.data.storeId,
            needCheckDelivery: 1
          }
          this.setData({
            showChooseIcon: true
          })
        }
        // 发请求
        let {functionId, appVersion} = FNIDS.getAddressList
        request({
          functionId,
          appVersion,
          body: body,
          method: 'post',
          pageId: this.data.pageId || '',
          preObj: this.data.buriedObj
        }).then(res => {
          // 地址列表数据
          let result = res.data.result
          // 可配送范围地址列表
          let inAddress = []
          // 不可配送范围地址列表
          let outAddress = []
          // 处理接口数据
          if (res.data && res.data.code === "0") {
            if (result.length > 0) {
              result.forEach(item => {
                // 匹配标签
                switch (item.tags) {
                  case "1":
                    item.tagName = "家"
                    break
                  case "2":
                    item.tagName = "公司"
                    break
                  case "3":
                    item.tagName = "学校"
                    break
                  default:
                }
                // 区分数据（可配送和不可配送）
                if (item.canDelivery) {
                  // 结算页地址匹配
                  if (item.id == self.data.addressId) {
                    item.target = true
                  }
                  inAddress.push(item)
                } else {
                  outAddress.push(item)
                }
              })
              // 更新数据
              self.setData({
                showEmpty: false,
                inAddress: inAddress,
                outAddress: outAddress
              })
              // 新建地址返回结算页判断弹层是否需要关闭
              if (!app.globalData.settlement.isGet && inAddress.length) {
                this.hide()
                app.globalData.settlement.isGet = true
              }
            } else {
              // 收货地址为空
              self.setData({
                showEmpty: true,
                type: 7,
                btnText: "新建地址",
                tips: "您还没有收货地址",
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png"
              })
            }
          } else {
            self.setData({
              showEmpty: true,
              type: "",
              btnText: "",
              tips: res && res.data && res.data.msg || "",
              src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
            })
          }
        }).catch(err => {
          self.setData({
            showEmpty: true,
            type: 2,
            btnText: "重新加载",
            tips: err && err.data && err.data.msg || "",
            src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
          })
        })
      } else {
        this.setData({
          showEmpty: true,
          type: 6,
          btnText: "立即登录",
          tips: "登录后才能查看地址哦",
          src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png"
        })
      }
    },
    closeBg() {
      this.triggerEvent('popStatus', {
        types: 'selectaddress',
        flag: false
      })
    }
  },
  attached() {
  }
})
