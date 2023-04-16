// import env from "../../common/util/config"
let globalData = getApp().globalData;
export let config = {
    appid: 121,
    returnPage: '/pages/newLogin/login/login?returnBack=true',
    pageType: undefined,
    isLogout: undefined,
    // 测试插件内登录可设置值为 1
    noWXinfo: globalData.config.env == 'pro' ? undefined : 1,
    h5path: undefined,
    // 默认尺寸 318* 390 像素
    logoPath: undefined,
    //1 预发接口，改为undefined 调用线上接口
    isTest: undefined,
    isKepler: undefined,
    navigationBarColor: undefined,
    navigationBarTitle: undefined,
    tabNum: 2,
    selfTips: [{
        tip: '用户京东到家协议(含隐私政策)',
        url: 'https://daojia.jd.com/html/agreement.html'
    }]
}
