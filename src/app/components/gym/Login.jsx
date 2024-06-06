import React from 'react';
import {Text, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/LoginandRegister/LoginandRegister';

const Login = ({navigation}) => {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = async (values, {resetForm}) => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (values.email === storedEmail && values.password === storedPassword) {
        await AsyncStorage.setItem('isLogin', '1');
        resetForm();
        navigation.navigate('Dashboard');
      } else {
        Alert.alert(
          'Invalid credentials',
          'Please check your email and password and try again.',
        );
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      Alert.alert('', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginandregisterHONEtext}>Login</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => handleLogin(values, actions)}>
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

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.loginregisterbuttonbg}>
              <Text style={[styles.loginregistertext, {fontWeight: 700}]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{paddingTop: 10}}>
        <Text style={styles.switchtoregister}>New User ? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
