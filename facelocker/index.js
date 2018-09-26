/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.ignoredYellowBox = true
// console.ignoredYellowBox = ['Virtual', 'Warning']
console.ignoredYellowBox = [
    'Setting a timer'
    ];

AppRegistry.registerComponent(appName, () => App);
