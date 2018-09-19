## react-native-adhoc iOS API


所有的 API 都能在 [react-native-adhoc/index.js](../index.js) 中查到。

引入 react-native-adhoc

```
import  AdhocSDK  from 'react-native-adhoc'
```

#### API

- getFlag(String, Any, Function)

  获取后台设置的指定的实验变量的值，实验变量的名字注意与后台保持一致
  
  ```
  AdhocSDK.getFlag('flag_nameXXX', 1, flagValue => { // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
  
- track(String, Number)
  
  统计需要的优化指标，用以实现科学有效的测试
  
  ```
  AdhocSDK.track('stat_nameXXX', 1); // 1 是指标增加值。
  ```
  
- trackWithAttribute(String, Number, Dictionary)

  统计需要的优化指标（可以添加附加信息），用以实现科学有效的测试 

  ```
  AdhocSDK.trackWithAttribute('stat_nameXXX', 1, {name: 'Tom', age: 18}); // 1 是指标增加值， {name: 'Tom', age: 18} 是多维度统计需要的维度和值。
  ```

- trackPageView()

  统计页面 PV
  
  ```
  AdhocSDK.trackPageView();
  ```
 
- getCurrentExperiments(Function)

  获取当前设备所在实验的实验名列表
  
  ```
  AdhocSDK.getCurrentExperiments(experiments => {
  
  });
  ```

- asynchronousGetFlag(String, Any, Function)

  异步方式从服务器直接获取实验变量的值
  
  ```
  AdhocSDK.asynchronousGetFlag('flagName', 1, flagValue => {  // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
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
