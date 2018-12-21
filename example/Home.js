/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AdhocSDK from 'react-native-adhoc'
import { StackNavigator } from 'react-navigation';

import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Alert,
  View
} from 'react-native';

type Props = {};
export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'AppAdhoc-示例',
  };
  render() {
    const { navigate } = this.props.navigation;
    let platformContent;
    if (Platform.OS === 'android') {
      platformContent = (
        <View style={styles.container}>
        <Button onPress={this._onPressButton} title="点击track指标"/>
        <Button onPress={this._onPressGetCurrentExperiments} title="获取当前设备已加入的试验信息" />
        <Button onPress={this._onPresstest} title="异步从网络获取一次变量(boolean)" />
        <Button onPress={this._onPressButtonGetAsynStringFlag} title="异步从网络获取一次变量(string)"/>
        <Button onPress={this._onPressButtonGetAsynNumberFlag} title="异步从网络获取一次变量(number)"/>
        <Button onPress={this._onPressButtonGetFlagString} title="获取变量值(string)"/>
        <Button onPress={this._onPressButtonGetFlagNumber} title="获取变量值(number)"/>
        <Button onPress={this._onPressButtonGetFlagBoolean} title="获取变量值(boolean)"/>
        <Button onPress={this._onPressButtonGetClientId} title="获取设备clientId" />
        <Button onPress={this._onPressButtonAddUserAttribute} title="设置用户自定义标签" />
        <Button onPress={this._onPressButtonFastGetStringFlag} title="使用fast接口(String)" />
        
      </View>
      )
    } else {
      platformContent = (
        <View style={styles.container}>
        <Button
          onPress={this.onButtonPressForGetFlag}
          title="Get Flag"/>
            <Button
          onPress={this.onButtonPressForGetFlagFast}
          title="Get Flag Fast"/>
        <Button
          onPress={this.onButtonPressForAsyGetFlag}
          title="Asynchronous Get Flag"/>
          <Button
          onPress={this.onButtonPressForGetClientId}
          title="Get Client ID"/>
        <Button
          onPress={this.onButtonPressForTrack}
          title="Track"/>
        <Button
          onPress={this.onButtonPressForTrackWithAttribute}
          title="Track With Attribute"/>
        <Button
          onPress={this.onButtonPressForCurrentExperiments}
          title="Experiments"/>
           <Button
          onPress={()=> { navigate('WebView'); }}
          title="WebView"/>
      </View>)
    }

    return (
      <View style={styles.container}>
      {platformContent}
      </View>
    );
  }

  onButtonPressForGetFlag() {
    AdhocSDK.getFlag('flag_string','h', flagValue => {
      Alert.alert(
        'Adhoc Alert',
        flagValue.toString(),
        [
          {Button: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }

  onButtonPressForGetFlagFast() {
    AdhocSDK.getFlagFast('flag_string','h', flagValue => {
      Alert.alert(
        'Adhoc Alert',
        flagValue.toString(),
        [
          {Button: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }

  onButtonPressForAsyGetFlag() {
    AdhocSDK.asynchronousGetFlag('flag_string','h', flagValue => {
      Alert.alert(
        'Adhoc Alert',
        flagValue.toString(),
        [
          {Button: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }
  onButtonPressForFastFlag() {
    AdhocSDK.fastGetFlag('flag_string','h', flagValue => {
      Alert.alert(
        'Adhoc Alert',
        flagValue.toString(),
        [
          {Button: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }
  onButtonPressForGetClientId() {
    AdhocSDK.getClientId((clientId) => {
      alert(clientId);
    })
  }

  onButtonPressForTrack() {
    AdhocSDK.track('stat_nameXXX', 7);

    Alert.alert(
      'Adhoc Alert',
      '已 Track',
      [
        {Button: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  onButtonPressForTrackWithAttribute() {
    AdhocSDK.trackWithAttribute('stat_nameXXX', 7, {name: 'Tom', age: 18});

    Alert.alert(
      'Adhoc Alert',
      '已 Track With Attribute',
      [
        {Button: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  _onPressButtonAddUserAttribute() {
    AdhocSDK.addUserAttribute('key','valueXXXX');

    Alert.alert(
      'Alert',
      '已添加用户自定义标签',
      [
        {Button: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  onButtonPressForCurrentExperiments() {
    AdhocSDK.getCurrentExperiments(experiments => {
      var jsonStr = JSON.stringify(experiments);

      Alert.alert('Adhoc Alert', jsonStr,[
          {Button: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }
  
  _onPressButton() {
    AdhocSDK.track('flag_rn_click', 1);
    alert("track ok");
  }

    _onPressButtonGetAsynBooleanFlag() {
    AdhocSDK.asynchronousGetBooleanFlag('flag_bool',false,(callback) => {
      alert(callback);
    })}

    _onPresstest() {
    AdhocSDK.asynchronousGetBooleanFlag('flag_bool',false,(callback) => {
      alert(callback);
    })}

    _onPressButtonGetAsynNumberFlag() {
    AdhocSDK.asynchronousGetNumberFlag('flag_int',6,(callback) => {
      alert(callback);
    })}

    _onPressButtonGetAsynStringFlag() {
    AdhocSDK.asynchronousGetStringFlag('flag_string','h',(callback) => {
      alert(callback);
    })}
    _onPressButtonFastGetStringFlag() {
    AdhocSDK.asynchronousGetStringFlag('flag_string','h',(callback) => {
      alert(callback);
    })}
    _onPressButtonGetFlagBoolean() {
    AdhocSDK.getBooleanFlag("flag_bool",false,callback =>{
      alert(callback);
    })}

    _onPressButtonGetFlagString() {
    AdhocSDK.getStringFlag("flag_string","h",callback =>{
      alert(callback);
    })}

    _onPressButtonGetFlagNumber() {
    AdhocSDK.getNumberFlag("flag_int",6,callback =>{
      alert(callback);
    })}
  
  _onPressButtonGetClientId() {
    AdhocSDK.getClientId((clientId) => {
    alert(clientId);
  })}

    _onPressGetCurrentExperiments() {
    AdhocSDK.getCurrentExperiments((value) => {
      alert(value);
    })
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
