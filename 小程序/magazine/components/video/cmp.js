// components/video/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    poster: String,
    duration: String,
    mainTitle: String,

    videoId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPoster: true
  },

  // 这样没办法让这个视频播放
  // created() {
  //   this._getVideoInfo();
  // },

  // 如果要涉及到你要取什么data值 或者设置data的值还是要放到attached里面
  // attached() {
  //   this._getVideoInfo();
  // },

  lifetimes: {
    attached() {
      this._getVideoInfo();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onPlay() {
      // 1. 切换poster的值
      // 2. 让视频播放

      // this.setData({
      //   showPoster: !this.data.showPoster
      // })
      this._toggleVideoPoster();

      // const id = this.properties.videoId;
      // const video =  wx.createVideoContext (id, this);
      // video.play();
      // this._playVideo();
      this.video.play();
    },

    onMaskTap() {
      // 1. 切换poster
      // 2. 是让这个视频停止

      // this.setData({
      //   showPoster: !this.data.showPoster
      // })
      this._toggleVideoPoster();

      // const id = this.properties.videoId;
      // const video = wx.createVideoContext(id, this);
      // video.seek(0); // 为了防止某些奇葩手机上是接着播放的 所以我们让它重头开始播放
      // video.stop();
      this._stopVideo();
    },

    onVideoEnd() {
      this._toggleVideoPoster();
    },

    // 切换poster的值
    _toggleVideoPoster() { // 如果是私有方法在前面加上_ 表示私有的
      this.setData({
        showPoster: !this.data.showPoster
      })
    },

    _getVideoInfo() {
      const id = this.properties.videoId;
      // const video =  wx.createVideoContext (id, this);
      this.video = wx.createVideoContext (id, this);
    },

    // 播放视频
    _playVideo() {
      // const id = this.properties.videoId;
      // const video =  wx.createVideoContext (id, this);
      // video.play();

      // this.video.play();
    },

    // 暂停视频
    _stopVideo() {
      // const id = this.properties.videoId;
      // const video = wx.createVideoContext(id, this);
      // video.seek(0); // 为了防止某些奇葩手机上是接着播放的 所以我们让它重头开始播放
      // video.stop();
      this.video.seek(0);
      this.video.stop();
    }

  }
})
