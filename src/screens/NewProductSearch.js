import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../Reducers/Reducer.js';
import { performSearch } from '../backend/searchLogic.js';
import H1 from '../FormattedComponents/H1.js';
import H2 from '../FormattedComponents/H2.js';
import { evaluatePrice } from '../backend/firebase.js';


import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    SafeAreaView,
    useColorScheme
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import ProfileModal from './ProfileModal.js';
import Icon from 'react-native-vector-icons/FontAwesome';

function NewProductSearch({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const [searchText, setsearchText] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async () => {
        // const searchResults = await performSearch(searchText);
        // searchResults.forEach((element) => {
        //     console.log(element);
        // })
        console.log("after search");
        // const searchResults = [{
        //     "ASIN": "B0B994MLRF",
        //     "description": "$23.29 with Subscribe & Save discountFREE delivery Thu, Jan 5 on your first order",
        //     "imageURL": "https://m.media-amazon.com/images/I/71MeMykp94L._AC_UL320_.jpg",
        //     "priceDec": "52",
	    //     "priceInt": "24.",
        //     "title": "Vega Essentials Nutritional Shake Protein Powder Raspberry Blackberry, (18 Servings) 619g"
        // }]
        const item = {
            ASIN: "B09YMK5LPZ",
            description: " FREE delivery Tue, Jan 10 Or fastest delivery Sun, Jan 8 More buying choices$854.10(7 used & new offers) ",
            imageURL: "https://m.media-amazon.com/images/I/71AjeIXW8cL._AC_UL320_.jpg",
            price: "1,099.00",
            title: "ASUS VivoBook S 15 OLED Slim Laptop, 15.6” FHD OLED Display, Intel Evo Platform, Intel Core i5-12500H, 16GB RAM, 512GB SSD, Windows 11 Home, K3502ZA-AS51-CA"
        }

        evaluatePrice(item);

        // dispatch(search(searchResults))
        // navigation.navigate('SearchStack');
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
        // width: 50,
    },   
    loginText: {
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
})

export default NewProductSearch