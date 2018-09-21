import React from 'react';
import { View,Text,StyleSheet,ScrollView, Button, TouchableOpacity, AsyncStorage } from 'react-native';
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
                <Text>Welcome Admin</Text>
                <Button 
                title="lokot"
                onPress={this.logout} />
                <View style={{ alignItems: 'center' }}>
                    <Text>Locker List</Text>
                    {
                        this.state.lockerList.map((list,index) => {
                            return (
                                <View key={index} style={{ width: 370, height: 50, backgroundColor: 'white', marginBottom: 20, flexDirection: 'row' }}>
                                    <Text style={ Style.content }>Locker : { list.serialNumber }</Text>
                                    <Text style={ Style.content }>Owner : { list.owner.username }</Text>
                                    <TouchableOpacity>
                                        <Text style={ Style.content }>Lock</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})