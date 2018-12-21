[![tag](https://img.shields.io/badge/tag-2.0.1-blue.svg)](https://github.com/AppAdhoc/react-native-adhoc/releases)

# react-native-adhoc

## 安装

```
npm install react-native-adhoc --save
```

## 注意

* 安装完后，需要执行 `react-native link`。如果出错了，手动配置一下即可，具体可参考[手动配置](documents/manual.md)

## 配置

### 链接原生库

```
react-native link
```

### iOS SDK 初始化

找到 AppDelegate.m 文件， 引用头文件：

```
#import <AdhocSDK/AdhocSDK.h>
```

在 @selector(application:didFinishLaunchingWithOptions:) 中：

```
AdhocSDKConfig *config = [AdhocSDKConfig defaultConfig];
config.appKey = @"ADHOC_XXX";
[AdhocSDK startWithConfigure:config options:launchOptions];
```

### Android SDK 初始化

在 Application的onCreate 方法中初始化原生 SDK

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
### 示例代码
```
请运行 example 里面示例代码，查看 API 调用示例。
```
## API

[iOS API](documents/ios_api.md)

[Android API](documents/android_api.md)
