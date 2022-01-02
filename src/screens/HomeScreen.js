import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Button, useColorScheme } from 'react-native';
import { AppStyles } from "../AppStyles";
import H1 from '../FormattedComponents/H1';


function HomeScreen({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    return (
       <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFC]}>
           <Text style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.content}]}>
                Welcome !
            </Text>
           <Text style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.content}]}>
            Ready to strike some great deals ?
           </Text>
           <View style={AppStyles.fixToText}>
            <Button
                title="Log into your Account"                
                color={isDarkMode ? 'white' : 'black'}
                onPress={() => navigation.navigate("Login")}
            />
            
           </View>
           

       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        color: 'white'
    }
});


export default HomeScreen;