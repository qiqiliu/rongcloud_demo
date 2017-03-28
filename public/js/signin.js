/*
    登录 、 初始化 、设置监听器 、连接融云服务器。
*/
$(document).ready(function(){ 
    $(".demoSignIn").click(function(){
        signIn();   //点击登录
    });

    function signIn (){
        var userId = $("#demoUserName").val();
        var token = userInfos[userId].token;
        if(!token){
            alert("必须提供token");
        }

        /*
            初始化 SDK
        */
        RongIMClient.init(appKey);
        /*
            设置监听器
        */
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    //链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    //正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    //重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    //其他设备登录
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                      //网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                      console.log('网络不可用');
                      break;
                }
            }
        });

        // 连接消息监听器
       RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 判断消息类型
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        getUnreadCount(message.conversationType,message.targetId);
                        updateChatList(message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载                
                        // message.content.content 格式为 AMR 格式的 base64 码
                        RongIMLib.RongIMVoice.preLoaded(message.content.content);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                        // 自定义消息
                        // do something...
                }
            }
        });

        // 连接融云服务器。
        RongIMClient.connect(token, {
            onSuccess: function(userId) {
                clickEvent();  //连接成功后的点击事件
                getMsgDialog();   //点击会话列表显示聊天对话框
                getConversationLists();  // 连接成功后获取会话列表
                $(".currentUser").text("当前用户为："+ userInfos[userId].name +"("+ userId +")");
                console.log("连接成功，用户为：" + userId);
            },
            onTokenIncorrect: function() {
              console.log('token无效');
            },
            onError:function(errorCode){
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                    }
                console.log(errorCode);
            }
        });
    }
});