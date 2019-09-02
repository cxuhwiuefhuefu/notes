// 匿名函数执行 防止污染全局变量

(function($) {

    
    // 拓展插件分页方法
    $.fn.extend({
        pageTurn: function(options) {
            
            // 默认参数 防止没有传参数 
            var options = $.extend({
                pageCount: 15,
                currentPage: 2
            }, options);       
            

            // 初始化
            init(this, options);
    
        }
    })


    // 初始化函数
    function init(dom, options) {
        fillHtml(dom, options);
        bindEvent(dom, options);
    }


    // 渲染html
    function fillHtml(dom, args) {

        // 每次渲染都要清空里面
        dom.empty();


        // 优化性能 把常用变量存储起来
        var current = args.currentPage,
            count = args.pageCount;
            



        // 上部分
        // 生成"上一页"和"1"  万一只有一页呢 "上一页"和"下一页"不出现
        if(count !== 1) {
            if(current === 1) {
                dom.append('<a class="disable">上一页</a>').append('<span class="current">1</span>');
            }else {
                dom.append('<a class="prePage">上一页</a>').append('<a>1</a>');
            }
        }else {
            dom.append('<span class="current">'+ 1 +'<span>')
        }
        
       




        // 中间部分
        // 判断前半部分的"..."的生成 如果当前页数 -2 > 2 总页数>5
        if(current - 2 > 2 ) { 
            dom.append('<span>...<span>');
        }


        // 中间连续页数的生成的 
        var start = current - 2;
        var end = current + 2;
        for(; start <= end; start ++) {
            if(start > 1 && start < count) {
                if(start === current) {
                    dom.append('<span class="current">' + start + '</span>');
                }else {
                    dom.append('<a>'+ start +'</a>');
                }
            }
        }
       
      
        // 判断后半部分的"..."的生成
        if(current + 3 < count) {
            dom.append('<span>...</span>');
        }





        // 下部分
        // 生成"下一页"和"总页数"
        if(count !== 1) {
            if(current === count) {
                dom.append('<span class="current">'+ count +'</span>').append('<a class="disable">下一页</a>');
            }else {
                dom.append('<a>'+ count +'</a>').append('<a class="nextPage">下一页</a>');
            }
        }
       
     

    }

    

   


    // 绑定点击事件
    function bindEvent(dom, args) {

        $('a').click(function() {
           
            if($(this).attr('class') === 'prePage') {   
                if(args.currentPage >= 1) {
                    args.currentPage -= 1;
                }
            }else if($(this).attr('class') === 'nextPage'){
                if(args.currentPage <= args.pageCount) {
                    args.currentPage += 1
                }
            }else if( (+$(this).text()).toString() !== 'NaN' ){       
                args.currentPage = Number($(this).text());
            }

            fillHtml(dom, args);
            bindEvent(dom, args);

        })
    } 


}(jQuery))






// 难点 点击事件
// 思路
//    1. 点击"上一页" currentPage += 1 
//           (当前页数 = 1时, "上一页"的class类名删除"prePage" 添加"disable"类名 点击事件失效) 
//    2. 点击"下一页" currentPage -= 1 
//           (当前页数 = pageCount时, "下一页"的class类名删除"nextPage" 添加"disable"类名 点击事件失效)
//    3. 点击页数 currentPage = "当前页数" 




