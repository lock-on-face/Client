import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    Login = () => {
        console.log('tes');
        axios({
            method: 'post',
            url: `http://192.168.0.10:3002/users/signin`,
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((result) => {
            console.log(result.data);
            AsyncStorage.setItem('token', result.data.token)
            AsyncStorage.setItem('id', result.data.id)
            alert('login sukses')
            this.props.navigation.navigate('Home')
        })
        .catch((err) => {
            alert('login gagal')
            console.log(err.message);
        });
        // this.props.navigation.navigate('Home')
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', height: 603.5}}>
                <Image 
                style={{ width: 80, height: 80, marginTop: 10, marginBottom: 10}}
                source={require('../images/123.png')} />
                <Text style={{ fontWeight:'500', marginBottom: 40, color: 'white', fontSize: 30 }}>Login Form</Text>
                
                <TextInput 
                style={ Style.input }
                onChangeText={(username) => this.setState({ username })}
                placeholderTextColor="white"
                placeholder="Username" />

                <TextInput 
                style={ Style.input }
                onChangeText={(password) => this.setState({ password })}
                placeholderTextColor="white"
                placeholder="Password" />

                <TouchableOpacity 
                style={{ borderWidth: 1, width: 300, height: 50, borderRadius: 3, marginTop: 40, borderColor: 'yellow', backgroundColor: 'white' }}
                onPress={() => this.Login()}>
                    <Text style={{ textAlign: 'center', paddingVertical: 12 }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const Style = StyleSheet.create({
    input: {
        borderBottomWidth: 1, 
        borderBottomColor: 'white',
        width: 300, 
        height: 50,
        marginTop: 10,
        color: 'white'
    }
})