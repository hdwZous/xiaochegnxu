export let config = {
  appid: 121,
  returnPage: "/pages/newLogin/login/login?returnBack=true",
  pageType: undefined,
  isLogout: undefined,
  noWXinfo: getApp().globalData.config.env == "pro" ? undefined : 1,
  h5path: undefined,
  // 默认尺寸 318* 390 像素
  logoPath: "https://storage.360buyimg.com/wximg/login/daojialogo.png",
  isTest: undefined, //1 预发接口，改为undefined 调用线上接口
  isKepler: undefined,
  navigationBarColor: undefined,
  navigationBarTitle: undefined,
  tabNum: 2,
  requestHost: "https://wxapplogin.m.jd.com",
  selfTipsDialog: false, // 是否弹窗展示协议授权，默认为false，如果为true，author必须为false
  author: true,
  selfTips: [
    {
      tip: "京东到家平台服务协议",
      url: "https://daojia.jd.com/html/agreementApp.html?type=95",
    },
    {
      tip: "京东到家隐私政策",
      url: "https://daojia.jd.com/html/agreementApp.html?type=11",
    },
    {
      tip: "京东用户注册协议",
      url: "https://wxapplogin.m.jd.com/static/registration.html",
    },
    {
      tip: "京东隐私政策",
      url: "https://wxapplogin.m.jd.com/static/private.html",
    },
    {
      tip: "敏感个人信息处理授权协议",
      url: "https://daojia.jd.com/html/agreementApp.html?type=87",
    },
    {
      tip: "个人信息共享授权协议",
      url: "https://daojia.jd.com/html/agreementApp.html?type=88",
    },
  ],
};