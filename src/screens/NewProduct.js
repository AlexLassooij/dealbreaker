import React from 'react'

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

function NewProduct() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFC]}
        >
            <Text style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.content}]}>
                Add a new product to watch !
            </Text>

        </SafeAreaView>
    )
}


export default NewProduct