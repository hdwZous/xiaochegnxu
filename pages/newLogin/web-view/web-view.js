import util from '../util.js'
import ParamsSign from '../../../miniprogram_npm/@legos/js-security-jdxcx/index'; 
let plugin = requirePlugin("loginPlugin");
// 设置延签加固
plugin.setParamsSign && plugin.setParamsSign(ParamsSign);
Page({
  onLoad(options = {}) {
    // wx.showModal({
    //   title: '提示',
    //   content: 'JIN',
    //   success: res => {
    //   }
    // })

    util.setCustomNavigation();
    let {
      token,
      islogin
    } = options;
    if (Number(islogin) === 0 ){
      // wx.showModal({
      //   title: '提示',
      //   content: JSON.stringify(options),
      //   success: res => {
      //     if (res.confirm) {
      //       util.redirectPage('/pages/login/index/index?riskFail=1')
      //     }
      //   }
      // })
      util.redirectPage('/pages/login/index/index?riskFail=1')
      return
    }
    this.handleBackFromH5(token);
    
  },
  handleBackFromH5(token) {
    plugin.tokenLogin({
      token,
    }).then((res = {}) => {
      let {
        goback,
        err_msg
      } = res;
      if (goback) {
        plugin.gobackLog({ route: 7 })
        util.goBack();
        return
      }
      err_msg && wx.showModal({
        title: '提示',
        content: err_msg,
        success: res => {
          if (res.confirm) {
            this.handleBackFromH5(token)
          }
        }
      })
    }).catch(res => console.jdLoginLog(res))
  }
})