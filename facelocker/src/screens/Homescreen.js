import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            token: '',
            locker: '',
            userLogin: '',
            userEmail: '',
            userImage: '',
            avatarSource: null,
            userLocker: '',
            isLocked: '0'
        }
    }

    logout = async () => {
        await AsyncStorage.removeItem('token')
        this.props.navigation.navigate('Auth')
        alert('Logout Success')
    }

    componentDidMount() {
        this.getMe()
    }

    cekToken = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            token: token
        })
        axios({
            method: 'get',
            url: `http://192.168.0.107:3002/locker/self`,
            headers: {
                token: token
            }
        })
            .then((result) => {
                console.log(result.data.data[0])
                this.setState({
                    locker: result.data.data[0],
                    userLogin: result.data.data[0].owner.username,
                    userEmail: result.data.data[0].owner.email,
                    userImage: result.data.data[0].owner.image,
                    userLocker: result.data.data[0].serialNumber
                })
            })
            .catch((err) => {
                
            });
    }

    getMe = async () => {
        console.log('jalan');
        const id = await AsyncStorage.getItem('id')
        axios({
            method: 'get',
            url: `http://192.168.0.107:3002/users`
        })
            .then((result) => {
                this.cekToken()
                console.log('ahahhha', result.data.data);
                for (let i = 0; i < result.data.data.length; i++) {
                    if (result.data.data[i]._id == id) {
                        this.setState({
                            userLogin: result.data.data[i].username,
                            userEmail: result.data.data[i].email,
                        })
                    }
                }
            })
            .catch((err) => {
                
            });
    }

    lockSystem = () => {
        if(this.state.isLocked === '0') {
            axios.post('http://35.187.226.154/lockSys', {
                isLocked: '1'
            })
            .then(response => {
                console.log(response);
                this.setState({
                    isLocked: '1'
                })
            })
            .catch(err => {
                console.log(err.response);
            })
        } else if(this.state.isLocked === '1') {
            axios.post('http://35.187.226.154/lockSys', {
                isLocked: '0'
            })
            .then(response => {
                console.log(response);
                this.setState({
                    isLocked: '0'
                })
            })
            .catch(err => {
                console.log(err.response);
            })
        }
    }

    render () {
        return (
            <View style={ Style.container }>
                <Image
                style={{ width: 200, height: 200, marginTop: 20, zIndex: 2 }} 
                source={require('../images/man.png')} />
                <View style={{ backgroundColor: 'white', width: 350, height: 200, marginTop: -100 }}>
                <TouchableOpacity style={{ alignItems: 'flex-end', paddingTop: 7 }} onPress={this.logout}>
                    <Image 
                    source={require('../images/exit.png')} />
                </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 80, marginLeft: 68, marginBottom: 10 }}>
                        <Image 
                        source={require('../images/man-user.png')} />
                        <Text style={ Style.userText }>{this.state.userLogin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 68 }}>
                        <Image 
                        source={require('../images/close-envelope.png')} />
                        <Text style={ Style.userText }>{ this.state.userEmail }</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', width: 350, height: 300, marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 30 }}>My Locker</Text>
                    {
                        !this.state.locker ? (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Locker')} style={Style.button}>
                                <Text style={{ textAlign: 'center', paddingVertical: 12, color: 'white' }}>Register Locker</Text>
                            </TouchableOpacity>
                            {
                                this.state.isLocked == '0' ? (
                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.lockSystem}>
                                        <Image source={{uri: 'https://png.icons8.com/lock/win8/1600'}} style={{height: 50, width: 50}}/>
                                        <Text style={{ paddingLeft: 10, textAlign: 'center', paddingVertical: 12, color: 'black' }}>Unlock</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.lockSystem}>
                                        <Image source={{uri: 'https://png.icons8.com/unlock/win8/1600'}} style={{height: 50, width: 50}}/>
                                        <Text style={{ paddingLeft: 10, textAlign: 'center', paddingVertical: 12, color: 'black' }}>Lock</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </React.Fragment>
                        ) : (
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 15 }}>Locker : { this.state.userLocker }</Text>
                            <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 100 }}>Items : </Text>
                            <TouchableOpacity style={Style.button}>
                                <Text style={{ textAlign: 'center', paddingVertical: 12, color: 'white' }}>Lock Locker</Text>
                            </TouchableOpacity>
                        </View>
                        )
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
    }
})

