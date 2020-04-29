var page = getUrlParam("page") || 1;
var id = getUrlParam("id") || false;

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
    showPage(result);
    result = result[0].item;
    var list = "";
    var length = result.length;
    for(var i = (page - 1) * 12; i < (page * 12 > length ? length : page * 12); i++){
        list += '<li>\n' +
            '                                                    <span>['+result[i].time+']</span>\n' +
            '                                                    <a href="./cases.html?id='+result[i].id+'" title="'+result[i].title+'发表于：'+result[i].time+'">'+result[i].title+'</a>\n' +
            '                                                </li>'
    }
    $(".index_list ul").html(list);
}

function createHtml(result){
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.id.includes(id); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    console.log(aSearch)
}

var allPage
function showPage(result){
    var pageHtml = "";
    var length = result[0].item.length;
    allPage = Math.ceil(length/12);
    var option = "";
    for(var i = 1; i <= allPage; i++){
        if(i == page){
            option += '<option value="'+i+'" selected="true">'+i+'</option>'
        }else{
            option += '<option value="'+i+'">'+i+'</option>'
        }
    }
    pageHtml += '<form style="margin:0;" action="">\n' +
        '                            共<span class="red">'+length+'</span>条记录\n' +
        '                            每页<span class="red">12</span>条记录\n' +
        '                            当前第<span class="red">'+page+'</span>/<span class="red2">'+allPage+'</span>页&nbsp;\n' +
        '                            <span class="gray" onclick="toIndex()">首页</span>&nbsp;&nbsp;<span class="gray" onclick="toPreviout()">上一页</span>&nbsp;\n' +
        '                            <span class="gray" onclick="toNext()">下一页</span>&nbsp;&nbsp;<span class="gray" onclick="toLast()">末页</span>&nbsp;&nbsp;\n' +
        '                            <select onchange="selectToUrl(this)" id="pageNum">\n' +
        '                                '+option+'\n' +
        '                            </select>\n' +
        '                        </form>';

    $("#showpage").html(pageHtml);
}

var currentPage = page;
function selectToUrl(){
    var selectedPage = $("#pageNum option:selected").val();
    window.location.href = "./cases.html?page=" + selectedPage;
}

function toIndex(){
    window.location.href ="./cases.html?page=1";
}

function toPreviout(){
    currentPage = currentPage == 1 ? 1 : --currentPage;
    location.href = "./cases.html?page=" + currentPage;
}

function toNext(){
    currentPage = currentPage == allPage ? allPage : ++currentPage;
    location.href = "./cases.html?page=" + currentPage;
}

function toLast(){
    location.href = "./cases.html?page=" + allPage;
}

function createHtml(result){
    $(".content_body").show();
    $(".index_list ul,#showpage").hide();
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.id.includes(id); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    var html = "";
    var content = aSearch[0].content.split("|");
    var h3Html = "";
    h3Html = ' » <a href="./cases.html">成功案例</a> » <a href="#">'+aSearch[0].title+'</a>';
    $(".index_list h3").html(h3Html)
    for(var i = 0; i < content.length; i++){
        html += '<p>'+content[i]+'</p>'
    }
    $(".content_body").html(html)
}