import {
    djCmsJump
} from '../../common/util/agreementV2.js'
import emitter from '../../common/util/events'
import { clickBuriedV2_ } from "../../common/util/BI";
import { handleScanOptionsAndJump } from '../../common/util/jumpHandler';
Page({
    /**
     * 组件的初始数据
     */
    data: {
        show: true,
        item: {},
       
        options: {}
    },
    onLoad: function(options){
        let agreeMentPrivacy = null;
        let {path = ''} = options

    },
    onReady: function(){

    },
    onShow: function(){
        // wx.hideHomeButton({})
    },
    onHide: function(){
        console.log('----onHide-----onHide---')
    },
    closePop() {
        this.setData({
            show: false
        })
        wx.setStorageSync('agreeMentPrivacy',true)

      
        let privacy_data = null
        try{
            privacy_data = wx.getStorageSync('privacy_data')
        }catch(e){}


        let {path = ''} = privacy_data;
        let parseParams = this.parseParams(privacy_data)
        if( path == 'pages/home/home' || path == 'pages/tabBar/orderlist/index' || path == 'pages/tabBar/person/person' ){
            wx.switchTab({
                url: `/${path}${parseParams}`
            })
        }else{
            wx.redirectTo({
                url: `/${path}${parseParams}`
            })
        }
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        clickBuriedV2_({
            click_id:'clickLayer',
            click_par:{
                type: 'authorization',
                isAgree: 1
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
    },
    parseParams(obj) {
        let userAction = ''
        if (obj.userAction) {
            userAction = encodeURIComponent(obj.userAction)
        }
    
        let paramsStr = ''
        let obj_data = obj.params ? obj.params : obj.query ? obj.query : {};
        for (let i in obj_data) {
            if (i == 'isAddCart') {
                let str = obj_data[i] + ''
                obj_data[i] = str == "true" ? true : "";
            }
            paramsStr += '&' + i + '=' + (obj_data[i] || '')
        }
        if (JSON.stringify(obj_data) == '{}') {
            paramsStr = "?userAction=" + userAction
        } else {
            paramsStr = '?' + paramsStr.slice(1) + '&userAction=' + userAction
        }
        return paramsStr
    },
    clickContent() {
        let { data, userAction } = this.data.data || {};
        djCmsJump({
            to: data.to,
            params: data.params,
            userAction: userAction
        });
        this.closePop()
    },
    gotoH5M(){
        let data = {
            "to": 'web',
            "params":{
                "url":"https://daojia.jd.com/html/agreementApp.html?type=87",
                
            },
        }
        djCmsJump({
            to: data.to,
            params: data.params
        });
    },
    gotoH5Y(){
        let data = {
            "to": 'web',
            "params":{
                "url":"https://daojia.jd.com/html/agreementApp.html?type=11",
            },
        }
        djCmsJump({
            to: data.to,
            params: data.params
        });
    },
    gotoH5P(){
        let data = {
            "to": 'web',
            "params":{
                "url":"https://daojia.jd.com/html/agreementApp.html?type=88",
            },
        }
        djCmsJump({
            to: data.to,
            params: data.params
        });
    },
    gotoH5(e){
        console.log(e)
        let type = e && e.target && e.target.dataset && e.target.dataset.item
        switch (type) {
            case '1':
                this.gotoH5Y()
                break;
            case '2':
                this.gotoH5M()
                break;
            case '3':
                this.gotoH5P()
                break;
            default:
                break;
        }
    }
});