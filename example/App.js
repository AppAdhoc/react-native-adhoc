/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import WebViewScreen from './WebView';

const Navigator = StackNavigator({
    Home: { screen: HomeScreen },
    WebView: { screen: WebViewScreen },
  });

export default class App extends Component<Props> {
  render() {
    return (
      <Navigator />
    );
  }
}
