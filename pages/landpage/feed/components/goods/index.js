// pages/landpage/feed/components/index.js
Component({
    lazyObj: {
      epSelector: '.feed_good'
    },
    options: {
      addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        },
        recommendObj: {
            type: Object,
            value: {}
        },
        longitude: {
            type: String,
            value: ''
        },
        latitude: {
            type: String,
            value: ''
        },
        traceId: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
