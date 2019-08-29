



// var baseUrl = "https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine/getIndexArticleList/0/0";

// function request(params) {
//     if(!params.method) {
//         params.method = 'GET'
//     }
//     if(!params.data){
//         params.data = {}
//     }

//     wx.request({
//         url: baseUrl + params.url,
//         method: "",
//         data: "",
//         success: function(res) {
//             if(res.data.code == 0) {
//                 params.success(res.data.data);
//             }else {
//                 showError();
//             }
//         },
//         fail: function() {
//             showError();
//         }
//     })
// }


// function request(url, success, method='GET', data={}) { // 这样写一个参数是不太好的 我们一定要把默认传的值放到后面 然后把必须要传的值放在前面
  
//     // if(!params.method) {
//     //     params.method = 'GET'
//     // }
//     // if(!params.data){
//     //     params.data = {}
//     // }

//     wx.request({
//         url: baseUrl + url,
//         method: method,
//         data: data,
//         success: function(res) {
//             if(res.data.code == 0) {
//                 success(res.data.data);
//             }else {
//                 showError();
//             }
//         },
//         fail: function() {
//             showError();
//         }
//     })
// }

// function showError() {
//     wx.showToast({
//         title: "请求错误",
//         icon: "none"
//     })
// }





class Request { // 封装成一个类
    baseUrl = "https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine"
 
    getData({url, method='GET', data={}}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.baseUrl + url,
                method: method,
                data: data,
                success: res => {
                    if(res.data.code == 0) {
                        resolve(res.data.data);
                    }else {
                        this._showError();
                    }
                },
                fail: err => {
                    reject();
                    this._showError();
                }
            })
        })
    }

    _showError() {
        wx.showToast({
            title: "请求错误",
            icon: "none"
        })
    }
}

export {Request}




// 我现在对这个函数有意见的 是我认为这个函数不够完美 你现在这个只能够写我们这样的小程序
//     因为我的小程序不涉及到poster的请求 我们数据都是假 都是模拟的 只能get回来
//     你要post的话它接收不了这样的请求 也不能给你进行一次复杂的处理
//     如果是正常的流程的话 首先你这个method不应该只有一个get 还应该有poster等其他请求方式
//     其次的话你是post的请求的话 你是不是发送一些数据 那你是不是需要用到一个data
//     如果我只想让它是一个get请求的话 我不想让它显示这样的method
// param是我们自己的写对象 我们知道有什么 但别人接收你这个参数不知道你有什么
//     是个对象还是数组
// 我们现在的代码可以进行一些精简 假如我现在的代码想让别人立刻去看到的这个一个参数
//     我们需要把它所需的参数写在外面

// 用回调的形式来写这个的业务请求 用回调函数的方式它会造成什么样的不好地方 
//     首先它在代码风格上不好 它既然要用回调函数
//     它是不是每次用的时候要传一个回调函数给我们的这样函数才能给它调用 
//     第二个是我请求完第一个接口之后成功之后才去请求第二个接口
//     成功之后才去请求第三个接口 依次往下请求 请求了五个接口或者是10接口
//     那代码是什么样子的 还有就是在里面接收一个参数返回不出去了
//     它不能在异步请求里面return 其次它的代码风格太不好了 
//     用promise和aync await能实现很好的请求 aync await小程序是不支持的
//     主要用promise来解决
//  
// promise可以解决无限的回调 其次它不需要每一层都要传递一个回调函数 还有函数可以进行一次return
//     promise是一个对象 它不是一个具体意义上的函数 比如像onLoad就是具体意义上的函数
//     对象是可以保持一个状态 但是函数它是不可以的 
// 
// promise有三种状态 1.pending(进行中) 2. fulfilled(成功的状态) 3. rejected(失败的状态)
//     当promise变成成功或者失败的状态 promise的状态就不会改变了 promise能拿到异步调用的结果
//
//



