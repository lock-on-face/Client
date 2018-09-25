import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import axios from "axios"

const styles = StyleSheet.create({
    user: {
        width: 350,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
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
        fontSize: 25,
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

export default class LandingScreen extends React.Component {
    state = {
        emptyLockers : []
    }

    componentDidMount =  () => {
        axios.get("http://192.168.1.108:3000/locker")
        .then((result => {
            let lockerList = result.data.data
            let emptyLockers = lockerList.filter((locker) => {
                return locker.rented == false;
            })
            this.setState({
                emptyLockers
            })
        }))
        .catch((err => {
            console.log(err)
        }))        
    }

    lockerList = () => {
        let { emptyLockers } = this.state
        if (emptyLockers.length == 0) {
           return (
               <Text style={styles.header}>
                   NO LOCKERS AVAILABLE
               </Text>
           ) 
        } else {
            return (
                emptyLockers.map((locker, id) => {
                    return (
                        <TouchableOpacity
                            key={id}
                            style={{ backgroundColor: '#c0ed90', borderRadius: 70, width: 70, height: 70, alignItems: 'center', justifyContent: 'center', elevation: 5 }}
                            onPress={() => this.props.navigation.navigate('Rent', { number: locker.serialNumber })} >
                            <Text style={{ color: '#88b25b', fontSize: 12, fontWeight: '500' }}>{locker.serialNumber}</Text>
                        </TouchableOpacity>
                    )
                })
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#3fd3c4' }}>
                <View style={{ height: 60, elevation: 5, alignItems: "center", justifyContent: "center", backgroundColor: "#9deae2" }}>
                    <Text style={styles.header}>++ 思毛 Locker Page 家吉 ++</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text>
                        {"\n"}
                    </Text>
                    <View style={styles.user}>
                        <Text style={styles.wordFont}>
                            Rent A Locker!
                            {"\n"}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ marginTop: 30, marginBottom: 30 }}
                        source={require('../images/locker1234.png')} />
                </View>
                <Text style={styles.lockerFont}>
                    Lockers Available:
                </Text>
                <Text>
                    {"\n"}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    { this.lockerList()}
                </View>
            </View>
        )
    }
}