# react-native-adhoc

## 安装

```
npm install react-native-adhoc --save
```

## 配置

### 链接原生库

```
react-native link
```

### iOS SDK 初始化

找到 AppDelegate.m 文件， 引用头文件：

```#import "AdhocSDK.h"```

在 @selector(application:didFinishLaunchingWithOptions:) 中：

```
AdhocSDKConfig *config = [AdhocSDKConfig defaultConfig];
config.appKey = @“ADHOC_xxx”;
[AdhocSDK startWithConfigure:config options:launchOptions];
```

### Android SDK 初始化

在Application的onCreate方法中初始化原生SDK

```
AdhocConfig adhocConfig = new AdhocConfig.Builder()
        //设置App上下文(必要参数)
        .context(this)
        //设置Appkey(必要参数)
        .appKey(key)
        //全部配置参考官网
        .build();

AdhocTracker.init(adhocConfig);
```

## API

[iOS API](documents/ios_api.md)

[Android API](documents/android_api.md)