import React from 'react';
import { View,Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

export default class WelcomeScreen extends React.Component {
    render () {
        return (
            <View style={{ flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor: '#4189f4' }}>
                <Image 
                style={{  marginBottom: 100,  }}
                source={require('../images/hantu2.png')} />
                <TouchableOpacity style={Style.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ textAlign: 'center',paddingVertical: 8 }}>REGISTER</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={Style.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ textAlign:'center', paddingVertical: 8 }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: 300,
        borderRadius: 50,
        height: 45,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4189f4',
        fontWeight: '500'
    }
})