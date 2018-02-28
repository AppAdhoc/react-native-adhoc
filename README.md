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

[Undo]

## API

[iOS API](documents/ios_api.md)

[Android API](documents/android_api.md)