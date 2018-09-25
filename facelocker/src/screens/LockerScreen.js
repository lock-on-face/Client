import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput, Picker, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class LockerScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      lockerNumber: '',
      lockerList: []
    }
  }

  componentDidMount () {
    this.getAllLocker()
  }

  getAllLocker = () => {
    axios({
      method: 'get',
      url: `http://192.168.43.127:3000/locker`
    })
      .then((result) => {
        let lockers = result.data.data
        let list = []
        
        for (let i = 0; i < lockers.length; i++) {
          if (!lockers[i].rented) {
            list.push(lockers[i])
          }
        }

        this.setState({
          lockerList: list
        })

      })
      .catch((err) => {
        
      });
  }

  rentLocker = async () => {
    console.log('mask');
    const token = await AsyncStorage.getItem('token')
    axios({
      method: 'post',
      url: `http://192.168.0.107:3000/locker`,
      headers: {
        token: token
      },
      data: {
        serialNumber: this.state.lockerNumber
      }
    })
      .then((result) => {
        console.log(result.data);
        alert('Successfully rent a locker')
        this.props.navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.msg)
      });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#4189f4', paddingLeft: 5, paddingRight: 5 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Image 
          source={require('../images/123.png')} 
          style={{ width: 100, height: 80, marginTop: 50 }} />
          <Text style={{ marginTop: 30, color: "white", fontSize: 25, fontWeight: '500', fontFamily: 'sans-serif-medium' }}>Register Locker</Text>
        </View>
        <View style={{ flex: 2, marginTop: 50, alignItems: 'center' }}>
        <Text style={{ marginTop: 30, color: "white", fontSize: 20, fontWeight: '200', fontFamily: 'sans-serif-medium' }}>Select Locker</Text>
        <Picker
            selectedValue={this.state.lockerNumber}
            style={{ height: 50, width: 100, color: 'white' }}
            onValueChange={(itemValue, itemIndex) => this.setState({ lockerNumber: itemValue })}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
            <TouchableOpacity onPress={() => this.rentLocker()} style={{ height: 50, width: 250, backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}