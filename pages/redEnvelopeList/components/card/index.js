Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function (newVal) {
                newVal.couponDetailArr = [];
                if(newVal.couponDetail) {
                    newVal.couponDetailArr = newVal.couponDetail.split(';\r\n')
                }
                this.setData({
                    couponData: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        toggle: false,
        couponData: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击说明
        clickDesc(e) {
            this.setData({
                toggle: !this.data.toggle
            })
        },
        // 点击红包卡片
        clickCard(e) {
            // console.log(e);
            // let dataSet = e.currentTarget.dataset;
            // let to = dataSet.to;
            // let params = dataSet.params;
            // console.log('===to===', to);
            // console.log('===params===', params);
            // if(to === 'home') {
            //     wx.switchTab({
            //         url: '/pages/home/home'
            //     })
            // }
        }
    }
});
