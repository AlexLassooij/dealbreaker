import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, useColorScheme } from 'react-native';
import { AppStyles } from "../AppStyles";
import H1 from '../FormattedComponents/H1';
import H2 from '../FormattedComponents/H2';
import Icon from 'react-native-vector-icons/FontAwesome';

import notifee, { AuthorizationStatus } from '@notifee/react-native';

async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
}

function HomeScreen({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        async function getPermission() {
            await requestUserPermission();
        }
        getPermission();
    }, 
    []);

    return (
       <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFS]}>
           <View style={styles.welcomeDialogBox}>
            <H1 style={{
                marginTop: 80,
                fontWeight: 'bold'
            }
            }
                text={'Welcome to dealbreaker'}
            />
                <Icon name="binoculars" size={40}/>
                <H2 style={[]}
                text={'Ready to strike some great deals ?'}
            />
           </View>
           
           <View style={AppStyles.fixToText}>
           <TouchableOpacity 
                onPress={() => navigation.navigate("Login")}
                underlayColor='#fff'   
                style={[styles.StartButton, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}           
                >
                    <H2
                    style={{color: AppStyles.color.lightText, fontWeight: 'bold'}}
                    text={"Get Started"}
                    />
            </TouchableOpacity>
           </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    welcomeDialogBox : {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "40%"
    },
    StartButton : {
        width: "50%",
        marginVertical: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    }
});

export default HomeScreen;