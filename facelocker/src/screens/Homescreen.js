import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    render () {
        return (
            <View style={ Style.container }>
                <Image
                style={{ width: 200, height: 200, marginTop: 20, zIndex: 2 }} 
                source={require('../images/man.png')} />
                <View style={{ backgroundColor: 'white', width: 350, height: 200, marginTop: -100 }}>
                    <View style={{ flexDirection: 'row', marginTop: 110, marginLeft: 68, marginBottom: 10 }}>
                        <Image 
                        source={require('../images/man-user.png')} />
                        <Text style={ Style.userText }>wisnugautama</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image 
                        source={require('../images/close-envelope.png')} />
                        <Text style={ Style.userText }>wisnugautama@gmail.com</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', width: 350, height: 300, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={Style.button}>
                        <Text style={{ textAlign: 'center', paddingVertical: 12, color: 'white' }}>Register Locker</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: 'brown', 
        height: 800, 
        alignItems: 'center'
    },

    userText: {
        marginLeft: 10, 
        paddingVertical: 3,
        fontWeight: '500'
    },

    button: {
        borderWidth: 2,
        backgroundColor: 'navy',
        width: 250,
        height: 50,
        borderColor: 'white',
        borderRadius: 5
    }
})

