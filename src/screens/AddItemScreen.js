import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateItems } from '../Reducers/Reducer';
import { addItemToWatchList } from '../backend/firebase';
import { openOnAmazon } from '../backend/notifications';

import H1 from '../FormattedComponents/H1';
import H2 from '../FormattedComponents/H2';
import H3 from '../FormattedComponents/H3';
import H4 from '../FormattedComponents/H4';

import Icon from 'react-native-vector-icons/FontAwesome';
// Icon.loadFont().then();


import {
    StyleSheet,
    FlatList,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    Dimensions,
    StatusBar
  } from 'react-native';

import { AppStyles } from '../AppStyles';

function AddItemScreen({route, navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const { title, description, price, imageURL, ASIN } = route.params;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const userEmail = user.email;
    const items = user.items;
    const maxAllowedTitleLines = 5;

    const [itemText, setItemText] = useState('Add Item to Watch');

    // console.log("from within SRS:")
    // console.log(searchResults[0])

    const addItem = () => {
        console.log("additem")
        console.log('user in add ' + user);
        const newItem = {
            "title": title, 
            "description": description,
            "price": price,
            "imageURL": imageURL,
            "ASIN": ASIN
        }
        const successfullyAdded = addItemToWatchList(userEmail, newItem);
        if (successfullyAdded) {
            items.push(ASIN);
            console.log("new list of items " + items);
            setItemText('Item has been added !')
            dispatch(updateItems(items));
        }
 
    }

    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFS]}>
            <View style={[AppStyles.BasicContentContainer, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}>
                <H1
                    text={title}
                    numberOfLines={maxAllowedTitleLines}
                />
                <View style={styles.SRContentContainer}>
                    <View style={styles.Text}>
                    
                        <H2
                            text={"Current Price : $" + price}
                            style={{
                                fontWeight: "bold"
                            }}
                        />
                        <H4
                            text={"Description : " + description}
                            style={{
                                marginVertical: 10
                            }}
                            numberOfLines={4}
                        />
                    </View>
                    <Image
                        style={[styles.Image, isDarkMode ? AppStyles.darkBorderColor : AppStyles.lightBorderColor]}
                        source={{
                            uri: imageURL,
                            cache: "only-if-cached"
                        }}
                        // defaultSource={'https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg'}
                    />
                </View>
            </View>
            <TouchableOpacity 
                onPress={addItem}    
                style={[styles.AddItemButton, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}           
                >
                    <H2
                    style={{color: AppStyles.color.lightText, fontWeight: 'bold'}}
                    text={itemText}
                    />
                    <Icon name="binoculars" size={20} /*color="#EA4335"*/ />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    openOnAmazon(ASIN);
                }}    
                style={[styles.AddItemButton, isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground]}           
                >
                    <H2
                    style={{color: AppStyles.color.lightText, fontWeight: 'bold'}}
                    text={"View on Amazon"}
                    />
            </TouchableOpacity>
        </SafeAreaView>
      
    )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
 
    SRContainerSolo: {
        width: "80%",
        // minHeight: "45%",
        maxHeight: "100%",
        marginTop: 40,
        paddingTop: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: AppStyles.semiLightBackground.backgroundColor
    }, 
    SRContentContainer: {
        marginVertical: 10,
        width: "100%",
        // minHeight: "30%",
        maxHeight: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    Image: {
        marginVertical: 10,
        height: 270,
        width: 225,
        borderWidth: 5,
        borderRadius: 10,
    },
    Text: {
        flexDirection: "column",
        paddingRight: 20
    },
    AddItemButton : {
        width: "80%",
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    }
})

export default AddItemScreen
