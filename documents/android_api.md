## react-native-adhoc Android API


所有的 API 都能在 [react-native-adhoc/index.js](../index.js) 中查到。

引入 react-native-adhoc

```
import  AdhocSDK  from 'react-native-adhoc'
```

#### API

- getFlag(String, Number, Function)

  获取后台设置的指定的实验变量的值，实验变量的名字注意与后台保持一致
  
  ```
  AdhocSDK.getFlag('flag_nameXXX', 7, flagValue => {
  
  });
  ```
  
- track(String, Number)
  
  统计需要的优化指标，用以实现科学有效的测试
  
  ```
  AdhocSDK.track('stat_nameXXX', 7);
  ```
  
- trackWithAttribute(String, Number, Dictionary)

  统计需要的优化指标（可以添加附加信息），用以实现科学有效的测试 

  ```
  AdhocSDK.trackWithAttribute('stat_nameXXX', 7, {name: 'Tom', age: 18});
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
  
- getCurrentExperimentsAndExperimentsID(Function)

  获取当前设备所在实验的实验名列表和实验ID
  
   ```
  AdhocSDK.getCurrentExperimentsAndExperimentsID(experiments => {
  
  });
  ```
- getClientId(Function)

  获取当前设备所在实验的实验名列表和实验ID
  
   ```
  AdhocSDK.getClientId(clientId => {
  
  });
  ```
- asynchronousGetFlag(String, Object, Number, Function)

  异步方式从服务器直接获取实验变量的值
  
  ```
  AdhocSDK.asynchronousGetFlag('flagName', 'defaultValue', 10, flagValue => {
  
  });
  ```
  