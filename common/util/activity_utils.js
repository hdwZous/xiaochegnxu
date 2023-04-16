
import { isLogin } from "./loginUtil"
import { djCmsJump } from './agreementV2';
import { FNIDS, request } from './functionId'
// 封装活动页跳转
export async function jumpTo (data, icontype, param, skuType, recommendObj) {
  // icontype为7跳转到结算页
  if (icontype == 7) {
    // 是否登录
    if (!isLogin()) {
      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        preObj: recommendObj
      });
      return
    }
    if (skuAttr && skuAttr == 1) {
      // 校验跳转
      let res = await request({
        functionId: FNIDS.verifySettleForSkuList.functionId,
        appVersion: FNIDS.verifySettleForSkuList.appVersion,
        isNeedDealError: true,
        method: "POST",
        body: {
          skuList: [
            {
              id: skuId,
              spuId: spuId,
              num: 1,
            },
          ],
          storeId: storeInfo.storeId,
          orgCode: orgCode,
          fromSource: 5,
          verifyResource: 1,
          pageSource: "active",
        },
        preObj: this.data.recommendObj || {}
      });
      // 校验结果
      if (res && res.data && res.data.code == 0 && res.data.success) {
        let params = {
          storeId: (param.storeId) || "" ,
          orgCode: param.orgCode || "",
          saleType: skuType == 1 ? "2" : "6",
          storeName: (param.storeName) || "",
          skuId: param.skuId || ''
        }
        djCmsJump({
          to: "Settlement",
          params: params,
          userAction: data.userAction,
          preObj: recommendObj
        });
      }
    } else {
      // 1预售、2家政
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: recommendObj
      })
    }

  } else {
    // 跳转协议
    djCmsJump({
      to: data.to,
      params: data.params,
      userAction: data.userAction,
      preObj: recommendObj
    })
  }
}
