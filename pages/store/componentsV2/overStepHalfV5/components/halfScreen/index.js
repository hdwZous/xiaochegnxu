import { isLogin } from "../../../../../../common/util/loginUtil";
import { request, FNIDS } from "../../../../../../common/util/api";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../../../common/util/BI";
import util from "../../../../../../common/util/util";
import emitter from "../../../../../../common/util/events";
import djBus from "../../../../../../common/util/djBus";
let app = getApp();
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    storeId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false,
    },
  },
  observers: {
    isShow: function (newval) {
      if (newval) {
        this.getAddressData();
        this.setData({
          firstShowed: true,
        });
        djBus.once("mask_select_address", (data) => {
          this.setData({
            recommendObj: {
              pageIdFirstPage: util.getPageIdrandom(),
              prePageName: data.currentPageName,
              currentPageName: "select_address",
              pageSource: data.pageSource,
              refPageSource: data.refPageSource,
            },
          });
          if (data.currentPageName != "outRange") {
            clickBuriedV2_({
              click_id: "test_popAndPageDiff0906",
              click_par: {
                recommendObj: data,
                options: this.data.options,
                popName: "select_address",
                popRealPrePageName: data.currentPageName,
                popSelfPrePageName: "outRange",
              },
            });
          }
          if (!this.data.pageIsGetInfoOnShow) {
            clickBuriedV2_({
              click_id: "test_pageIsGetInfoOnShow0906",
              click_par: {
                popName: "select_address",
                route: "/pages/store/index",
                type: "open",
              },
            });
          }
          this.pvFunc();
          setTimeout(() => {
            const pageList = getCurrentPages();
            const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
            const prePageId = this.data.buriedObj.pageIdFirstPage || ''
            emitter.emit("halfMaskFunc_"+route+"_select_address_"+prePageId, {
              name: "select_address",
              type: "open",
              selector: "#store >>> #select-address", // 用于页面找打半弹层
              buriedObj: this.data.recommendObj,
            });
          }, 10);
        });
      }
    },
  },

  data: {
    isIPX: app.globalData.isIpx,
    inAddress: [],
    outAddress: [],
    firstShowed: false,
  },
  methods: {
    _hide() {
      this.triggerEvent("handleCloseStoreAddres", {});
      if (!this.data.pageIsGetInfoOnShow) {
        clickBuriedV2_({
          click_id: "test_pageIsGetInfoOnShow0906",
          click_par: {
            popName: "select_address",
            route: "/pages/store/index",
            type: "close",
          },
        });
      }
      const pageList = getCurrentPages();
      const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
      const prePageId = this.data.buriedObj.pageIdFirstPage || ''
      emitter.emit("halfMaskFunc_"+route+"_select_address_"+prePageId, {
        name: "select_address",
        type: "close",
        selector: "#store >>> #select-address",
        buriedObj: this.data.recommendObj,
      });
    },
    onDefaultBtnEvent(e) {
      let type = e.detail.type;
      if (type === 6) {
        // 去登录
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_position: {
            key: "store-overStepHalfV5-onDefaultBtnEvent1",
            options: this.data.options,
          },
        });
      } else if (type === 7) {
        // 跳转至编辑或新建地址页
        // this.goToEditAddress(e)
        // 跳转至编辑或新建地址页
        wx.navigateTo({
          url: "/pages/address/createOrEdit/index?pageSource=settlement",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "store-overStepHalfV5-onDefaultBtnEvent2",
            options: this.data.options,
          },
        });
      } else if (type === 2) {
        // 获取地址列表
        this.getAddressData();
      }
    },
    // 选择地址
    selectAddress(e) {
      let data = e.currentTarget.dataset;
      let cityId = data.cityId;
      let cityName = data.cityName;
      let countyName = data.countyName;
      let latitude = data.latitude;
      let longitude = data.longitude;
      let poi = data.poi;
      let addressName = data.addressName;
      let name = data.name;
      let mobile = data.mobile;
      let addressId = data.id;

      let addressObj = {
        cityId: cityId,
        cityName: cityName,
        countyName: countyName,
        latitude: latitude,
        longitude: longitude,
        poi: poi,
      };

      let app = getApp();
      let settlementAddress = app.globalData.settlement;
      settlementAddress.isGet = false;
      settlementAddress.addressInfo.name = name;
      settlementAddress.addressInfo.mobile = mobile;
      settlementAddress.addressInfo.fullAddress = addressName;
      settlementAddress.addressInfo.addressId = addressId;
      // 保存地址类型
      app.setAddressType(false);
      const pageList = getCurrentPages();
      const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
      const prePageId = this.data.buriedObj.pageIdFirstPage || ''
      emitter.emit("halfMaskFunc_"+route+"_select_address_"+prePageId, {
        name: "select_address",
        type: "close",
        selector: "#store >>> #select-address",
        buriedObj: this.data.recommendObj,
      });
      this.triggerEvent("selectdAddressOver", {
        dataOver: addressObj,
      });
      if (!this.data.pageIsGetInfoOnShow) {
        clickBuriedV2_({
          click_id: "test_pageIsGetInfoOnShow0906",
          click_par: {
            popName: "select_address",
            route: "/pages/store/index",
            type: "close",
          },
        });
      }
      
    },
    // 去编辑或新建地址页
    goToEditAddress(e) {
      let data = e.currentTarget.dataset;
      // 来源
      let from = data.from || "";
      // 经度
      let longitude = data.longitude || "";
      // 纬度
      let latitude = data.latitude || "";
      // 城市ID
      let cityId = data.cityId || "";
      // 所在城市
      let cityName = data.cityName || "";
      // 区
      let countyName = data.countyName || "";
      // 具体位置
      let poi = data.poi || "";
      // 县级ID
      let countyId = data.countyId || "";
      // 地址主键
      let id = data.id || "";
      // 楼号-门牌号
      let addressDetail = data.addressDetail || "";
      // 收货人
      let name = data.name || "";
      // 联系电话
      let mobile = data.mobile || "";
      // 标签
      let tags = data.tags || 0;
      // 配送范围
      let canDelivery = data.canDelivery;

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
          canDelivery: canDelivery,
        });
      } catch (e) {
        // console.log(e)
      }
      if (from === "edit") {
        // console.log(from);
      } else {
        // 地址大于20条，toast
        let addressLen =
          this.data.inAddress.length + this.data.outAddress.length;
        if (addressLen > 19) {
          wx.showToast({
            title: "收货地址已到最大数量",
            icon: "none",
            duration: 2000,
          });
          return;
        }
      }
      // 跳转至编辑或新建地址页
      wx.navigateTo({
        url: `/pages/address/createOrEdit/index?from=${from}`,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "store-overStepHalfV5-goToEditAddress",
          options: this.data.options,
        },
      });
    },
    // 获取地址列表
    getAddressData() {
      let self = this;
      if (isLogin()) {
        // 请求参数
        let body = {};
        // 如果是订单选择地址（区分可配送范围地址）
        if (this.data.storeId) {
          body = {
            storeId: this.data.storeId,
            needCheckDelivery: 1,
          };
          this.setData({
            showChooseIcon: true,
          });
        }
        // 发请求
        let { functionId, appVersion } = FNIDS.getAddressList;
        request({
          functionId,
          appVersion,
          body: body,
          method: 'post',
          pageId:
            (this.data.recommendObj &&
              this.data.recommendObj.pageIdFirstPage) ||
            "",
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            // 地址列表数据
            let result = res.data.result;
            // 可配送范围地址列表
            let inAddress = [];
            // 不可配送范围地址列表
            let outAddress = [];
            // 处理接口数据
            if (res.data && res.data.code === "0") {
              if (result.length > 0) {
                result.forEach((item) => {
                  // 匹配标签
                  switch (item.tags) {
                    case "1":
                      item.tagName = "家";
                      break;
                    case "2":
                      item.tagName = "公司";
                      break;
                    case "3":
                      item.tagName = "学校";
                      break;
                    default:
                  }
                  // 区分数据（可配送和不可配送）
                  if (item.canDelivery) {
                    // 结算页地址匹配
                    if (item.id == self.data.addressId) {
                      item.target = true;
                    }
                    inAddress.push(item);
                  } else {
                    outAddress.push(item);
                  }
                });
                // 更新数据
                self.setData({
                  showEmpty: false,
                  inAddress: inAddress,
                  outAddress: outAddress,
                });
                // 新建地址返回结算页判断弹层是否需要关闭
                // if (!app.globalData.settlement.isGet && inAddress.length) {
                //   this._hide();
                //   app.globalData.settlement.isGet = true;
                // }
              } else {
                // 收货地址为空
                self.setData({
                  showEmpty: true,
                  type: 7,
                  btnText: "新建地址",
                  tips: "您还没有收货地址",
                  src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png",
                });
              }
            } else {
              self.setData({
                showEmpty: true,
                type: 7,
                btnText: "新建地址",
                tips: "您还没有收货地址",
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            self.setData({
              showEmpty: true,
              type: 2,
              btnText: "重新加载",
              tips: (err && err.data && err.data.msg) || "",
              src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
            });
          });
      } else {
        this.setData({
          showEmpty: true,
          type: 6,
          btnText: "立即登录",
          tips: "登录后才能查看地址哦",
          src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png",
        });
      }
    },
    pvFunc(back) {
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId,
        },
        pageId: pageIdFirstPage,
        prePageName: prePageName || "",
        currentPageName: "select_address" || "",
        isBack: back || "",
      });
    },
  },
  pageLifetimes: {
    show() {
      if (this.data.isShow && this.data.firstShowed) {
        this.getAddressData();
      }
    },
  },
});
