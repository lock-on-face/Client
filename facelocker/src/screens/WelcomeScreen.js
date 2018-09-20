import React from 'react';
import { View,Text, Image, StyleSheet,TouchableOpacity, ImageBackground } from 'react-native';

export default class WelcomeScreen extends React.Component {
    render () {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', height: 800 }}>
                <Image 
                style={{ width: 80, height: 80, marginBottom: 10,  }}
                source={require('../images/123.png')} />
                <Text style={{ fontWeight:'500', marginBottom: 220, color: 'white', fontSize: 30 }}>Facelocker</Text>
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
        width: 300,
        // borderRadius: 7,
        height: 40,
        marginBottom: 20
    }
})