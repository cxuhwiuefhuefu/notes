// 大图组件
import {myBeh} from "../behavior/my-behavior.js"

Component({

  behaviors: [myBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    // imgSrc: {
    //   type: String, // 数据类型
    //   value: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg", // 初始值
    //   observer: function(newVal, oldVal, changePath) { // 什么时候会触发 当imgSrc变的时候会触发
    //     console.log(newVal);
    //     console.log(oldVal);
    //     console.log(changePath);
    //   }
    // },
    // imgSrc: String, // 它会找它的初始值 比如它是String类型 你没给它规定一个value 
    
    // 它的默认值就是空字符串 如果它是Number类型的 它的默认值是0
    // 如果它是布尔值 它的默认值就是false 如果你简写的话 它会把默认值拿过来

    // mainTitle: {
    //   type: String,
    //   value: "编辑那位地我的hi降低oh取缔哦呜的hi七五和地区我打击地区文本的季节沃尔欧家栋",
    //   observer: function() {}
    // }
    // mainTitle: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgSrc: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
