Component({
    externalClasses: ['my-class'],
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String,
            value: '',
        },
        moreText: {
            type: String,
            value: '',
        },
        enableFooterSlot: {
            type: Boolean,
            value: false,
        }
    },
    methods: {
        onTapMore() {
            this.triggerEvent('MoreEvent')
        }
    }
})