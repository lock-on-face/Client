import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, Button } from 'react-native';
import { RNS3 } from 'react-native-aws3';
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

export default class RentScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            lockerNumber: ''
        }
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
                    // let response_image = response.body.postResponse.key
                    // let imageFile = response_image.split('/')
                    console.log("ini dari s3",response.body)
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4189f4' }}>
                <View style={{ backgroundColor: '#4189f4', height: 60, elevation: 5 }}>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../images/locker1234.png')} />

                    <View style={{ elevation: 5, width:350, height: 60, backgroundColor: 'white', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: '500', fontSize: 20, paddingVertical: 12, color: 'black' }}>LOCKER { this.props.navigation.state.params.number }</Text>
                    </View>

                    <View style={{ elevation: 5, width:350, height: 60, backgroundColor: 'white', alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button 
                        title="Choose Avatar"
                        onPress={() => this.useCamera()} />

                        <Button 
                        title="Submit"
                         />
                    </View>

                    <View style={{ elevation: 5, width:350, height: 160, backgroundColor: 'white', alignItems: 'center', marginBottom: 20 }}>

                    </View>

                    <View>
                        <TouchableOpacity style={{ bottom: 0 }}>
                            <Image 
                            source={require('../images/lock.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}