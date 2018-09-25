import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor () {
        super()
        this.loadApp()
    }

    loadApp = async () => {
        const token = await AsyncStorage.getItem('token')
        const admin = await AsyncStorage.getItem('admin')

        // if (admin == 'admin') {
        //     this.props.navigation.navigate(token ? 'Admin' : 'Auth')
        // } else {
        //     this.props.navigation.navigate(token ? 'Landing' : 'Auth')
        // }
        this.props.navigation.navigate('Welcome')
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