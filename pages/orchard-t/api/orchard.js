"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUserExchangeRecordsFn=exports.getLayerTaskInfoFn=exports.receiveWaterRedPack=exports.getWaterRedPackInfo=exports.receiveWaterBottle=exports.getWaterBottleInfo=exports.getTaskBySceneId=exports.taskInfoMulti=exports.getWaterWheelInfo=exports.fruitCollectWater=exports.myOrders=exports.createOrder=exports.submitUserFeedback=exports.artificialRain=exports.shareImage=exports.joinCarveUp=exports.openCarveUp=exports.getCarveUp=exports.takeIndexLayerWelfareFunc=exports.updateNewPersonInfo=exports.confirmFruitBeginActivityInfo=exports.getFruitListForExchange=exports.getFruitListInfo=exports.getSharePictureInfo=exports.getWaterInfo=exports.beansLotteryInfo=exports.subscribeNotifyInfo=exports.sendTaskPrizeInfo=exports.finishedTaskInfo=exports.receivedTaskInfo=exports.taskListInfo=exports.getReward=exports.collectWater=exports.watering=exports.getCurrentPageData=void 0;var _indexWeapp=require("../npm/@jd/djmp/common-t/js/http/index.weapp.js"),_indexWeapp2=require("../npm/@dj-lib/colorapi/build/index.weapp.js"),_indexWeapp3=_interopRequireDefault(_indexWeapp2),_indexWeapp4=require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}console.log("colorRequest",_indexWeapp3.default);var homePage="fruit/initFruit",doWater="fruit/watering",reward="plantBeans/getPoints",collect="plantBeans/sendPrizeTask",taskList="task/list",receivedTask="task/received",finishedTask="task/finished",sendTaskPrize="task/sendPrize",subscribeNotify="plantBeans/subscribeNotify",beansLottery="plantBeans/beansLottery",getWater="plantBeans/getWater",getSharePicture="fruit/ShareMaterialRequest",getFruitList="fruit/fruitList",confirmFruitBeginActivity="fruit/beginActivity",updateNewPerson="fruit/finishFte",fruitListForExchange="fruit/fruitListForExchange",getCurrentPageData=exports.getCurrentPageData=function(){return(0,_indexWeapp.request)({functionId:homePage,isNeedDealError:!0,signkey:1,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},watering=exports.watering=function(){return(0,_indexWeapp.request)({functionId:doWater,isNeedDealError:!0,signkey:1,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},collectWater=exports.collectWater=function(){return(0,_indexWeapp.request)({functionId:collect,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getReward=exports.getReward=function(){return(0,_indexWeapp.request)({functionId:reward,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},taskListInfo=exports.taskListInfo=function(){return(0,_indexWeapp.request)({functionId:taskList,isNeedDealError:!0,signkey:1,body:0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}})},receivedTaskInfo=exports.receivedTaskInfo=function(){return(0,_indexWeapp.request)({functionId:receivedTask,isNeedDealError:!0,body:0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}})},finishedTaskInfo=exports.finishedTaskInfo=function(){return(0,_indexWeapp.request)({functionId:finishedTask,isNeedDealError:!0,body:0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}})},sendTaskPrizeInfo=exports.sendTaskPrizeInfo=function(){return(0,_indexWeapp.request)({functionId:sendTaskPrize,isNeedDealError:!0,body:0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}})},subscribeNotifyInfo=exports.subscribeNotifyInfo=function(){return(0,_indexWeapp.request)({functionId:subscribeNotify,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},beansLotteryInfo=exports.beansLotteryInfo=function(){return(0,_indexWeapp.request)({functionId:beansLottery,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getWaterInfo=exports.getWaterInfo=function(){return(0,_indexWeapp.request)({functionId:getWater,isNeedDealError:!0,signkey:1,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getSharePictureInfo=exports.getSharePictureInfo=function(){return(0,_indexWeapp.request)({functionId:getSharePicture,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getFruitListInfo=exports.getFruitListInfo=function(){return(0,_indexWeapp.request)({functionId:getFruitList,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getFruitListForExchange=exports.getFruitListForExchange=function(){return(0,_indexWeapp.request)({functionId:fruitListForExchange,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},confirmFruitBeginActivityInfo=exports.confirmFruitBeginActivityInfo=function(){return(0,_indexWeapp.request)({functionId:confirmFruitBeginActivity,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},updateNewPersonInfo=exports.updateNewPersonInfo=function(){return(0,_indexWeapp.request)({functionId:updateNewPerson,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},takeIndexLayerWelfareFunc=exports.takeIndexLayerWelfareFunc=function(){return(0,_indexWeapp.request)({functionId:takeIndexLayerWelfare,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getCarveUpInfo="signin/carveUp/carveUpInfo",openCarveUpUrl="signin/carveUp/openCarveUp",joinCarveUpUrl="signin/carveUp/joinCarveUp",shareImageUrl="xapp/carveUp/shareImage",artificialRainUrl="plantBeans/artificialRain",takeIndexLayerWelfare="fruit/index/takeIndexLayerWelfare",getCarveUp=exports.getCarveUp=function(){return(0,_indexWeapp.request)({functionId:getCarveUpInfo,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},openCarveUp=exports.openCarveUp=function(){return(0,_indexWeapp.request)({functionId:openCarveUpUrl,isNeedDealError:!0,body:0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}})},joinCarveUp=exports.joinCarveUp=function(){return(0,_indexWeapp.request)({functionId:joinCarveUpUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},shareImage=exports.shareImage=function(){return(0,_indexWeapp.request)({functionId:shareImageUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},artificialRain=exports.artificialRain=function(){return(0,_indexWeapp.request)({functionId:artificialRainUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},submitUserFeedbackUrl="plantBeans/submitUserFeedback",submitUserFeedback=exports.submitUserFeedback=function(){return(0,_indexWeapp.request)({functionId:submitUserFeedbackUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},createOrderUrl="fruit/createOrder",createOrder=exports.createOrder=function(){return(0,_indexWeapp.request)({functionId:createOrderUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},myOrdersUrl="fruit/myOrders",myOrders=exports.myOrders=function(){return(0,_indexWeapp.request)({functionId:myOrdersUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},collectWaterUrl="fruit/collectWater",fruitCollectWater=exports.fruitCollectWater=function(){return(0,_indexWeapp.request)({functionId:collectWaterUrl,isNeedDealError:!0,signkey:1,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getWaterWheelInfoUrl="fruit/getWaterWheelInfo",getWaterWheelInfo=exports.getWaterWheelInfo=function(){return(0,_indexWeapp.request)({functionId:getWaterWheelInfoUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},taskInfoMultiUrl="task/taskInfoMulti",taskInfoMulti=exports.taskInfoMulti=function(){return(0,_indexWeapp.request)({functionId:taskInfoMultiUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getTaskBySceneIdUrl="fruit/getTaskBySceneId",getTaskBySceneId=exports.getTaskBySceneId=function(){return(0,_indexWeapp.request)({functionId:getTaskBySceneIdUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getWaterBottleInfoUrl="fruit/getWaterBottleInfo",getWaterBottleInfo=exports.getWaterBottleInfo=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return wx.getStorageSync("colorSwitch")?new Promise(function(r,t){(0,_indexWeapp3.default)({isNeedDealError:!0,functionId:"dj_fruit_getWaterBottleInfo",body:JSON.stringify(e),appVersion:"8.28.0"}).then(function(e){r(e)}).catch(function(e){t(e),e.data.echo&&(0,_indexWeapp4.clickReport)({click_id:"spclError_color",click_par:{functionId:"dj_fruit_getWaterBottleInfo",code:e.data.code,echo:e.data.echo},pageName:"orchard"})})}):(0,_indexWeapp.request)({functionId:getWaterBottleInfoUrl,isNeedDealError:!0,body:JSON.stringify(e),appVersion:"8.28.0"})},receiveWaterBottleUrl="fruit/receiveWaterBottle",receiveWaterBottle=exports.receiveWaterBottle=function(){return(0,_indexWeapp.request)({functionId:receiveWaterBottleUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getWaterRedPackInfoUrl="fruit/getWaterRedPackInfo",getWaterRedPackInfo=exports.getWaterRedPackInfo=function(){return(0,_indexWeapp.request)({functionId:getWaterRedPackInfoUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},receiveWaterRedPackUrl="fruit/receiveWaterRedPack",receiveWaterRedPack=exports.receiveWaterRedPack=function(){return(0,_indexWeapp.request)({functionId:receiveWaterRedPackUrl,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getLayerTaskInfoUrl="fruit/index/getLayerTaskInfo",getLayerTaskInfoFn=exports.getLayerTaskInfoFn=function(){return(0,_indexWeapp.request)({functionId:getLayerTaskInfoUrl,isNeedDealError:!0,method:"POST",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})},getUserExchangeRecords="fruit/order/userExchangeRecords",getUserExchangeRecordsFn=exports.getUserExchangeRecordsFn=function(){return(0,_indexWeapp.request)({functionId:getUserExchangeRecords,isNeedDealError:!0,body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{})})};