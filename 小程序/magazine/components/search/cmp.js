// components/search/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String
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
    // 搜索方法 提交事件
    onSearch() {
      // const value = this.data.value;
      // const value = e.detail.value;  // 直接跳转读书


      // if(value !== '读书') {
      //   WebGLTexture.showToast({
      //     title: "只能搜索 读书 哦",
      //     icon: 'none'
      //   })
      //   return;
      // }

      wx.navigateTo({
        url: '/pages/search/search'
      })
    },

    // 失焦事件
    onBlur(e) {
      const value = e.detail.value;

      this.setDate({
        value
      })
    }
  }
})


// 你回车是拿到的是上次设置value的值 我在输入框直接点击回车它能够进入到搜索页面 如何知道输入框写的是文字吗
//     onSearch是输入框的提交事件触发的时候会执行这个函数 
