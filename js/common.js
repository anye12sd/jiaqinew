$(function(){
    
})

$(function(){
    $(".site-nav li").mouseenter(function(){
        $(this).find(".cn").hide()
        $(this).find(".en").show()
    })
    $(".site-nav li").mouseleave(function(){
        $(this).find(".cn").show()
        $(this).find(".en").hide()
    })
})

//获取url中的参数
function getUrlParam(name) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}