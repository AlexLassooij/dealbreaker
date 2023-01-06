import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { search } from '../Reducers/Reducer.js';
import { performSearch } from '../backend/searchLogic.js';



import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    SafeAreaView,
    useColorScheme
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import H1 from '../FormattedComponents/H1.js';
import H2 from '../FormattedComponents/H2.js';
import Icon from 'react-native-vector-icons/FontAwesome';

function NewProductSearch({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const [searchText, setsearchText] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async () => {
        const searchResults = await performSearch(searchText);
        dispatch(search(searchResults))
        navigation.navigate('SearchStack');
    }

    return (
        <SafeAreaView style={[
            isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, 
            AppStyles.verticalContainerFS]}>
            <H1 style={{
                paddingTop: 40,
                fontWeight: "bold",
                textAlign: "center"
            }}
                text={'Add a new product \n to your watch'}
            />
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: 225,
                marginVertical: 30
            }}>
                <Icon name="bullseye" size={40} color={"red"}/>
                <Icon name="arrow-right" size={40} color={AppStyles.color.lightText}/>
                <Icon name="binoculars" size={40}/>
            </View>
            <TextInput 
            style={[AppStyles.textInputBox, {width: 300}, isDarkMode ? [AppStyles.darkBorderColor, AppStyles.semiDarkBackground] : [AppStyles.lightBorderColor, AppStyles.semiLightBackground]]}
            placeholder="Search by product name"
            placeholderTextColor="black"
            onChangeText={setsearchText}
            value={searchText}
            />
            <TouchableOpacity 
                onPress={() => handleSearch(searchText)}                  
                underlayColor='#fff'   
                style={[styles.SearchButton, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}           
                >
                    <H2
                    style={{color: AppStyles.color.lightText, fontWeight: 'bold'}}
                    text={"Search"}
                    />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    SearchButton : {
        width: 300,
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    textInputBox: { 
    },   
    loginText: {
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
})

export default NewProductSearch