// pages/articleDetails/articleDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pause: true,
    startTime: '00:00',
    left: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;

    

    wx.request({
      url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleDetail/" + id,
      success: function(res) {
        that.setData({
          articleDetails: res.data.data
        })

        // 设置总长时间
        var duration =res.data.data.audio.duration;
        var minutes = Math.floor(duration / 60);
        var seconds = duration % 60;
        that.setData({
          endTime: minutes + ':' + seconds
        })
      }
    })

  },


  // 点击播放视频
  tapPlayVideo: function() {
    this.setData({
      pause: false
    })

    
    var video = wx.createVideoContext('video');
    video.play();

  },


  // 点击播放背景音乐
  tapPlayAudio: function(e) { 


    // 点击播放
    //     1. 图片切换 2.点击播放 3. 监听播放事件/暂停事件
    // 再次播放 
    //     1. 图片切换 2.暂停播放 3.  进度条停止
    

    
    const audio = wx.getBackgroundAudioManager();
   
     // 监听按钮播放或暂停事件
     if(e.target.dataset.state === 'false') {
      console.log('播放11');
      audio.play();

      // 播放音乐
      audio.src = this.data.articleDetails.audio.src;
      audio.title = this.data.articleDetails.audio.singer + '的' + this.data.articleDetails.audio.title;
      
    }else if(e.target.dataset.state === 'true') {
      console.log('暂停11');
      audio.pause();
    }
   
     
    // 监听背景音乐播放中的事件
    var percent;
    var duration = this.data.articleDetails.audio.duration;
    var that = this;
    audio.onTimeUpdate(function(e) {
      
      percent = audio.currentTime / duration;
      console.log(percent);
      // console.log((percent * 100).toFixed(0) );
      // 设置背景音乐的进度 
      that.setData({
        progress: percent * 100
      })
      // 设置播放的多长时间  分钟:秒
      var minutes = Math.floor(audio.currentTime.toFixed(0) / 60);
      var seconds = audio.currentTime.toFixed(0) % 60;
      that.setData({
        startTime: minutes + ":" + seconds
      })

      // 小球运动
      that.setData({
        left: (percent * 500 - 10).toFixed(0) + 'rpx'
      })
    })

    // 监听背景音乐暂停的事件
    audio.onPause(function() {
      console.log('暂停了');
      that.setData({
        pause: true
      })
    })

    // 监听背景音乐播放事件
    audio.onPlay(function() {
      console.log('播放中');
      that.setData({
        pause: false
      })
    })

    // 监听背景音乐播放结束
    audio.onEnded(function() {
      console.log('播放结束');

      this.setData({
        pause: true
      })
    })
    
  },

 
})



// wx:if与hidden的区别
// wx:if是移除 hidden是隐藏而已