// Libs
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

// Screens
import {HomeScreen, LoginScreen, ProfileScreen, TimeLogScreen} from 'screens';

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Config
import {SCREENS} from 'config';

// Types
import {AuthStackParamsList, TabStackParamsList} from 'types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();
const Tab = createMaterialBottomTabNavigator<TabStackParamsList>();

function TabStackScreens() {
  return (
    <Tab.Navigator initialRouteName={SCREENS.Home}>
      <Tab.Screen
        name={SCREENS.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.TimeLog}
        component={TimeLogScreen}
        options={{
          tabBarLabel: 'Time Log',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clock-outline" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStackScreens() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREENS.Login}>
      <AuthStack.Screen name={SCREENS.Login} component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

const Navigator = () => {
  const isSignedIn: boolean = true;

  return (
    <NavigationContainer>
      {isSignedIn ? <TabStackScreens /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};

export default Navigator;
