/* eslint-disable camelcase */
import versionConfig from './releaseVersion'
const appVersion = versionConfig.appVersion;
// pro: 线上 pre: 仿真 test: 测试
const configList = {
  pro: {
    appId: "wxffb7d80f8c50ac5c",
    // 正式
    HOST: "daojia.jd.com",
    // 正式请求地址
    baseUrl: "https://daojia.jd.com/client",
    // jd登录线上
    jdUrl: "https://wxapplogin.m.jd.com",
    // color线上
    colorUrl: 'api.m.jd.com',
    // 平台号
    platCode: "mini",
    // 接口版本号（后端接口使用）
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 生产环境
    is_test: 0, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    env: "pro",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "XLoe7tjW"
    }
  },
  test: {
    appId: "wxffb7d80f8c50ac5c",
    // 灰度
    HOST: "testpdjm.jd.com",
    // 测试请求地址
    baseUrl: "https://testpdjm.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // color测试
    colorUrl: 'beta-api2.m.jd.com',
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "test",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  pre: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "prepdjm.jd.com",
    // 测试请求地址
    baseUrl: "https://prepdjm.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // color测试
    colorUrl: 'beta-api.m.jd.com',
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "pre",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  pre3: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "testpdj-three.jd.com",
    // 测试请求地址
    baseUrl: "https://testpdj-three.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // color测试
    colorUrl: 'beta-api3.m.jd.com',
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "pre3",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  pre4: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "qa-daojia.jd.com",
    // 测试请求地址
    baseUrl: "https://qa-daojia.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "pre3",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  qa1: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "qa1-daojia.jd.com",
    // 测试请求地址
    baseUrl: "https://qa1-daojia.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "qa1",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  qa2: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "qa2-daojia.jd.com",
    // 测试请求地址
    baseUrl: "https://qa2-daojia.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "qa2",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  },
  qa3: {
    appId: "wxffb7d80f8c50ac5c",
    // 仿真
    HOST: "qa3-daojia.jd.com",
    // 测试请求地址
    baseUrl: "https://qa3-daojia.jd.com/client",
    // jd登录测试
    jdUrl: "https://wxapplogin.m.jd.com",
    // 平台号
    platCode: "mini",
    // 接口版本号
    platform: appVersion,
    // 小程序版本号
    xcxVersion: versionConfig.xcxVersion,
    // 小程序升级版本号次数（拼接到xcxVersion第四位）
    xcxUpdateVersionTimes: versionConfig.xcxUpdateVersionTimes,
    // 小程序调用h5接口版本号-（已经使用地方：活动页）
    h5ApiVersion: "6.5.0",
    // 频道
    channel: "wx_xcx",
    // 小程序名
    appName: "paidaojia",
    deviceModel: "appmodel",
    // 测试环境
    is_test: 1, // eslint-disable-line camelcase
    // 正式埋点地址 根据is_test来判断是否是测试埋点
    buriedUrl: "https://log-o2o.jd.com/v1/logging",
    globalRequestUrl: "https://wxapp.m.jd.com",
    settlementPlatform: "wx_xcx",
    // mock地址
    mockServer: "fe.jddj.com",
    env: "qa3",
    weBankConfig: {
      path: "page/landing/landing?jumpPage=merchant-introv2&jumpType=2",
      appId: "wxcb823d713276a10d",
      webankAppId: "X01ZOl24"
    }
  }
};

export default configList
