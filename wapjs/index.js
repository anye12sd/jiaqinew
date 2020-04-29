$(function(){
    // if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
    //     console.log("mobile")
    // }else{
    //     window.location.href = "http://www.ykjqwl.com/index.html"
    // }
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //请求地址
        url : '../json/article.json',
        //请求成功
        success : function(result) {
            createArticleList(result)
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createArticleList(result){
    result = result[0].item;
    var length = result.length > 5 ? 5 : result.length;
    var html = "";
    for(var i = 0; i < 5; i++){
        html += '<li class="list-item">\n' +
            '                <a href="../wap/articles.html?id='+result[i].id+'">\n' +
            '                    <span class="title">'+result[i].title+'</span>\n' +
            '                    <time class="pub-date">'+result[i].time+'</time>\n' +
            '                </a>\n' +
            '            </li>'
    }
    $(".articles").html(html);
}

$(function(){
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //请求地址
        url : '../json/news.json',
        //请求成功
        success : function(result) {
            createNewsList(result)
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createNewsList(result){
    result = result[0].item;
    var length = result.length > 5 ? 5 : result.length;
    var html = "";
    for(var i = 0; i < 5; i++){
        html += '<li class="list-item">\n' +
            '                <a href="../wap/news.html?id='+result[i].id+'">\n' +
            '                    <span class="title">'+result[i].title+'</span>\n' +
            '                    <time class="pub-date">'+result[i].time+'</time>\n' +
            '                </a>\n' +
            '            </li>'
    }
    $(".news").html(html);
}