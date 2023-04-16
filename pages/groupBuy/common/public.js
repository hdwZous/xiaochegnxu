import {
  request,
  FNIDS
} from '../../../common/util/api'

function getGroupShareImg(params) {
  return new Promise((resolve, reject) => {
    request({
      ...FNIDS.getGroupSharePicture,
      isNeedDealError: true,
      body: {
        scene: params.groupId + "," + params.channel,
        page: "pages/groupBuy/join/index",
        storeId: params.storeId,
        orgCode: params.orgCode,
        skuId: params.skuId,
      },
      preObj: params.recommendObj || {},
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

function chanageAttention(params) {
  return new Promise((resolve, reject) => {
    request({
      ...FNIDS.changeAttention,
      body: {
        storeId: params.storeId,
        isFollow: params.isFollow,
      },
      isNeedDealError: true,
      preObj: params.recommendObj || {},
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {});
  })
}

function checkAttentionStore(params) {
  return new Promise((resolve, reject) => {
    request({
      ...FNIDS.getStationAttention,
      body: {
        storeId: params.storeId,
      },
      isNeedDealError: true,
      isForbiddenDialog: true,
      preObj: params.recommendObj || {},
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {});
  })
}
module.exports = {
    getGroupShareImg: getGroupShareImg,
    chanageAttention: chanageAttention,
    checkAttentionStore: checkAttentionStore,
   }