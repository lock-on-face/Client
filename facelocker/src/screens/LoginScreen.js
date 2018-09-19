import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import LoginForm from '../components/LoginForm';

export default class LoginScreen extends React.Component {
    render () {
        return (
            <LoginForm navigation={ this.props.navigation }/>
        )
    }
}
