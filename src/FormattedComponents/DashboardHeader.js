import React from 'react'

import { View, StyleSheet, useColorScheme, TouchableOpacity, Image } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Reducers/Reducer.js';


function DashboardHeader({navigation}) {
    const imageURL = useSelector((state) => state.authReducer.user.imageURL);
    console.log("inside header \n" + imageURL)
    const dispatch = useDispatch();

    signOut = async () => {
        try {
          await GoogleSignin.signOut();
          navigation.goBack();
          dispatch(logout());        
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View style={styles.header}>
            <View>
                <TouchableOpacity 
                    onPress={() => {
                      signOut();
                    }}               
                >
                    <Image
                        style={{height: 40, width: 40}}
                        source={{uri: imageURL}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DashboardHeader 

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
