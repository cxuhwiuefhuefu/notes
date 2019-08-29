// components/articleList/cmp.js
import {IndexModel} from '../../models/index.js'
const indexModel = new IndexModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // articleList: Array

    articleList: {
      type: Array,
      value: [],
      observer() {
        // console.log('改变');
      }
    },

    more: {
      type: String,
      value: '',
      // observer(newVal) { // 在这里面可以进行一次新的数据加载
      //   console.log(newVal);
      //   console.log('改变');
      // }
      observer: 'loadMore'
    },

    // magazineId: Number

    magazineId: {
      type: Number,
      value: 0,
      observer: 'hasMoreData'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    noMoreData: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      // 如果正在加载 就让它return不往下加载了 
      // 我们的数据成功的请求回来之后是不是让我们这个loading变回没有在加载的状况
      if(this._isLock() || this.data.noMoreData) {
        return;
      }

      // this.setData({
      //   loading: true
      // })
      this._loadLock();

      const magazineId = this.data.magazineId;
      const start = this.data.articleList.length;

      // console.log('改变');
      indexModel.getArticleList(magazineId, start).then(res => {
        // const combineList = this.data.articleList.concat(res);
        // // console.log(res);

        // this.setData({
        //   articleList: combineList,
          
        //   // loading: false
        // })

        this._setMoreData(res);

        this._unLoadLoack();
      })
    },

    hasMoreData() {
      this.setData({
        noMoreData: false
      })
    },

    // 判断是不是锁
    _isLock() {
      return this.data.loading
    },

    // 加锁
    _loadLock() {
      this.setData({
        loading: true
      })
    },

    // 解锁
    _unLoadLoack() {
      this.setData({
        loading: false
      })
    },

    // 设置数据
    _setMoreData(list) {
      const combineList = this.data.articleList.concat(list);
      // console.log(res);

      if(combineList.length === this.data.articleList.length) {
        this.setData({
          noMoreData: true
        })
        return;
      }

      this.setData({
        articleList: combineList,
        
        // loading: false
      })
    }

  }
})
