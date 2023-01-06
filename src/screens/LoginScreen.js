import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Reducers/Reducer.js';
import { registerUser, getUserFromResult } from '../backend/firebase.js';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Config } from "react-native-config";
import Icon from 'react-native-vector-icons/FontAwesome';
const googleImage = require('../../resources/images/googleIcon.png')
// TODO figure out the import
// import { DocumentReference } from...


import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    useColorScheme
  } from 'react-native';

import {AppStyles} from '../AppStyles';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import H1 from '../FormattedComponents/H1.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import H3 from '../FormattedComponents/H3.js';

function LoginScreen({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();

    const [loggingIn, setLoggingIn] = useState(false);
    GoogleSignin.configure({
      scopes:['email'],
      webClientId: Config.WEBCLIENT_ID,
  });

    // async function signIn() {
    //   console.log('new method')
    //   const defaultUser = {
    //     "email": "alexander.lassooij@gmail.com",
    //     "UID": "yEoHAHrX0Fd0lsMnBpvP32pLNGG3",
    //     "fullName": "Alex Lassooij",
    //     "imageURL": "https://lh3.googleusercontent.com/a/AATXAJxcfI0XA0SdhrihcBEYtUuR5ALx3Va8fQ9wsM58=s96-c",
    //     "items": ['B01BUNHFQM', 'B09KTDSMHR'],
    //   };
    //   const user = await signInWithGoogle();
    //   console.log('logged in');
    //   dispatch(login(defaultUser));
    //   navigation.navigate('Dashboard');

    // }

    // NOTE : odd behaviour with sign in API, where code in the last 'then' block execute before
    // the promise would be resolved. All code (originally in ../backend/firebase.js) has now been moved
    // to this component
    async function signInWithGoogle() {
      setLoggingIn(true);
      try {
          GoogleSignin.signIn()
        .then((data) => {
        // console.log('data', data);
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
            data.idToken,
        );
        return auth().signInWithCredential(credential);
        })
        .then((result) => {
          const userResult = getUserFromResult(result);
          console.log('registering')
          const userEmail = userResult.email;
          const userRef = firestore().collection('users').doc(userEmail)
          userRef.get()
          .then((user) => {
            if (!user.exists) {
              const userObject = userObjectBuilder(userResult);
              console.log('creating new user', userObject);
              userRef
              .set(userObject)
              .then(async () => {
                console.log('New user added under ' + userEmail);
                const userDoc = await userRef.get();
                setLoggingIn(false);
                dispatch(login(userDoc.data()));
                navigation.navigate('Dashboard');
                // return userDoc.data();
              })
              .catch((err) => {
                setLoggingIn(false);
                Alert.alert("Error creating new user for " + userEmail + "\n" + err);
              });
            } else {
              const userData = user.data();
              console.log('user items 2' + userData.items);
              console.log('user email 2' + userData.email);
              setLoggingIn(false);
              dispatch(login(userData));
              navigation.navigate('Dashboard');
              // return user.data();
            }
          })
          .catch((err) => {
            setLoggingIn(false);
            Alert.alert("Error fetching user under " + userEmail + "\n" + err);
          })
        })
        .catch((error) => {
        const {message} = error;
        Alert.alert(message);
        });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert('Login Cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          alert('Signin in progress');
        }
      }
  };
    
    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFS]}>
      {false ? (
        <ActivityIndicator
          style={{marginTop: 30}}
          size="large"
          animating={loggingIn}
          color={AppStyles.color.tint}
        />
      ) : (
        <View style={styles.LoginContainer}>
          <H1
            text={'Sign up or Log in to continue'}
            style={{
              fontWeight: 'bold'
            }}
          />
          <TouchableOpacity
            style={[styles.SignInButton, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signInWithGoogle}
          >
            <H3
              style={{color: AppStyles.color.lightText, fontWeight: 'bold'}}
              text={'Sign in with Google'}
            />
            <Image
              style={{height: 30, width: 30}}
              source={googleImage}
          />

          </TouchableOpacity>

        </View>
      )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
      LoginContainer: {
        width: '100%',
        marginTop: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      SignInButton : {
        width: "60%",
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    }
})

export default LoginScreen;