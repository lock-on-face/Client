import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, Button, TextInput, Modal } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';
import db from '../../firebase';
var ImagePicker = require('react-native-image-picker');
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

const styles = StyleSheet.create({
    user: {
        width: 350,
        height: 50
    },
    header: {
        fontSize: 20,
        color: "#3eb7d2",
        fontWeight: "bold"
    },
    userContainer: {
        width: 400,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    wordFont: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#1f6691"
    },
    lockerFont: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f6691",
        textAlign: "center"
    }
})

export default class RentScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            lockerNumber: '',
            listLocker: [],
            avatarSource: '',
            name: ''
        }
    }

    componentDidMount () {
        this.getAllLocker()
    }

    addNewUserToLocker = () => {
        console.log('masuk');
        axios({
            method: 'post',
            url: `http://192.168.0.107:3000/locker`,
            data: {
              serialNumber: this.props.navigation.state.params.number,
              image: this.state.avatarSource,
              name: this.state.name
            }
        })
            .then((result) => {
              console.log(result.data);
              alert('Successfully rent a locker')
              this.props.navigation.navigate('Landing')
            })
            .catch((err) => {
              console.log(err.response);
              alert(err.response.data.msg)
            });
    }

    getAllLocker = () => {
        axios({
            method: 'get',
            url: `http://192.168.0.107:3000/locker`
        })
            .then((result) => {
                let lockers = result.data.data
                let new_lockers = []
                for (let i = 0; i < lockers.length; i++) {
                    if (lockers[i].serialNumber == this.props.navigation.state.params.number) {
                        new_lockers.push(lockers[i])
                    }

                    this.setState({
                        listLocker: new_lockers
                    })
                }
            })
            .catch((err) => {
                console.log(err.response);
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
                accessKey : "AKIAJI5WVTIOMCSIO4NQ",
                secretKey:  "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",
                successAction: 201
            }
                RNS3.put(source, config)
                .then((response => {
                    let response_image = response.body.postResponse.location
                    // let imageFile = response_image.split('/')
                    console.log("ini dari s3",response.body)
                    // console.log('imageku', imageFile[1]);
                    this.setState({
                        avatarSource: response_image,
                        // imageFile: imageFile[1]
                    });
                }))
          
              // You can also display the image using data:
            //   let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
            //   this.setState({
            //     avatarSource: source
            //   });
            }
          });
    }

    lockSystem = () => {
        db.ref('users/').set({
            isLocked: '1'
        })
    }

    unlockSystem = () => {
        db.ref('users/').set({
            isLocked: '0'
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#3fd3c4' }}>
                <View style={{ backgroundColor: '#9deae2', height: 60, elevation: 5 , justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.header}>
                        Rent Locker Number { this.props.navigation.getParam("number")}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../images/locker1234.png')} />

                    <View style={{ width:350, height: 60, borderBottomWidth: 2, borderBottomColor: 'white', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: '500', fontSize: 20, paddingVertical: 12, color: 'white' }}>LOCKER { this.props.navigation.state.params.number }</Text>
                    </View>

                    <View style={{ width:350, height: 60, alignItems: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 20, paddingVertical: 12, color: 'white' }}>REGISTER USER</Text>
                    </View>

                    <View style={{ elevation: 5, width:350, height: 60, backgroundColor: 'white', alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TextInput placeholder="Add user"
                        onChangeText={(name) => this.setState({ name })} />

                        <Button 
                        title="Choose Avatar"
                        onPress={() => this.useCamera()} />

                        <Button 
                        onPress={() => this.addNewUserToLocker()}
                        title="Submit"
                         />
                    </View>

                    <View style={{ elevation: 5, width:350, height: 100, backgroundColor: 'white', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ marginBottom: 6, alignItems: 'flex-start', fontWeight: '500', color: 'black', fontSize: 15 }}>USER</Text>
                        {
                            this.state.listLocker.map((locker,index) => {
                                return (
                                    <View key={index}>
                                        <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: -150 }}>
                                            <Image 
                                                style={{ width: 60, height: 60, borderRadius: 60, borderWidth: 2, borderColor: 'white' }}
                                                source={{ uri: locker.image }} />
                                            <Text style={{ paddingVertical: 12, paddingLeft: 10, fontWeight: '500', fontSize: 20, color: 'black' }}>{ locker.name }</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View>
                        <TouchableOpacity style={{ bottom: 0 }} onPress={() => this.lockSystem()}>
                            <Image 
                            source={require('../images/lock.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}