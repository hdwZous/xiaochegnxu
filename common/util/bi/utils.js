import { routeMapName} from '../routeMapName';
/**
 * @description: 获取页面元素信息
 * @param {String} element 元素class或者id
 * @returns {Promise}
 */
export const getBoundingClientRect = function (element) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery();
    query.selectAll(element).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => resolve({ boundingClientRect: res[0], scrollOffset: res[1] }));
  });
};
/**
 * @description: 判断点击是否落在目标元素
 * @param {Object} clickInfo 用户点击坐标
 * @param {Object} boundingClientRect 目标元素信息
 * @param {Object} scrollOffset 页面位置信息
 * @returns {Boolean}
 */
export const isClickTrackArea = function (clickInfo, boundingClientRect, scrollOffset) {
  if (!boundingClientRect) return false;
  const { x, y } = clickInfo.detail; // 点击的x y坐标
  const { left, right, top, height } = boundingClientRect;
  const { scrollTop } = scrollOffset;
  if (left < x && x < right && scrollTop + top < y && y < scrollTop + top + height) {
    return true;
  }
  return false;
};

/**
 * @description: 获取当前页面
 * @returns {Object} 当前页面Page对象
 */
export const getActivePage = function () {
  const curPages = getCurrentPages();
  if (curPages.length) {
    return curPages[curPages.length - 1];
  }
  return {};
};

/**
 * @description: 获取前一页面
 * @returns {Object} 当前页面Page对象
 */
export const getPrevPage = function () {
  const curPages = getCurrentPages();
  if (curPages.length > 1) {
    return curPages[curPages.length - 2];
  }
  return {};
};
/**
 * @description: 处理半弹层 展开/关闭
 *  @param {Boolean} ishide 打开是传false,关闭时传true
 * @returns {Array}  半弹层数组halfMaskArr
 */
// 处理半弹层 展开/关闭
export const handleMaskFunc = function(ishide, maskName){
  let activePath = getActivePage().route
   
  // 存放半弹层的全局数组
  let halfMaskArr = getApp().globalData.halfMaskArr || [];
  // 当前页面路径，是否已经有打开的半弹层
  let index = -1
  index = halfMaskArr.findIndex((item)=>{
    return item.path == activePath
  })
  let maskArrItem = {
    path:activePath,
    subMaskArr:[
      {
        name: maskName,
      }
    ]
  }
  // console.log('----isHideCartInfo-----',ishide,'---activePath---',activePath,'----halfMaskArr------',halfMaskArr)
  if(ishide == false){
    if(index < 0){
      halfMaskArr.push(maskArrItem)
    }else{
      // 由打开的半弹层--》落地页--》在返回刚才打开的半弹层所在的页面--不能重复添加半弹层
      if(index >= 0 && halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
        let subIndex = -1
        subIndex = halfMaskArr[index].subMaskArr.findIndex((item)=>{
          return item.name == maskName
        })
        if(subIndex < 0){
          halfMaskArr[index].subMaskArr.push({
            name: maskName
          })
        }
      }
    }
     
  }else{
    let subIndex = -1
    if(index >= 0 && halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
      subIndex = halfMaskArr[index].subMaskArr.findIndex((item)=>{
        return item.name == maskName
      })
      if(subIndex >= 0){
        halfMaskArr[index].subMaskArr.splice(subIndex,1)
      }
    }
      
  }
  // console.log('-----halfMaskArr---',JSON.stringify(halfMaskArr))
}
/**
 * @description: 针对打开半弹层手动上报pv前，判断路径是否有打开的半弹层，如果有打开的，那就是半弹层；如果
 *     没有，那么来源页面就是上一个页面;
 * @returns {string}  ref_page_name
 */
