/*
    聊天会话详情 / 发送消息
*/

// 点击会话列表显示聊天对话框   点击发送，发送消息
function getMsgDialog (){
    var chatTargetId;
    $("#chatList").on("click", "li", function(){
        $(this).addClass("talking").siblings().removeClass("talking"); 
        chatTargetId = $(this).children('p.targetName').attr('id');
        conversationType = $(this).attr('conversationType');

        var chatTitle= $(".chatPartner").text();
        if(chatTitle != userInfos[chatTargetId].name){
            $("#"+chatTargetId).siblings(".unreadMsgNum").css("display","none");  //隐藏未读消息提示框
            displayDialog(chatTargetId,conversationType);  //显示聊天对话框
            clearUnreadCount(conversationType,chatTargetId); //清除未读消息数
        }
    });
    //点击发送，发送消息
    $(document).on("click",'.sendBtn',function(){
        sendTextMessage(chatTargetId,conversationType);
    });
}

//显示聊天对话框
function displayDialog (chatTargetId,conversationType){
    $(".chatDialog").html(
        '<h2 class="chatPartner">' + userInfos[chatTargetId].name + '</h2>'+
        '<div class="chatMessages"><ul></ul>'+     
        '</div>'+
        '<div class="inputMsg">'+
        '<textarea maxlength="200" id ="messageContent"></textarea>'+
        '<button class="sendBtn">发送</button>'+
        '</div>');

    //获取历史消息
    getHistoryMsg(chatTargetId,conversationType,0);
}

//获取历史消息
function getHistoryMsg(targetId,conversationNum,timestrap){
    var conversationtype;
    if(conversationNum =='1' ){
       conversationtype = RongIMLib.ConversationType.PRIVATE;   // 私聊
    }
    else if(conversationNum == '3'){
        conversationtype = RongIMLib.ConversationType.GROUP;  //群组聊天
    }

    RongIMClient.getInstance().getHistoryMessages(conversationtype, targetId, timestrap, 20, {
        onSuccess: function(list, hasMsg) {
            for (var i = 0; i < list.length; i++) {
                showChatContent(list[i]);    //在对话框中append聊天记录
            }
            if(hasMsg == true){
                $(".chatMessages ul").prepend('<li><p class="checkMoreMsg">查看更多历史消息</p></li>')
            }
        },
        onError: function(error) {
            console.log('APP未开启消息漫游或处理异常');
        }
    });
}

// 发送文字消息
function sendTextMessage (targetId,conversationNum){
    var messageContent = $("#messageContent").val();
    var content = {
        content: messageContent,
        extra:"RongCloud"
    };
    var msg = new RongIMLib.TextMessage(content);

    var conversationtype; 
    if(conversationNum =='1' ){
       conversationtype = RongIMLib.ConversationType.PRIVATE;   // 私聊
    }
    else if(conversationNum == '3'){
        conversationtype = RongIMLib.ConversationType.GROUP;  //群组聊天
    }
    RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        onSuccess: function (message) {
            console.log("发送消息成功");
            updateChatList(message);    //发送消息成功后更新会话列表和对话框内容

            // 发送成功后该会话放置在最近联系人列表的第一个
            var index = $(".talking").index();
            $("#chatList").prepend($("#chatList li").eq(index));
            $("#messageContent").val(''); 
        },
        onError: function (errorCode,message) {
            console.log('发送文字消息失败' );
        }
    });
}

//消息监听到有新的聊天内容 / 发送消息成功 时更新会话
function updateChatList (message){
    var updateUserID = message.targetId;
    var updateContent = message.content.content;
    var ConversationType = message.conversationType;
    $("#chatList").prepend($("#chatList li").eq($('#'+updateUserID).parent().index()));
    $('#'+updateUserID).next().text(updateContent);  //更新 最近联系人列表里显示的最后一条消息

    //更新 对话框的最新消息
    var chatHead = $(".chatPartner").text();
    var updateUserName = userInfos[updateUserID].name;      
    if(chatHead == updateUserName){
        showChatContent(message);  //在对话框中append聊天记录
    }

    var sessionName = $(".chatPartner").text();   //获取当前会话的name
    if(userInfos[updateUserID].name != sessionName){
        $("#"+updateUserID).siblings(".unreadMsgNum").css("display","block");   //未读消息数量提示
    }
    else{
        clearUnreadCount(ConversationType,updateUserID);  //如果是当前对话框收到消息，则清除该对话的未读数
    }

    addRecentContact(updateUserID,ConversationType,updateContent);   //发起新会话后 在最近联系人列表里添加联系人
}

//发起会话(新建会话)
function createSession (ConversationType){
    var sessionId = $("#sessionID").val();
    if(sessionId ==''){
        alert('请填写要对话人的ID，可参考使用user1、user2、user3、user4、user5、000001(群聊)、000002(群聊)');
    }else{
        addRecentContact(sessionId,ConversationType);
    }
}


//发起新会话后 在最近联系人列表里添加联系人
function addRecentContact (sessionId,ConversationType,content=undefined){
    var isExist= false;
    var list = getContactList();   //获取最近联系人列表的userId

    for(var i = 0; i<list.length;i++){
        if(sessionId == list[i]){
            if (!content){
                $("#chatList li").eq(i).trigger("click");
            }
            isExist = true;
            return false; 
        }
    }
    if(isExist == false){
        if (!content){
            content = ' ';
            $("#chatList").prepend("<li conversationType ="+ ConversationType +">"+
                "<img src="+ userInfos[sessionId].avatar + " class='targetPortraitUri'>" +
                "<p class='targetName' id ="+sessionId + ">"+ userInfos[sessionId].name +"</p>"+
                "<p class='targetLastMsg'>"+ content +"</p><p class='unreadMsgNum'></p>"
                +"</li>");
            $("#chatList li").eq(0).trigger("click");
        }
    } 
}

//在对话框中append聊天记录
function showChatContent(message){
    $(".chatMessages ul").append('<li><img class="chatAvatar" src="' + 
        userInfos[message.senderUserId].avatar + '"><p class="chatSender">'+ 
        userInfos[message.senderUserId].name +' '+ formatDate(new Date(message.sentTime)) +'</p>'+
        '<p class="chatSenderInfo" >' + message.content.content+'</p></li>');
    $(".chatMessages").scrollTop($(".chatMessages")[0].scrollHeight);    //聊天对话框滚动条保持在最底部
}

//获取最近联系人列表的userId
function getContactList(){
    var listArr = [];
    $("#chatList").each(function(){
        var chatList = $(this).children();
        for (var i = 0; i < chatList.length; i++) {
            listArr.push($(chatList[i]).find(".targetName").attr("id"));
        }
    });
    return listArr;
}