## react-native-adhoc iOS API


所有的 API 都能在 [react-native-adhoc/index.js](../index.js) 中查到。

引入 react-native-adhoc

```
import  AdhocSDK  from 'react-native-adhoc'
```

#### API

- getFlag(String, Any, Function)

  获取后台设置的指定的试验变量的值，试验变量的名字注意与后台保持一致
  
  ```
  AdhocSDK.getFlag('flag_nameXXX', 1, flagValue => { // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
  
- getFlagFast(String, Any, Function)

  异步方式从缓存直接获取试验变量的值，并检查更新本地 flags 数据
  
  ```
  AdhocSDK.getFlagFast('flagName', 1, flagValue => {  // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
  
- asynchronousGetFlag(String, Any, Function)

  异步方式从服务器直接获取试验变量的值
  
  ```
  AdhocSDK.asynchronousGetFlag('flagName', 1, flagValue => {  // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
  
- track(String, Number)
  
  统计需要的优化指标，用以实现科学有效的测试
  
  ```
  AdhocSDK.track('stat_nameXXX', 1); // stat_nameXXX 是指标名称；1 是指标增加值。
  ```
  
- trackWithAttribute(String, Number, Dictionary)

  统计需要的优化指标（可以添加附加信息），用以实现科学有效的测试 

  ```
  AdhocSDK.trackWithAttribute('stat_nameXXX', 1, {name: 'Tom', age: 18}); // stat_nameXXX 是指标名称；1 是指标增加值， {name: 'Tom', age: 18} 是多维度统计需要的维度和值。
  ```

- trackPageView()

  统计页面 PV
  
  ```
  AdhocSDK.trackPageView();
  ```
 
- getCurrentExperiments(Function)

   获取当前设备所在试验的试验名列表
   1.数组中只有 CONTROL，代表未进入任何试验
   2.数组中存在一个或多个字典，代表进入一个或多个试验，字典内容如下：``{ id: "试验版本 ID", name: "试验名称"}``
  
  ```
  AdhocSDK.getCurrentExperiments(experiments => {
  
  });
  ```
  
- getClientId(Function)
  
  获取 ClientID
  
  ```
  AdhocSDK.getClientId(clientId => {
  
  });
  ```
  
- handleWebViewMessage(Object, String)

  WebView 调用 flag 接口
  
  ```
    <WebView
            ref={'webview'}
            source={require('./index.html')}
            style={styles.container}
            onMessage={(e) => {
              AdhocSDK.handleWebViewMessage(this.refs.webview, e.nativeEvent.data);
            }}
          />
  ```

#### 从 Xcode 中移除 AdhocSDK 

使用 ``react-native unlink react-native-adhoc`` 命令