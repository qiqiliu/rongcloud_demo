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
    $(".sessionCustermer").click(function(){
        createSession('5');   //点击发起群组聊天
    });
    $(document).on("click", ".checkMoreMsg", function(){
        getMoreHistoryMsg();   //点击查看更多历史消息  
    });
    $(document).on("click", ".clearChatList", function(){
        clearChatList();   //点击清空会话列表
    });
    $(document).on("click", ".playVoice", function(){
        playVoice();   //点击播放语音消息
    });
    $(document).on("click", ".emojiIcon", function(){
        blockAllEmoji();  //点击显示全部emoji表情

        $(document).one("click", function(){
            $(".allEmojis").hide();
        });
        event.stopPropagation();
    });
    $(document).on("click", "#allEmoji span>span", function(){
        var emojiValue = $(this).attr("name");
        inputEmoji(emojiValue);
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
         