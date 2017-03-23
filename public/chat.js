$(document).ready(function(){ 
    var appKey ="p5tvi9dspjzt4";
    var userInfos = {
        "user1" : {
            "token" : "vL1CRi15TV0NCpPGsIYBevIYZo+Frd7oxwAkd8SHti2FyC03+mdvXm394Hwg9iyQgWDr9E9Mnd7Ek8760ZDElg==",
            "avatar" : "./public/user1.jpg",
            "name" : "刘一",
            "other props" : ""
        },
        "user2" : {
            "token" : "QqmR9UcRXIToGNmiD+B9nCaiM+p4JJZDDIwrB3VY2pNWyvLgcCXyXwmvct8AvAr7bVpk23skju2l758w3C85ww==",
            "avatar" : "./public/user2.jpg",
            "name" : "陈二",
            "other props" : ""
        },
        "user3" : {
            "token" : "2l9uV3XbNvlyMBcbSgkt9yaiM+p4JJZDDIwrB3VY2pNWyvLgcCXyX7kR+4RR6g3qillv4mUdt1LSrwE7qxTSEw==",
            "avatar" : "./public/user3.jpg",
            "name" : "张三",
            "other props" : ""
        },
        "user4" : {
            "token" : "iPvtayaUsczNIFRaT+z5bCaiM+p4JJZDDIwrB3VY2pNWyvLgcCXyX1iJGyTMQG2GsqkUf84MNm8akMeboU1ROA==",
            "avatar" : "./public/user4.jpg",
            "name" : "李四",
            "other props" : ""
        },
        "user5" : {
            "token" : "eINULHoqaSpxeFn6+GAUxSaiM+p4JJZDDIwrB3VY2pNWyvLgcCXyXw/2H9cLKh+ZL12vAOABzHujVCU3vUq2fg==",
            "avatar" : "./public/user5.jpg",
            "name" : "王五",
            "other props" : ""
        },
        "000001" : {
            "avatar" : "./public/group.jpg",
            "name" : "一班群组",
            "other props" : ""
        },
        "000002" : {
            "avatar" : "./public/group.jpg",
            "name" : "二班群组",
            "other props" : ""
        },
        "000003" : {
            "avatar" : "./public/group.jpg",
            "name" : "三班群组",
            "other props" : ""
        }
    };

    var nowHours = new Date().getHours();
    var nowMinutes = new Date().getMinutes();
    var now = nowHours+":"+nowMinutes;

    $(".demoSignIn").click(function(){
        signIn();   //点击登录
    });
    $(".sessionPrivate").click(function(){
        createSession('1');   //点击发起单聊
    });
    $(".sessionGroup").click(function(){
        createSession('3');   //点击发起群组聊天
    });
    function showChat (){
        $(".formSignIn").css("display","none");
        $(".chatPage").css("display","block");
    }
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
                        //console.log(message);
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
                getConversationLists();  // 连接成功后获取会话列表
                getMsgDialog();   //点击会话列表显示聊天对话框
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
        for(var i = 0; i<list.length;i++){
            $("#chatList").append("<li conversationType ="+ list[i].conversationType +">"+
                "<img src="+ userInfos[list[i].targetId].avatar + " class='targetPortraitUri'>" +
                "<p class='targetName' id ="+list[i].targetId + ">"+ userInfos[list[i].targetId].name +"</p>"+
                "<p class='targetLastMsg'>"+ list[i].latestMessage.content.content +"</p>"
                +"</li>");
        }
    }

    // 点击会话列表显示聊天对话框   点击发送，发送消息
    function getMsgDialog (){
        var chatTargetId;
        $("#chatList").on("click", "li", function(){
            $(this).addClass("talking").siblings().removeClass("talking"); 
            chatTargetId = $(this).children('p.targetName').attr('id');
            conversationType = $(this).attr('conversationType');

            var chatTitle= $(".chatPartner").text();
            if(chatTitle != userInfos[chatTargetId].name){
                displayDialog(chatTargetId,conversationType);  //显示聊天对话框
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
        getHistoryMsg(chatTargetId,conversationType);
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
                updateChatList(message);    //有新的聊天内容时更新会话列表
                var index = $(".talking").index();
                $("#chatList").prepend($("#chatList li").eq(index));
                $("#messageContent").val(''); 
            },
            onError: function (errorCode,message) {
                console.log('发送文字消息失败' );
            }
        });
    }

    //消息监听有新的聊天内容 / 发送消息成功 时更新会话
    function updateChatList (message){
        var updateUserID = message.targetId;
        var updateContent = message.content.content;
        var ConversationType = message.conversationType;
        $('#'+updateUserID).next().text(updateContent);  //更新 最近联系人列表里显示的最后一条消息


        //更新 对话框的最新消息
        var chatHead = $(".chatPartner").text();
        var updateUserName = userInfos[updateUserID].name;      
        if(chatHead == updateUserName){    
            $(".chatMessages ul").append('<li><p>'+userInfos[message.senderUserId].name +' '+ now +'</p><p>' + message.content.content+'</p></li>');
            $(".chatMessages").scrollTop($(".chatMessages")[0].scrollHeight);   //聊天对话框滚动条保持在最底部
        }

        addRecentContact(updateUserID,ConversationType,updateContent);
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


    //发起新会话后 在发起者的最近联系人列表里添加联系人
    function addRecentContact (sessionId,ConversationType,content=undefined){
        var isExist= false;
        var list = getContactList();
        
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
            $("#chatList").prepend("<li conversationType ="+ ConversationType +">"+
                "<img src="+ userInfos[sessionId].avatar + " class='targetPortraitUri'>" +
                "<p class='targetName' id ="+sessionId + ">"+ userInfos[sessionId].name +"</p>"+
                "<p class='targetLastMsg'>"+ content +"</p>"
                +"</li>");
            if (!content){
                content = ' ';
                $("#chatList li").eq(0).trigger("click");
            }
        }
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


    //获取历史消息
    function getHistoryMsg(targetId,conversationNum){
        var conversationtype;
        if(conversationNum =='1' ){
           conversationtype = RongIMLib.ConversationType.PRIVATE;   // 私聊
        }
        else if(conversationNum == '3'){
            conversationtype = RongIMLib.ConversationType.GROUP;  //群组聊天
        }
         RongIMClient.getInstance().getHistoryMessages(conversationtype, targetId, null, 20, {
            onSuccess: function(list, hasMsg) {
                for (var i = 0; i < list.length; i++) {
                    $(".chatMessages ul").append('<li><p>'
                        +userInfos[list[i].senderUserId].name +' '+ formatDate(new Date(list[i].sentTime)) +'</p>'+
                        '<p>' + list[i].content.content+'</p></li>');
                        $(".chatMessages").scrollTop($(".chatMessages")[0].scrollHeight);  
                }
            },
            onError: function(error) {
                console.log('APP未开启消息漫游或处理异常');
            }
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
         
}); 