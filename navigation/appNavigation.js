import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ScanScreen from '../screens/ScanScreen';

const Stack = createNativeStackNavigator();

export default function appNavigation() {

    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Add New" component={AddScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            
        </Stack.Navigator>
      </NavigationContainer>
    );
  }