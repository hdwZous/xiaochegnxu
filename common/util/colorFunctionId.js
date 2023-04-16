// 老接口：color和物理网关都有
const colorFunctionId = {
  // 第一批color
  'invoiceweb/getInvoiceInfoPost': 'dj_invoiceweb_getInvoiceInfo',
  'invoiceweb/insertInvoiceInfo': 'dj_invoiceweb_insertInvoiceInfo',
  'invoiceweb/updateInvoiceInfo': 'dj_invoiceweb_updateInvoiceInfo',
  'invoiceweb/deleteInvoiceInfo': 'dj_invoiceweb_deleteInvoiceInfo',
  'invoiceweb/getSupplementInvoice': 'dj_invoiceweb_getSupplementInvoice',
  'invoiceweb/insertSupplementInvoice': 'dj_invoiceweb_insertSupplementInvoice',
  // 第一批color结束
  'zone/recommendChannelSkuList': 'dj_zone_recommendChannelSkuList',
  'notice/saveDiscountNotice': 'dj_notice_saveDiscountNotice'
  // 第二批结束
  //
}
// 新接口：只有color接口没有物理网关
const newColorFunctionId = [
  'dj_store_getFollowStoreList',
  'dj_share_exchangeCouponByCode',
  'dj_searchRank_list',
  'dj_marketsettle_addProductCheck'
]
// 检查是否为新接口
export function checkNewColor (functionId) {
  for (let i = 0; i < newColorFunctionId.length; i++) {
    if (functionId == newColorFunctionId[i]) {
      return true
    }
  }
  return false
}
// 检查是否存在color接口
function checkColor (functionId) {
  for(let key in colorFunctionId) {
    if (functionId == key) {
      return colorFunctionId[key]
    }
  }
  return false
}

export default checkColor