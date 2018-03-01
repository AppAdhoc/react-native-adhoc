/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AdhocSDK from 'react-native-adhoc'

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
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onButtonPressForGetFlag}
          title="Get Flag"
        />
        <Button
          onPress={this.onButtonPressForAsyGetFlag}
          title="Asynchronous Get Flag"
        />
        <Button
          onPress={this.onButtonPressForTrack}
          title="Track"
        />
        <Button
          onPress={this.onButtonPressForTrackWithAttribute}
          title="Track With Attribute"
        />
        <Button
          onPress={this.onButtonPressForTrackPageView}
          title="Track PageView"
        />
        <Button
          onPress={this.onButtonPressForCurrentExperiments}
          title="Experiments"
        />
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
