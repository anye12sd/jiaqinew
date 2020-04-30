if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback/*, thisArg*/) {
        var T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = arguments[1];
        }

        k = 0;

        while (k < len) {
            var kValue;

            if (k in O) {

                kValue = O[k];

                callback.call(T, kValue, k, O);
            }

            k++;
        }

    };
}

if (!Array.prototype.filter)
{
    Array.prototype.filter = function(fun /*, thisp */)
    {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t)
            {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments)!== -1;
    };
}

function showQRcode(obj){
    $(obj).next().fadeToggle();
}

$(function(){
    $(".site-nav li").mouseenter(function(){
        $(this).find(".cn").hide()
        $(this).find(".en").show()
    })
    $(".site-nav li").mouseleave(function(){
        $(this).find(".cn").show()
        $(this).find(".en").hide()
    })

    $("#copyrights").on("click", function(){
        location.href = 'http://www.ykjqwl.com';
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

