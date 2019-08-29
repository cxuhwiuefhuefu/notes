// components/nav/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    magazineTypeArr: ["轻芒", "兴趣", "物质", "世界", "新事", "灵魂"],
    magazineIndex: 0, // 初始选中的 
    activeId: 'magazine0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const lastIndex = this.data.magazineIndex;
      const index = e.currentTarget.dataset.index;

      this.setData({
        magazineIndex: index,
        activeId: `magazine${index === 0 ? 0 : index - 1}` // 滚动操作
      })

      if(lastIndex == index) {
        return;
      }
      this.triggerEvent("nav", {
        index
      }, {}) // 自定义事件的名称 对象在你触发事件的时候传的一些值(是你从组件内部给页面传的一些值)
    }
  }
})
