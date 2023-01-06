import React from 'react';
import { useColorScheme, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductWatch from './screens/ProductWatch';
import NewProductSearch from './screens/NewProductSearch';
import AddItemScreen from './screens/AddItemScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import ProfileModal from './screens/ProfileModal';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const searchResultStack = createStackNavigator();

const SearchStack = () => (
    <searchResultStack.Navigator
        initialRouteName='SearchResults'
    >
        <searchResultStack.Screen name="SearchResults" component={SearchResultScreen} options={{
            title: 'Search Results',
            headerBackTitle: 'Search'
        }}/>
        <searchResultStack.Screen name="SearchItem" component={AddItemScreen} options={{
            title: 'Add Item'
        }}/>
        
    </searchResultStack.Navigator>
)

const Dashboard = () => (
    <SafeAreaInsetsContext.Consumer>
        {insets => 
            <Tab.Navigator
                initialRouteName="ProductWatch"  
                keyboardDismissMode='on-drag' 
                initialLayout={{
                    width: Dimensions.get('window').width
                }}
                style={{ marginTop: insets.top}}
                >  
                <Tab.Screen name="ProductWatch" component={ProductWatch} options={{
                    title: 'Product Watch'
                }} />
                <Tab.Screen name="NewProduct" component={NewProductSearch} options={{
                    title: 'Add Product'
                    }}/>
                <Tab.Screen name="Profile" component={ProfileModal} options={{
                title: 'Profile'
                }}/>
            </Tab.Navigator>
        }      
    </SafeAreaInsetsContext.Consumer>
);

// each Screen in a stack is passed navigation prop
// removed dashboard header, will be a separate tab,
// or separate components (not part of native header), slide modal from right
// return {
//     headerTitle: () => <DashboardHeader navigation={navigation} />,
//   }
const LoginStack = () => {
    return(
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
          headerShown: false,
    }}
    >
      <Stack.Screen name="Welcome" component={HomeScreen} 
      />
      <Stack.Screen name="Login" component={LoginScreen} 
      /> 
      <Stack.Screen name="Dashboard" component={Dashboard} 
      />
      <Stack.Screen name="SearchStack" component={SearchStack} 
      />
    </Stack.Navigator>
    )};

const AppNavigator = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return(
    <NavigationContainer 
        theme={isDarkMode ? DarkTheme : DefaultTheme}
    >
        <Stack.Navigator
        initialRouteName="LoginStack"
        screenOptions={{
            headerShown: false
            }}>
        <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default AppNavigator;