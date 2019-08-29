// 图文组件
// const beh = require("../behavior/my-behavior.js")

import {myBeh} from "../behavior/my-behavior.js"

Component({
  // behavior: [beh], // 证明它可以引入多个行为

  behaviors: [myBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    // mainTitle: String,
    // subHead: String,
    // imgSrc: String
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

  }
})
