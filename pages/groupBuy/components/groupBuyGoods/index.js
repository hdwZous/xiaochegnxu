Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
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
        // 去拼团
        goToDetail(e) {
            let data = e.currentTarget.dataset;
            let orgCode = data.orgcode || '';
            let skuId = data.skuid || '';
            let storeId = data.storeid || '';
            let promotionId = data.promotionid || '';
            let { recommendObj = {} } = this.data;
            // 跳转至拼团详情页
            wx.navigateTo({
              url:
                "/pages/groupBuy/groupBuyDetail/index?orgCode=" +
                orgCode +
                "&skuId=" +
                skuId +
                "&storeId=" +
                storeId +
                "&promotionId=" +
                promotionId,
              preObj: recommendObj,
              buried_position: "groupBuy-groupBuyGoods",
            });
            try {
                let deliverType = data.deliverytype||"";
                let groupType = data.groupmode||"";
                // 埋点
                this.triggerEvent('onLog', {
                    deliver_type: deliverType,
                    group_type: groupType,
                    store_id: storeId,
                    sku_id: skuId,
                    orgcode: orgCode
                })
            }catch (e) {
                //ignore
            }

        },
    }
});
