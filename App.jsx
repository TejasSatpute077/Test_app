import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './src/app/components/gym/Dashboard';
import Register from './src/app/components/gym/Register';
import Welcome from './src/app/components/gym/Welcome';
import ProfilePage from './src/app/components/gym/ProfilePage';
import Login from './src/app/components/gym/Login';
const Stack = createStackNavigator();

const commonOptions = {
  headerTransparent: true,
  headerTitleStyle: {
    display: 'none',
  },
  headerLeft: null,
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={commonOptions}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={commonOptions}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerLeft: null,
            headerStyle: {
              backgroundColor: 'deepskyblue',
            },
          }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            title: 'User List',
            headerStyle: {
              backgroundColor: 'deepskyblue',
            },
          }}
        />
        <Stack.Screen name="Login" component={Login} options={commonOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
