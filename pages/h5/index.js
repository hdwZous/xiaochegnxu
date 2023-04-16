import {
    request,
    FNIDS
} from '../../common/util/api';
import util from "../../common/util/util";
import {
    isLogin
} from '../../common/util/loginUtil'
import { encrypt} from '../../common/util/aes.utils'
const app = getApp()
import emitter from '../../common/util/events'
import { pvBuriedV2_ } from "../../common/util/BI";
Page({
  buried: {
    type: "",
    global_data: "",
    local_login_info: "",
    local_deviceId: "",
    response: "",
    url: "",
    userAction: ""
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: "京东到家",
    url: "",
    shareImageUrl: "",
    shareInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('---options---',options)
    // 礼品卡购买页参数 用于控制页面回退
    if (options.giftFlag == 1) {
      app.globalData.giftFlag = 1;
    }
    if (options.dj_par_key) {
      let qrCode = app.globalData.qrcode;
      let shareInfo = {
        title: qrCode.shareTitle,
        imageUrl: qrCode.shareImgUrl,
        path: `pages/home/home?scene=${options.dj_par_key}`,
      };
      this.setData({
        shareInfo,
      });
    }
    this.buried.url = options.url ? decodeURIComponent(options.url) : "";
    this.buried.userAction = options.userAction
      ? decodeURIComponent(options.userAction)
      : "";
    // console.log('options',options)
    if (options.loginType && options.loginType == 1) {
      // console.log(options.url);

      let url = util.mpThroughDada(options.url); //h5登录协议
      this.covertUrl(url, "https://daojia.jd.com/"); //登录token
      // this.setData({
      //     url : `https://${HOST}/client?functionId=login/appThroughDada&body={"returnLink":"${options.url}"}&token=`+o2o_m_h5_sid
      // })
      // console.log("==="+this.data.url);
    } else {
      let url = decodeURIComponent(options.url),
        failUrl = url,
        originUrl = url;
      let urlLower = url.toLowerCase()
      this.setData({
        pvUrl: url,
        originUrl,
      });

      //需要挂登录token
      if (options.noNeedLogin || urlLower.includes("needpin=no")) {
        this.setData({
          url: url,
        });
      } else if (isLogin()) {
        // console.log('3333')
        url = this.concatPar(url, false); //拼接是否退出登录的标识
        failUrl = url;
        url = util.mpThroughH5(url, true); //h5登录协议
        this.covertUrl(url, originUrl); //登录token
      } else {
        url = this.concatPar(url, true);
        url = util.mpSyncDeviceId(url);

        this.setData({
          url: url
        });
      }
    }
  },
  getQueryString(url, name) {
    let c = new RegExp("(?:^|&|[?]|[/])" + name + "[=|:]([^&]*)");
    let d = c.exec(url);
    return d ? decodeURIComponent(d[1]) : "";
  },
  handleDjmsgFunc(arr, type, url) {
    let key = type == 1 ? "needLatList" : "plaintextList";
    let targetItem = arr.find((item) => {
      return item.dictCode == key;
    });
    if (targetItem) {
      let list = JSON.parse(targetItem.dictValue);
      if (list.length > 0) {
        let index = list.findIndex((item) => {
          return url.includes(item);
        });
        return index > -1 ? true : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  concatPar(url, param) {
    let addressInfo = app.globalData.addressInfo || {};
    let djmsg = {
      lat: addressInfo.latitude,
      lgt: addressInfo.longitude,
      city_id: addressInfo.cityId,
    };
    let encodeURIencryptParams = encodeURIComponent(
      encrypt(JSON.stringify(djmsg))
    );
    // let encodeURIencryptParams = encrypt(JSON.stringify(djmsg))
    // [
    //     {
    //         "dictCode":"djEncrypt",
    //         "dictValue":"1",
    //         "remark":""
    //     },
    //     {
    //         "dictCode":"domainList",
    //         "dictValue":"[\"jd.com\",\"jddj.com\",\"healthjd.com\",\"imdada.cn\"]",
    //         "remark":""
    //     },
    //     {
    //         "dictCode":"needLatList",
    //         "dictValue":"[\".jd.com\"]",
    //         "remark":""
    //     },
    //     {
    //         "dictCode":"plaintextList",
    //         "dictValue":"[\"jd.com/taroh5/h5dist\",\"jd.com/taro2orchard/h5dist\",\"jd.com/taro2cash/h5dist/index.html\",\"jd.com/taroh5/html/\",\"jd.com/xcxcdn\"]",
    //         "remark":""
    //     }
    // ]
    let security_list = [];
    try {
      security_list = wx.getStorageSync("security_list")
        ? JSON.parse(wx.getStorageSync("security_list"))
        : [];
    } catch (e) {}

    let isdjmsg =
      security_list.length > 0
        ? this.handleDjmsgFunc(security_list, 1, url)
        : false;
    let plaintext =
      security_list.length > 0
        ? this.handleDjmsgFunc(security_list, 2, url)
        : false;

    if (url.includes("h5_redirect_url")) {
      let urlRedirect = this.getQueryString(
          decodeURIComponent(url),
          "h5_redirect_url"
        ),
        urlRedirect_ = "";
      if (isdjmsg && !plaintext) {
        //djmsg
        if (urlRedirect.includes("?")) {
          if (
            url.includes(encodeURIComponent(encodeURIComponent(urlRedirect)))
          ) {
            urlRedirect_ = `${urlRedirect}&mpLogOut=${param}&djmsg=${encodeURIencryptParams}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
            url = url.replace(
              encodeURIComponent(encodeURIComponent(urlRedirect)),
              encodeURIComponent(encodeURIComponent(urlRedirect_))
            );
          }
          return url;
        } else {
          if (
            url.includes(encodeURIComponent(encodeURIComponent(urlRedirect)))
          ) {
            urlRedirect_ = `${urlRedirect}?mpLogOut=${param}&djmsg=${encodeURIencryptParams}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
            url = url.replace(
              encodeURIComponent(encodeURIComponent(urlRedirect)),
              encodeURIComponent(encodeURIComponent(urlRedirect_))
            );
          }
          return url;
        }
      } else {
        if (urlRedirect.includes("?")) {
          if (
            url.includes(encodeURIComponent(encodeURIComponent(urlRedirect)))
          ) {
            urlRedirect_ = `${urlRedirect}&mpLogOut=${param}&lat=${
              addressInfo.latitude
            }&lgt=${addressInfo.longitude}&lng=${
              addressInfo.longitude
            }&cityId=${addressInfo.cityId}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          }
          return url;
        } else {
          if (
            url.includes(encodeURIComponent(encodeURIComponent(urlRedirect)))
          ) {
            urlRedirect_ = `${urlRedirect}?mpLogOut=${param}&lat=${
              addressInfo.latitude
            }&lgt=${addressInfo.longitude}&lng=${
              addressInfo.longitude
            }&cityId=${addressInfo.cityId}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          }
          return url;
        }
      }
    } else {
      url = url.replace("/xcxh5//", "/xcxh5/#/");
      var reg = /\/\w+:/;
      if (isdjmsg && !plaintext) {
        if (reg.test(url)) {
          return `${url}&mpLogOut=${param}&djmsg=${encodeURIencryptParams}&openId=${
            app.globalData.loginStateInfo.openId || ""
          }&_is_djxcx_=1`;
        } else {
          if (url.includes("?")) {
            return `${url}&mpLogOut=${param}&djmsg=${encodeURIencryptParams}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          } else {
            return `${url}?mpLogOut=${param}&djmsg=${encodeURIencryptParams}&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          }
        }
      } else {
        if (reg.test(url)) {
          return `${url}&mpLogOut=${param}&lat=${addressInfo.latitude}&lgt=${
            addressInfo.longitude
          }&lng=${addressInfo.longitude}&cityId=${addressInfo.cityId}&openId=${
            app.globalData.loginStateInfo.openId || ""
          }&_is_djxcx_=1`;
        } else {
          if (url.includes("?")) {
            return `${url}&mpLogOut=${param}&lat=${addressInfo.latitude}&lgt=${
              addressInfo.longitude
            }&lng=${addressInfo.longitude}&cityId=${
              addressInfo.cityId
            }&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          } else {
            return `${url}?mpLogOut=${param}&lat=${addressInfo.latitude}&lgt=${
              addressInfo.longitude
            }&lng=${addressInfo.longitude}&cityId=${
              addressInfo.cityId
            }&openId=${
              app.globalData.loginStateInfo.openId || ""
            }&_is_djxcx_=1`;
          }
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let page = getCurrentPages();
    //判断当前页面只有一页且 非分享卡(1007,1008)来源 进来的页面都返回到首页
    if (util.goHome()) {
      let { recommendObj = {} } = this.data;
      wx.switchTab({
        url: "/pages/home/home",
        preObj: recommendObj
      });
    }
    // console.log('444444',app.globalData.loginByMp)
    if (app.globalData.loginByMp == 1) {
      if (isLogin()) {
        let url = app.globalData.redirectUrl || this.data.url;
        url = decodeURIComponent(url);
        app.globalData.loginByMp = 0;
        app.globalData.redirectUrl = undefined;
        url = this.concatPar(url, false); //加登录参数
        let failUrl = url;
        url = util.mpThroughH5(url, true); //
        this.covertUrl(url, failUrl);
      } else {
        app.globalData.loginByMp = 0;
        app.globalData.redirectUrl = undefined;
      }
    }
  },
  // pv埋点上报
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        url: this.buried.url || "",
        ref_par:{
          traceId: recommendObj.preTraceId || "",
          userAction: decodeURIComponent(recommendObj.preUserAction) || "",
        }
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
  },
  // pv() {},


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    wx.showShareMenu({
      withShareTicket: true,
    });
    let { shareInfo } = this.data;
    if (shareInfo) {
      return shareInfo;
    }
    var nowUrl = option.webViewUrl;
    // console.log(nowUrl )
    let url = this.data.shareUrl;
    // 类型
    let type = util.getQueryString({
      name: "to",
      url: url,
    });
    // 点击埋点
    let buried_type = util.getQueryString({
      name: "buried_type",
      url: url,
    });


    this.shareBury(buried_type);

    let curPath = getCurrentPages();
    if (curPath[curPath.length - 1]) {
      let curPagePath = curPath[curPath.length - 1].route;
      return {
        title: this.data.title || "京东到家",
        path:
          type == "mp" ? url : curPagePath + "?url=" + encodeURIComponent(url),
        imageUrl: this.data.shareImageUrl || "",
      };
    }
  },
  /**
   * 获取登录token
   * @param url
   */
  covertUrl(url, failUrl) {
    let that = this;
    request({
      ...FNIDS.loginTicket,
      method: "POST",
      body: {
        url: url,
      },
      isNeedDealError: true,
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        if (res.data.code == "0") {
          console.log("h5同步登陆地址", res.data.result);
          that.setData({
            url: res.data.result,
          });
        } else if (res.data.code == "90047") {
          wx.showModal({
            title: "提示",
            content: "为了您的账户安全，请重新登录!",
            success: function (res) {
              if (res.confirm) {
                let { recommendObj = {} } = that.data;
                wx.navigateTo({
                  url: `/pages/newLogin/login/login?redirectUrl=${encodeURIComponent(
                    failUrl
                  )}&loginByMp=1`,
                  preObj: recommendObj,
                  fromPositon: 'h5-covertUrl'
                });
              }
            },
          });
          that.setData({
            url: failUrl,
          });
          that.errorBury(res);
        } else {
          wx.showToast({
            title: (res.data && res.data.msg) || "",
          });
          that.setData({
            url: failUrl,
          });
        }
      })
      .catch((err) => {
        wx.showToast({
          title: (err && err.data && err.data.msg) || "",
        });
        that.setData({
          url: failUrl,
        });
      });
  },
  /**
   * 监听h5传来的参数
   * @param e
   */
  djShare: function (e) {
    console.log("djshare", e);
    let data = e.detail.data;
    if (data[0].infoid) {
      // 医药
      emitter.emit("drug", { data: data });
    }
    if (data[0].educationInfo) {
      // 教育优惠
      emitter.emit("education", { data: data });
    }
    if (data[0].JsonDataCallBack) {
      console.log(data[0],'data[0')
      if (data[0].JsonDataCallBack.prescriptions) {
        // 处方药跳转购物车，如果门店需展开购物车
        emitter.emit("storeMiniGo", {  data: data[0] });
      }else{
        // 通用跳转H5，回传监听方法
        emitter.emit("miniGoH5", {  data: data[0] });
      }
    }
   
    let index = e.detail.data.length;
    if (index) {
      this.setData({
        shareUrl: e.detail.data[index - 1].url,
        title: e.detail.data[index - 1].title,
        shareImageUrl: e.detail.data[index - 1].imageUrl,
      });
    }
  },
  /**
   * 刷新
   * @param url
   */
  refresh(url) {
    let reFreshUrl = url || this.data.originUrl || this.data.url || "";
    if (reFreshUrl) {
      this.setData({
        url: "",
      });
      setTimeout(() => {
        let newUrl = decodeURIComponent(reFreshUrl);
        let targetUrl;
        //需要挂登录token
        if (isLogin()) {
          targetUrl = this.concatPar(newUrl, false); //拼接是否退出登录的标识
          targetUrl = util.mpThroughH5(targetUrl, true); //h5登录协议
          this.covertUrl(targetUrl, newUrl); //登录token
        } else {
          this.setData({
            url: this.concatPar(newUrl, true),
          });
        }
      }, 500);
    }
  },
  shareBury(buried_type) {
    this.buried.type = buried_type;
  },
  errorBury(res) {
    this.buried.global_data = app.globalData;
    this.buried.local_login_info = wx.getStorageSync("login_info");
    this.buried.local_deviceId = wx.getStorageSync("uuId");
    this.buried.response = res;
  },
});
