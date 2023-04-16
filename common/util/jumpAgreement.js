/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase*/
// 小程序appId
import { appIdObj } from './appId';
import { pvLiveBuried_ } from './BI';

const pages = {
  // 首页
  'p1': '/pages/home/home',
  // 轻松购
  'p2': '/pages/tabBar/easyGo/easyGo',
  // 订单
  'p3': '/pages/tabBar/orderlist/index',
  // 我的
  'p4': '/pages/tabBar/person/person',
  // 领券页
  "p5": "/pages/exchange/exchange",
  // 超级会员码优惠券领取列表
  "p6": "/pages/coupon/voucher/index",
  // 超级会员码页（此业务已删除）
  // 'p13': '/pages/person/personcode',
  // 拼团-商品列表
  'p14': '/pages/groupBuy/groupList/index',
  // 砍价-商品列表
  'p15': '/pages/bargain/cutGoodList/index',
  // 优惠券列表
  'p16': '/pages/coupon/person-coupon',
  // 砍价状态详情页
  'p17': '/pages/bargain/launch/index',
  // 门店内活动落地页
  'p18': '/pages/activity/store/index',
  // h5活动页
  'p19': '/pages/h5/index',
  // 门店页
  'p20': '/pages/store/index',
  // 频道页
  'p21': '/pages/channel/channel',
  // 活动页
  'p22': '/pages/activity/homeFocus/index',
  // 搜索页
  'p23': '/pages/searchAbout/search/search',
  // 分享有礼规则页
  "p24": "/pages/inviteFriends/index",
  // 0元抽奖
  "p25": "/pages/lottery/list/index",
  // 0元抽奖-详情页
  "p26": "/pages/lottery/detail/index",
  // 我的老带新团详情页
  "p27": "/pages/groupBuy/oldInviteNew/result/index",
  // 拼团-详情页
  'p28': '/pages/groupBuy/groupBuyDetail/index',
  // 单品详情页（单品详情再门店页里）| 3.3.1改版 商品详情页独立
  'p30': '/pages/product/index',
  // 门店获客页
  'p31': '/pages/getCustomers/index',
  // p33:达达小程序
  "p33": '/pages/index/index?channel=JDDJ_mini_program',
  // p34:黄油拼购小程序
  "p34": '/pages/home/dashboard/index?channel=JDDJ_mini_program',
  // 分享有礼
  "p36": '/pages/shareGift/shareGift',
  // 瓜分步数主页
  "p38": '/pages/stepNumberSub/step/index',
  // 早起打卡页
  "p39": "/pages/punch-t/home/index",
  // 好友助力列表
  "p40": '/pages/friendHelp/list/index',
  // 鲜豆庄园
  "p41": '/pages/bean-t/index',
  // 鲜豆兑换
  "p42": '/pages/beansExchange-t/exchangeList/index',
  // 天天送蛋
  "p43": '/pages/farm-t/home/index',

  "p44": '/pages/sc-index/index?channel=JDDJ_mini_program',
  // 砍价助力页
  "p45": '/pages/bargain-t/detail/index',
  // 新版签到
  "p46": '/pages/tabBar/signIn-t/index',
  // 门店共赢
  "p47": '/pages/storeWin/index',
  // 引导关注公众号 (无页面路径，button按钮类型控制)
  "p48": true,
  // 微常准活动页
  "p49": '/pages/weBank/index',
  // 微常准活动页
  "p50": '/pages/phoneCharge-t/index',
  // 订单详情页面
  "p51": '/pages/order/orderdetail/index',

  // 付费会员
  "p52": '/pages/vpaymember_t/home/index',
  // 直播
  "p53": 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin',
  // 步步赚主页
  "p54": '/pages/stepNumberSub/stepNumber/stepNumber',
  "p58": '/pages/live/list/index',
  "p59": '/pages/seckill/index',
  "p69": '/pages/nearbyStore/index',
  // 新频道页面
  "p71": '/pages/channelNew/index',
  // 新领券页
  "p76": '/pages/getCoupon-t/index',
  // 社群红包发放
  "p77": "/pages/communityRedpack/index"
};

/**
 * @param type 页面类型 pages
 * @param params url参数
 */
