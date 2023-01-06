import React from 'react'

import H2 from './H2';
import H3 from './H3';
import H4 from './H4';

import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    useColorScheme,
    Dimensions
  } from 'react-native';

import { AppStyles } from '../AppStyles';


function SearchResultItem({navigation, key, title, description, price, imageURL, ASIN}) {
    const isDarkMode = useColorScheme() === 'dark';

    function handleItemPress() {
        navigation.navigate('SearchItem', {
            title: title,
            description: description,
            price: price,
            imageURL: imageURL,
            ASIN: ASIN
        })
    }

    return (
        <TouchableOpacity
            onPress={handleItemPress}
            style={[isDarkMode ? AppStyles.semiDarkBackground : AppStyles.semiLightBackground, styles.SRTouchableOpacity]}
        >
            <View style={styles.SRContainer}>
            
            <View style={styles.SRText}>
                <H2
                    text={title}
                    numberOfLines={3}
                />
                <H3
                    text={'$' + price}
                />
                <H4
                    text={description}
                />
            </View>
            <Image
                style={[styles.SRImage, isDarkMode ? AppStyles.darkBorderColor : AppStyles.lightBorderColor]}
                source={{
                            uri: imageURL,
                            // cache: "only-if-cached"
                        }}
                // defaultSource={'https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg'}
            />
        </View>
        </TouchableOpacity>
    )
}
const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    SRTouchableOpacity: {
        padding: 10,
        marginTop: 20,
        height: 200,
        width: "100%",
        borderRadius: 20
    },
    SRContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        width: "100%",
    }, 
    SRImage: {
        height: 180,
        width: 150,
        borderWidth: 5,
        borderRadius: 10,
    },
    SRText: {
        width: width - 220,
        paddingRight: 20
    }
})
export default SearchResultItem
