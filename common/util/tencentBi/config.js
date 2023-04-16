module.exports = {
    /**
   * 有数 - ka‘接入测试用’ 分配的 app_id，对应的业务接口人负责
   */
    token: 'bi22156d649a6a4c9c',

    /**
     * 微信小程序appID，以wx开头
     */
    appid: 'wxffb7d80f8c50ac5c',

    /**
     * 如果使用了小程序插件，需要设置为 true
     */
    usePlugin: true,

    /**
     * 开启打印调试信息， 默认 false
     */
    debug: false,

    // /**
    //  * 建议开启-开启自动代理 Page， 默认 false
    //  * sdk 负责上报页面的 browse 、leave、share 等事件
    //  * 可以使用 sr.page 代替 Page(sr.page(options))
    //  * 元素事件跟踪，需要配合 autoTrack: true
    //  */
    // proxyPage: true,
    // /**
    //  * 建议开启-开启组件自动代理， 默认 false
    //  * sdk 负责上报页面的 browse 、leave、share 等事件
    //  */
    // proxyComponent: true,
    // // 建议开启-是否开启页面分享链路自动跟踪
    // openSdkShareDepth: true,
    // // 建议开启-元素事件跟踪，自动上报元素事件，入tap、change、longpress、confirm
    // autoTrack: true,
    // //建议开启-自动化获取openId，授权过的小程序可自动化获取openId
    // openAutoTrackOpenId: true,
    // // 是否开启自动跟踪APP的曝光事件（APP相关预置事件，如 APP - onLuanch），默认是：true
    // trackApp: true,
    // // 是否开启自动开始上报，默认是：false，open_id 无法自动获取，一般在 login 业务之后手动调用 sr.startReport 方法开启上报
    // autoStart: true
    
    //开启自动代理，此功能为有数SDK核心功能，建议开启
    autoProxy: true
}