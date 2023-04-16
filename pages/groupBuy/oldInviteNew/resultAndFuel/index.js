   import {
       FNIDS,
       request
   } from "../../../../common/util/api";
   let app = getApp();
   // 获取拼团详情数据
   function getDetailInfo(params) {
       let addressInfo = {};
       try {
           addressInfo = wx.getStorageSync('address_info') || app.globalData.addressInfo
       } catch (e) {

       }
       return new Promise((resolve, reject) => {
           request({
             ...FNIDS.oldGroupDetail,
             body: {
               promotionId: params.promotionId || "",
               groupId: params.groupId,
               storeId: params.storeId,
               longitude: addressInfo.longitude,
               latitude: addressInfo.latitude,
               cityId: addressInfo.cityId,
             },
             isNeedDealError: true,
             preObj: this.data.recommendObj || {},
           }).then((res) => {
             resolve(res);
           });
       })
   }
   //开团提单
   function startGroup(params) {
       let addressInfo = {};
       try {
           addressInfo = wx.getStorageSync('address_info') || app.globalData.addressInfo
       } catch (e) {

       }
       let wxUserInfo = {},
           loginStateInfo = getApp().globalData.loginStateInfo || {};
       try {
           wxUserInfo = wx.getStorageSync('wxUserInfo');
       } catch (e) {}
       return new Promise((resolve, reject) => {
           request({
             ...FNIDS.joinGroup,
             body: {
               promotionId: params.promotionId || "",
               longitude: addressInfo.longitude,
               latitude: addressInfo.latitude,
               cityId: addressInfo.cityId,
               storeId: params.storeId,
               nickName: wxUserInfo.nickName,
               nickHeadUrl: wxUserInfo.avatarUrl,
               wcUnionId: loginStateInfo.unionid_pdj_jd_new || "",
               openId: loginStateInfo.openId,
               formId: params.formId,
               groupId: params.groupId || "",
             },
             isNeedDealError: true,
             preObj: this.data.recommendObj || {},
           }).then((res) => {
             resolve(res);
           });
       })
   }
   module.exports = {
       getDetailInfo: getDetailInfo,
       startGroup: startGroup
   }