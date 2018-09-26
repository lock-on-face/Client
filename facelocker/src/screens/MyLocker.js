import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/cartman';
import axios from 'axios'
import db from '../../firebase';

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
        fontSize: 20,
        fontWeight: "bold",
        color: "yellow"
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

class MyLocker extends Component {
    state = {
        isLocked: '0',
        lockerList: []
    }

    componentDidMount = () => {
        this.myLocker()
    }
    
    spread = (array) => {
        let string = ''
        array.forEach((item) => {
            string += item
            string += " "
        })
        return string
    }

    myLocker = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('http://35.240.133.234/locker/self', { headers: { token } })
        .then((result => {
            let { data: lockers } = result.data
            let lockerList = lockers.filter((locker) => {
                return (
                    locker.rented == true
                )
            })
            this.setState({
                lockerList
            }, () => {
                console.log(this.state.lockerList)
            })
        }))
        .catch((err => {
            console.log(err)
        }))
    }

    lockSystem = () => {
        if (this.state.isLocked == '0') {
            db.ref('user/').set({
                user: '1'
            })
    
            this.setState({
                isLocked: '1'
            })
        } else {
            db.ref('user/').set({
                user: '0'
            })
    
            this.setState({
                isLocked: '0'
            })
        }
    }

    unlockSystem = () => {
        db.ref('user/').set({
            isLocked: '0'
        })

        this.setState({
            isLocked: '1'
        })
    }

    stopRent = async (id) => {
        let input = {
            rented: false,
            isLocked: false,
            item: ''
        }
        let token = await AsyncStorage.getItem("token")
        axios.put(`http://35.240.133.234/locker/${id}`, input, { headers: { token } })
        .then((result => {
            alert("succsfully dismissed locker")
            this.myLocker()
        }))
        .catch((err => {
            alert("failed to dismiss locker")
        }))
    }   

    lockerLooper = () => {
        let { lockerList } = this.state
        if (lockerList.length !== 0) {
            return (
                lockerList.map((locker, id) => {
                    return (
                        <View key={id} style={{ flex: 1, borderWidth: 2, borderColor: "green", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                <Text style={styles.wordFont}>
                                    LOCKER NUMBER: {locker.serialNumber}
                                </Text>
                                <Text style={styles.wordFont}>
                                    ITEMS IN LOCKER: {this.spread(locker.items)}
                                </Text>
                                <Text>{"\n"}</Text>
                                <AwesomeButtonRick 
                                type="secondary"
                                onPress={() => {this.stopRent(locker._id)}}
                                >Stop Rent
                                </AwesomeButtonRick>
                                <Text>{"\n"}</Text>
                                {
                                    this.state.isLocked == '0' ? (<TouchableOpacity style={{ bottom: 0 }} onPress={() => this.lockSystem()}>
                                        <Image
                                            source={require('../images/lock.png')} />
                                    </TouchableOpacity>) : (<TouchableOpacity style={{ bottom: 0 }} onPress={() => this.lockSystem()}>
                                        <Image
                                            source={require('../images/unlocked.png')} />
                                    </TouchableOpacity>)
                                }
                                
                        </View>
                    )
                })
            )
        } else {
            return (
                <Text>
                    You Havent rented any lockers yet
                </Text>     
            )
        }
    }

    render() { 
        return ( 
            <View style={{ flex: 1, backgroundColor: '#3fd3c4' }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#9deae2" }}>
                    <Text style={styles.header}>MANAGE YOUR LOCKERS</Text>
                </View>
                <Button
                title="home"
                onPress={() => {
                    this.props.navigation.navigate("Landing")
                }}
                />
                <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
                    <View style={{ height: 500, width: 400, flexDirection: "column", backgroundColor: "tomato" }}>
                        { this.lockerLooper() }
                    </View>
                </View>
            </View>    
        );
    }
}
 
export default MyLocker;