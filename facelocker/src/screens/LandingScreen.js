import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default class LandingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4189f4' }}>
                <View style={{ backgroundColor: '#4189f4', height: 60, elevation: 5 }}>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ marginTop: 30, marginBottom: 70 }}
                        source={require('../images/locker1234.png')} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'orange', borderRadius: 100, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', elevation: 5 }}
                        onPress={() => this.props.navigation.navigate('Rent', { number: '1' })} >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>LOCKER 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: 'orange', borderRadius: 100, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', elevation: 5 }}
                        number="2"
                        onPress={() => this.props.navigation.navigate('Rent', { number: '2' })} >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>LOCKER 2</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}