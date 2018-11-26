#### Manual

如果 react-native link 出错，可用按以下步骤手动配置。

##### iOS

不建议使用手动添加，使用命令 react-native link 进行配置。如果卸载 SDK 请使用 react-native unlink

##### Android


**android/settings.gradle**

```gradle
include ':react-native-adhoc'
project(':react-native-adhoc').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-adhoc/android')
```

**android/app/build.gradle**

```gradle
dependencies {
   ...
   compile project(':react-native-adhoc')
}
```

**MainApplication.java**

打开 app 下的 MainApplication.java 文件，引入AppadhocPackage:

```java
import com.appadhoc.module.AppadhocPackage;
```

然后加入 AppadhocPackage.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new AppadhocPackage()
    );
}
```
