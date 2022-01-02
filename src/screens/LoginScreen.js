import React, { useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { login } from '../Reducers/Reducer.js';


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

import {AppStyles} from '../AppStyles';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

function LoginScreen({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();

    useEffect(() => {
        GoogleSignin.configure({
            scopes:['email'],
            webClientId:
            '610870271008-q37ermlhf65t1lnoqcpsdsgcijojrjs1.apps.googleusercontent.com',
        });
      }, []);

    const [loggingIn, setloggingIn] = useState(false)

    
    const onPressGoogle = () => {
        setloggingIn(true);
        try {
          GoogleSignin.signIn()
          .then((data) => {
          // console.log('data', data);
          // Create a new Firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(
              data.idToken,
          );
          // Login with the credential
          // const accessToken = data.idToken;
          // AsyncStorage.setItem(
          //   '@loggedInUserID:googleCredentialAccessToken',
          //   accessToken,
          // );
          return auth().signInWithCredential(credential);
          })
          .then((result) => {
          setloggingIn(false);
          var user = result.user;
          // AsyncStorage.setItem('@loggedInUserID:id', user.uid);
          var userDict = {
              id: user.uid,
              fullname: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
          };
          
          console.log('data', userDict);
          firestore().collection('users').doc(user.uid).set(userDict);
          dispatch(login(userDict));
          navigation.navigate('Dashboard', {
              user: userDict,
          });
          })
          .catch((error) => {
          const {message} = error;
          setloggingIn(false);
          Alert.alert(message);
          });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          }
        }
    };

    
    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFC]}>
      {loggingIn ? (
        <ActivityIndicator
          style={{marginTop: 30}}
          size="large"
          animating={loggingIn}
          color={AppStyles.color.tint}
        />
      ) : (
        <GoogleSigninButton
          style={styles.googleContainer}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onPressGoogle}
        />
      )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    googleContainer: {
        width: 192,
        height: 48,
        marginTop: 30,
      },
})

export default LoginScreen;