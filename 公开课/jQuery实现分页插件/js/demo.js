// 实现插件 ==》 拓展插件 + 插件功能
// 拓展插件 ==》 $.fn.extend()
// 插件功能 ==》 实现方法 (点击丶动态渲染等)



(function($) {

    // 入口函数 -- 初始化的函数
    function init(dom, args) {
        if(args.current <= args.pageCount) {
            fillHtml(dom, args); // 渲染html
            bindEvent(dom, args); // 实现点击
        }else {
            alert('请输入正确页码');
        }
    }


    // 渲染html结构
    function fillHtml(dom, args) {
        
        dom.empty();
        

        // (第一页)
        // 生成上一页 可以点击的用a标签来代表 不能点击用span标签来代表 什么情况下能点击
        //     什么情况下不可以点击 当我选中的这一页到头了 
        //     当我选中的这一页比1大的时候 可以点击上一页 
        if(args.current > 1) {
            dom.append('<a href="#" class="prePage">上一页</a>')
        }else {
            dom.remove('.prePage');
            dom.append('<span class="disable">上一页</span>')
        }


        // (中间页数) 
        // 让它从哪里开始生成 无论它这个点点点在哪里出现 它是在最前面还是在最后面出现
        //     它1和15这两个值永远都有的 1 + 页数/... + 页数/...  + pageCount
        //     这个点点点是否出现还要判断一下 先生成第一页 中间页数的第一页 生成没有被选中的样式
        //     生成没有被选中的第一页和最后一页 那么我们现在要生成点点点 先生成点点点 这个页数 
        //     当前的页数+2/-2不等于第一页或最后一页 当它处于标准形式 中间页数生成 用for循环生成
        if(args.current !== 1 && args.current >= 4 && args.pageCount !== 4) { 
                        // 为什么要大于等于4呢 因为大于等于4的时候它这快才能出现点点点
            dom.append('<a href="a" class="num">' + 1 + '</a>');
        }
        if(args.current - 2 > 2 && args.pageCount > 5 && args.current <= args.pageCount) { 
                        // 我们减去2要大于2 如果你是4-2!=2 5-2>2 
                        //     并且我当前这个总的页数它要大于5才能出现当前这个点点点 
                        //     减去两个没到头 加去两个没到头 就让它出现点点点
            dom.append('<span>...</span>');
        }


        // 中间连续页数 连续页数的开始和结尾在哪里 是不是可以通过循环每次+1 开始与结束的位置在哪里
        //     开始与结束的位置与我选中的第几页有关 
        var start = args.current - 2;
        var end = args.current + 2;
        for(; start <= end; start ++) {
            if(start <= args.pageCount && start >= 1) { 
                // 每次把start加到里面 但是我把生成的每个值加到这里面要怎么样 是不是要显示两种样式 
                //     一种是选中的样式 一种是没选中的样式 那么我们当前选中的样式是哪个呢
                //     我是通过start循环的 我想把循环之后的start插入到结构里面
                if(start === args.current) {
                    dom.append('<span class=current>'+ start +'</span>');
                }else {
                    dom.append('<a href="a" class="num">' + start +'</a>')
                }
            }
        }


        // (最后一页)
        // 在最后一页插点点点
        if(args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }


        // 中间页数的5678 中间的页数可以通过current循环生成 点点点与最后一页连接
        if(args.current !== args.pageCount && args.current < args.pageCount - 2 && args.pageCount !== 4) {
            dom.append('<a href="#" class="num">'+ args.pageCount +'</a>')
        }


        // 生成下一页 比较 灰色不能点 它和谁比较 判断我当前选中的这一页和谁比较 
        //     判断我当前的current小于这里边的pageCount 就是可以点击的 小于最后一页可以点击
        if(args.current < args.pageCount) {
            dom.append('<a href="#" class="nextPage">下一页</a>');
        }else {
            dom.remove('.nextPage');
            dom.append('<span class="disable">下一页</span>')
        }


    }


    // 实现点击事件 -- 点完之后与你current值有关
    function bindEvent(dom, args) {
        // 除了current可以点击 class类名为num可以点击 num/上一页/下一页可以绑定点击事件
        dom.on('click', '.num', function() {
            var cur = parseInt($(this).text());
            changePage(dom, args, cur);
        }) 
        dom.on('click', '.prePage', function() {
            var cur = parseInt(dom.find('.current').text());
            changePage(dom, args, cur - 1);
        })
        dom.on('click', '.nextPage', function() {
            var cur = parseInt(dom.find('.current').text());
            changePage(dom, args, cur + 1);
        })
    }
    

    // 重新渲染 
    // 页面跳转   当我们点击完之后 我们都调用这个方法 只是给它传的参数是不同的 当我点击的时候每次的操作上一页下一页都与当前的这个current值来渲染
    function changePage(dom, args, page) { // 重新渲染dom结构  每次你改就渲染dom结构
        fillHtml(dom, {current: page, pageCount: args.pageCount});
        args.backFn(page);
    }




    // 有几种形式 第一种是当前有点点点的 因为你当前页数比较多 一种是这样 前面首页和你这个页数之间有点点点 
    //     还有一种是左右两边分别有了页数之后还有点点点 再到上一页下一页 上一页下一页可以分单独的部分 它还有一个不能被选中的状态 
    //     当你点到15当你点到1的时候这两个分别是不能被选中的状态




    // 展现代码模块化的思想 完全满足高内聚 低耦合的思想 
    // $.extend()传一个参数和传多个参数一样吗 在这个地方 传一个参数代表你拓展方法
    //     传多个参数代表合并 当合并的时候又分第一个是布尔值或是false true代表深克隆
    //
    // 拓展插件
    $.fn.extend({
        createPage: function(options) {
            // var args = options; // 传的话取你实际传过来的options参数 如果你没传我要给它传一个默认值 
                                   //     没传的话有默认的几页展示出来
            var args = $.extend({ // 如果option是一个对象 前面也是一个对象 它现在代表了对象的合并 
                                  //    当第二个参数合并到第一个里面 并且把第一个返回 
                                  //    那么如果options传值它就取option里面的值 如果option没传值就取前面默认的
                pageCount: 5,
                current: 1,
                backFn: function() {}
            }, options);
            init(this, args)
        }
    })


    
}(jQuery))




