const app = getApp();


export const toMedicine = (params = {}) => {
  const { path = '', extraData = {}, inside = 4 } = params;
  const addressInfo = wx.getStorageSync('address_info') || {};
  const loginInfo = wx.getStorageSync('login_info') || {};
  const uuId = wx.getStorageSync('uuId') || '';
  const dySignKey = wx.getStorageSync('VERIFY_SIG_KEY') || '';
  const isLogin = loginInfo.o2o_m_h5_sid;
  if (isLogin) {
    loginInfo.isSync = true
  }
 
  wx.navigateToMiniProgram({
    appId: 'wxd48ca88c7f7e745c',
    path: path,
    // envVersion: evnMapping[3],
    extraData: {
      addressInfo: addressInfo,
      loginInfo: loginInfo,
      envVersionIndex: app.globalData.envVersionIndex,
      uuId: isLogin ? uuId : '',
      dySignKey:dySignKey,
      from: 'wx_xcx',
      ...extraData
    },
    success: () => {
     
    },
    fail: () => {
     
    }
  })
}

export const toDaojia = (params = {}) => {
  const { path = '', extraData = {} } = params;
  const addressInfo = wx.getStorageSync('address_info') || {};
  const loginInfo = wx.getStorageSync('login_info') || {};
  const uuId = wx.getStorageSync('uuId') || '';
  const dySignKey = wx.getStorageSync('VERIFY_SIG_KEY') || '';
  const isLogin = loginInfo.o2o_m_h5_sid;
  if (isLogin) {
    loginInfo.isSync = true
  }
  wx.navigateToMiniProgram({
    appId: 'wxffb7d80f8c50ac5c',
    path: path,
    // envVersion: evnMapping[3],
    extraData: {
      addressInfo: addressInfo,
      loginInfo: loginInfo,
      envVersionIndex: app.globalData.envVersionIndex,
      uuId: isLogin ? uuId : '',
      dySignKey:dySignKey,
      from: 'yy_xcx',
      ...extraData
    }
  })
}