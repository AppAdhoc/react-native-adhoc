## react-native-adhoc Android API


所有的 API 都能在 [react-native-adhoc/index.js](../index.js) 中查到。

引入 react-native-adhoc

```
import  AdhocSDK  from 'react-native-adhoc'
```

#### API

- getNumberFlag(String, Number, Function)

  获取后台设置的指定的Number类型实验变量的值，实验变量的名字注意与后台保持一致，Number为默认值参数
  
  ```
  AdhocSDK.getNumberFlag('flag_nameXXX', 1, flagValue => { // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
- getBooleanFlag(String, boolean, Function)

  获取后台设置的指定的Boolean类型实验变量的值，实验变量的名字注意与后台保持一致，boolean为默认值参数
  
  ```
  AdhocSDK.getBooleanFlag('flag_nameXXX', false, flagValue => { // false 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
- getStringFlag(String, String, Function)

  获取后台设置的指定的字符串类型实验变量的值，实验变量的名字注意与后台保持一致，String为默认值参数
  
  ```
  AdhocSDK.getStringFlag('flag_nameXXX', 'default_stringXXX', flagValue => { // default_stringXXX 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
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

  获取当前设备所在实验的实验名称和试验ID列表
  
  ```
  AdhocSDK.getCurrentExperiments(experiments => {
  
  });
  ```
  
- getClientId(Function)

  获取当前设备所在实验的实验名列表和实验ID
  
   ```
  AdhocSDK.getClientId(clientId => {
  
  });
  ```
- asynchronousGetNumberFlag(String, Number, Function)

  异步方式从服务器直接获取Number类型实验变量的值
  
  ```
  AdhocSDK.asynchronousGetNumberFlag('flagName', 1, flagValue => { // 1 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
- asynchronousGetStringFlag(String, String, Function)

  异步方式从服务器直接获取字符串类型实验变量的值
  
  ```
  AdhocSDK.asynchronousGetStringFlag('flagName', 'default_stringXXX', flagValue => { // default_stringXXX 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
- asynchronousGetBooleanFlag(String, boolean, Function)

  异步方式从服务器直接获取Bool类型实验变量的值
  
  ```
  AdhocSDK.asynchronousGetBooleanFlag('flagName', false, flagValue => { // false 是试验变量的默认值，即从后端没有获取到变量值的情况下，这个方法应该返回什么值。
  
  });
  ```
  