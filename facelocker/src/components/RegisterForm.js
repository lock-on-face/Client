import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import axios from 'axios';
var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            phone: '',
            avatarSource: null
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
                image: this.state.avatarSource.uri
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

    useCamera = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', height: 620}}>
                <Image 
                    style={{ width: 80, height: 80, marginTop: 10, marginBottom: 10}}
                    source={require('../images/123.png')} />
                <Text style={{ fontWeight:'500', marginBottom: 40, color: 'white', fontSize: 30 }}>Register Form</Text>
                
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
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    placeholder="Password" 
                    onChangeText={(password) => this.setState({ password })} />

                <View style={{ marginTop: 15, marginLeft: -160 }}>
                    <Button 
                    title="Choose Avatar"
                    onPress={() => this.useCamera()} />
                </View>

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