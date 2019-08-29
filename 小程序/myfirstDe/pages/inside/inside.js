Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  ceshi: function() {
    // console.log(111);
    wx.navigateBack({
      dalta: 2  // 为什么它没有执行 因为它是返回前面两个页面 A-》B B-》新页面
                //     填2的话可以从新页面跳转到A页面
                // navigateTo和redirectTo的区别 除了能回去的区别
                //     还有一个区别就是小程序自己来设定的 
                //     如果你使用navigateTo来跳转的话 它是能保留之前的页面的
                //     小程序只允许你保留10个这样的页面存放 只能跳10次
                //     这是小程序为了保证它的性能规定的  
    });
  },
  parentTap: function() {
    console.log('parent');
  },
  childTap: function() {
    console.log('child');
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    console.log(options.a);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})