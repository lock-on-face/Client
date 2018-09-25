import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import axios from 'axios';
var ImagePicker = require('react-native-image-picker');
import { RNS3 } from 'react-native-aws3';


// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
//   customButtons: [
//     {name: 'fb', title: 'Choose Photo from Facebook'},
//   ],
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
            avatarSource: 'https://image-face.s3.amazonaws.com/images%2FScreen+Shot+2018-09-11+at+8.01.27+PM.png',
            imageFile: 'https://image-face.s3.amazonaws.com/images%2FScreen+Shot+2018-09-11+at+8.01.27+PM.png'
        }
        this.registerUser = this.registerUser.bind(this)
    }

    registerUser () {
        axios({
            method: 'post',
            url: `http://35.240.133.234/users/signup`,
            data: {
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                image: this.state.avatarSource,
                imageFile: this.state.imageFile
            }
        })
        .then((result) => {
            alert(result.data.msg)
            // console.log(result);
            this.props.navigation.navigate('Login')
        })
        .catch((err) => {
            console.log(err.response);
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
              let source = { uri: response.uri, name: response.fileName, type: "image/png" };

              const config  = {
                keyPrefix : "images/",
                bucket : "image-face",
                region : 'us-east-1',
                accessKey : "AKIAIFBLS465UIB7KU4A",
                secretKey:  "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",
                successAction: 201
            }
                RNS3.put(source, config)
                .then((response => {
                    console.log("ini dari s3",response.body.postResponse)
                    // let response_image = response.body.postResponse.key
                    // let imageFile = response_image.split('/')
                    // console.log('imageku', imageFile[1]);
                    // this.setState({
                    //     avatarSource: response.body.postResponse.location,
                    //     imageFile: imageFile[1]
                    // });
                }))
          
              // You can also display the image using data:
            //   let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
            //   this.setState({
            //     avatarSource: source
            //   });
            }
          });
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#3fd3c4', flex: 1}}>
                <Image 
                    style={{ marginTop: 1, marginBottom: 1}}
                    source={require('../images/hantu2.png')} />
                
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
                    style={{ borderWidth: 1, width: 300, height: 50, borderRadius: 50, marginTop: 40, borderColor: '#4189f4', backgroundColor: 'white' }}
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
        color: 'white',
        fontSize: 18
    }
})