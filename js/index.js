$(function(){
    //请求参数
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //请求地址
        url : './json/news.json',
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
    var list = "";
    result = result[0].item;
    for(var i = 0 ; i < 8; i++){
        list += '<li><span>['+result[i].time+']</span><a href="./pages/news.html?id='+result[i].id+'" title="'+result[i].title+'">'+result[i].title+'</a></li>'
    }
    $(".index_list1 ul").html(list)
}

$(function(){
    //请求参数
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //请求地址
        url : './json/article.json',
        //请求成功
        success : function(result) {
            createArticlesList(result)
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createArticlesList(result){
    var list = "";
    result = result[0].item;
    for(var i = 0 ; i < 8; i++){
        list += '<li><span>['+result[i].time+']</span><a href="./pages/article.html?id='+result[i].id+'" title="'+result[i].title+'">'+result[i].title+'</a></li>'
    }
    $(".index_list2 ul").html(list)
}