function jump (obj) {
  let type = obj.pageType || '';
  let params = obj.params || {};
  let _this = obj.context || {}
  let preObj = _this && _this.data && _this.data.recommendObj || {}
  let userAction = '';
  if (obj.userAction) {
    userAction = encodeURIComponent(obj.userAction)
  }
  let pageUrl = pages[type] || appIdObj[type] && appIdObj[type].path || '';
  // 如果type == 0,代表第三方小程序跳转
  let appId = '';
  if (Reflect.has(params, 'appId')) {
    appId = params['appId'];
    pageUrl = params['url'];
    Reflect.deleteProperty(params, 'appId');
    Reflect.deleteProperty(params, 'url');
  }
  let paramsStr = '';
  for (let i in params) {
    paramsStr += '&' + i + '=' + (params[i] || '')
  }
  if (JSON.stringify(params) == '{}') {
    paramsStr = "?userAction=" + userAction
  } else {
    paramsStr = '?' + paramsStr.slice(1) + '&userAction=' + userAction
  }
  // if(pageUrl && paramsStr && params.type && params.type != 9 && params.JumpLoginByLaunch == 1 && !isLogin()){
  //   let allPageUrl= `${pageUrl}${paramsStr}`;
  //   util.unLogin(allPageUrl, preObj);
  //   return
  // }

  if (pageUrl) {
    if (type === 'p1' || type === 'p3' || type === 'p4') { // tabBar页面
      setTimeout(() => {
        wx.switchTab({
          url: pageUrl,
          preObj
        })
      }, 500)
    }else if(type === 'p46') {
      setTimeout(() => {
        wx.navigateTo({
          url: pageUrl,
          preObj
        })
      }, 500)
    }
    else if (type === 'p0') { // 第三方小程序跳转
      wx.navigateToMiniProgram({
        appId: appId,
        path: pageUrl
      });
    } else if (type === 'p34' || type === 'p33' || type === 'p44' || type === 'p99') { // 小程序跳转
      paramsStr = paramsStr ? '&' + paramsStr.slice(1) : '';
      let jumpUrl = appIdObj[type].path + paramsStr;
      wx.navigateToMiniProgram({
        appId: appIdObj[type].appid,
        path: jumpUrl
      });
    } else if (type === 'p53') { // 进入直播
      wx.navigateTo({
        url: `${pages['p53']}?room_id=${params.room_id}`,
        success () {
          // pv埋点
          setTimeout(() => {
            pvLiveBuried_({
              create_time: new Date(),
              livePath: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin',
              livePageName: 'livePlayer',
              page_par: {
                roomid: params.room_id
              }
            })
          }, 50)
        },
        preObj
      })
    } else if (type === 'p19') { // h5跳转
      let paramsUrl = params && params.url || '';
      if (paramsUrl) {
        if (paramsUrl.indexOf('punch-t') > -1) { // 打卡拦截
          wx.navigateTo({
            url: pages['p39'] + paramsStr,
            preObj
          })
        } else if (paramsUrl.indexOf('friendhelp') > -1 || paramsUrl.indexOf('friendHelp') > -1) { // 好友助力拦截
          wx.navigateTo({
            url: pages['p40'] + paramsStr,
            preObj
          })
        } else if (paramsUrl.indexOf('bean-t') > -1) { // 鲜豆庄园拦截
          wx.navigateTo({
            url: pages['p41'] + paramsStr,
            preObj
          })
        } else if (paramsUrl.indexOf('lottery') > -1) { // 0元抽奖列表拦截
          wx.navigateTo({
            url: pages['p25'] + paramsStr,
            preObj
          })
        } else if (paramsUrl.indexOf('bargain') > -1) { // 砍价列表拦截
          wx.navigateTo({
            url: pages['p15'] + paramsStr,
            preObj
          })
        } else if (paramsUrl.indexOf('pages/live/list/index') > -1) { // 砍价列表拦截
          wx.navigateTo({
            url: pages['p55'] + paramsStr,
            preObj
          })
        } else {
          wx.navigateTo({
            url: pageUrl + paramsStr,
            preObj
          })
        }
      } else {
        wx.navigateTo({
          url: pageUrl + paramsStr,
          preObj
        })
      }
    } else { // 其他页面
      wx.navigateTo({
        url: pageUrl + paramsStr,
        preObj
      })
    }
  }
}
export default {
  jump: jump
}
