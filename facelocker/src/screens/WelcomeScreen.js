import React from 'react';
import { View,Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

export default class WelcomeScreen extends React.Component {
    render () {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'brown', height: 800 }}>
                <Image 
                style={{ width: 80, height: 80, marginBottom: 10, marginTop: -200 }}
                source={require('../images/lockers.png')} />
                <Text style={{ fontWeight:'500', marginBottom: 100, color: 'white', fontSize: 30 }}>Facelocker</Text>
                <TouchableOpacity style={Style.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ textAlign: 'center',paddingVertical: 8 }}>Register</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={Style.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ textAlign:'center', paddingVertical: 8 }}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: 250,
        borderRadius: 7,
        height: 40,
        marginBottom: 20
    }
})