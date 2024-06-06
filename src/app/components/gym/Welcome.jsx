import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/welcomescreen/welcomepagestyle';
const Welcome = () => {
  const navigation = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Retrieve isRegistered from AsyncStorage
      const storedIsLogin = await AsyncStorage.getItem('isRegistered');
      const storedIsRegistered = await AsyncStorage.getItem('isRegistered');

      if (storedIsRegistered === '0') {
        navigation.navigate('Register');
      } else {
        if (storedIsLogin === '1') {
          setIsRegistered(true);
          navigation.navigate('Dashboard');
        } else {
          setIsRegistered(false);
          navigation.navigate('Login');
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/demo.webp')}
        style={styles.image}
      />
    </View>
  );
};
export default Welcome;
