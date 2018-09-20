import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput } from 'react-native';

export default class LockerScreen extends React.Component {
    render () {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'brown', paddingLeft: 5, paddingRight: 5}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                  <Text style={{color: "white", fontSize: 50}}>Register Locker</Text>
                  <Image source={{uri: 'https://ptetutorials.com/images/user-profile.png', height: 200, width: 200}}/>
                </View>
                <View style={{flex: 2, marginTop: 50}}>
                  <TextInput placeholder="Locker Number" placeholderTextColor="white" style={{borderBottomWidth: 1, borderBottomColor: "white", color: "white"}}/>
                  <View style={{justifyContent: "center", alignItems: "center", marginTop: 30}}>
                    <TouchableOpacity style={{height: 50, width: 250, backgroundColor: "navy", justifyContent: "center", alignItems: "center", borderRadius: 10}}>
                      <Text style={{color: "white", fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
        )
    }
}