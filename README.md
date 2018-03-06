[![tag](https://img.shields.io/badge/tag-1.0.0-blue.svg)](https://github.com/AppAdhoc/react-native-adhoc/releases)

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
config.appKey = @"ADHOC_XXX";
[AdhocSDK startWithConfigure:config options:launchOptions];
```

### Android SDK 初始化

在Application的onCreate方法中初始化原生SDK

```
AdhocConfig adhocConfig = new AdhocConfig.Builder()
        //设置App上下文(必要参数)
        .context(this)
        //设置Appkey(必要参数)
        .appKey("ADHOC_XXX")
        //全部配置参考官网
        .build();

AdhocTracker.init(adhocConfig);
```
### 实例代码
```
请运行example里面示例代码，查看api调用示例。
```
## API

[iOS API](documents/ios_api.md)

[Android API](documents/android_api.md)
