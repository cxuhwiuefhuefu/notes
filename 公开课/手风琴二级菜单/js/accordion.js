Accordion.prototype.toggleshow = function(e) {
    var $thisParent = $(this).parent();
    var $thisNext = $(this).next();
    if(!e.data.multiple) {
        var itemClass = $thisParent.attr('class');
        var listClass = $thisNext.attr('class');
        // $('.' + itemClass).removeClass('active');
        $('.' + itemClass).removeClass(e.data.activeClass);
        $('.' + listClass).slideUp();
    }
    // $thisParent.toggleClass('active'); 
    $thisParent.toggleClass(e.data.activeClass);
    $thisNext.slideToggle();
}
function Accordion(obj) { // 留一个接口 用户在使用的时候就只有一个它
    obj.tar.on('click', obj, Accordion.prototype.toggleshow);
}