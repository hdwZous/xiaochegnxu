import {
  request,
  FNIDS
} from "../../../common/util/api"
import { djCmsJump, mpCmsJump } from "../../../common/util/agreementV2.js";
let globalData = getApp().globalData;
import { addFilterMsg, error } from '../../../common/util/wxLog';
import {
  pvBuriedV2_,
  clickBuriedV2_
} from "../../../common/util/BI"
import util from "../../../common/util/util"
import {
  isLogin,
  goToLogin
} from "../../../common/util/loginUtil"
import mp from '../../../common/util/wxapi';
import {PDJ_H5_SID_KEY, PDJ_H5_JDPIN_KEY, LOGIN_INFO} from '../../../miniprogram_npm/@dj-lib/dj-base-lib/index'
/* eslint-disable  no-undef */
/* eslint-disable camelcase*/
let plugin = requirePlugin("loginPlugin");

var app = getApp()
var self = null
Page({
  buried: {
    type: '',
    jump: ''
  },
  /**
	 * 页面的初始数据
	 */
  data: {
    // 展示feed流
    showFeeds: false,
    // 触发触底事件
    pageReachBottom: 0,
    // 首页请求数据是否加载完毕
    resourceRequestFinished: false,
    pageData: {},
    isIPX: app.globalData.isIpx,
    mPerson: {
      headUrl: "https://static-o2o.360buyimg.com/activity/images/rn/user/bg_head_new.png",
      userTel: "",
      userName: ""
    },
    mCouponNum: 0,
    freshBeanNum: 0, // 鲜豆
    isLogin: false,
    touchStart: 0,
    touchEnd: 0,
    showCoupon: true,
    // 优惠券跳转地址类型
    couponJumpType: 0,
    // 头部分享入口链接;
    shareurl: "",
    shareImgUrl: "",
    resource: null,
    vipEntranceUrl: "",
    // 红包入口
    redEnvelope: {},
    // selfNavNarHeight: 0, // 自定义导航条高度
    beans: '', // 奖励鲜豆数
    vip: {},
    classifyModuleVOList: [],
    autoplay: true,
    defaultBgImg: 'https://static-o2o.360buyimg.com/activity/images/rn/user/user_center_headbg.png',
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    // 是否授权
    authLocation: false,
    pvType: '',
    pvUserAction: '',
    optionsPos: null,
    self_page: 'myinfo'
  },
  scopeData: {
    // onShow触发的次数
    onShowTimes: 1,
    // 【图片懒加载】实例对象
    LazyLoad: null,
    windowHeight: ''
  },

  /**
	 * 生命周期函数--监听页面初次渲染完成
	 */

  /**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    self = this
    let res = wx.getSystemInfoSync();
    self.scopeData.windowHeight = res.windowHeight;
    self.setData({
      pvType: options.type,
      pvUserAction: options.userAction,
      optionsPos: options
    })
    // let windowWidth;
    // // 设备宽
    // try {
    // 	let res = wx.getSystemInfoSync();
    // 	windowWidth = res.windowWidth;
    // } catch (e) {
    // 	//ignore
    // }
    // this.setData({
    // 	windowWidth: windowWidth,
    // });
  },

  /**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {
    if (app.globalData.loginStateInfo && app.globalData.loginStateInfo[PDJ_H5_SID_KEY]) {
      self.setData({
        isLogin: true
      })
    }
    this.getFields();
  },

  /**
	 * 生命周期函数--监听页面显示
	 */
  onShow: function () {
    // 设置tabBar页
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    let { pageIdFirstPage = '' } = this.data.recommendObj;
    var imgUrl = "https://storage.360buyimg.com/wximg/person/shareGif3.gif"
    self.setData({
      shareImgUrl: imgUrl + "?random=" + Date.now()
    })
    const fromSettoMy = wx.getStorageSync('fromSettoMy');
    // 如果退出登录
    if (fromSettoMy == 1) {
      wx.setStorageSync('fromSettoMy', 0)
      this.logOutDj()
    } else {
      if (app.globalData.loginStateInfo && app.globalData.loginStateInfo[PDJ_H5_SID_KEY]) {
        self.setData({
          isLogin: true
        })

        requestMyinfo(pageIdFirstPage);
        requestRedDot(pageIdFirstPage);
      }
    }

    wx.getSetting({
      success (res) {
        const addrInfo = app.globalData.addressInfo
        console.log('addressInfo---', res);

        if (addrInfo.latitude) requestVIPinfo(pageIdFirstPage);
        self.setData({
          // authLocation: authLocation && addrInfo.latitude
          authLocation: addrInfo.latitude
        })
      }
    })


  },

  // pv埋点上报
  pvFunc (back) {
    // pvType: '',
    // pvUserAction: ''
    pvBuriedV2_({
      page_par: {
        ref_par: {
          type: this.data.type,
          userAction: this.data.pvUserAction
        }
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      isBack: back || ""
    })
  },

  /**
	 * 生命周期函数--监听页面隐藏
	 */
  onHide: function () {
    this.timerId && clearTimeout(this.timerId)
  },

  /**
	 * 生命周期函数--监听页面卸载
	 */
  onUnload: function () {

  },

  /**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
  onPullDownRefresh: function () {

  },

  /**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {
    this.handleOnReachBottom()
  },
  /**
	 * @description: 页面触底事件
	 * @param {void}
	 * @return:
	 */
  handleOnReachBottom () {
    // if (app.globalData.refreshHomeFlag) return;
    this.setData({
      pageReachBottom: ++this.data.pageReachBottom,
      showFeeds: true
    })
    // 第二屏资源位分页
    let pageData = this.data.pageData;
    if (pageData.hasSecondPage) { // 有第二分页
      pageData.hasSecondPage = false;
      pageData.data.forEach((group, groupIndex) => {
        if (Array.isArray(group.data)) {
          group.data.forEach((floor, floorIndex) => {
            if (!floor.showFloor) {
              this.setData({
                [`pageData.data[${groupIndex}].data[${floorIndex}].showFloor`]: true
              })
            }
          })
        }
      })
      this._initBuriedAndImgLoad()

    }
  },

  // 页面滚动
  pageScrollTo (e) {
    let { rectTop = 0, id = '' } = e.detail || {};
    let { top = 0, height = 0 } = this.data.capsule || {};
    if (rectTop) {
      wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
        let scrollTop = res.scrollTop + rectTop - (top + height + 70);
        wx.pageScrollTo({
          scrollTop: scrollTop,
          duration: 100
        })
      }).exec()

    } else {
      wx.pageScrollTo({
        selector: id,
        duration: 100
      })
    }
  },

  /**
	* 页面滑动
	*/
  onPageScroll (e) {
    if (e.scrollTop > 300) {
      if (this.data.hideBackTop) {
        this.setData({
          hideBackTop: false
        })
      }
      if (e.scrollTop > 500) {
        this.showBackTop()
      }
    } else {
      this.hiddenBackTop()
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true
        })
      }
    }
  },
  showBackTop () {
    // 页面不滑动、pageMoving为false
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true
      })
    }
    this.hiddenBackTop()
  },
  hiddenBackTop () {
    this.movTime && clearTimeout(this.movTime)
    this.movTime = setTimeout(() => {
      this.setData({
        pageMoving: false
      })
    }, 250)
  },

  getFields () {
    this.timerId = setTimeout(() => {
      this.createSelectorQuery().select('.person-page-bg').fields({
        size: true
      }, function (res) {
        // console.log('authLocation---', this.data.authLocation)
        // 如果首屏内容没有撑满
        if (res.height < self.scopeData.windowHeight) self.handleOnReachBottom();
      }).exec()
    }, 1000)
  },

  /**
	 * @description: 初始化状态
	 * @param {Void}
	 * @return {Void}
	 */
  _initState () {
    this.setData({
      pageReachBottom: 0,
      showFeeds: false,
      resourceRequestFinished: false
    })
  },
  /**
	 * @description: 完成渲染后，刷新曝光合图片懒加载。
	 * @param {type}
	 * @return:
	 */
  _finishSetData () {
    // 初始化曝光和图片懒加载
    this._initBuriedAndImgLoad();
    // 刷新页面标识
    this.setData({
      resourceRequestFinished: !this.data.resourceRequestFinished
    })
  },

  exAddMympBuried () { },
  addGuideLayerBuried () { },
  guideGetBeanBuried () { },
  clickRewardBgBuried () {
    this.buried.type = "点击背景"
  },
  clickRewardBeanBuried01 () {
    this.buried.type = "知道了"
  },
  clickRewardBeanBuried02 () {
    this.buried.type = "去看看"
  },
  addMyMpCallback (e) {
    if (e.detail.type == 2) {
      this.setData({
        beans: e.detail.beans
      })
    }
  },
  entranceVip () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!isLogin()) {
      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'myinfo1',
          optionsPos
        }
      });
      return
    }
    let url = this.data.vipEntranceUrl;
    // 拦截  改新会员
    if (url && url.indexOf('vpayMember-t/home/index') > -1) {
      wx.navigateTo({
        url: '/pages/vpayMember-t/home/index?channel=wechatpiaochuang',
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'myinfo2',
          optionsPos
        }
      })
      return
    } else if(url && url.indexOf('pages/vpaymember_t/home/index') > -1) {
      wx.navigateTo({
        url: '/pages/vpaymember_t/home/index?channel=wechatpiaochuang',
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'myinfo3',
          optionsPos
        }
      })
      return
    } else {
      wx.navigateTo({
        url: '/pages/h5/index?&url=' + encodeURIComponent(url),
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'myinfo4',
          optionsPos
        }
      })
    }
  },

  /**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () {

    var shareUtil = require("../../../common/util/share_utils.js")
    var url = shareUtil.getShareUrl()

    return {
      title: "京东到家",
      path: url
    }
  },
  // 我的钱包
  toSet () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!self.data.isLogin) {
      self.toLogin();
      return
    }
    wx.navigateTo({
      url: "/pages/personSecond/setList/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo4',
        optionsPos
      }
    })
  },
  // 我的钱包
  toWalletList () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!self.data.isLogin) {
      self.toLogin();
      return
    }
    wx.navigateTo({
      url: "/pages/personSecond/wallet/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName: "myinfo5",
        optionsPos
      }
    });
  },
  toCouponList: function () {
    let { recommendObj = {}, couponJumpType = 0, optionsPos = {} } = this.data;
    if (!self.data.isLogin) {
      self.toLogin()
      return
    }
    var url = "";
    if(couponJumpType === 1) {
      let {type = '', pvUserAction = ''} = this.data;
      let ref_page = 'myinfo';
      let ref_par = encodeURIComponent(JSON.stringify({
        type: type,
        userAction: pvUserAction
      }));
      let paramsStr = `?ref_page=${ref_page}&ref_par=${ref_par}`
      url = `/pages/myCoupons/index${paramsStr}`
    } else {
      url = '../../coupon/person-coupon';
    }


    let { pageIdFirstPage } = this.data.recommendObj;
    wx.navigateTo({
      url: url,
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo6',
        optionsPos
      },
      success: function () {
        requestRedDot(pageIdFirstPage)
      }
    })
  },

  toRedEnvelopeList () {
    if (!self.data.isLogin) {
      self.toLogin();
      return
    }
    let { pageIdFirstPage = '' } = this.data.recommendObj;
    let { recommendObj = {}, optionsPos = {} } = this.data;
    wx.navigateTo({
      url: "/pages/redEnvelopeList/list/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo7',
        optionsPos
      },
      success: function () {
        updateRedPacketFun(pageIdFirstPage)
      }
    })
  },

  // 资源位模块跳转
  toClassifyModule (e) {
    const module = this.data.classifyModuleVOList[e.currentTarget.dataset.classindex]['userModuleVOList'][e.currentTarget.dataset.moduleindex]

    // 取消小红点
    module.redDot = false
    wx.setStorageSync(module.name, false)

    // 兼容接口只返回id ,没有activityId
    if (module.to === 'activityDetail') module.params.activityId = module.params.id
    let { recommendObj = {}, optionsPos = {} } = this.data;
    djCmsJump({
      to: module.to,
      params: module.params,
      userAction: module.userAction,
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo8',
        optionsPos
      }
    })
  },

  /**
	 * 去地址页
	 */
  toAddressList: function () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!self.data.isLogin) {
      self.toLogin()
      return
    }
    wx.navigateTo({
      url: "../../address/home/index?from=person",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo9',
        optionsPos
      }
    })
  },
  toFreshBean: function () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!self.data.isLogin) {
      self.toLogin()
      return
    }
    let { pageIdFirstPage = '' } = recommendObj;
    let url = "https://" + globalData.config.HOST + "/html/vue/index.html#integral"
    wx.navigateTo({
      url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(url),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo10',
        optionsPos
      },
      success: function () {
        requestRedDot(pageIdFirstPage)
      }
    })


  },
  toGiftCard: function () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    if (!this.data.isLogin) {
      this.toLogin()
      return
    }
    let url = this.data.giftUrl || ''
    // let url = 'https://prepdjm.jd.com/html/index/giftCardList'
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent(url),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo11',
        optionsPos
      }
    })

  },
  toFeedback: function () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    var url = "/pages/personSecond/feedback/feedback"
    wx.navigateTo({
      url: url,
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo12',
        optionsPos
      }
    })
  },

  toLogin: function () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    goToLogin({
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo13',
        optionsPos
      }
    })
  },

  toLogout: function () {
    const loginInfo = wx.getStorageSync(LOGIN_INFO) || {};
    if (loginInfo.isSync) {
      app.globalData.uuId = '';
      wx.setStorageSync('uuId', '');
      app.globalData.loginStateInfo = {}
      wx.setStorageSync(LOGIN_INFO, {})
      return
    }
    mp.loading()
    plugin.logout({
      callback: res => {
        mp.hideLoading()
        if (res.err_code == 0 && res.isSuccess) {
          // this.logOutDj()
        } else {
          mp.toast({
            title: '退出失败,请稍后重试'
          });
        }
      }
    })
  },
  // 退出到家登录态
  logOutDj () {
    request({
      method: "POST",
      ...FNIDS.selfLogout,
      body: {},
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then(res => {
      let result = res.data.result;
      if (result) {
        wx.setStorageSync('userInfo', {})
        app.globalData.userInfo = null;
        wx.setStorageSync(LOGIN_INFO, {});
        app.globalData.loginStateInfo = {};
        ['jdlogin_pt_key', 'jdlogin_pt_pin', 'jdlogin_pt_token'].forEach((item) => {
          wx.removeStorageSync(item)
        })
        handleLogoutResult(result);
        util.refreshHomePage()
        this.toLogout();
      } else {
        logoutFailHint(res.data.errMsg);
      }
    }).catch(err => {
      logoutFailHint('退出登录失败稍后再试!', err);
    })
  },
  touchStart: function (e) {
    self.data.touchStart = e.timeStamp
  },

  touchEnd: function (e) {
    self.data.touchEnd = e.timeStamp
  },


  pressHead: function () {
    var durning = self.data.touchEnd - self.data.touchStart
    // console.error(durning)
    if (durning > 5 * 1000) {
      wx.showModal({
        title: "这也知道，你是妖怪吧",
        content: "版本:" + globalData.config.xcxVersion + "-扫码:" + JSON.stringify(app.globalData.qrcode),
        showCancel: false
      })
    } else if (durning > 2 * 1000) {
      // console.error(1)
      try {
        let groupId = wx.getStorageSync('wxGroupId') || ""
        // console.error(2)

        if (groupId) {
          // console.error(3)

          wx.showModal({
            title: "这也知道，你是妖怪吧",
            content: "群号:" + groupId || '无~',
            showCancel: false,
            confirmText: '复制信息',
            success () {
              wx.setClipboardData({
                data: "群号:" + groupId || "",
                success () {
                  wx.showToast({
                    icon: 'none',
                    title: '已复制',
                    duration: 2000
                  })
                }
              })
            }
          })
        }
      } catch (e) {
        // console.error('wxGroupId',e)
      }
    }
  },
  // 去分享有礼
  // goShareGift: function () {

  // 	if (!self.data.isLogin) {
  // 		self.toLogin()
  // 		return
  // 	} else {
  // 		wx.navigateTo({
  // 			url: self.data.shareurl
  // 		})
  // 	}
  // },
  // 点击签到
  signBuried () {
    let { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = this.data.recommendObj
    clickBuriedV2_({
      click_id: "sign",
      click_par: {},
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName
    })
  },
  reportSignIn (e) {
    if (isLogin()) {
      request({
        method: "POST",
        ...FNIDS.savePushMsgForWeChat,
        isForbiddenDialog: true,
        body: {
          "formId": e.detail.formId,
          "toUser": app.requestLoginEntity.openId || app.globalData.loginStateInfo.openId ||
            wx.getStorageSync(LOGIN_INFO).openId
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
      }).then(() => {
        // 纬度
        let latitude = app.globalData.addressInfo.latitude
        // 经度
        let longitude = app.globalData.addressInfo.longitude
        // 城市ID
        let cityId = app.globalData.addressInfo.cityId
        // h5地址
        let linkUrl = e.target.dataset.linkUrl + "&miniProgram=daojia&lat=" + latitude + "&lng=" + longitude + "&cityId=" + cityId
        // 获取长链接
        let longUrl = linkUrl

        let { recommendObj = {}, optionsPos = {} } = this.data;
        // 跳转H5或新版本签到页
        if (linkUrl.indexOf('signIn-t') > -1) {
          // 新签到
          mpCmsJump({
            pageType: "p46",
            preObj: recommendObj,
            buried_position: {
              currentPageName: 'myinfo14',
              optionsPos
            }
          });
        } else {
          wx.navigateTo({
            url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(longUrl),
            preObj: recommendObj,
            buried_position: {
              currentPageName: 'myinfo15',
              optionsPos
            }
          })
        }
        this.signBuried()

      }).catch(() => {
        let { recommendObj = {}, optionsPos = {} } = this.data;
        // 纬度
        let latitude = app.globalData.addressInfo.latitude
        // 经度
        let longitude = app.globalData.addressInfo.longitude
        // 城市ID
        let cityId = app.globalData.addressInfo.cityId
        // h5地址
        let linkUrl = e.target.dataset.linkUrl + "&miniProgram=daojia&lat=" + latitude + "&lng=" + longitude + "&cityId=" + cityId
        // 获取长链接
        let longUrl = linkUrl
        // 跳转H5或新版本签到页
        if (linkUrl.indexOf('signIn-t') > -1) {
          // 新签到
          mpCmsJump({
            pageType: "p46",
            preObj: recommendObj,
            buried_position: {
              currentPageName: 'myinfo16',
              optionsPos
            }
          });
        } else {
          wx.navigateTo({
            url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(longUrl),
            preObj: recommendObj,
            buried_position: {
              currentPageName: 'myinfo17',
              optionsPos
            }
          })
        }
        this.signBuried()

      })
    } else {
      self.toLogin()
    }
  },

  toMyBargain () {
    this.buried.type = "大牌免运"
    if (!isLogin()) {
      self.toLogin()
      return
    }
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } } = this.data;
    clickBuriedV2_({
      click_id: "clickMyBargain",
      click_par: {
        type: '大牌免运'
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName
    })
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent("https://daojia.jd.com/pavilion/"),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo18',
        optionsPos
      }
    })
  },

  toMyLottery () {
    this.buried.type = "免费水果"
    if (!isLogin()) {
      self.toLogin()
      return
    }

    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } } = this.data;
    clickBuriedV2_({
      click_id: "clickMyBargain",
      click_par: {
        type: '免费水果'
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName
    })
    wx.navigateTo({
      url: "/pages/orchard-t/index?channel=grzx",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo19',
        optionsPos
      }
    })
  },
  toMyFriendHelp () {
    this.buried.type = "我发起的好友助力"

    if (!isLogin()) {
      self.toLogin()
      return
    }
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } } = this.data;
    clickBuriedV2_({
      click_id: "clickMyFriendHelp",
      click_par: {
        type: '我发起的好友助力'
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName
    })

    wx.navigateTo({
      url: '/pages/friendHelp/list/index?tab=1',
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo20',
        optionsPos
      }
    })
  },

  toMyCollection () {
    this.buried.type = "达达快送"
    if (!isLogin()) {
      self.toLogin()
      return
    }
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } } = this.data.recommendObj
    clickBuriedV2_({
      click_id: "clickMyCollection",
      click_par: {
        type: '达达快送'
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName
    })
    // wx.navigateTo({
    //     url: "/pages/groupBuy/groupOrder/index?from=person"
    // })
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent("https://daojia.jd.com/client?functionId=login/appThroughDada&platCode=H5&appName=paidaojia&body=%7b%22returnLink%22%3a%22https%3a%2f%2fkuai.imdada.cn%2ftoc%2fcorp%2findex_v2%2fbilling%2fhome%3fchannel%3ddaojiamine%26%22%7d&needPin=yes"),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo21',
        optionsPos
      }
    })
  },
  toHelp () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    wx.navigateTo({
      url: "/pages/personSecond/jd-webview/index?url=" + encodeURIComponent("https://" + globalData.config.HOST + "/html/vue/index.html?needPin=yes#/service"),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo22',
        optionsPos
      }
    })
  },

  // 跳转签到
  toSignIn () {
    let { recommendObj = {}, optionsPos = {} } = this.data;
    wx.navigateTo({
      url: "/pages/tabBar/signIn-t/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'myinfo23',
        optionsPos
      }
    })
  },

  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap () {
    app.globalData.homeIconFlag = true
  }
});

