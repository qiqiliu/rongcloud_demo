/*
    聊天会话列表 / 未读消息
*/

//隐藏登录框，显示会话界面
function showChat (){
    $(".formSignIn").css("display","none");
    $(".chatPage").css("display","block");
}

// 登录后获取会话列表
function getConversationLists (){
    showChat();  //隐藏登录框，显示会话界面
    var limit = null; //获取会话的数量，不传或传null为全部
    RongIMClient.getInstance().getConversationList({
        onSuccess: function(list) {
            list.sort(function(a,b){
                return a.sentTime > b.sentTime;
            });
            showChatList(list);
        },
        onError: function(error) {
            console.log("获取会话失败");
        }
    },null,limit);
}

function showChatList (list){ 
    chatList =[];  
    for(var i = 0; i<list.length;i++){
        var obj = getChatDate(list[i]);
        chatList.push(obj);

        getUnreadCount(list[i].conversationType,list[i].targetId);   //登录后获取未读消息
    }
    app.chatList = chatList;
}

//未读消息计数
function getUnreadCount(conversationtype,targetId){
    RongIMClient.getInstance().getUnreadCount(conversationtype,targetId,{
        onSuccess:function(count){
            if(count !=0) {
                var sessionName = $(".chatPartner").text();   //获取当前会话的用户昵称
                $("#"+targetId).siblings(".unreadMsgNum").text(count);
                if(userInfos[targetId].name != sessionName){
                    $("#"+targetId).siblings(".unreadMsgNum").css("display","block");
                }
                else{
                     clearUnreadCount(conversationtype,targetId); 
                }
            }
        },
        onError:function(error){
           console.log("获取会话未读数失败",error);
        }
    });
}

//清除未读消息
function clearUnreadCount(conversationtype,targetId){
    RongIMClient.getInstance().clearUnreadCount(conversationtype,targetId,{
        onSuccess:function(){
            //console.log("清除未读数成功");
        },
        onError:function(error){
            console.log("清除未读数失败",error);
        }
    });
}

// 获取最近联系人列表的数据
function getChatDate(message){
    var obj={};
    obj.conversationType = message.conversationType;
    obj.imgSrc = userInfos[message.targetId].avatar;
    obj.targetId = message.targetId;
    obj.targetName = userInfos[message.targetId].name;
    obj.latestMessage = message.latestMessage.content.content;

    return obj;
}