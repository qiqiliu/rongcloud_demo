# 融云常见问题

## 一、引入 SDK （连接融云服务器）

### 参考文档：[http://www.rongcloud.cn/docs/web.html#sdk](http://www.rongcloud.cn/docs/web.html#sdk)

### IE9 下 RequireJS 加载时 protobuf 文件报错 (不支持 websocket 内核的浏览器会报错)
（1）通过 script 直接引入的方式，SDK 有判断，IE9 下使用长链接，并且不引入 protobuf
（2）如果是 Require 方式加载，需要加个判断，在不支持 websocket 的浏览器里不引入 protobuf，只在支持的浏览器引入
（3）RequireJS 加载 SDK demo: [https://rongcloud.github.io/websdk-demo/require.html](https://rongcloud.github.io/websdk-demo/require.html)


###  如何动态获取 token
（1）动态获取 token 需要在 APP server 端获取
（2）参考文档：[http://www.rongcloud.cn/docs/server.html#user_get_token](http://www.rongcloud.cn/docs/server.html#user_get_token)

### 播放声音

```
/* 
	voice: amr 格式的 base64 语音文件
 	onbeforeplay: 音频播放之前
 	onplayed: 音频开始播放
 	onended: 音频播放完成
 */

RongIMVoice.Player.play(voice, {
    onbeforeplay: function(){
        console.log('onbeforeplay');
    },
    onplayed: function(){
        console.log('onplayed');
    },
    onended: function(){
        console.log('onended');
    }
});

```

### 停止播放

```
RongIMVoice.Player.pause();
```

## 微信浏览器、IOS 的 Safari 浏览器等播放语音问题解决

如果需要在微信浏览器或者 IOS 的 Safari 浏览器等使用，请参考 voiceComponent.js demo

```
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="./voiceComponent.js"></script>
```

### 微信浏览器播放语音 demo 使用方法

```
......（ 判断是否为 微信浏览器 ）

wx.ready(function () {

   document.getElementById('play').addEventListener("touchstart",function(event){

	    RongIMVoice.Player.play(voice); //此处执行的是 播放语音消息 方法

	    window.removeEventListener('touchstart',RongIMVoice.Player.play(voice), false);
	    event.stopPropagation(); 
	});

});
```

### IOS Safari 浏览器等 播放语音 demo 使用方法

```
/*
	Safari 浏览器 明确指出等待用户的交互动作后才能播放 audio ，如果没有得到用户的 action 就播放的话就会被 safri 拦截
*/

......（ 判断是否为 IOS 浏览器 ）

document.getElementById('play').addEventListener("touchstart",function(event){

    RongIMVoice.Player.play(voice); //此处执行的是 播放语音消息 方法

    window.removeEventListener('touchstart',RongIMVoice.Player.play(voice), false);
    event.stopPropagation(); 
});
```
