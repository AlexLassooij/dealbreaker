import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';


import DashboardHeader from './FormattedComponents/DashboardHeader';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductWatch from './screens/ProductWatch';
import NewProduct from './screens/NewProduct';
import CustomHeader from './FormattedComponents/DashboardHeader';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Dashboard = () => (
    <Tab.Navigator
        initialRouteName="ProductWatch"          
    >  
        <Tab.Screen name="ProductWatch" component={ProductWatch} options={{
            title: 'Product Watch'
        }} />
        <Tab.Screen name="NewProduct" component={NewProduct} options={{
            title: 'Add Product'
        }}/>

    </Tab.Navigator>
);

// each Screen in a stack is passed navigation prop
const LoginStack = () => (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
          headerShown: true,
          headerStyle: {
              backgroundColor: "red",
              height: 60
          }
    }}
    >
      <Stack.Screen name="Welcome" component={HomeScreen} options={{
          headerShown: false,
      }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false,
      }}/> 
      <Stack.Screen name="Dashboard" component={Dashboard} options={({navigation}) => {
          return {
            headerTitle: () => <DashboardHeader navigation={navigation} />,
          }
      }   
      }/>
    </Stack.Navigator>
  );

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="LoginStack"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
    </NavigationContainer>
  );

export default AppNavigator;