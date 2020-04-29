var id = getUrlParam("id") || false;
var allpage,page = 1;
var textResult;

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
        url : '../json/cases.json',
        //请求成功
        success : function(result) {
            if(!id){
                createList(result)
            }else{
                createHtml(result)
            }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createList(result){
    result = result[0].item;
    textResult = result;
    var list = "";
    var length = textResult.length;
    allpage = Math.ceil(length/5);
    for(var i = (page - 1) * 5; i < (page * 5  > length ? length : page * 5); i++){
        list += '<li class="list-item">\n' +
            '                <a href="../wap/cases.html?id='+textResult[i].id+'">\n' +
            '                    <span class="title">'+textResult[i].title+'</span>\n' +
            '                    <time class="pub-date">'+textResult[i].time+'</time>\n' +
            '                </a>\n' +
            '            </li>'
    }
    $(".list").html(list);
}

function createHtml(result){
    $(".widget-footer,.widget-body").hide();
    $(".article-show").show();
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.id.includes(id); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    console.log(aSearch)
    var html = "";
    var content = aSearch[0].content.split("|");
    $(".widget-header h2").html(aSearch[0].title)
    for(var i = 0; i < content.length; i++){
        html += '<p>'+content[i]+'</p>'
    }
    $(".article-show").html(html)
}

function showMore(){
    page += 1;
    if(page > allpage){
        alert("已显示全部文章");
        return
    }
    createMoreList()
}

function createMoreList(){
    var length = textResult.length;
    var list = "";
    for(var i = (page - 1) * 5; i < (page * 5 > length ? length : page * 5); i++){
        list += '<li class="list-item">\n' +
            '                <a href="../wap/cases.html?id='+textResult[i].id+'">\n' +
            '                    <span class="title">'+textResult[i].title+'</span>\n' +
            '                    <time class="pub-date">'+textResult[i].time+'</time>\n' +
            '                </a>\n' +
            '            </li>'
    }
    $(".list").append(list);
}