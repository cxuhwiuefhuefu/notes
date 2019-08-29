
// obj ={
//     url: '',
//     success: function(res) {},
//     // error: function() {}
// }

var baseUrl = "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine";

function request(params) {
    wx.request({
        url: baseUrl + params.url,
        success: function(res) {
            if(res.data.code == 0) {
                params.success(res.data.data);
            }else {
                // params.error();
                // wx.showToast({
                //     title: "请求错误",
                //     icon: "none"
                // })
                showError();
            }
        },
        fail: function() {
            // params.error();
            // wx.showToast({
            //     title: "请求错误",
            //     icon: "none"
            // })
            showError();
        }
    })   
}

// 请求失败
function showError() {
    wx.showToast({
        title: "请求错误",
        icon: "none"
    })
}


// 怎么导出呢
module.exports = request;