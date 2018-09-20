import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            token: '',
            locker: '',
            userLogin: '',
            userEmail: '',
            userImage: '',
        }
    }

    componentDidMount() {
        this.cekToken()
    }

    cekToken = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log('token inh',token);
        this.setState({
            token: token
        })
        axios({
            method: 'get',
            url: `http://192.168.0.107:3002/locker/self`,
            headers: {
                token: token
            }
        })
            .then((result) => {
                console.log(result.data.data[0])
                this.setState({
                    locker: result.data.data[0],
                    userLogin: result.data.data[0].owner.username,
                    userEmail: result.data.data[0].owner.email,
                    userImage: result.data.data[0].owner.image
                })
            })
            .catch((err) => {
                
            });
    }

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
                        <Text style={ Style.userText }>{this.state.userLogin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 68 }}>
                        <Image 
                        source={require('../images/close-envelope.png')} />
                        <Text style={ Style.userText }>{ this.state.userEmail }</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', width: 350, height: 300, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        !this.state.locker ? (<TouchableOpacity style={Style.button}>
                            <Text style={{ textAlign: 'center', paddingVertical: 12, color: 'white' }}>Register Locker</Text>
                        </TouchableOpacity>) : (<Text>HEHE</Text>)
                    }
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

