import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor () {
        super()
        this.loadApp()
    }

    loadApp = async () => {
        const token = await AsyncStorage.getItem('token')
        this.props.navigation.navigate(token ? 'Home' : 'Auth')
    }

    render () {
        return (
            <View style={ style.container }>
                <ActivityIndicator />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})