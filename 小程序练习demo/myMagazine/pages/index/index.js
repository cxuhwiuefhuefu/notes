//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    likeList: [true, false, true, false, true, false, true, false]
  },
  
  onLoad: function () {
    
    var that = this;
    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo",
      success: function(res) {
        var data = res.data;
        if(data.code === 0) {
          that.setData({
            recommendInfo: data.data
          })
        }  
      }
    })

    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList",
      success: function(res) {
        var data = res.data;
        if(data.code === 0) {
          // console.log(data.data.length);
          that.setData({
            markTypeList: data.data
          })
        }
      }
    })

    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList",
      success: function(res) {
        var data = res.data;
        if(data.code === 0) {
          that.setData({
            homeArticleList: data.data
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

  // 点击显示更多操作
  tapMore: function(e) {
    var type = e.currentTarget.dataset.type;

    wx.showActionSheet({
      itemList: ['内容过期了', '内容和'+ type +'不相干', '不再显示来自'+ type +'的内容'],
      itemColor: '#FF4040',
      success: function(res) {
        console.log(res.tapIndex);
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

  // 监听页面卸载
  // onUnload: function() {

  //   console.log('退出了');
  //   // 退出页面的时候缓存 再次进来获得缓存数据
  //   wx.setStorageSync({
  //     key: "likeList",
  //     data: likeList
  //   })
  // },


  // 跳转页面
  goTypePage: function(e) {
    var typeId = e.currentTarget.dataset.typeid;

    wx.navigateTo({
      url: "../type/type?typeId=" + typeId
    })
  }




})
