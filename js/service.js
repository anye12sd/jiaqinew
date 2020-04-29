//serviceID:
//3   永康电脑维修
//2   网络工程
//1   it外包服务
//4   行业解决方案
//5
//6   电脑维修
//7   it外包服务方案
//8   服务介绍
var serviceName = getUrlParam("serviceName") || false;
var serviceId = getUrlParam("serviceId") || false;
var id = getUrlParam("id") || false;
var page = getUrlParam("page") || 1;
var service;
switch (serviceId) {
    case "3":
        service = "永康电脑维修";
        break;
    case "2":
        service = "网络工程";
        break;
    case "1":
        service = "it外包服务";
        break;
    case "4":
        service = "行业解决方案";
        break;
    case "6":
        service = "电脑维修";
        break;
    case "7":
        service = "it外包服务方案";
        break;
    case "8":
        service = "服务介绍";
        break;
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
        url : '../json/service.json',
        //请求成功
        success : function(result) {
            if(serviceId && serviceName || !serviceId && serviceName){
                createHtml(result)
            }else if(serviceId && !serviceName){
                createList(result)
            }else if(!serviceId && !serviceName){
                createServerList(result);
            }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createHtml(result){
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.title.includes(serviceName) && i.id.includes(id); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    $(".content_body").show();
    $(".index_list ul").hide();
    var html = "";
    var content = aSearch[0].content.split("|");
    var h3Html = "";
    h3Html = ' » <a href="./servers.html">服务</a> » <a href="./outsourcing.html?serviceId='+aSearch[0].serviceId+'">'+service+'</a> » <a href="#">'+aSearch[0].title+'</a>';
    $(".index_list h3").html(h3Html)
    for(var i = 0; i < content.length; i++){
        html += '<p>'+content[i]+'</p>'
    }
    $(".content_body").html(html)
}

function createList(result){
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.serviceId.includes(serviceId); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    var h3Html = "";
    h3Html = ' » <a href="./servers.html">服务</a> » <a href="./outsourcing.html?serviceId='+aSearch[0].serviceId+'">'+service+'</a>';
    $(".index_list h3").html(h3Html)
    var list = "";
    for(var i = 0; i < aSearch.length; i++){
        list += '<li>\n' +
            '                            <span>['+aSearch[i].time+']</span>\n' +
            '                            <a href="./outsourcing.html?serviceName='+aSearch[i].title+'&id='+aSearch[i].id+'&serviceId='+aSearch[i].serviceId+'" title="'+aSearch[i].title+'发表于：'+aSearch[i].time+'">'+aSearch[i].title+'</a>\n' +
            '                        </li>'
    }
    $(".index_list ul").html(list);
    showPage(aSearch);
}

function createServerList(result){
    showPage(result);
    result = result[0].item;
    var length = result.length;
    var list = "";
    for(var i = (page - 1) * 12; i < (page * 12 > length ? length : page * 12); i++){
        list += '<li>\n' +
            '                            <span>['+result[i].time+']</span>\n' +
            '                            <a href="./outsourcing.html?serviceName='+result[i].title+'&id='+result[i].id+'&serviceId='+result[i].serviceId+'" title="'+result[i].title+'发表于：'+result[i].time+'">'+result[i].title+'</a>\n' +
            '                        </li>'
    }
    $(".index_list ul").html(list);
}

var allPage
function showPage(result){
    var pageHtml = "";
    var length = result.length;
    if(!serviceName && !serviceId){
       length = result[0].item.length
    }
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

function getHtmlDocName() {
    var str = window.location.href;
    str = str.substring(str.lastIndexOf("/") + 1);
    str = str.substring(0, str.lastIndexOf("."));
    return str;
}

var htmlName = getHtmlDocName();

var currentPage = page;
function selectToUrl(){
    var selectedPage = $("#pageNum option:selected").val();
    if(!serviceId){
        window.location.href = "./" +htmlName+ ".html?page=" + selectedPage;
    }else{
        window.location.href ="./"+htmlName+".html?page="+selectedPage+"&serviceId="+serviceId;
    }
}

function toIndex(){
    if(!serviceId){
        window.location.href ="./"+htmlName+".html?page=1";
    }else{
        window.location.href ="./"+htmlName+".html?page=1&serviceId="+serviceId;
    }
}

function toPreviout(){
    currentPage = currentPage == 1 ? 1 : --currentPage;
    if(!serviceId){
        window.location.href ="./"+htmlName+".html?page="+currentPage;
    }else{
        window.location.href ="./"+htmlName+".html?page="+currentPage+"&serviceId="+serviceId;
    }
}

function toNext(){
    currentPage = currentPage == allPage ? allPage : ++currentPage;
    if(!serviceId){
        window.location.href ="./"+htmlName+".html?page="+currentPage;
    }else{
        window.location.href ="./"+htmlName+".html?page="+currentPage+"&serviceId="+serviceId;
    }
}

function toLast(){
    if(!serviceId){
        window.location.href ="./"+htmlName+".html?page="+allPage;
    }else{
        window.location.href ="./"+htmlName+".html?page="+allPage+"&serviceId="+serviceId;
    }
}