Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name: {
            type: String,
            value: "",
            observer: function (newVal) {
                this.setData({
                    name: newVal
                })
            }
        },
        code: {
            type: String,
            value: "",
            observer: function (newVal) {
                this.setData({
                    code: newVal
                })
            }
        },
        isFre: {
            type: Boolean,
            value: false,
            observer: function (newVal) {
                this.setData({
                    isFre: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        name: "",
        code: "",
        isFre: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseCity(e) {
            let city = e.currentTarget.dataset.city
            let pages = getCurrentPages();
            if (pages.length >= 2) {
                let prevPage = pages[pages.length - 2];
                if (prevPage && prevPage.route === "pages/address/search/index") {
                    prevPage.setData({// 这里是需要传递的参数值
                        city: city
                    })
                    console.log(this.data.isFre);

                    if (this.data.isFre) {
                        this.triggerEvent('clickUsedCity')
                    } else {
                        this.triggerEvent('clickCity')
                    }

                    wx.navigateBack();
                } else if (prevPage && prevPage.route === "pages/address/createOrEdit/index") {
                    let addressEditInfo = wx.getStorageSync("address_edit_info") || {};
                    addressEditInfo.cityName = city
                    addressEditInfo.poi = ''
                    wx.setStorageSync("address_edit_info", addressEditInfo)

                    wx.navigateBack()
                }
            }
        }
    }
})