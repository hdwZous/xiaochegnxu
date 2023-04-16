const origin_request = wx.request
export const RequestQueue = {
    MAX_REQUEST: 10,
    MAX_API: 6,
    MAX_BI: 2,
    MAX_OTHER: 2,
    //超时设置
    TIMEOUT: 10 * 1000,

    //api请求队列
    apiQueue: [],
    //埋点请求队列
    biQueue: [],
    //埋点请求队列
    otherQueue: [],

    //请求中的api
    apiPendingQueue: [],
    //请求中的bi
    biPendingQueue: [],
    //请求中的api
    otherPendingQueue: [],

    /**
     *
     *
     /v1/logging  107684932 daojia bi
     /client 183145716 daojia
     /api/report  51201939 jd
     /api/v2/report   14949966 jd
     /log/m 3495144 jd
     /cgi-bin/login/phone_number_login 564415 jd登录
     /open/sdk 4638502
     /stone/1/ 1326148
     /wxlogin/getOpenld 1217875
     *
     * @param {*} options
     * @returns
     */
    request(options) {
        let url = options.url || ""
        if (url.includes('/client')|| url.includes('/clientV2')|| url.includes('/cgi-bin/login/phone_number_login') || url.includes('/log/m') || url.includes('/wxlogin/getOpenld')) {
            // console.error('业务', options.url)
            this.apiQueue.push(options)
            // if (this.apiQueue.length > this.MAX_API) {
            //     console.error('超出线程池')
            //     this.apiQueue.sort((a, b) => {
            //         return a.primary - b.primary
            //     })
            // }
            return this.runApi()
        } else if (url.includes('/v1/logging')) {
            // console.error('埋点', options.url)
            this.biQueue.push(options)
            return this.runBI()
        } else {
            // console.log('其他', options.url)
            this.otherQueue.push(options)
            return this.runOther()
        }
    },

    runApi() {
        if (!this.apiQueue.length) return
        while (this.apiPendingQueue.length < this.MAX_API) {
            const options = this.apiQueue.shift()
            let successFn = options.success
            let failFn = options.fail
            options.success = (...args) => {
                this.apiPendingQueue = this.apiPendingQueue.filter(item => item !== options)
                this.runApi()
                successFn && successFn.apply(options, args)
            }
            options.fail = (...args) => {
                this.apiPendingQueue = this.apiPendingQueue.filter(item => item !== options)
                this.runApi()
                failFn && failFn.apply(options, args)
            }

            this.apiPendingQueue.push(options)

            return origin_request({ timeout: this.TIMEOUT, ...options })
        }
    },
    runBI() {
        if (!this.biQueue.length) return
        while (this.biPendingQueue.length < this.MAX_BI) {
            const options = this.biQueue.shift()
            let successFn = options.success
            let failFn = options.fail
            options.success = (...args) => {
                this.biPendingQueue = this.biPendingQueue.filter(item => item !== options)
                this.runBI()
                successFn && successFn.apply(options, args)
            }
            options.fail = (...args) => {
                console.log('fail', args)
                this.biPendingQueue = this.biPendingQueue.filter(item => item !== options)
                this.runBI()
                failFn && failFn.apply(options, args)
            }
            this.biPendingQueue.push(options)
            return origin_request({  ...options, timeout: this.TIMEOUT})
            // let rqTask = origin_request({ timeout: this.TIMEOUT, ...options })
            // let st = setTimeout(() => {
            //     console.log("abort")
            //     rqTask.abort();
            //     clearTimeout(st)
            //   }, this.TIMEOUT);
            // return rqTask
        }
    },
    runOther() {
        if (!this.otherQueue.length) return
        while (this.otherPendingQueue.length < this.MAX_OTHER) {
            const options = this.otherQueue.shift()
            let successFn = options.success
            let failFn = options.fail
            options.success = (...args) => {
                this.otherPendingQueue = this.otherPendingQueue.filter(item => item !== options)
                this.runOther()
                successFn && successFn.apply(options, args)
            }
            options.fail = (...args) => {
                this.otherPendingQueue = this.otherPendingQueue.filter(item => item !== options)
                this.runOther()
                failFn && failFn.apply(options, args)
            }
            this.otherPendingQueue.push(options)
            return origin_request({ timeout: this.TIMEOUT, ...options })
        }
    }

}
Object.defineProperty(wx, 'request', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: args => {
        return RequestQueue.request(args)
    }
});