// 当我实际创建结构的时候 我要给它插入哪去 放到page里 插件是封装好的 你只能暴漏出这个接口 我们怎么能拿到这个page 这个wrapper 
// 放jQuery有什么用 这样更能体现模块化的思想 实现高内聚 低耦合 不用再去window里面找jQuery 而我把jQuery传过来了




// $.fn.extend() 函数为jQuery拓展一个或多个实例属性和方法(主要用于拓展方法)
// 提示: jQuery.fn是jQuery的原型对象 其extend()方法用于为jQuery的原型添加新的属性和方法 
//     这些方法可以在jQuery实例对象上调用


// jQuery.extend()函数用于将一个或多个对象的内容合并到目标对象
// 注意: 1. 如果只为$.extend()指定了一个参数 则意味着参数target被忽略 此时 target就是jQuery对象本身 通过这种方式
//          我们可以为全局对象jQuery添加新的函数
//       2. 如果多个对象具有相同的属性 则后者会覆盖前者的属性值
// 语法 
//    $.extend(target, [object1], [objectN])
//    指示是否深度合并
//        $.extend([deep], target, object1, [objectN])
// 警告: 不支持第一个参数传递false
// 参数
//    deep    可选 Boolean类型 指示是否深度合并对象 默认为false 如果该值为true 且多个对象的某个同名属性也都是对象 
//                则该"属性对象"的属性也将进行合并
//    target  Object类型 目标对象 其他对象的成员属性也将附加到该对象上
//    object1 可选 Object类型 第一个被合并的对象
//    objectN 可选 Object类型 第N个b被合并的对象


// jQuery.empty()方法从被选元素所有子节点和内容
// 注意: 该方法不会移除元素本身 或它的属性
// 提示: 如需移除元素 但保留数据和事件 请使用detach()方法
// 提示: 如需移除元素及它的数据和事件 请使用remove()方法


// on()方法在被选元素或子元素上添加一个或多个事件处理程序
// 注意: 使用on()方法添加的事件处理程序适用于当前及未来的元素(比如由脚本c创建的新元素)
// 提示: 如需移除事件处理程序 请使用off()方法
// 提示: 如需添加只运行一次的事情然后移除 请使用one()方法
// 语法
//     $(selector).on(event, childSelector, data, function)
// 参数
//    event          必须 规定要从被选元素移除的一个或多个事件或命名空间 有空格分割多个事件值
//                        也可以是数组 必须是有效的事件
//    childSelector  可选 规定只能添加到指定的子元素的事件处理程序(且不是选择器本身 比如已废弃的delegate()方法)
//    data           可选 规定传递到函数的额外数据
//    function       可选 规定当事件发生时运行的函数 

