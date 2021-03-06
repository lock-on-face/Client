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
        let { username, password } = this.state
        let credentials = {
            username,
            password
        }
        axios({
            method: 'post',
            url: `http://35.240.133.234/users/signin`,
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((result) => {
            AsyncStorage.setItem('token', result.data.token)
            AsyncStorage.setItem('id', result.data.id)
            this.props.navigation.navigate('Landing')
        })
        .catch((err) => {
            alert('login gagal')
            // console.log(err.message);
        });
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3fd3c4'}}>
                <Image 
                style={{marginTop: -50, marginBottom: 10}}
                source={require('../images/hantu2.png')} />
                {/* <Text style={{ fontWeight:'500', marginBottom: 40, color: '#e5d80e', fontSize: 30 }}>Login Form</Text> */}
                
                <TextInput 
                style={ Style.input }
                onChangeText={(username) => this.setState({ username })}
                placeholderTextColor="white"
                placeholder="Username / Email" />

                <TextInput 
                style={ Style.input }
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                placeholderTextColor="white"
                placeholder="Password" />

                <TouchableOpacity 
                style={{ borderWidth: 1, width: 300, height: 50, borderRadius: 50, marginTop: 40, borderColor: 'yellow', backgroundColor: 'white' }}
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
        color: 'white',
        fontSize: 18
    }
})