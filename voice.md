# 融云声音库

## 声音库使用方法

### 引入声音库

```
<script src="http://cdn.ronghub.com/swfobject-2.0.0.min.js"></script>
<script src="lib/libamr-min-new.js"></script>
<script src="./voice.js"></script>
```

### 定义音频文件，base64码，AMR格式
实例中的音频消息：

```
<script src="./res/voice-amr-base64.json"></script>
```

### 初始化声音库
全局只需要 init 一次

```
RongIMLib.RongIMVoice.init();
```

### 播放声音

```
RongIMVoice.Player.play(voice);
/* 
	voice 为要播放的音频文件
 	onbeforeplay: 音频播放之前
 	onplayed: 音频开始播放
 	onended: 音频播放完成
 */
```

### 停止播放

```
RongIMVoice.Player.pause();
```

如果需要在微信浏览器或者 IOS 的 Safari 浏览器等使用，请引入

```
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="./weChatPlayVoice.js"></script>
```

微信浏览器播放语音 demo 使用方法

```
	......

	wx.ready(function () {
        play();  //此处执行的是 播放语音消息 方法
    });
```

IOS Safari 浏览器等 播放语音 demo 使用方法

```
	/*
		Safari 浏览器 明确指出等待用户的交互动作后才能播放 audio ，也就是说如果没有得到用户的 action 就播放的话就会被 safri 拦截
		将用户第一次的点击事件用 touchstart 触摸事件代替，随后在删除此触摸事件
	*/

	......

	document.getElementById('play').addEventListener("touchstart",function(event){
        play(); //此处执行的是 播放语音消息 方法
        window.removeEventListener('touchstart',play, false);
        event.stopPropagation(); 
    });
```
