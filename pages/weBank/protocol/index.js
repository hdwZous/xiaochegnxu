import {FNIDS, request} from '../../../common/util/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    microTip: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProtocolText()
  },

  getProtocolText() {
    let noneText = '<h3 style="text-align:center;padding-top:120px;color:#999">暂无说明文案，请稍后再试~</h3>';
    let {functionId,appVersion} = FNIDS.getQuestionText
    request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
            type: 55
        }
    }).then(res => {
        // console.log('res:', res)
        if(res.data && res.data.result) {
            this.setData({
                microTip: res.data.result || noneText
            })
        }else {
            this.setData({
                microTip: noneText
            })
        }
    }).catch(err => {
        this.setData({
            microTip: noneText
        })
    })
  }
})