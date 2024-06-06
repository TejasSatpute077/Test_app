import React, {useEffect, useState} from 'react';
import {Button, View, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';

const Dashboard = () => {
  const navigation = useNavigation();
  const [StoredUsername, setStoredUsername] = useState('');
  const [userlocation, setUserLocation] = useState('');
  useEffect(() => {
    const GetUserLocation = async () => {
      try {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            console.log(location);
            setUserLocation(location);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      } catch (error) {
        // console.error('Error', error);
      }
    };
    const fetchUsername = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setStoredUsername(username);
        }
      } catch (error) {
        // console.error('Error', error);
      }
    };

    fetchUsername();
    GetUserLocation();
  }, []);

  const handlePress = () => {
    navigation.navigate('ProfilePage');
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing data:', error);
      Alert.alert('', 'Logout failed. Please try again.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.07,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: 20,
        }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
      <View
        style={{
          flex: 0.93,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{paddingVertical: 20, color: 'black', fontSize: 18}}>
          Welcome {StoredUsername}
        </Text>
        <Text style={{padding: 25, color: 'black', fontSize: 18}}>
          You are at Latitude {userlocation.latitude} and Longitude{' '}
          {userlocation.longitude}
        </Text>
        <Button title="Go to User list ➨" onPress={handlePress} />
      </View>
    </View>
  );
};

export default Dashboard;
