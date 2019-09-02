// 实现的效果: 标题来回移动 + 图片旋转 + 文字逐渐出现 + 爱心飘落的效果 + 音乐播放



    
// 图片旋转
function rotatePic() {
    
    var oLi = document.getElementsByTagName('li'),
        angle = 360 / oLi.length;

    $(oLi).each(function(index, elem) {
        elem.style.transform = 'rotate3d(0, 1, 0, '+ angle * index +'deg) translate3d(0, 0, 200px)'; /* 开启GPU加速 */
    })
    
}
rotatePic();


// CSS3动画性能优化
//    1. 尽可能多的利用硬件能力 如使用3D变形来开启GPU加速(3D变形会消耗更多的内存和功耗 应该确实有性能问题时才去使用它 兼在权衡)
//    2. 尽可能的让动画元素不在文档流 以减少重排  (position/absolute/fixed)
//    3. 优化DOM reflow




// 文字逐渐出现
function textAppear() {

    var str = '逍遥哥哥从小就没有亲人, 外表上装的很坚强,\
               其实, 内心比任何人都脆弱, 所有爱你的人都已经走了,\
               我不要留逍遥哥哥一个人在世上, 我要一直陪着你......',
        len = str.length,
        i = 0,
        span = document.getElementsByTagName('span')[0];
    
    var id = setInterval(function() {
      
        if(i < len) {
            span.innerHTML += str[i];
            i ++;
        }else {
            clearInterval(id);
        }
       
    }, 200);              
                     
}
textAppear();




// 爱心飘落  爱心形状不一 位置不一样 大小不一样 飘落的速度也不一样   
function fallLove() {

    var loveShape = $('<div><div>').html('❤').css({ 
        'position': 'absolute',
        'color': '#FFC0CB',
        'top': 0,
    });
    var dw = $(window).width(), // 窗口的宽度
        dh = $(window).height(), // 宽口的高度
        maxSize = 50, // 爱心最大尺寸
        minSize = 10, // 爱心最小尺寸
        endTop = dh - 100, // 最后坐标位置的Y
        newOne = 100; // 隔多长时间生成的

    
    // 克隆方法 隔段时间生成    
    setInterval(function() {

        var size = Math.random() * maxSize + minSize,
            startLeft = Math.floor(Math.random() * dw), // // 开始坐标位置的X 
            opacity = Math.random(), // 生成透明度
            endLeft = Math.floor(Math.random() * dw), // 最后坐标位置的X
            durationTime = 5000 * Math.random() + 3000; // 运动的时间 大小不一样所以运动速度也不一样
       
        $(loveShape).clone(true).appendTo($('body')).css({
            'left': startLeft,
            'font-size': size,
            'opacity': opacity
        }).animate({
            'top': endTop + 'px',
            'left': endLeft + 'px',
            'opacity': 0
        }, durationTime, function() {
            $(this).remove();
        })
        

    }, newOne)
    
}
fallLove();

// 怎么设置图案的大小以及颜色 可以用font-size 和引入字体类似


// 几乎可以使用animate来操控所有的CSS属性 当使用animate()时 必须使用Camel标记法书写所有的属性
//     比如 必须使用paddingLeft而不是padding-left 使用marginLeft而不是margin-left
//     同时 色彩动画并不包含在核心jQuery库中
// 如果需要生成颜色动画 您需要从jquery.com下载颜色动画插件     

