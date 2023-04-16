// pages/groupBuy/components/goodImg/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodImg: {
            type: Array,
            value: [],
            observer: function(newVal) {
                this.setData({
                    goodImg: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        goodImg: [],
        currentIndex: 0
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 轮播变换
        swiperChange: function(e) {
            this.setData({
                currentIndex: e.detail.current
            })
        }
    }
})