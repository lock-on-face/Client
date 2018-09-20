import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import axios from 'axios';

export default class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            phone: ''
        }
        this.registerUser = this.registerUser.bind(this)
    }

    registerUser () {
        axios({
            method: 'post',
            url: `http://192.168.0.107:3002/users/signup`,
            data: {
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                image: 'hahaha'
            }
        })
        .then((result) => {
            alert(result.data.msg)
            // console.log(result);
            this.props.navigation.navigate('Login')
        })
        .catch((err) => {
            // console.log(err.response);
            alert(err.response.data.msg)
        });
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'brown', height: 620}}>
                <Image 
                    style={{ width: 80, height: 80, marginTop: 10, marginBottom: 10}}
                    source={require('../images/lockers.png')} />
                <Text style={{ fontWeight:'500', marginBottom: 40, color: 'white', fontSize: 30 }}>Facelocker</Text>
                
                <TextInput 
                    style={ Style.input }
                    placeholderTextColor="white"
                    placeholder="Username" 
                    onChangeText={(username) => this.setState({ username })} />

                <TextInput 
                    style={ Style.input }
                    placeholderTextColor="white"
                    placeholder="Email" 
                    onChangeText={(email) => this.setState({ email })} />

                <TextInput 
                    style={ Style.input }
                    placeholderTextColor="white"
                    placeholder="Phone" 
                    onChangeText={(phone) => this.setState({ phone })} />

                <TextInput 
                    style={ Style.input }
                    placeholderTextColor="white"
                    placeholder="Password" 
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableOpacity 
                    style={{ borderWidth: 1, width: 300, height: 50, borderRadius: 3, marginTop: 40, borderColor: 'yellow', backgroundColor: 'white' }}
                    onPress={this.registerUser}>
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