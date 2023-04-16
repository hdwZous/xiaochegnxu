// 事件类型
let TYPE = {
    // 点击按钮
    groupClickBtn: 'groupClickBtn',
    // 点击文案按钮
    groupClickTxtBtn: 'groupClickTxtBtn',
    // 倒计时结束
    timeEnd: "timeEnd"
};

let timer = null;

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        time: {
            type: Number,
            value: 0,
            observer: function(newVal) {
                clearInterval(timer);
                if (newVal) {
                    this.countDown(newVal)
                } else {
                    this.setData({
                        timeStr: 0
                    })
                }
            }
        },
        group: {
            type: Array,
            value: [],
            observer: function(newVal) {
                let self = this;
                let showGroup = false;
                if (newVal.length > 0) {
                    newVal.forEach(item => {
                        if (item) {
                            showGroup = true
                        }
                    })
                }
                self.setData({
                    showGroup: showGroup
                })
            }
        },
        btnTxt: {
            type: String,
            value: '',
            observer: function(newVal) {

            }
        },
        tips: {
            type: String,
            value: ''
        },
        btnType: {
            type: String,
            value: '',
            observer: function(newVal) {

            }
        },
        txtBtn: {
            type: String,
            value: ''
        },
        failReason: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        timeStr: '',
        showGroup: true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 倒计时
        countDown(times) {
            let self = this;
            times = Math.floor(times / 1000);
            timer = setInterval(function() {
                let day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0;
                if (times > 0) {
                    hour = Math.floor(times / (60 * 60));
                    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;

                let timeStr = hour + " : " + minute + " : " + second;
                self.setData({
                    timeStr: timeStr
                });
                times--;
                if (times <= 0) {
                    clearInterval(timer);
                    self.countDownEnd()
                }
            }, 1000);

        },
        // 点击按钮
        clickBtn(e) {
            this.triggerEvent('pageEvent', {
                type: TYPE.groupClickBtn,
                data: {
                    event: e
                }
            })
        },
        // 点击文案按钮
        clickTxtBtn() {
            this.triggerEvent('pageEvent', {
                type: TYPE.groupClickTxtBtn,
                data: {}
            })
        },
        // 倒计时结束
        countDownEnd() {
            // 倒计时结束
            this.triggerEvent('pageEvent', {
                type: TYPE.timeEnd,
                data: {}
            })
        }
    }
});