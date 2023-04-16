import versionConfig from './releaseVersion'
import FNIDS from './functionId'

// 版本升级接口请求
export const requestUpdateManager = function () {
  let origin = 'daojia';
  let envVersion = 1;
  try {
    envVersion = wx.getStorageSync('envVersionIndex')
  } catch (e) {

  }
  if (envVersion == 2) {
    origin = 'testpdjm'
  } else if (envVersion == 3) {
    origin = 'prepdjm'
  }
  let { functionId = '', appVersion = '' } = FNIDS.needUpGrade
  wx.request({
    method: 'GET',
    url: `https://${origin}.jd.com/client`,
    data: {
      functionId,
      appVersion,
      body: {
        xcxVersion: `${versionConfig.xcxVersion}.${versionConfig.xcxUpdateVersionTimes}`
      }
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded;',
      'Cookie': '',
      'sid': ''
    },
    success(res) {
      if (res.data.code === '0' && res.data.result === 1) {
        try {
          // 版本升级-实例化
          const updateManager = wx.getUpdateManager();
          updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
              updateManager.onUpdateReady(function () {
                wx.showModal({
                  title: '更新提示',
                  content: '新版本已经准备好，请重启应用？',
                  showCancel: false,
                  confirmText: '立即升级',
                  success: function (res) {
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate()
                    }
                  }
                })
              })
            }
          })
        } catch (e) {

        }
      }
    },
    fail() {

    }
  })
};
