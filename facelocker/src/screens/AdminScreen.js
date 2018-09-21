import React from 'react';
import { View,Text,StyleSheet,ScrollView, Button, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

export default class AdminScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            lockerList: []
        }
    }

    componentDidMount () {
        this.getAllLocker()
    }

    getAllLocker = async () => {
        axios({
            method: 'get',
            url: `http://192.168.0.107:3002/locker`
          })
              .then((result) => {
                console.log(result.data.data);
                this.setState({
                  lockerList: result.data.data
                })
              })
              .catch((err) => {
                
              });
    }

    logout = async () => {
        await AsyncStorage.removeItem('token')
        this.props.navigation.navigate('Auth')
        alert('Logout Success')
    }


    render () {
        return (
            <View style={ Style.container }>
                <Image 
                    style={{ width: 120, height: 120, marginTop: 20 }}
                    source={require('../images/man.png')} />
                <Text style={{ fontWeight: '500', fontSize: 20 }}>Welcome Admin</Text>
                <Button 
                title="Logout"
                onPress={this.logout} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>Locker List</Text>
                    {
                        this.state.lockerList.map((list,index) => {
                            return (
                                <View key={index} style={{ width: 370, height: 50, backgroundColor: 'white', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={ Style.content }>Locker : { list.serialNumber }</Text>
                                    <Text style={ Style.content }>Owner : { list.owner.username }</Text>
                                    <TouchableOpacity style={{ width: 85, height: 30, marginTop: 10, alignItems: 'center', backgroundColor: 'navy' }}>
                                        <Text style={{ fontWeight: '500', paddingTop: 3, color: 'white' }}>Lock</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: 'orange', 
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
    },

    content: {
        // paddingHorizontal: 25,
        paddingVertical: 15,
        fontWeight: '500'
    }
})