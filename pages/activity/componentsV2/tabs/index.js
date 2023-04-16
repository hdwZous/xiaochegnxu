let stack = []
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'tabs'
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabInfo: {
      type: Object,
      value: {}
    },
    floorConfig: {
      type: Object,
      value: {}
    },
    tabFixd: {
      type: Boolean,
      value: false
    },
    relativeIds: {
      type: String,
      value: ''
    },
    relativeDirection: {
      type: Number,
      value: 0
    },
    traceId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fillUp: true,
    ainmation: true,
    popup: false,
    activeIds: 0,
    activeTab: 0,
    currentView: 0,
    yetTop: false,
    // id关系表
    relation: {},
    obserFalse: false
  },

  observers: {
    'tabInfo': function (news) {
      if (news && news.length) {
        let that = this
        let query = wx.createSelectorQuery().in(this)
        query.selectAll('.tabs-box,.tabs-items').boundingClientRect(function (res) {
          let width = res[0].width, left = res[0].left, fillUp = false;
          res.slice(1).map(res => {
            if (!fillUp) {
              let distance = res.left + res.width - left
              if (distance > width) {
                fillUp = true
              }
            }
          })
          that.setData({
            fillUp,
          })
        }).exec()
        let relation = {}
        news.map((item, index) => relation[item.index] = index)
        this.setData({
          relation,
          activeTab: news[0].index,
          currentView: news[0].index
        })
      }
    },
    'activeIds': function (_activeIds) {
      if (_activeIds >= 0) {
        if (stack.length == 0) {
          this.ainmation(_activeIds)
          stack.push(_activeIds)
        } else {
          stack.push(_activeIds)
        }
      }
    },
    'relativeIds': function (_relativeIds) {
      if (_relativeIds && !this.data.obserFalse) {
        let relation = this.data.relation
        let relativeDirection = this.data.relativeDirection
        let activeTab = this.data.activeTab
        let activeIds = relation[activeTab]
        /** 存在三种情况
         *  1.relativeIds 恰好能在关系表中找到
         *  2.relativeIds 大于当前选中的index
         *  3.relativeIds 小于当前选中的index
         */
        if (relativeDirection) {
          if (relation[_relativeIds] !== undefined) {
            if (Number(_relativeIds) != Number(activeTab)) {
              this.setData({ activeTab: _relativeIds, activeIds: relation[_relativeIds] })
            }
          } else if (Number(_relativeIds) > Number(activeTab)) {
            let nextIds = activeIds + 1
            let nextTab = Object.keys(relation).find(item => { if (relation[item] == nextIds) { return item } })
            let intoIds, intoTab
            // 滑动太快时，中间部分相交relativeIds会监听不到，出现17 22 33 relativeIds 44的情况，此时应该滑动到33
            while (Number(nextTab) < Number(_relativeIds)) {
              nextIds += 1
              nextTab = Object.keys(relation).find(item => { if (relation[item] == nextIds) { return item } })
            }
            intoIds = nextIds - 1
            intoTab = Object.keys(relation).find(item => { if (relation[item] == intoIds) { return item } })
            intoTab != activeTab && this.setData({ activeTab: intoTab, activeIds: intoIds })
          } else if (Number(_relativeIds) < Number(activeTab)) {
            // 几乎只有初始状态下,activeTab为第一个，开始滑动时最开始的几个楼层可能比activeTab小，其他时候正面滑动几乎不会碰到_relativeIds > activeTab的情况
            let preIds = activeIds - 1
            if (preIds >= 0) {
              let preTab = Object.keys(relation).find(item => { if (relation[item] == preIds) { return item } })
              this.setData({ activeTab: preTab, activeIds: preIds })
            }
          }
        } else {
          if (activeIds) {
            let preIds = activeIds - 1
            let preTab = Object.keys(relation).find(item => { if (relation[item] == preIds) { return item } })
            if (Number(_relativeIds) > Number(activeTab)) {
              // 倒滑时，假如传入的_relativeIds大于当前选中tab，说明目前滑块还属于当前tab
            } else if (relation[_relativeIds] !== undefined) {
              preIds = activeIds - 1
              preTab = Object.keys(relation).find(item => { if (relation[item] == preIds) { return item } })
              this.setData({ activeTab: preTab, activeIds: preIds })
            } else if (Number(_relativeIds) < Number(activeTab)) {
              preIds = activeIds - 1
              preTab = Object.keys(relation).find(item => { if (relation[item] == preIds) { return item } })
              while (Number(preTab) > Number(_relativeIds)) {
                preIds -= 1
                preTab = Object.keys(relation).find(item => { if (relation[item] == preIds) { return item } })
              }
              this.setData({ activeTab: preTab, activeIds: preIds })
            }
          }
        }
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPop() {
      this.setData({
        popup: true
      })
      this.epSection()
      this.triggerEvent('modifyZ', { z_index: 20 })
    },
    hidePop() {
      this.setData({
        popup: false
      })
      this.triggerEvent('modifyZ', { z_index: 10 })
    },
    clickTab(e) {
      let from = e.currentTarget.dataset.from
      let activeIds = e.currentTarget.dataset.ids
      let activeTab = e.currentTarget.dataset.active
      let name = e.currentTarget.dataset.name
      let userAction = e.currentTarget.dataset.userAction
      let selector = '.focus-container >>> #f' + activeTab
      this.setData({ activeTab, activeIds, obserFalse: true })
      wx.pageScrollTo({
        selector: selector,
        duration: 300
      })
      setTimeout(() => {
        this.setData({ obserFalse: false })
      }, 500)
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "selectTab",
        click_par: {
          userAction: userAction || "",
          isLayer: 0,
          tabName: name,
          state: ''
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      });
      if (from === 'pop') {
        this.hidePop()
      }
    },
    ainmation(_activeIds) {
      var len = this.data.tabInfo.length;
      if (len === 0) return;
      var current = _activeIds - 1;
      if (current < 0) current = 0;
      if (current > len - 1) current = len - 1;
      this.setData({
        currentView: this.data.tabInfo[current].index
      }, () => {
        let index = stack.findIndex(item => {
          return item == _activeIds
        })
        stack.splice(0, index + 1)
        if (stack.length) this.ainmation(stack[stack.length - 1])
      });
    }
  }
});
