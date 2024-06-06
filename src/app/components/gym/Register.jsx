import React from 'react';
import {Text, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/LoginandRegister/LoginandRegister';

const Register = ({navigation}) => {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone number must be 10 characters')
      .required('Phone number is required'),
  });

  const handleRegister = async values => {
    try {
      await AsyncStorage.setItem('username', values.username);
      await AsyncStorage.setItem('email', values.email);
      await AsyncStorage.setItem('password', values.password);
      await AsyncStorage.setItem('address', values.address);
      await AsyncStorage.setItem('phoneNumber', values.phoneNumber);
      await AsyncStorage.setItem('isRegistered', '1');

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error storing data:', error);
      Alert.alert('', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginandregisterHONEtext}>Register</Text>
      <Text style={styles.loginandregisterHTWOtext}>Create your account</Text>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => handleRegister(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <LinearGradient
              colors={['#f5fffa', '#f5fffa']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearlayoutinput}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="Username"
                placeholderTextColor="black"
              />
            </LinearGradient>
            {errors.username && touched.username && (
              <Text style={{color: 'red', paddingStart: 30}}>
                {errors.username}
              </Text>
            )}

            <LinearGradient
              colors={['#f5fffa', '#f5fffa']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearlayoutinput}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                placeholderTextColor="black"

              />
            </LinearGradient>
            {errors.email && touched.email && (
              <Text style={{color: 'red', paddingStart: 30}}>
                {errors.email}
              </Text>
            )}

            <LinearGradient
              colors={['#f5fffa', '#f5fffa']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearlayoutinput}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry
              />
            </LinearGradient>

            {errors.password && touched.password && (
              <Text style={{color: 'red', paddingStart: 30}}>
                {errors.password}
              </Text>
            )}

            <LinearGradient
              colors={['#f5fffa', '#f5fffa']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearlayoutinput}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Phone Number"
                placeholderTextColor="black"
              />
            </LinearGradient>

            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={{color: 'red', paddingStart: 30}}>
                {errors.phoneNumber}
              </Text>
            )}

            <LinearGradient
              colors={['#f5fffa', '#f5fffa']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearlayoutinput}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                placeholder="Address"
                placeholderTextColor="black"
              />
            </LinearGradient>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.loginregisterbuttonbg}>
              <Text style={[styles.loginregistertext, {fontWeight: 700}]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{paddingTop: 10}}>
        <Text style={styles.switchtoregister}>Already a user ? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
