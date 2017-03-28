/*
    登录后，聊天的操作
*/

//连接融云服务器成功后执行的点击事件
function clickEvent(){
    $(".sessionPrivate").click(function(){
        createSession('1');   //点击发起单聊
    });
    $(".sessionGroup").click(function(){
        createSession('3');   //点击发起群组聊天
    });
    $(document).on("click", ".checkMoreMsg", function(){
        alert("还有更多消息");   //点击查看更多历史消息
    });
}

//时间戳转换成时间
function   formatDate(now)   {     
    var   year=now.getYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return month+"-"+date+"   "+hour+":"+minute;     
}  


//敲击回车发送
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];           
     if(e && e.keyCode==13){ // enter 键
        $(".sendBtn").trigger("click");
    }
};    
         