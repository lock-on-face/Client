import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native'
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

class MyLocker extends Component {
    state = {
        isLocked: '0',
        lockerList: []
    }

    componentDidMount = () => {
        this.myLocker()
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

    lockerLooper = () => {
        alert("see if this works")
        let { lockerList } = this.state
        if (lockerList.length !== 0) {
            return (
                lockerList.map((locker) => {
                    return (
                        <View style={{ flex: 1 , backgroundColor="add9ed", borderWidth: 0.5, borderColor="black" }}>

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
                    <Text style={styles.header}>ABC</Text>
                </View>
                <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
                    <View style={{ height: 500, width: 400, borderWidth: 0.5, borderColor: "black", alignItems: "center", justifyContent: "center"}}>
                        { this.lockerLooper() }
                    </View>
                </View>
            </View>    
        );
    }
}
 
export default MyLocker;