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
var allpage, page = 1;
var service, textResult, aSearch=[];
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
            textResult = result;
            textResult.forEach(function(ele){//循环外层数组
                var aTemp = ele.item.filter(function(i){
                    return i.serviceId.includes(serviceId); // 过滤符合要求的item数组
                });
                aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
            });
            if(!id){
                createList()
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

function createList(){
    console.log(aSearch)
    var list = "";
    var length = aSearch.length;
    allpage = Math.ceil(length/5);
    for(var i = (page - 1) * 5; i < (page * 5  > length ? length : page * 5); i++){
        list += '<li class="list-item">\n' +
            '                <a href="../wap/mails.html?id='+aSearch[i].id+'&serviceName='+aSearch[i].title+'&serviceId='+aSearch[i].serviceId+'">\n' +
            '                    <span class="title">'+aSearch[i].title+'</span>\n' +
            '                    <time class="pub-date">'+aSearch[i].time+'</time>\n' +
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
            return i.title.includes(serviceName) && i.id.includes(id); // 过滤符合要求的item数组
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
    var length = aSearch.length;
    var list = "";
    for(var i = (page - 1) * 5; i < (page * 5 > length ? length : page * 5); i++){
        list += '<li class="list-item">\n' +
            '                <a href="../wap/mails.html?id='+aSearch[i].id+'">\n' +
            '                    <span class="title">'+aSearch[i].title+'</span>\n' +
            '                    <time class="pub-date">'+aSearch[i].time+'</time>\n' +
            '                </a>\n' +
            '            </li>'
    }
    $(".list").append(list);
}