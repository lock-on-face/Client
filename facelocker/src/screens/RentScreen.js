import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, Button, TextInput, Modal, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import db from '../../firebase';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/cartman';
import axios from 'axios'

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
    },
    submitStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "red"
    },
    input: {
        borderBottomWidth: 1, 
        borderBottomColor: 'black',
        width: 300, 
        height: 50,
        marginTop: 10,
        color: 'black',
        fontSize: 18
    }
})

export default class RentScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            lockerNumber: '',
            listLocker: [],
            avatarSource: '',
            name: '',
            isLocked: '0',
            listItems: ''
        }
    }

    componentDidMount() {
        this.getAllLocker()
    }

    addNewUserToLocker = () => {
        console.log('masuk');
        axios({
            method: 'post',
            url: `http://35.240.133.234/locker`,
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
            url: `http://35.240.133.234/locker`
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

                const config = {
                    keyPrefix: "images/",
                    bucket: "image-face",
                    region: 'us-east-1',
                    accessKey: "AKIAJI5WVTIOMCSIO4NQ",
                    secretKey: "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",
                    successAction: 201
                }
                RNS3.put(source, config)
                    .then((response => {
                        let response_image = response.body.postResponse.location
                        // let imageFile = response_image.split('/')
                        console.log("ini dari s3", response.body)
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
        if (this.state.isLocked == '0') {
            db.ref('users/').set({
                isLocked: '1'
            })
    
            this.setState({
                isLocked: '1'
            })
        } else {
            db.ref('users/').set({
                isLocked: '0'
            })
    
            this.setState({
                isLocked: '0'
            })
        }
    }

    unlockSystem = () => {
        db.ref('users/').set({
            isLocked: '0'
        })

        this.setState({
            isLocked: '1'
        })
    }

    rentLocker = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            let lockerId = this.props.navigation.state.params.id
            let input = {
                rented: true,
                items: this.state.listItems.split(' ')
            }
            axios.put(`http://35.240.133.234/locker/${lockerId}`, input, { headers: {
                token  
            } })
            .then((result => {
                alert('succesfully rented locker')
                this.props.navigation.navigate("Landing")
            }))
            .catch((err => {
                alert('oops something went wrong')
            })) 
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#3fd3c4' }}>
                <View style={{ backgroundColor: '#9deae2', height: 60, elevation: 5, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.header}>
                        Rent Locker Number {this.props.navigation.state.params.number}
                    </Text>
                </View>
                <Button
                title="home"
                onPress={() => {
                    this.props.navigation.navigate("Landing")
                }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../images/locker1234.png')} />
                    <View style={{ elevation: 5, width:350, height: 60, backgroundColor: '#add9ed', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: '500', fontSize: 20, paddingVertical: 12, color: 'black' }}>LOCKER { this.props.navigation.state.params.number }</Text>
                    </View>
                    <View style={{ elevation: 5, width: 350, height: 100, backgroundColor: '#add9ed', alignItems: 'center', marginBottom: 20 }}>
                        <TextInput 
                        style={ styles.input }
                        onChangeText={(listItems) => this.setState({ listItems })}
                        placeholderTextColor="black"
                        placeholder="listItems" />
                    </View>
                    <View style={{ elevation: 5, width:350, height: 60, backgroundColor: '#add9ed', alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <AwesomeButtonRick 
                        type="secondary"
                        onPress={() => this.useCamera()}
                        >Upload Photo
                        </AwesomeButtonRick>
                        <TouchableOpacity
                        onPress={this.rentLocker}
                        >
                            <Text style={styles.submitStyle}>Rent Locker!</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>
                        {"\n"}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}