// pages/articleDetail/articleDetail.js

var request = require('../../utils/request.js');
var audio = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail: {},
    danmuList: [
      {
        text: "广开最帅",
        color: "#51c332",
        time: 12
      },
    ],

    videoCoverHidden: true,

    playing: false,
    audioCurTime: 0,
    progressPercent: 0,
    progressCircleLeft: 0,
    progressWidth: 520,
    
    audioCircleOrigionX: 0,
    getAudioOriginFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    // console.log(11);
    this.getData(options.id);
    
    // var audio = wx.createInnerAudioContext();
    // audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    // audio.autoplay = true;
    // // 这个接口是不能让我们显示出来那个面板的
    // audio.paused = true;  

    
  },

  // 我第一次进入这个页面就是读书的页面 正常是普通编译 普通编译进入到这个页面当中 
  //        但是如果说如果我们想让页面第一次就显示在这里而且还能够有值的话
  //     它的驱动参数就是你上一个页面传进来的

  getData: function(id) {
    var that = this;
    request({
      url: '/getArticleDetail/' + id,
      success: function(res) { // 填充数据
        // console.log(res);
        that.setData({
          articleDetail: res
        })
      }
    })
  },

  // 点击视频
  onVideoTap: function() {
    // console.log(11);
    // 隐藏可以用wx:if   hidden也可以实现一个东西的隐藏
    //     它们都可以控制属性的显示和不显示的 
    //     区别是wx:if为false的情况下 它是整个把元素移除出去的 
    //     整个东西没有的 

    this.setData({
      videoCoverHidden: false // 隐藏之后让视频直接播放
    })

    var myVideo = wx.createVideoContext('myVideo');
    myVideo.play();
  },


  

  // 音乐播放
  audioPlay: function() {
    audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    audio.title = '呵呵';
    this.listenAudioPlay();
    this.updateAudioData();
  },

  // 点击音乐播放器
  onAudioPlayTap: function() {
    // var audio = wx.getBackgroundAudioManager(); // 一直用这个来写播放
    // audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    // audio.title = "呵呵"; // 必填
    // this.setData({
    //   playing: !this.data.playing
    // })

    
    // playing -> true  -> pause
    //            false -> play
    // var audio = wx.getBackgroundAudioManager();
    var playing = this.data.playing;
    // var that = this;
    
    if(playing) {
      audio.pause();
    }else {
      // audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
      // // 只要有这个src就能自动播放了 
      // audio.title = '呵呵';
      this.audioPlay();
    }
    this.setData({
      playing: !playing
    })

    // 音乐暂停的时候要把音乐图标变成false 
    //     停止的时候也要变成一个false
    //     音乐自然停止也要变成一个false

    // 监听
    // audio.onPause(function() {
    //   that.setData({
    //     playing: false
    //   })
    // })
    // audio.onStop(function() {
    //   that.setData({
    //     playing: false
    //   })
    // })
    // audio.onEnded(function() {
    //   that.setData({
    //     playing: false
    //   })
    // })
    // audio.onPlay(function() {
    //   that.setData({
    //     playing: true
    //   })
    // })
    
    // this.listenAudioPlay();
    // this.updateAudioData();

  },

  // 监听事件
  listenAudioPlay: function() {
    var that = this;
    // var audio = wx.getBackgroundAudioManager();

    audio.onPause(function() {
      that.setData({
        playing: false
      })
    })
    
    audio.onStop(function() {
      that.setData({
        playing: false
      })
    })
    
    audio.onEnded(function() {
      that.setData({
        playing: false
      })
    })
    
    audio.onPlay(function() {
      that.setData({
        playing: true
      })
    })

   

  },

  // 更新数据
  updateAudioData: function() {
    var that = this;
    var audioDuration = this.data.articleDetail.audio.duration;

    audio.onTimeUpdate(function() {
      // console.log(audio.currentTime);
      // 流程
      //    1. 总时长
      //    2. 已播放时间
      //    3. 通过事件 ==》 更新
      
      var audioCurTime =  audio.currentTime.toFixed(); // that.data.audioCurTime;
      var percent = audioCurTime / audioDuration;
      var progressPercent = percent * 100; // 为什么*100
      var progressCircleLeft = percent * that.data.progressWidth;  
      console.log(progressPercent);

      that.setData({
        audioCurTime: audioCurTime, // audio.currentTime.toFixed(), // 不要小数点
        progressPercent: progressPercent,
        progressCircleLeft: progressCircleLeft
      })
      // 要用到的值最好都写到data对象里面

      // 百分比 = curTime / allTime

      // left = percent * width/520
      // 把用到的数据写到data当中
    });
  },

  onAudioCircleStart: function(e) {
    // console.log(e.touches[0].pageX); // 这个有时候是不准确的
    var audioCircleOrigionX = e.touches[0].pageX * this.getPhoneRadio();
    // console.log(audioCircleOrigionX); // 换不同的机型这两个值是不一样 说明这个值不是rpx 是px这个值
    // px --> rpx 怎么转换呢
    // ip6 1px = 2rpx  375px 750rpx 
    // oppo 400px 750rpx  750 / 400  1px = 750 / 400 rpx  
    // 获取手机的宽度就能获取一定的比例了 px --> rpx  那我们怎么获取手机的宽度呢
    //     是不是把所有手机的机型都录入到我们的js文件当中 每次用的时候都去js当中找
    // 系统信息 
    // 通过这个宽度获取比例    

    if(!this.data.getAudioOriginFlag) {
      this.setData({
        audioCircleOrigionX: audioCircleOrigionX,
        getAudioOriginFlag: true
      })
    }
    
  },

  onAudioCircleMove: function(e) {
    // console.log(e);
    // console.log(e.touches[0].pageX);
    var audioCircleMoveX = e.touches[0].pageX * this.getPhoneRadio();
    var audioCircleOrigionX = this.data.audioCircleOrigionX;
    var progressCircleLeft = audioCircleMoveX - audioCircleOrigionX;

    //我想让这个小球在这个范围内移动
    if(progressCircleLeft <= 0) {
      progressCircleLeft = 0;
    }else if(progressCircleLeft >= this.data.progressWidth){
      progressCircleLeft = this.data.progressWidth;
    }

    var progressPercent = progressCircleLeft / this.data.progressWidth * 100;
    var audioCurTime = (progressCircleLeft / this.data.progressWidth * this.data.articleDetail.audio.duration).toFixed()

    this.audioPlay();
    // audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    // audio.title = '呵呵';
    audio.seek(Number(audioCurTime));
    // this.listenAudioPlay();
    // this.updateAudioData();

    // 只要把值更新就可以得到小球的left值了
    this.setData({
      progressCircleLeft: progressCircleLeft,
      progressPercent: progressPercent,
      audioCurTime: audioCurTime
    })
    // 你会发现它运动的咋和我们设置的不一样呢
    
    
  },

  getPhoneRadio: function() {
    var radio = 0;
    wx.getSystemInfo({  // px --> rpx 让所有的机型自适应
      success: function(res) {
        var width = res.screenWidth;
        radio = 75 / width; // ??
      }
    })
    return radio;
  },



 
})