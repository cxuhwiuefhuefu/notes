// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeList: [true, false, true]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;

    var that = this;
    
    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/" + typeId,
      success: function(res) {
        var data = res.data;
        if(data.code === 0) {
          that.setData({
            articleTypeTitle: data.data
          })
        }  
      }
    })

    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/" + typeId,
      success: function(res) {
        var data = res.data;
        if(data.code === 0) {
          that.setData({
            articleTypeList: data.data
          })
        }  
      }
    })

    // 拿到缓存数据
    wx.getStorage({
      key: "likeList",
      success(res) {
        // console.log(res.data);
        that.setData({
          likeList: res.data
        })
      }
    })
    
  },

  // 判断喜欢或者不喜欢
  // 下次刷新/页面退出 数据还在 用storage缓存一下
  tapLike: function(e) {
    var index = e.currentTarget.dataset.index;
    var likeList = this.data.likeList;
    
    var like = likeList[index];
    likeList[index] = !like;
    this.setData({
      likeList: likeList
    })

    wx.setStorage({
      key: "likeList",
      data: likeList
    })
  },


  // 跳转文章详情页
  goArticleDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);

    wx.navigateTo({
      url: "../articleDetails/articleDetails?id=" + id 
    })
  }


})