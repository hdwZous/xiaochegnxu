Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        backgroundColor: {
            type: String,
            value: "#fff"
        },
        source: {
            type: String,
            value: "goodList"
        },
        recommendObj: {
          type: Object,
          value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        // 去详情页
        goToDetail(e) {
            let data = e.currentTarget.dataset
            let { recommendObj = {} } = this.data;
            if (this.data.source == "groupDetail") {
                // 埋点
                this.triggerEvent('onLogBanner', {
                    store_id: data.storeId,
                    sku_id: data.skuId,
                    orgcode: data.orgCode
                })
            } else {
                // 埋点
                this.triggerEvent('onLog', {
                    list: "old&new",
                    store_id: data.storeId,
                    sku_id: data.skuId,
                    orgcode: data.orgCode
                })
            }
            wx.navigateTo({
              url: `/pages/groupBuy/oldInviteNew/detail/index?promotionId=${data.promotionId}&storeId=${data.storeId}&source=1`,
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNewGoods",
            });
        }
    }
});