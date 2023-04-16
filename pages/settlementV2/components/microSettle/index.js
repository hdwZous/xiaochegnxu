import {request,FNIDS} from '../../../../common/util/api';
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    microSettlement: {
      type: Object,
      value: {},
      observer: function (val) {
        // console.log("val", val);
      },
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击微常准服务说明
    clickWeBankTips(e) {
      let noneText ='<h3 style="text-align:center;padding-top:120px;color:#999">暂无说明文案，请稍后再试~</h3>';
      let {functionId, appVersion} = FNIDS.getQuestionText;
      let type = e && e.currentTarget.dataset && e.currentTarget.dataset.microtipid ? e.currentTarget.dataset.microtipid : 55 ; 
      request({
        functionId,
        isNeedDealError: true,
        body: {
          type: type,
        },
        appVersion,
        preObj: this.data.buriedObj
      }).then((res) => {
          if (res.data && res.data.result) {
            this.setData({
              microTip: res.data.result || noneText,
            });
          } else {
            this.setData({
              microTip: noneText,
            });
          }
      }).catch((err) => {
          this.setData({
            microTip: noneText,
          });
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '微常准超时赔付'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    jump2WeBankRule(item){
      if(item.to){
        wx.navigateTo({
          url: '/pages/h5/index?url=' + encodeURIComponent(''),
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_microsettle_jump2WeBankRule'
          }
      })
      }
    },
    weBankChangeBtn(){
      this.triggerEvent('handleWeBankBtnClick')
    }
  },
});
