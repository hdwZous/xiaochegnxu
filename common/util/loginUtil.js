import {goToLogin} from '../../miniprogram_npm/@dj-lib/dj-base-lib/index'
function isLogin () {
  if (
    getApp().globalData.loginStateInfo &&
    getApp().globalData.loginStateInfo.o2o_m_h5_sid
  ) {
    return true;
  }
  return false
}

// function goToLogin() {

//   wx.navigateTo({
//     url: `/pages/newLogin/login/login`
//   })
// }

module.exports = {
  isLogin: isLogin,
  goToLogin: goToLogin
}
