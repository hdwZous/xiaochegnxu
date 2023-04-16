import { clickBuriedV2_} from './BI';
import util from './util'
import { routeMapName} from './routeMapName';
import { getMaskOpenPageNameAndPageSourceV2} from "./bi/utils";
import emitter from './events'
import djBus from "./djBus.js"
import djHalfMaskNameArr from './halfMaskName'
class firstBi {
  constructor(){

  }
  onload(context,opts){
    const app = getApp();
    let mpChannel = app.globalData.mpChannel;
    //解析opts 携带过来的上一页的信息
    let preObj = {}
    let _uuiditem = opts.uu_uuid
    
    // todo 增加burid_position
    djBus.once(_uuiditem,(data)=>{
      preObj = data
    });
    
    let pageId = util.getPageIdrandom()
    //当前页面名字--
    let pageList = getCurrentPages();
    let route = context.route || ''
    // 如果上一页没有preObj就是空了
    let prePageName = preObj.currentPageName
    let pageName = routeMapName[route] && routeMapName[route].pageName ? routeMapName[route].pageName :  route;
    let pageSource = routeMapName[route] && routeMapName[route].pageSource ? routeMapName[route].pageSource : route;
    // 处理搜索中间页的名字问题
    if(pageName == 'search'){
      // let pre_pageStackName = pageStack[pageStack.length -1 ]
      if(prePageName == 'home' || prePageName == 'channel'){
        pageName = 'search'
        pageSource = 'searchTransitPage'
      }else if(prePageName == 'seckill_active' || prePageName == 'seckill_results'){
        pageName = 'seckillSearch'
        pageSource = 'seckillSearchTransitPage'
      }else if(prePageName == 'storeinfo' || prePageName == 'store_search'){
        pageName = 'storeSearch'
        pageSource = 'storeSearch'
      }
    }
    // 处理搜索中间页的名字问题

    // 处理搜索结果页面
    if(pageName == 'search_results'){
      // let pre_pageStackName = pageStack[pageStack.length -1 ]
      if(prePageName == 'seckillSearch'){
        pageName = 'seckill_results'
      }
    }
    // 处理搜索结果页面

    let pageStack = getApp().globalData.pageStack || []
    let pageSourceStack = getApp().globalData.pageSourceStack || []
    // todo 扫码进入后，再次扫码是否进入onlaod
    let refPageSource =  preObj.pageSource
  
    
    try{
      //增加上一页是空并且缓存为web时，在onload使用web赋值当前页----优先级不高
      if( !preObj.currentPageName  && (getApp().globalData.globalCurrentPageNameObj && getApp().globalData.globalCurrentPageNameObj.currentPageName == 'web')){
        // preObj.currentPageName = 'web'
        console.log(6666666)
        prePageName = "web";
      }
      try {
        if (!preObj || !preObj.currentPageName) {
          let preStack = (pageList && pageList.length && pageList.length >=2 && pageList[pageList.length - 2]) || null;
          let preRoute = preStack ? preStack.route : "";
          console.log("preRoute", preRoute);
          if (preRoute == "pages/h5/index") {
            console.log(333333333)
            prePageName = "web";
          }
          // pageNamePreRoute 判断上一页route不等于缓存route - 开始
          let pageNamePreRoute = routeMapName[preRoute] && routeMapName[preRoute].pageName ? routeMapName[preRoute].pageName :  preRoute;
          //剔除多端
          let isTaro =''
          if(preRoute && preRoute.includes('-t')){
            isTaro = 'isTaro'
          }
          // pageNamePreRoute 判断上一页route不等于缓存route - 结束
          

          // 9.15增加如果上一页为空，并且页面栈的倒数第二个是null的话，上一页兜底为直播
          if (pageList && pageList.length && pageList.length >= 2) {
            console.log("pageList", pageList);
            if (preStack === null || preStack === "null") {
              prePageName =
                "__plugin__/wx2b03c6e691cd7370/pages/live-player-plugin";
            }
          }
        }
      }catch(e) {}
    }catch(e){}
   

    pageStack.push(pageName)
    pageSourceStack.push(pageSource)

    
    //----traceId,userAction
    if(pageName == 'home' || pageName == 'myorderlist' || pageName == 'myinfo' || (mpChannel =='yy_xcx' && pageName == 'channel')){
      let globalCurrentPageNameObj = getApp().globalData.globalCurrentPageNameObj || {}
      let {preTraceId='',preUserAction=''} = getApp().globalData.globalCurrentPageNameObj || {}
      context.setData({
        'recommendObj.currentPageName': pageName,
        'recommendObj.prePageName': JSON.stringify(globalCurrentPageNameObj) == '{}' ? 'outside' : globalCurrentPageNameObj.currentPageName ? globalCurrentPageNameObj.currentPageName : '',
        'recommendObj.pageIdFirstPage': pageId,
        'recommendObj.pageSource': pageSource,
        'recommendObj.refPageSource': JSON.stringify(globalCurrentPageNameObj) == '{}' ? 'outside'  : globalCurrentPageNameObj.pageSource ? globalCurrentPageNameObj.pageSource : '',
        'recommendObj.preTraceId': preTraceId,
        'recommendObj.preUserAction': preUserAction,
        'recommendObj_preObj': globalCurrentPageNameObj, // 弹层 
      }, ()=>{})
      

    }else{
      let traceId = opts.traceId || ''
      let userAction = opts.userAction || ''

      // 页面onload-首次进入Launch
      if (getApp().globalData.isAppShow) {
        // 启动后直接进入某页面，例如启动直接进入活动页
        if (JSON.stringify(preObj) == '{}') {
          prePageName = 'outside'
          refPageSource= 'outside'
        }
      }
      console.log('firstpage-onload-context.route', context.route);
      console.log('getApp().globalData.isAppShow', getApp().globalData.isAppShow);
      context.setData({
        'recommendObj.currentPageName': pageName,
        'recommendObj.prePageName': prePageName || 'noTabPageOnload',
        'recommendObj.pageIdFirstPage': pageId,
        'recommendObj.pageSource': pageSource,
        'recommendObj.refPageSource': refPageSource,
        'recommendObj.preTraceId': traceId,
        'recommendObj.preUserAction': userAction && decodeURIComponent(userAction),
        'recommendObj_preObj': preObj, // 弹层 
      }, () => {
        console.log(context.data.recommendObj);
      })
    }
  }
  onshow(context,opts){
    const app = getApp();
    let mpChannel = app.globalData.mpChannel;
    //当前页面名字--
    let route = context.route || ''
    let prePageName = context.data.recommendObj && context.data.recommendObj.prePageName || '' 
    let pageName = routeMapName[route] && routeMapName[route].pageName ? routeMapName[route].pageName :  route;
    let pageSource = routeMapName[route] && routeMapName[route].pageSource ? routeMapName[route].pageSource : route;
    // 处理搜索中间页的名字问题
    if(pageName == 'search'){
      // let pre_pageStackName = pageStack[pageStack.length -1 ]
      if(prePageName == 'home' || prePageName == 'channel'){
        pageName = 'search'
        pageSource = 'searchTransitPage'
      }else if(prePageName == 'seckill_active' || prePageName == 'seckill_results'){
        pageName = 'seckillSearch'
        pageSource = 'seckillSearchTransitPage'
      }else if(prePageName == 'storeinfo' || prePageName == 'store_search'){
        pageName = 'storeSearch'
        pageSource = 'storeSearch'
      }
    }
    // 处理搜索中间页的名字问题

    // 处理搜索结果页面
    if(pageName == 'search_results'){
      // let pre_pageStackName = pageStack[pageStack.length -1 ]
      if(prePageName == 'seckillSearch'){
        pageName = 'seckill_results'
      }
    }


    // 页面pv  返回
    if(context.recommendObj_isFirstShow === false){ 
      let pageStack = getApp().globalData.pageStack || []
      let pageSourceStack = getApp().globalData.pageSourceStack || []
      // 处理搜索中间页的名字问题
      if(pageName == 'search'){
        // let pre_pageStackName = pageStack[pageStack.length -1 ]
        if(prePageName == 'home' || prePageName == 'channel'){
          pageName = 'search'
          pageSource = 'searchTransitPage'
        }else if(prePageName == 'seckill_active' || prePageName == 'seckill_results'){
          pageName = 'seckillSearch'
          pageSource = 'seckillSearchTransitPage'
        }else if(prePageName == 'storeinfo' || prePageName == 'store_search'){
          pageName = 'storeSearch'
          pageSource = 'storeSearch'
        }
      }
      // 处理搜索中间页的名字问题

      // 处理搜索结果页面
      if(pageName == 'search_results'){
        // let pre_pageStackName = pageStack[pageStack.length -1 ]
        if(prePageName == 'seckillSearch'){
          pageName = 'seckill_results'
        }
      }
      pageStack.push(pageName)
      pageSourceStack.push(pageSource)

      //增加页面是否有打开的半弹层判断
      let isHasOpenMask = false
      let halfMaskArr = context.pageHalfMaskArr || [];
      isHasOpenMask = halfMaskArr.length > 0  ? true : false
      //增加页面是否有打开的半弹层判断
      //返回
      if(!isHasOpenMask){ // 没有半弹层
        let _currentPageName = getApp().globalData.globalCurrentPageNameObj && getApp().globalData.globalCurrentPageNameObj.currentPageName || 'testno_globalCurrentPageNameObj1'
        getApp().globalData.globalCurrentPageNameObj = context.data.recommendObj
        context.setData({
          'recommendObj.prePageName': _currentPageName
        },()=>{
          context.pvFunc && context.pvFunc('back')
        })
      }else{
        let maskLen = context.pageHalfMaskArr.length
        let lastMaskItem = context.pageHalfMaskArr[maskLen -1]
        let {type = '',name = '',selector = '', buriedObj={} } = lastMaskItem
        const item = context.selectComponent(selector)
        try{
          let _prePageName =  getApp().globalData.globalCurrentPageNameObj && getApp().globalData.globalCurrentPageNameObj.currentPageName || 'testno_globalCurrentPageNameObj2'
          getApp().globalData.globalCurrentPageNameObj = {}
          getApp().globalData.globalCurrentPageNameObj = buriedObj || item.data.recommendObj 
          item.setData({
            'recommendObj.prePageName':  _prePageName,
            'prePageName':   _prePageName,
          },()=>{
            item.pvFunc('back')
          })
        }catch(e){}
      }
    }else{
      let recommendObjCurrentPageName = context.data.recommendObj.currentPageName;
      if(recommendObjCurrentPageName == 'home' || recommendObjCurrentPageName == 'myorderlist' || recommendObjCurrentPageName == 'myinfo' || (mpChannel =='yy_xcx' && recommendObjCurrentPageName == 'channel')
      ){

        let { currentPageName = ''} =  getApp().globalData.globalCurrentPageNameObj
        let globalCurrentPageNameObj = getApp().globalData.globalCurrentPageNameObj || {}
        let _prePageName = globalCurrentPageNameObj.currentPageName || 'testno_globalCurrentPageNameObj3'
        let _refPageSource =  globalCurrentPageNameObj.pageSource ? globalCurrentPageNameObj.pageSource : 'testno_globalCurrentPageNameObj3'
        getApp().globalData.globalCurrentPageNameObj = {}
        getApp().globalData.globalCurrentPageNameObj = context.data.recommendObj;
        context.recommendObj_isFirstShow  = false

        // 这里主要是 tab 四个页面比较特殊，上一页是从getApp().globalData.globalCurrentPageNameObj获取
        if(currentPageName){
          context.setData({
            'recommendObj.prePageName':  _prePageName,
            'recommendObj.refPageSource': _refPageSource,
          },()=>{
            context.pvFunc && context.pvFunc()
          })
        }else{
          context.pvFunc && context.pvFunc()
        }
      }else{
        context.pvFunc && context.pvFunc()
        //页面返回 false
        context.recommendObj_isFirstShow  = false
        getApp().globalData.globalCurrentPageNameObj = {}
        getApp().globalData.globalCurrentPageNameObj = context.data.recommendObj;
      }
     
    }
    //------
    

    
  
    //注册半层的事件
    let _pvHalfMaskName = Object.values(djHalfMaskNameArr)
    let _pageIdFirstPage =  context.data && context.data.recommendObj && context.data.recommendObj.pageIdFirstPage
    for(var i = 0,halfNameLen =_pvHalfMaskName.length;i<halfNameLen;i++ ){
      emitter.addListener(`halfMaskFunc_${route}_${_pvHalfMaskName[i]}_${_pageIdFirstPage}`, (params)=> {
        // const mini_cart = context.selectComponent('#store_v5 >>> #mini_cart')
        // mini_cart.f1()

        // {
        //   name:'mini',
        //   type:'close',
        //   parentId:'store_v5',
        //   selfId:'mini_cart'
        // }
        let {type = '',name = '',selector = '',buriedObj = {} } = params
        let maskItem = {
          name,
          type,
          selector,
          buriedObj
        }
        let pageHalfMaskArr = context.pageHalfMaskArr;
        if(type == 'open'){
          //在新的半弹出，压入数组之前
          pageHalfMaskArr.push(maskItem)
          const item = context.selectComponent(selector)
          try {
            // item.pvFunc()
            getApp().globalData.globalCurrentPageNameObj = {}
            getApp().globalData.globalCurrentPageNameObj = buriedObj || item.data && item.data.recommendObj 

            if(!getApp().globalData.globalCurrentPageNameObj){
              getApp().globalData.globalCurrentPageNameObj = {}
              getApp().globalData.globalCurrentPageNameObj.currentPageName = name
            }
            
          } catch (e) {
            clickBuriedV2_({
              click_id: "test_popOpenCatch_0927",
              click_par: {
                error: e,
                popInfo: params,
                pageHalfMaskArr: pageHalfMaskArr,
                pin: getApp().globalData &&  getApp().globalData.loginStateInfo && getApp().globalData.loginStateInfo.PDJ_H5_PIN
              },
            });
          }
        }else if(type == 'close'){  
          // console.log('----buriedObj----',JSON.stringify(buriedObj))
          let {_pageHalfMaskArr = []} = getMaskOpenPageNameAndPageSourceV2(type,name,pageHalfMaskArr)
          context.pageHalfMaskArr = _pageHalfMaskArr
          if(_pageHalfMaskArr.length > 0){
            let _lastMaskItem= _pageHalfMaskArr[_pageHalfMaskArr.length -1]
            let _selector = _lastMaskItem.selector && _lastMaskItem.selector || ''
            const item = context.selectComponent(_selector)
            try{
              let _prePageName =  buriedObj.currentPageName && buriedObj.currentPageName || name
              getApp().globalData.globalCurrentPageNameObj = {}
              getApp().globalData.globalCurrentPageNameObj = item && item.data && item.data.recommendObj 
              try{
                item.setData({
                  'recommendObj.prePageName': _prePageName ,
                  'prePageName': _prePageName
                },()=>{
                  item.pvFunc('back')
                  if(!getApp().globalData.globalCurrentPageNameObj){
                    getApp().globalData.globalCurrentPageNameObj = {}
                    getApp().globalData.globalCurrentPageNameObj.currentPageName = name
                  }
                })
              }catch(e){}
            }catch(e){
              clickBuriedV2_({
                click_id: "test_popCloseCatch_0927",
                click_par: {
                  error: e,
                  popInfo: params,
                  _pageHalfMaskArr,
                  pin: getApp().globalData &&  getApp().globalData.loginStateInfo && getApp().globalData.loginStateInfo.PDJ_H5_PIN
                },
              });
            }
          }else{
            getApp().globalData.globalCurrentPageNameObj = {}
            getApp().globalData.globalCurrentPageNameObj = context.data.recommendObj;
            context.setData({
              'recommendObj.prePageName': buriedObj.currentPageName && buriedObj.currentPageName || name || 'testno_globalCurrentPageNameObj4'
            },()=>{
              context.pvFunc('back')
            })
          }
        }
      });
    }
    context.setData({
      pageIsGetInfoOnShow: true
    })
    context.recommendObj_isFirstShow  = false
  }
  onhide(context,opts){
    context.recommendObj_isFirstShow = false
  }
  onunload(context,opts){
    //移除注册的事件
    //注册半层的事件
    let route = context.route || ''
    let _pvHalfMaskName = Object.values(djHalfMaskNameArr)
    let _pageIdFirstPage =  context.data && context.data.recommendObj && context.data.recommendObj.pageIdFirstPage
    for(var i = 0,halfNameLen =_pvHalfMaskName.length;i<halfNameLen;i++ ){
      if(emitter.events.has("halfMaskFunc_"+route+"_"+_pvHalfMaskName[i]+"_"+_pageIdFirstPage)){
        emitter.events.delete("halfMaskFunc_"+route+"_"+_pvHalfMaskName[i]+"_"+_pageIdFirstPage)
      }
    }
  }

}
let buried = new firstBi()

export default buried
