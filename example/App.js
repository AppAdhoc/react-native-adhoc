/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AdhocSDK from 'react-native-adhoc'
// import Adhoc from './Adhoc';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Alert,
  View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  render() {

     let platformContent;
    if (Platform.OS === 'android') {
      platformContent = (
      <View style={styles.container}>
        
        <Button  onPress={this._onPressButton} title='点击track' />
      
  
        <Button  onPress={this._onPressGetCurrentExperiments} title='当前进入试验信息'/>
    
      
        <Button  onPress={this._onPressButtonGetAsynBooleanFlag} title='异步获取一次变量boolean接口asynGetFlag'/>
      
      
        <Button  onPress={this._onPressButtonGetAsynStringFlag} title='异步获取一次变量string接口asynGetFlag'/>
      
      
        <Button  onPress={this._onPressButtonGetAsynNumberFlag} title='异步获取一次变量number接口asynGetFlag'/>
      
      
        <Button  onPress={this._onPressButtonGetFlagString} title='获取变量值(String)'/>
     

      
        <Button  onPress={this._onPressButtonGetFlagNumber} title='获取变量值(number)'/>
      

      
        <Button  onPress={this._onPressButtonGetFlagBoolean} title='获取变量值(boolean)'/>
      

      
        <Button  onPress={this._onPressButtonGetClientId} title='获取clientId'/>
      
      </View>)
    } else if(Platform.OS === 'ios') {
      platformContent = (
        <View style={styles.container}>
        <Button
          onPress={this.onButtonPressForGetFlag}
          title="Get Flag"/>
        <Button
          onPress={this.onButtonPressForAsyGetFlag}
          title="Asynchronous Get Flag"/>
        <Button
          onPress={this.onButtonPressForTrack}
          title="Track"/>
        <Button
          onPress={this.onButtonPressForTrackWithAttribute}
          title="Track With Attribute"/>
        <Button
          onPress={this.onButtonPressForTrackPageView}
          title="Track PageView"/>
        <Button
          onPress={this.onButtonPressForCurrentExperiments}
          title="Experiments"
        />
      </View>
    )}else{
<View style={styles.container}>
<Button
          onPress={this.onButtonPressForCurrentExperiments}
          title="Experiments"
        />
      </View>
      }

    return (
      <View style={styles.container}>

      { platformContent }
      </View>
    );
  }

  onButtonPressForGetFlag() {
    AdhocSDK.getFlag('flag_string','h', flagValue => {
      Alert.alert(
        'Adhoc Alert',
        flagValue.toString(),
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
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
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }

  onButtonPressForTrack() {
    AdhocSDK.track('stat_nameXXX', 7);

    Alert.alert(
      'Adhoc Alert',
      '已 Track',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  onButtonPressForTrackWithAttribute() {
    AdhocSDK.trackWithAttribute('stat_nameXXX', 7, {name: 'Tom', age: 18});

    Alert.alert(
      'Adhoc Alert',
      '已 Track With Attribute',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  onButtonPressForTrackPageView() {
    AdhocSDK.trackPageView();

    Alert.alert(
      'Adhoc Alert',
      '已 Track Page View',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  }

  onButtonPressForCurrentExperiments() {
    AdhocSDK.getCurrentExperimentsAndExperimentsID(experiments => {
      var jsonStr = JSON.stringify(experiments);

      Alert.alert('Adhoc Alert', jsonStr,[
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    });
  }


  _onPressButton() {
      AdhocSDK.track('flag_rn_click', 1);    
    }
    _onPressButtonGetAsynBooleanFlag() {
    
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
    // alert(value);
    Alert.alert(
      'Adhoc Alert',
      '已 Track With Attribute',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    );
  })}
}
    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
