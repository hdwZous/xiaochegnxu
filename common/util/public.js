/* eslint-disable  no-undef */
/* eslint-disable  no-mixed-spaces-and-tabs */
/* eslint-disable  no-async-promise-executor*/
/* eslint-disable   no-empty*/
import {
  request,
  FNIDS
} from '../../common/util/api';
import {
  requestSign
} from '../../common/util/PayTools'
import mp from '../../common/util/wxapi'
// import util from './jdUtil/util';
// import { isLogin } from './loginUtil';
import { getDaoJiaLocation } from "./services";
import { djCmsJump } from '../../common/util/agreementV2';
import util from '../../common/util/util';
const { judgeAllowBtn } = util;
var app = getApp();


export default {
  deleteOrder (event) {
    var orderId = event.currentTarget.dataset.orderId;
    // var This = this;

    wx.showModal({
      title: "提示",
      content: "是否删除订单？",
      confirmText: "删除",
      cancelText: "返回",
      success: function (res) {
        if (res.confirm) {
          let { functionId = "", appVersion = "" } = FNIDS.orderDelete;
          // 请求接口
          request({
            functionId,
            appVersion,
            body: {
              orderId: orderId
            },
            method: "POST"
          })
            .then(() => {
              app.globalData.needLoadOrder = true;
              wx.navigateBack();
            })
            .catch((err) => {
              wx.showToast({
                title: err.data.msg,
                image: "/images/common_icon_warn.png"
              });
            });
        } else {
        }
      }
    });
  },
  cancelOrder (event) {
    var orderId = event.currentTarget.dataset.orderId;
    var orderState = event.currentTarget.dataset.orderState;
    if (orderState == "20030") {
      // 取消申请中
      return;
    }
    var This = this;
    wx.showModal({
      title: "提示",
      content: "是否取消订单？",
      confirmText: "取消",
      cancelText: "返回",
      success: function (res) {
        if (res.confirm) {
          let { functionId = "", appVersion = "" } = FNIDS.cancelOrder;
          // 请求接口
          request({
            functionId,
            appVersion,
            body: {
              orderId: orderId,
              cancelReason: "70"
            },
            method: "POST",
            isNeedDealError: true
          })
            .then((res) => {
              if (res.data.code == "0") {
                app.globalData.needLoadOrder = true;
                This.requestData && This.requestData();
                This.reqRedPackey && This.reqRedPackey();
              } else {
                wx.showModal({
                  title: "提示",
                  content: res.data.msg,
                  showCancel: false,
                  confirmText: "确定",
                  success: function (res1) {
                    if (res1.confirm) {
                      if (res.data.code == "2222" || res.data.code == "2223") {
                        app.globalData.needLoadOrder = true;
                        This.requestData && This.requestData();
                        This.reqRedPackey && This.reqRedPackey();
                      }
                    }
                  }
                });
              }
            })
            .catch((err) => {
              wx.showModal({
                title: "提示",
                content: err.data.msg,
                showCancel: false,
                confirmText: "确定",
                success: function (res) {
                  if (res.confirm) {
                    if (err.data.code == "2222" || err.data.code == "2223") {
                      app.globalData.needLoadOrder = true;
                      This.requestData();
                      This.reqRedPackey();
                    }
                  }
                }
              });
            });
        }
      }
    });
  },
  gotoPage (event) {
    var dataset = event.currentTarget.dataset;
    var orderId = dataset.orderId;
    var pageName = dataset.pageName;
    wx.navigateTo({
      url: `/pages/order/${pageName}/index?orderId=${orderId}`,
      success: function () {},
      fail: function () {},
      complete: function () {}
    });
  },
  gotostore (e) {
    var order = e.currentTarget.dataset.order;
    let { functionId = "", appVersion = "" } = FNIDS.checkStoreStatus;
    let { traceId = "" } = e;
    var preObj = e.currentTarget.dataset.preObj;
    const { to, params } = order.storeJumpDic || {};
    request({
      functionId,
      appVersion,
      body: {
        storeId: order.storeId,
        locOrderType: order.locOrderType || 1
      },
      method: "POST"
    }).then((res) => {
      if (res.data.result == 2) {
        wx.showModal({
          title: "温馨提示",
          content: "此门店已下线，去其他门店逛逛吧。",
          confirmText: "知道啦",
          showCancel: false
        });
      } else {
        if (order.locOrderType == 2) {
          if (to) {
            djCmsJump({
              to,
              params,
              preObj: preObj
            });
          }
        } else {
          wx.navigateTo({
            url:
              "/pages/store/index?storeId=" +
              order.storeId +
              "&orgCode=" +
              order.orgCode +
              "&longitude=" +
              app.globalData.addressInfo.longitude +
              "&latitude=" +
              app.globalData.addressInfo.latitude +
              "&traceId=" +
              traceId,
            preObj: preObj
          });
        }
      }
    });
    // .catch(err => {
    //     wx.showToast({
    //         title: err && err.data && err.data.msg || "开小差~",
    //         image: '/images/common_icon_warn.png',
    //     })
    // })
  },
  gotopay (e, callback) {
    var dataset = e.currentTarget.dataset;
    var orderId = dataset.orderId;
    var tradeName = dataset.tradeName;
    var busType = dataset.businessType;
    var orderPrice = dataset.orderPrice.split("¥")[1];
    var preObj = dataset.preObj;
    var payStageType =
      dataset.payInfo && dataset.payInfo.payStageType
        ? dataset.payInfo.payStageType
        : "";
    requestSign(
      {
        orderId: orderId,
        payName: tradeName || "",
        payStageType
      },
      function () {
        app.globalData.needLoadOrder = true;
        callback();
        if (busType == 8) {
          // 轻松购
          var url = "../../easyGo/paySuccess/paySuccess?orderId=" + orderId;
          wx.navigateTo({
            url: url,
            preObj
          });
        } else {
          wx.navigateTo({
            url: `/pages/order/paySuccess/index?orderId=${orderId}&orderPrice=${orderPrice}&payStageType=${payStageType}`,
            preObj
          });
        }
      },
      function () {
        callback();
      }
    );
  },
  // 获取裂变红包分享文案
  reqRedPackey (params) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.getRedPackActivityInfo;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        body: {
          orderNo: params.orderId,
          reqPage: "1",
          userPin: app.globalData.loginStateInfo.PDJ_H5_PIN
        } // reqPage:1,：支付成功页，2：订单详情页
      })
        .then((res) => {
          if (res.data.code == "0" && res.data.result) {
            var packetData = res.data.result;
            resolve(packetData);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取资源位
  getSource (params) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.getConfigInfo;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        body: {
          cityId: params.cityId || 1,
          pageId: params.pageId // 3：分享有礼，4:"分享领取奖励金" ,5：红包裂变,
        }
      }).then((res) => {
        let result = res.data.result;
        if (result.length > 0) {
          resolve(result);
        } else {
          reject();
        }
      });
    });
  },
  // 判断是否是新人来展示弹层
  judgeNewPerson () {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.redPacket;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        isNeedDealLogin: true,
        body: {
          userChannel: "app",
          userPin: app.globalData.loginStateInfo.PDJ_H5_PIN
        }
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 判断是否有专属红包
  judgeHasExclusiveCoupon () {
    let userInfo = wx.getStorageSync("login_info");
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.exclusiveCoupon;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        isNeedDealLogin: true,
        body: {
          userChannel: "app",
          userPin: app.globalData.loginStateInfo.PDJ_H5_PIN,
          nickName: userInfo.nickname || "",
          nickHeadUrl: userInfo.avatar || ""
        }
      })
        .then((res) => {
          if (res.data.code == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 获取openId
  requestOpenId () {
    return new Promise((resolve, reject) => {
      if (
        app &&
        app.globalData &&
        app.globalData.loginStateInfo &&
        app.globalData.loginStateInfo.openId
      ) {
        resolve(app.globalData.loginStateInfo.openId);
        return;
      }
      mp.getOpenId()
        .then((openId) => {
          mp.getLoginCode()
            .then((code) => {
              app.requestLoginEntity.wechatCode = code;
              app.globalData.loginStateInfo.openId = openId;
              resolve(openId);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 任务系统--领取任务
  getTask (params) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.getTask;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          taskCate: params.taskType,
          sourcePage: 3,
          userPin: params.userPin
        }
      })
        .then((res) => {
          if (res.data.code == "0" && res.data.result) {
            if (app.globalData.loginStateInfo.PDJ_H5_PIN !== params.userPin) {
              finishTask(params);
            }
            if (res.data.result.taskFlag) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          if (app.globalData.loginStateInfo.PDJ_H5_PIN !== params.userPin) {
            finishTask(params);
          }
          reject(err);
        });
    });
  },
  // 任务系统--查询任务
  queryTaskInfo (taskType) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.queryTaskInfo;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          taskCate: taskType
        }
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 任务系统--查询任务
  finishTask (params) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.finishTask;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          taskCate: params.taskType,
          userPin: params.userPin
        }
      })
        .then((res) => {
          if (res.data.code == "0" && res.data.result) {
            if (res.data.result.taskFlag) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 获取助力券分享内容
  getHelpCouponShareInfo (params) {
    return new Promise((resolve, reject) => {
      let body = {
        type: "helpon",
        activityId: params.activityId,
        groupId: params.groupId,
        packageVersion: 1
      };
      if (params.storeId) {
        body = {
          type: "helpon",
          activityId: params.activityId,
          groupId: params.groupId,
          packageVersion: 1,
          storeId: params.storeId
        };
      }
      let { functionId = "", appVersion = "" } = FNIDS.getCouponShareInfo;
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: body
      })
        .then((res) => {
          if (res.data.code == "0" && res.data.result) {
            resolve(res.data.result);
          } else {
            mp.showToast({
              title: res.data.msg
            });
          }
        })
        .catch((err) => {
          mp.showToast({
            title: err.data.msg
          });
          reject(err);
        });
    });
  },
  /**
   * 发起好友助力
   */
  openHelp: function (activityId) {
    return new Promise((resolve) => {
      let loginStateInfo = app.globalData.loginStateInfo;
      let { functionId = "", appVersion = "" } = FNIDS.joinOrLaunchFriendHelp;
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          activityId: activityId,
          openId: loginStateInfo.openId
        }
      }).then((res) => {
        let result = res.data.result;
        if (res.data.code == "0" && result && result.groupId) {
          resolve(result);
        } else {
          mp.toast({
            title: res.data.msg
          });
        }
      });
    });
  },
  // 设置渠道
  setChannel (business, channel) {
    if (business) {
      app.globalData.qrcode.business = business;
    }
    if (channel) {
      app.globalData.qrcode.channel = channel;
    }
  },

  // requestTransferAddress(location, handleAddress) {
  //     request({
  //         // 真实接口
  //         functionId: "local/getAddressN",
  //         body: {
  //             "longitude": location.longitude,
  //             "latitude": location.latitude,
  //             "coord_type": "1",
  //             "needMatch": 0
  //         }
  //     }).then(res => {
  //         // mp.loading_cover();
  //         if (res && res.data) {
  //             if (res.data.code == '0' && res.data.result) {

  //                 var poi = res.data.result.title,
  //                     result = res.data.result;
  //                 if (!poi) {
  //                     poi = result.address
  //                 }
  //                 var addressInfo = {
  //                     longitude: result.longitude,
  //                     latitude: result.latitude,
  //                     cityId: result.areaCode,
  //                     cityName: result.city,
  //                     countyName: result.district,
  //                     poi: poi,
  //                     adcode: result.adcode,

  //                 }
  //                 handleAddress && handleAddress(addressInfo, location)
  //             } else {
  //                 handleAddress && handleAddress(null)
  //             }
  //         } else {
  //             handleAddress && handleAddress(null)
  //         }
  //     }).catch(err => {
  //         handleAddress && handleAddress(null)
  //     })
  // },

  // 去登录
  toLogin (callback) {
    wx.navigateTo({
      url: `/pages/newLogin/login/login`,
      complete: () => {
        callback && callback();
      }
    });
  },
  // 生成码
  createQrCode (param) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.createQrCode;
      request({
        functionId,
        appVersion,
        body: param
      })
        .then((res) => {
          resolve(res.data.result);
        })
        .catch((e) => {
          // console.error('createCode err',e)
          reject(e);
        });
    });
  },
  // 获取素材
  getMaterial (params) {
    return new Promise((resolve, reject) => {
      let { functionId = "", appVersion = "" } = FNIDS.getShareMaterial;
      request({
        functionId,
        appVersion,
        method: "POST",
        body: params,
        isNeedDealError: true
      })
        .then((res) => {
          if (res.data.code == 0) {
            res.data.result.qrCodeUrl = params.qrCodeUrl;
            resolve(res.data.result);
          } else {
            reject();
          }
        })
        .catch((e) => {
          // console.error('getMaterial err', e)
          reject(e);
        });
    });
  },
  // 获取新人楼层 、弹层的数据
  getNewerListData (sceneId, type) {
    let len = type == "isPop" ? 3 : 4;
    return new Promise((resolve, reject) => {
      let addressInfo = app.globalData.addressInfo;
      let { functionId = "", appVersion = "" } = FNIDS.newerResource;
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          lgt: addressInfo.longitude,
          lat: addressInfo.latitude,
          cityId: addressInfo.cityId,
          sceneId: sceneId
        }
      }).then((res) => {
        if (res.data.code == 0) {
          let newVal = res.data.result.configList;
          let floorArr = [];
          let bgData = {};
          if (newVal && newVal.length && newVal.length > 0) {
            newVal.forEach((item) => {
              if (item.resourceNo === "101") {
                bgData = item;
              } else {
                if (
                  item.resourceNo === "102" &&
                  item.type == 1 &&
                  item.productList &&
                  item.productList.length
                ) {
                  item.productList = item.productList.splice(0, len);
                }
                floorArr.push(item);
              }
            });
            bgData.imgUrl = bgData.imgUrl
              ? bgData.imgUrl
              : "https://storage.360buyimg.com/wximg/coupon/newPopB.jpg";
            if (bgData.imgUrl || floorArr.length > 0) {
              resolve({ floorArr: floorArr, bgData: bgData });
            } else {
              reject("fail");
            }
          } else {
            reject("fail");
          }
        } else {
          reject("fail");
        }
      });
    });
  },
  // 进店领券逻辑
  goToStoreGetCoupon (options, context) {
    return new Promise(async (resolve) => {
      const { channel = "", token = "" } = options;
      let storeId = "";
      if (token) {
        // 是否需要同步登录态信息
        const { functionId = "", appVersion = "" } = FNIDS.throughLogin;
        let loginRes = null;
        try {
          loginRes = await request({
            functionId,
            appVersion,
            body: {
              fromSource: 5,
              businessChannel: "",
              subChannel: "",
              regChannel: ""
            },
            content: {
              token
            },
            method: "POST"
          });
          const { data: { result = {} } = {} } = loginRes || {};
          if (result && result.o2o_m_h5_sid) {
            try {
              const openId = await mp.getOpenId();
              result.openId = openId;
              app.globalData.loginStateInfo = result;
              wx.setStorageSync("login_info", result);
            } catch (error) {
              // console.log(error)
            }
          }
        } catch (error) {}
      }
      let params = {};
      if (options.longitude && options.latitude && options.cityId) {
        // 是否有传经纬度
        params = {
          channel,
          lng: options.longitude,
          lat: options.latitude,
          cityId: options.cityId
        };
        getDaoJiaLocation(
          {
            longitude: options.longitude,
            latitude: options.latitude
          },
          function (addressInfo) {
            context && (context.scopeData.addressInfo = addressInfo);
            addressInfo.from = "yy_xcx";
            app.globalData.addressInfo = addressInfo;
            app.globalData.refreshHomeFlag = true;
            app.saveAddress(addressInfo);
          }
        );
      } else {
        let addressInfo = "";
        try {
          addressInfo = wx.getStorageSync("address_info") || "";
        } catch (error) {}
        if (addressInfo.latitude && addressInfo.longitude) {
          // 如果本地有地址
          const { latitude, longitude, cityId } = addressInfo;
          params = {
            channel,
            lng: longitude,
            lat: latitude,
            cityId
          };
        } else {
          wx.getLocation({
            success (res) {
              getDaoJiaLocation(
                {
                  longitude: res.longitude,
                  latitude: res.latitude
                },
                function (addressInfo) {
                  if (res) {
                    app.globalData.addressInfo = addressInfo;
                    const { latitude, longitude, cityId } = addressInfo;
                    addressInfo.from = "yy_xcx";
                    context && (context.scopeData.addressInfo = addressInfo);
                    app.globalData.refreshHomeFlag = true;
                    app.saveAddress(addressInfo);
                    params = {
                      channel,
                      lng: longitude,
                      lat: latitude,
                      cityId
                    };
                    const { functionId = "", appVersion = "" } =
                      FNIDS.takeCoupon;
                    request({
                      functionId,
                      appVersion,
                      body: params,
                      method: "GET",
                      isForbiddenDialog: true,
                      isNeedDealError: true
                    })
                      .then((res) => {
                        if (res.data.code == 0) {
                          let { result = {} } = res.data;
                          storeId = result.storeId;
                        }
                        resolve({
                          storeId
                        });
                      })
                      .catch(() => {
                        resolve({
                          storeId
                        });
                      });
                  }
                }
              );
            },
            fail () {
              resolve({
                storeId
              });
            }
          });
        }
      }
      if (params.lng && params.lat) {
        // 根据地址获取附近最优门店
        const { functionId = "", appVersion = "" } = FNIDS.takeCoupon;
        request({
          functionId,
          appVersion,
          body: params,
          method: "GET",
          isForbiddenDialog: true,
          isNeedDealError: true
        })
          .then((res) => {
            if (res.data.code == 0) {
              let { result = {} } = res.data;
              storeId = result.storeId;
            }
            resolve({
              storeId
            });
          })
          .catch(() => {
            resolve({
              storeId
            });
          });
      }
    });
  },

  // 同步登录以及地址信息
  syncLoginAndLocation (options, context) {
    return new Promise(async (resolve) => {
      if (options.longitude && options.latitude) {
        getDaoJiaLocation(
          {
            longitude: options.longitude,
            latitude: options.latitude
          },
          function (addressInfo) {
            addressInfo.from = "yy_xcx";
            context && (context.scopeData.addressInfo = addressInfo);
            app.globalData.addressInfo = addressInfo;
            app.globalData.refreshHomeFlag = true;
            app.saveAddress(addressInfo);
          }
        );
      }
      const { token = "" } = options;
      if (token) {
        const { functionId = "", appVersion = "" } = FNIDS.throughLogin;
        let loginRes = null;
        try {
          loginRes = await request({
            functionId,
            appVersion,
            body: {
              fromSource: 5,
              businessChannel: "",
              subChannel: "",
              regChannel: ""
            },
            content: {
              token
            },
            method: "POST"
          });
          const { data: { result = {} } = {} } = loginRes;
          if (result && result.o2o_m_h5_sid) {
            try {
              const openId = await mp.getOpenId();
              result.openId = openId;
              app.globalData.loginStateInfo = result;
              wx.setStorageSync("login_info", result);
            } catch (error) {
              // console.log(error)
            }
          }
        } catch (error) {
          // console.log(error)
        }
      }
      resolve(true);
    });
  },

  async commonSetTmp (that, data) {
    let isClicked = await judgeAllowBtn(data.tmIds);
    // debugger
    if(isClicked == null) {
      wx.openSetting({
        success (res) {
			  console.log(res.authSetting)
			  // res.authSetting = {
			  //   "scope.userInfo": true,
			  //   "scope.userLocation": true
			  // }
        }
      })
    }else{
      // 未点击过总是允许，赋予弹层img
      let subscribeImg = !isClicked
        ? "https://storage.360buyimg.com/wximg/storewin/subscribe_img.png"
        : "";
      that.setData({
        tmplIds: data.tmIds,
        subscribeImg,
        showSubscribe: true
      });
    }
  }
};