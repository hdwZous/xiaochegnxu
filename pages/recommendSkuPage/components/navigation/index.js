import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: '.channel_comp_ep',
    componentName: 'recommendskupage_navigation'
  },
	/**
	 * 组件的属性列表
	 */
	properties: {
		titlePicUrl: {
			type: String,
			value: ''
		},
		title: {
			type: String,
			value: ''
		},
		tabList: {
			type: Array,
			value: [],
      observer: function (val) {
        if (val.length > 0 && this.data.flag) {
          this.epSection && this.epSection()
		  this.setData({
			flag: false
		  })
        }
      }
		},
		activeTab: {
			type: String,
			value: ''
		},
		statusBarHeight: {
			type: Number,
			value: 88,
		},
		recommendObj: {
			type:Object,
			value: {}
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
		popup: false,
		activeTab: 0,
		statusBarHeight: 88,
		flag: true
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		goBack() {
			wx.navigateBack({
				delta: 1
			});
		},
		showPop() {
			this.setData({
				popup: true
			})
      		this.epSection && this.epSection()
			this.triggerEvent('reportSortnameTab', {})
		},
		hidePop() {
			this.setData({
				popup: false
			})
		},
		touchHandler() {
			return false
		},
		clickTab(e) {
			// 埋点
			clickBuriedV2_({
			  create_time: new Date(),
			  click_id: "tab_item",
			  click_par: {

			  },
			  pageId: this.data.recommendObj.pageIdFirstPage || "",
			  currentPageName: this.data.recommendObj.currentPageName,
			  prePageName: this.data.recommendObj.prePageName
			});

			let from = e.currentTarget.dataset.from
			let activeTab = e.currentTarget.dataset.active
			this.setData({ activeTab })
			if (from === 'pop') {
				this.hidePop()
			}
			this.triggerEvent('querySku', {
				activeTab
			})
		}
	},
});