import { djRequest } from "../utils/modules/dj_wx_mini_util";

// 商品详情
export function storeDetail(params) {
  return djRequest.get({
    functionId: "igw/store/storeDetail",
    body: params,
  });
}

// 高佣金分类推荐商品
export function winnerProduct(params) {
  return djRequest.get({
    functionId: "igw/goods/searchByCategory",
    body: params,
  });
}

// 根据分类查找商品
export function searchByCategoryPost(params) {
  return djRequest.post({
    functionId: "storeIndexSearch/searchByCategoryPost",
    body: params,
  });
}

// 查询扫码商品
export function scanProduct(params) {
  return djRequest.get({
    functionId: "store/scanSku",
    body: params,
  });
}
