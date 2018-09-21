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
      url: `http://192.168.0.107:3002/locker`
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
      url: `http://192.168.0.107:3002/locker`,
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
      <ScrollView style={{ flex: 1, backgroundColor: 'orange', paddingLeft: 5, paddingRight: 5 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 50 }}>Register Locker</Text>
          <Image source={{ uri: 'https://ptetutorials.com/images/user-profile.png', height: 200, width: 200 }} />
        </View>
        <View style={{ flex: 2, marginTop: 50 }}>
          <TextInput placeholder="Locker Number" placeholderTextColor="white" style={{ borderBottomWidth: 1, borderBottomColor: "white", color: "white" }} />
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
            <TouchableOpacity onPress={() => this.rentLocker()} style={{ height: 50, width: 250, backgroundColor: "navy", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Picker
            selectedValue={this.state.lockerNumber}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ lockerNumber: itemValue })}>
            {
              this.state.lockerList.map((list,index) => {
                 return <Picker.Item label={list.serialNumber} value={list.serialNumber} />
              })
            }
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          </Picker>
        </View>
      </ScrollView>
    )
  }
}