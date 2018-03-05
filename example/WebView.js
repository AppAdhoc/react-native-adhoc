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
  WebView,
  View
} from 'react-native';

type Props = {};
export default class WebViewScreen extends Component<Props> {
    static navigationOptions = {
        title: 'WebView',
    };
  render() {
    return (
         <WebView
         ref={'webview'}
         style={styles.container}
         source={require('./index.html')}
         onMessage={(e) => {
            AdhocSDK.handleWebViewMessage(this.refs.webview, e.nativeEvent.data);
        }} />
    );
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
