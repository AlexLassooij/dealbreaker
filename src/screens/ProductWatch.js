import React from 'react'
import { logout } from '../Reducers/Reducer.js';


import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    useColorScheme
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import { useSelector } from 'react-redux';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


function ProductWatch({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector((state) => state.auth.user);
  // console.log("userId : " + user.id);
  // console.log("userName : " + user.fullname);
  // console.log("userIdEmail : " + user.email);
  // console.log("userphoto : " + user.photoURL);

  

  React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "example",
            headerRight: () => (
                <Button 
                    onPress={() => {
                      signOut();
                      navigation.goBack();
                    }}
                    title="Sign Out"
                />
            )
            });
    }, [navigation]);

    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFC]}>
          <Text style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.content}]}>
            Here are your products that are on watch !
          </Text>
        </SafeAreaView>
    )
}


export default ProductWatch