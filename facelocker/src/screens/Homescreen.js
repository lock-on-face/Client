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
            isLocked: '0',
            userPhone: ''
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
            url: `http://192.168.43.127:3002/locker/self`,
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
                    userLocker: result.data.data[0].serialNumber,
                    userPhone: result.data.data[0].owner.phone,
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
            url: `http://192.168.43.127:3002/users`
        })
            .then((result) => {
                this.cekToken()
                console.log('ahahhha', result.data.data);
                for (let i = 0; i < result.data.data.length; i++) {
                    if (result.data.data[i]._id == id) {
                        this.setState({
                            userLogin: result.data.data[i].username,
                            userEmail: result.data.data[i].email,
                            userPhone: result.data.data[i].phone,
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
                <View style={{ flexDirection: 'row', marginLeft: 320, paddingVertical: 5 }}>
                    <Text style={{ paddingTop: 5, color: 'white', fontWeight: '500' }}>Logout</Text>
                    <TouchableOpacity onPress={this.logout}>
                        <Image 
                        source={require('../images/exit.png')} />
                    </TouchableOpacity>
                </View>
                <Image
                style={{ width: 200, height: 200, marginTop: 1, marginBottom: 30}} 
                source={require('../images/man.png')} />

                <View style={{ width: 350, height: 185, backgroundColor: 'white',borderRadius: 5 }}>
                    <Text style={{ fontWeight: '500', fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif-medium' }}>Profile</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 10 }}>
                        <Image 
                            source={require('../images/user.png')} />
                        <Text style={{ fontWeight: '500', fontSize: 20, marginLeft: 10, fontFamily: 'sans-serif-medium' }}>{ this.state.userLogin }</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <Image 
                        source={require('../images/email.png')} />
                        <Text style={{ fontWeight: '500', fontSize: 20, marginLeft: 10, fontFamily: 'sans-serif-medium' }}>{ this.state.userEmail }</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <Image 
                        source={require('../images/phone.png')} />
                        <Text style={{ fontWeight: '500', fontSize: 20, marginLeft: 10 }}>{ this.state.userPhone }</Text>
                    </View>
                </View>

                <View style={{ width: 350, height: 70, backgroundColor: 'white', marginTop: 20, borderRadius: 5, justifyContent: 'center' }}> 
                    <Text style={{ fontWeight: '500', fontSize: 15, marginLeft: 10, fontFamily: 'sans-serif-medium', marginBottom: 5 }}>Locker : { this.state.userLocker }</Text>
                    <Text style={{ fontWeight: '500', fontSize: 15, marginLeft: 10, fontFamily: 'sans-serif-medium' }}>Items   : </Text>
                </View>
                <View>
                {
                        !this.state.locker ? (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Locker')} style={Style.button}>
                                <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'white', fontWeight: '500', fontSize: 17 }}>Register Locker</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        ) : (
                        <View>
                            {
                                this.state.isLocked == '0' ? (
                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.lockSystem}>
                                        <Image source={{uri: 'https://png.icons8.com/lock/win8/1600'}} style={{height: 50, width: 50, marginTop: 20 }}/>
                                        <Text style={{ paddingLeft: 10, textAlign: 'center', paddingVertical: 12, color: 'black' }}>Unlock</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.lockSystem}>
                                        <Image source={{uri: 'https://png.icons8.com/unlock/win8/1600'}} style={{height: 50, width: 50}}/>
                                        <Text style={{ paddingLeft: 10, textAlign: 'center', paddingVertical: 12, color: 'black' }}>Lock</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        )
                    }
                </View>
                
                {/* <View style={{ backgroundColor: 'white', width: 350, height: 300, marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 30 }}>My Locker</Text>
                    {
                        !this.state.locker ? (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Locker')} style={Style.button}>
                                <Text style={{ textAlign: 'center', paddingVertical: 12, color: 'white' }}>Register Locker</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        ) : (
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 15 }}>Locker : { this.state.userLocker }</Text>
                            <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 100 }}>Items : </Text>
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
                        </View>
                        )
                    }
                </View> */}
            </View>
        )
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#4189f4', 
        height: 800, 
        alignItems: 'center',
        
    },

    userText: {
        marginLeft: 10, 
        paddingVertical: 3,
        fontWeight: '500'
    },

    button: {
        borderWidth: 2,
        backgroundColor: 'orange',
        width: 250,
        height: 50,
        borderColor: 'white',
        marginTop: 25, 
        borderRadius: 50
    }
})

