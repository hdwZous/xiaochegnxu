import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from "../../../../common/util/BI";
// 推荐商品组件
Component({
	lazyObj: {
		epSelector: '.channel_comp_ep',
		componentName: 'recommendskupage_skuitem'
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		skuInfo: {
			type: Object,
			value: {},
			observer:function (val) {
				
			}
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
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		goToDetail: function(e) {
			// 埋点
			clickBuriedV2_({
			  create_time: new Date(),
			  click_id: "sku_item",
			  click_par: {

			  },
			  pageId: this.data.recommendObj.pageIdFirstPage || "",
			  currentPageName: this.data.recommendObj.currentPageName,
			  prePageName: this.data.recommendObj.prePageName
			});
			const data = e.currentTarget.dataset;
			if (data.isadd) {
				data.params.isAddCart = 'true'
			}
			if(data.to) {
                djCmsJump({
					...data,
					preObj: this.data.recommendObj
				})
            }
		}
	}
})
