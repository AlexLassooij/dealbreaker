import React, { useState } from 'react'
import { AppStyles } from '../AppStyles';

import { View, StyleSheet, useColorScheme, TouchableOpacity, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import { logout } from '../Reducers/Reducer.js';
import H1 from '../FormattedComponents/H1.js';
import H2 from '../FormattedComponents/H2';
import H3 from '../FormattedComponents/H3';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOutOfGoogle } from '../backend/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
// Icon.loadFont().then();


function ProfileModal({navigation}) {
    const imageURL = useSelector((state) => state.authReducer.user.imageURL);
    const fullName = useSelector((state) => state.authReducer.user.fullName);
    const email = useSelector((state) => state.authReducer.user.email);

    const isDarkMode = useColorScheme() === 'dark';
    //const modalButton = <Icon name="upcircle" size={30} color={isDarkMode ? "white" : "black"} />;
    // const googleIcon = <Icon name="google" size={10} color="#EA4335" />;
    const dispatch = useDispatch();

    const handleSignout = async () => {
        await signOutOfGoogle();
        navigation.navigate("Login");
        dispatch(logout());       
    }

    return (
        <SafeAreaView style={[
            isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, 
            AppStyles.verticalContainerFS]}>
                <View 
                style={[AppStyles.BasicContentContainer, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}>
                    <View style={
                        styles.SignInInfoContainer
                        }>
                        <H2
                            text={"Signed In With"}
                        />
                        <Icon name="google" size={20} /*color="#EA4335"*/ />
                    </View>
                    
                    <Image
                        style={{height: 80, width: 80, borderRadius: 40, marginBottom: 30, marginTop: 30}}
                        source={{uri: imageURL}}
                    />
                    <H1
                        text={fullName}
                        style={{
                            marginBottom: 5,
                            fontWeight: "bold"
                        }}
                    />
                    <H3
                        text={email}
                        style={{marginBottom: 5}}
                    />
                    <TouchableOpacity 
                    onPress={handleSignout}    
                    style={styles.SignOutButton}           
                    >
                        <H2
                        style={{color: "red", padding: 6, fontWeight: 'bold'}}
                        text={"Sign Out"}
                        />
                    </TouchableOpacity>
               </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    SignInInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "65%",
    },
    // ProfileInfoContainer: {
    //     justifyContent: "flex-start",
    //     alignItems: "center",
    //     borderRadius: 10,
    //     width: "80%",
    //     minHeight: "45%",
    //     maxHeight: "85%",
    //     paddingTop: 40
    // },
    SignOutButton : {
        backgroundColor: "rgba(234, 173, 154, 0.6)",
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
        marginVertical: 60
    }
})


export default ProfileModal
