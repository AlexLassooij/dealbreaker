import React from 'react'

import { View, Button, StyleSheet } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { logout } from '../Reducers/Reducer.js';


function DashboardHeader({navigation}) {
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
            <Button 
                    onPress={() => {
                      signOut();
                    }}
                    title="Sign Out"
                />
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
