import { pvBuriedV2_ , clickBuriedV2_} from "../../common/util/BI";
let app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        exclusiveAppCoupon: {},
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        const that = this
        const eventChannel = this.getOpenerEventChannel()
        // 监听事件,获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('sendData', function (data) {
            let couponTitle = data.exclusiveAppCoupon.couponTitle ? data.exclusiveAppCoupon.couponTitle.slice(0, 10) : ''
            let exclusiveAppCoupon = Object.assign({}, data.exclusiveAppCoupon, { couponTitle })
            that.setData({
                exclusiveAppCoupon
            })
        })

        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        
    },

    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
          create_time: new Date(),
          page_par: {
           
          },
          currentPageName: recommendObj.currentPageName || "",
          prePageName: recommendObj.prePageName || "",
          pageId: recommendObj.pageIdFirstPage || "",
          isBack: back || "",
        });
      },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    // 埋点监听的该方法，勿删
    getapp() {
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickGoUse",
            click_par: {
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
    }
})