// 处理退出结果
function handleLogoutResult (success) {
  if (success) {
    self.setData({
      isLogin: false,
      mPerson: {
        headUrl: "https://static-o2o.360buyimg.com/activity/images/rn/user/bg_head_new.png",
        userTel: "",
        userName: ""
      }
    })
    wx.setStorageSync('handLogout', true)
  }
}

// 获取初始用户信息
function requestMyinfo (pageId = '') {
  if (!self.data.isLogin) {
    return
  }
  var isFail = true
  var errTip = "网络异常"
  let {recommendObj = {}} = self.data
  request({
    ...FNIDS.getUserAccountInfo,
    body: {
      cityId: app.globalData.addressInfo && app.globalData.addressInfo.cityId || '',
      fromSource: "5"
    },
    method: 'post',
    pageId,
    preObj: recommendObj
  }).then(res => {
    if (res && res.data) {
      if (res.data.code == "0") {
        if (res.data.result) {
          var showCoupon = false;
          var couponJumpType = 0

          if (res.data.result.userInfo && res.data.result.userInfo.userBaseInfo) {
            var infos = res.data.result.accountInfo.infos[0]
            for (let i = 0; i < infos.length; i++) {
              if (infos[i].accName == "优惠券") {
                showCoupon = infos[i].show || true,
                couponJumpType = infos[i].jumpType;
              }
            }
            var name = res.data.result.userInfo.userBaseInfo.nickName ? res.data.result.userInfo.userBaseInfo.nickName :
              (res.data.result.userInfo.userBaseInfo.userName ? res.data.result.userInfo.userBaseInfo.userName : "")
            var tel = res.data.result.userInfo.userBaseInfo.mobile || ""
            var img = res.data.result.userInfo.userBaseInfo.yunMidImageUrl
            if (!img) {
              img = "https://static-o2o.360buyimg.com/activity/images/rn/user/bg_head_new.png"
            }
            isFail = false;
            self.setData({
              mPerson: {
                headUrl: img,
                userTel: tel,
                userName: name
              },
              showCoupon: showCoupon,
              couponJumpType: couponJumpType,
              shareurl: res.data.result.shareUrl + "?from=myself" || "/pages/inviteFriends/index?from=myself"
            })
          }
          if (res.data.result.accountInfo && res.data.result.accountInfo.infos && res.data.result.accountInfo.infos.length > 0) {
            var num = 0;
            var freshBeanNum = 0;
            // signInUrl = "",
            var giftUrl = "";
            let redEnvelope = {};
            for (var index in res.data.result.accountInfo.infos[0]) {
              var info = res.data.result.accountInfo.infos[0][index]
              if ("1" == info.acctype) {
                num = info.value
              } else if ("6" == info.acctype) {
                freshBeanNum = info.value
                // } else if ("13" == info.acctype) {
                // signInUrl = info.signInUrl
              } else if ("12" == info.acctype) {
                giftUrl = info.openUrl
              } else if (info.acctype === '14') { // 红包
                redEnvelope = info
              }
            }
            const wallet = {
              mCouponNum: num,
              freshBeanNum: freshBeanNum,
              // signInUrl: signInUrl, //签到地址
              giftUrl: giftUrl,
              redEnvelope: redEnvelope
            }
            self.setData(wallet)
            // 存储我的钱包数据
            wallet.showCoupon = showCoupon
            wallet.couponJumpType = couponJumpType
            wx.setStorage({
              key: "wallet",
              data: wallet
            })
          }
        }
      }
    }
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
      wx.reportMonitor(46, 20);
    }
  }).catch(err => {
    self.setData({
      isLogin: false,
      mPerson: {
        headUrl: "https://static-o2o.360buyimg.com/activity/images/rn/user/bg_head_new.png",
        userTel: "",
        userName: ""
      }
    })
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
    }
    wx.reportMonitor(46, 20);
    let PDJ_H5_PIN = app.globalData.loginStateInfo[PDJ_H5_JDPIN_KEY] || '未知';
    let errInfo = err && err.toString();
    let deviceid_pdj_jd = util.getUUIDMD5();
    addFilterMsg(deviceid_pdj_jd)
    addFilterMsg('getUserAccountInfoFn');
    addFilterMsg(PDJ_H5_PIN);
    error(errInfo)
  })
}