// 处理半弹层 展开/关闭
export const getPvMaskRefPageName = function(){
  let activePath = getActivePage().route
  let halfMaskArr = getApp().globalData.halfMaskArr || [];
  let { buriedDesc = {} } = getActivePage()
  let {page = {}} = buriedDesc;
  let ref_page_name = '';
  // [
  //   {"path":"pages/store/index",
  //   "subMaskArr":
  //     [
  //       {"name":"mini_shopcar"}
  //     ]
  //   }
  // ]

  // 当前页面路径，是否已经有打开的半弹层
  let index = null
  index = halfMaskArr.findIndex((item)=>{
    return item.path == activePath
  })

  //
  if(index < 0){
    ref_page_name = page.name || ''
  }else{
    let subLen = halfMaskArr[index].subMaskArr.length;
    if(subLen < 1){
      ref_page_name = page.name || ''
    }else{
      ref_page_name =  halfMaskArr[index].subMaskArr[subLen -1].name
    }
  }
  // console.log('-----ref_page_name------',ref_page_name)
  return ref_page_name
}
// 获取上一页面-名字
export const getPrePageName = function(currentPageName){
  let pageStack = getApp().globalData.pageStack || [];
  let lastIndex = 0
  let indexArr = [];
  let prePageName = ''
  let len = pageStack.length
  if(len > 1){
    for(let i = 0;i<len;i++ ){
      if(pageStack[i] == currentPageName){
        indexArr.push(i)
      }
    }
    let indexArrLen = indexArr.length
    if(indexArrLen > 0){
      lastIndex = indexArr[indexArr.length -1]
      prePageName = pageStack[lastIndex - 1]
    }else{
      prePageName = pageStack[len -1]
    }
  }else{
    prePageName = 'outside'
  }
  return prePageName
}
// 获取上一页面-名字
export const getPrePageSource = function(currentPageSource){
  let pageSourceStack = getApp().globalData.pageSourceStack || [];
  let lastIndex = 0
  let indexArr = [];
  let prePageName = ''
  let len = pageSourceStack.length
  if(len > 0){
    for(let i = 0;i<len;i++ ){
      if(pageSourceStack[i] == currentPageSource){
        indexArr.push(i)
      }
    }
    let indexArrLen = indexArr.length
    if(indexArrLen > 0){
      lastIndex = indexArr[indexArr.length -1]
      prePageName = pageSourceStack[lastIndex - 1]
    }else{
      prePageName = pageSourceStack[len -1]
    }
  
  }else{
    prePageName = 'outside'
  }
  return prePageName
}
// 弹层-获取名字
export const getMaskOpenPageNameAndPageSource = function(flag,name){
  let maskName = name || ''
  let PageNameAndPageSource = {}
  let pageList = getCurrentPages();
  let route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
  let pageName = routeMapName[route].pageName ? routeMapName[route].pageName : routeMapName[route] ?routeMapName[route] : route;
  let pageStack = getApp().globalData.pageStack || []
  let prePageName = ''
  let pageSource = routeMapName[route].pageSource ? routeMapName[route].pageSource : routeMapName[route] ?routeMapName[route] : route;
  let refPageSource = getPrePageSource(pageSource)
  if(flag == 'open'){
    prePageName = pageStack[pageStack.length -1]
    pageStack.push(maskName)
   
    // 还得重新维护 halfMaskArr...心塞
    /**
     * halfMaskArr: [
      // {
      //   path:'',
      //   subMaskArr:[
      //     {
      //       name:'',
      //     }
      //   ]
      // }
    // ],
     * */ 
    handleMaskFunc(false,maskName)
  }
  if(flag == 'close'){
    handleMaskFunc(true,maskName)
  }
  PageNameAndPageSource = {
    pageName: maskName,
    prePageName,
    pageSource,
    refPageSource
  }
  return PageNameAndPageSource
}
export const getHalfMaskPageSourceAndPrePageSource = function(){
  let PageSourceAndPrePageSource = {}
  let pageList = getCurrentPages();
  let route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
 
  let pageSource = routeMapName[route].pageSource ? routeMapName[route].pageSource : routeMapName[route] ?routeMapName[route] : route;
  let refPageSource = getPrePageSource(pageSource)
  PageSourceAndPrePageSource = {
    pageSource,
    refPageSource
  }
  return PageSourceAndPrePageSource
}
export const getCurrentMaskHasOpen = function(maskName){
  let flag = 'false'
  let pageList = getCurrentPages();
  let route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
  // 存放半弹层的全局数组
  let halfMaskArr = getApp().globalData.halfMaskArr || [];

  // 当前页面路径，是否已经有打开的半弹层
  let index = -1
  index = halfMaskArr.findIndex((item)=>{
    return item.path == route
  })
  if(index < 0){
    flag = 'false'
    return flag;
  }else{
    let subLen = halfMaskArr[index].subMaskArr.length;
    if(subLen < 1){
      flag = 'false'
      return flag;
    }else{
      let subIndex = -1
      subIndex = halfMaskArr[index].subMaskArr.findIndex((item)=>{
        return item.name == maskName
      })
      if(subIndex < 0){
        flag = 'false'
        return flag;
      }else{
        flag = 'true'
        return flag;
      }
      
    }
  }
  
}

export const getMaskOpenPageNameAndPageSourceV2 = function(type,maskName,pageHalfMaskArr){
  // [
  //   {
  //     name:'mini_shopcar',
  //     type:'close',
  //     parentId:'store_v5',
  //     selfId:'mini_cart'
  //   }
  // ]     
  let PageNameAndPageSource = {}
  let flag = 'false'
  if(type == 'open'){
    if(pageHalfMaskArr.length < 1){
      flag = 'false'
    }else{
      let subIndex = -1
      subIndex = pageHalfMaskArr.findIndex((item)=>{
        return item.name == maskName
      })
      if(subIndex < 0){
        flag = 'false'
      }else{
        flag = 'true'
      }
    }
  }else if(type == 'close'){
    flag = 'true'
    //移除关闭的半弹层
    let subIndex = -1
    subIndex = pageHalfMaskArr.findIndex((item)=>{
      return item.name == maskName
    })
    pageHalfMaskArr.splice(subIndex,1)
  }
  
  PageNameAndPageSource = {
    isback: flag == 'true' ? 'back' : '',
    _pageHalfMaskArr: pageHalfMaskArr
  }
  return PageNameAndPageSource
}