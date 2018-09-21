/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/Homescreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AdminScreen from './src/screens/AdminScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <SwitchScreen />
    );
  }
}

const WelcomeStackNavigator = createStackNavigator({
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },

    Register: {
      screen: RegisterScreen
    },

    Login: {
      screen: LoginScreen
    }
})

const HomeStackNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },
})

const SwitchScreen = createSwitchNavigator({
    Loading: AuthLoadingScreen,
    Auth: WelcomeStackNavigator,
    Home: HomeStackNavigator,
    Admin: AdminScreen
})

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
