const origin_request = wx.request
Object.defineProperty(wx, 'request', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: (args) => {
    let new_args = request_mock(args);
    return origin_request(new_args)
  }
});
let request_mock = (args) => {
  //是否开启mock按钮
  let mockData = wx.getStorageSync('mockData') || null
  let isMock = (mockData && mockData.isMock) || null;
  //isMock为true表示开启mock
  if (isMock && args && args.url) {
    if (args.url.indexOf('clientV2') != -1 || args.url.indexOf('client') != -1) {
      let functionList = mockData.functionList || [];
      let mockPath = mockData.path || '';
      if (functionList && functionList.length > 0) {
        let paramsFunctionId;
        if (args.data && args.data.functionId) {
          paramsFunctionId = '/' + args.data.functionId;
        } else {
          let params = args.url.split("?");
          let list = params[1].split('&');
          paramsFunctionId = '/' + list[0].split('=')[1];
        }

        let currentItem = functionList.find((item) => {
          return item.functionId == paramsFunctionId
        })
        if (currentItem) {
          //走mock
          console.log("currentItem========", currentItem)
          let BaseUrl = mockPath + paramsFunctionId;
          args.data = currentItem.params;
          args.url = BaseUrl;
          args.header['content-type'] = 'application/json';
          console.log("args======", args)
          return args;
        }
      }
    }
  }
  return args;
}