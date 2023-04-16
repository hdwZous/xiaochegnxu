function getShareUrl() {
  var url = '/pages/home/home';
  return url;
}

function getStoreShareUrl(orgCode, storeId) {
  var url = '/pages/home/home';
  if (orgCode && storeId) {
    url = url + "?orgcode=" + orgCode + "&storeid=" + storeId + "&type=8"
  }
  return url;
}

function getEasyShareUrl() {
  var url = '/pages/home/home?type=10';
  return url;
}


module.exports = {
  getShareUrl: getShareUrl,
  getStoreShareUrl: getStoreShareUrl,
  getEasyShareUrl: getEasyShareUrl
}