// 获取用户会员信息
function requestVIPinfo (pageId = '') {
  var isFail = true
  var errTip = "网络异常"
  let {recommendObj = {}} = self.data;
  request({
    ...FNIDS.getClassifyModuleInfo,
    body: {
      cityId: app.globalData.addressInfo && app.globalData.addressInfo.cityId || '',
      fromSource: "5",
      channelType: 8,
      platform: 6
    },
    pageId,
    preObj: recommendObj
  }).then(res => {
    if (res.data && res.data.code == "0" && res.data.result) {
      let vipEntranceUrl = res.data.result.userCardConfigVO ? res.data.result.userCardConfigVO.param.url : "";
      let recommendTextLabel = res.data.result.userCardConfigVO ? res.data.result.userCardConfigVO.recommendTextList.join('。') : "";
      isFail = false;
      const redClassifyModuleVOList = res.data.result.classifyModuleVOList.map(it => {
        it.userModuleVOList.forEach(item => {
          const isLook = wx.getStorageSync(item.name);
          item.redDot = it.busiType != 3 && item.params && item.params.url && isLook !== false ? true : false
        })
        return it
      })
      self.setData({
        classifyModuleVOList: redClassifyModuleVOList,
        vip: res.data.result.userCardConfigVO || {},
        recommendTextLabel,
        vipEntranceUrl
      })
    }
    if (isFail) {
      wx.showToast({
        title: errTip,
        image: ""
      })
      wx.reportMonitor(45, 20);
    }
  }).catch(err => {
    if (isFail) {
      wx.showToast({
        title: errTip,
        image: ""
      })
    }
    wx.reportMonitor(45, 20);
    let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
    let errInfo = err && err.toString();
    let deviceid_pdj_jd = util.getUUIDMD5();
    addFilterMsg(deviceid_pdj_jd)
    addFilterMsg('getClassifyModuleInfoFn');
    addFilterMsg(PDJ_H5_PIN);
    error(errInfo)
  })
}

