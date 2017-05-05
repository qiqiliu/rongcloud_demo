# 融云声音库

## 声音库使用方法

### 引入声音库

```
<script src="http://cdn.ronghub.com/swfobject-2.0.0.min.js"></script>
<script src="lib/libamr-min-new.js"></script>
<script src="./voice.js"></script>
```

如果需要在微信浏览器或者 IOS 的 Safari 浏览器等使用，请引入

```
<script src="./weChatPlayVoice.js"></script>
```

### 定义音频文件，base64码，AMR格式
实例中的音频消息：

```
<script src="./res/voice-amr-base64.json"></script>
```

### 初始化声音库
在 RongIMClient.init之后，全局只init一次

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




融云 RongCloud 官网
[http://www.rongcloud.cn](http://www.rongcloud.cn)

SealTalk 全平台 App 下载
[http://www.rongcloud.cn/downloads](http://www.rongcloud.cn/downloads)

SealTalk iOS 开源项目
[https://github.com/sealtalk/sealtalk-ios](https://github.com/sealtalk/sealtalk-ios)

SealTalk Android 开源项目
[https://github.com/sealtalk/sealtalk-android](https://github.com/sealtalk/sealtalk-android)

SealTalk Desktop 开源项目
[https://github.com/sealtalk/sealtalk-desktop](https://github.com/sealtalk/sealtalk-desktop) 支持 Windows 和 Mac 平台

SealTalk Web 开源项目
[https://github.com/sealtalk/sealtalk-web](https://github.com/sealtalk/sealtalk-web)

融云 RongCloud 服务端 API SDK in Node.js [https://github.com/rongcloud/server-sdk-nodejs](https://github.com/rongcloud/server-sdk-nodejs)