// 小红点查询
function requestRedDot (pageId = '') {
  if (!self.data.isLogin) {
    return
  }
  var isFail = true
  var errTip = "网络异常"
  let {recommendObj = {}} = self.data;
  request({
    ...FNIDS.getRedDot,
    body: {},
    method: 'post',
    pageId,
    preObj: recommendObj
  }).then(res => {
    if (res.data && res.data.code == "0" && res.data.result) {
      isFail = false;
      const { hasNewCoupon, hasNewRedPacket, hasPoint } = res.data.result
      self.setData({
        dot: res.data.result
      });
      const isRed = hasNewCoupon || hasNewRedPacket || hasPoint;

      isRed ? wx.showTabBarRedDot({
        index: 2
      }) : wx.hideTabBarRedDot({
        index: 2
      })
    }
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
    }
  }).catch(() => {
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
    }
  })
}
function logoutFailHint (msg) {
  wx.showToast({
    title: msg
  })
}
// 取消红包小红点
function updateRedPacketFun (pageId = '') {
  if (!self.data.isLogin) {
    return
  }
  var isFail = true
  var errTip = "网络异常"
  let {recommendObj} = this.data;
  request({
    ...FNIDS.updateRedPacketRead,
    body: {},
    pageId,
    preObj: recommendObj
  }).then(res => {
    if (res.data && res.data.code == "0") {
      isFail = false;
    }
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
    }
  }).catch(() => {
    if (isFail) {
      wx.showToast({
        title: errTip
        // image: "/images/common_icon_warn.png",
      })
    }
  })
}