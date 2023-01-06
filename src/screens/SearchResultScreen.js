import React from 'react'
import { useSelector } from 'react-redux';

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    Dimensions,
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import SearchResultItem from '../FormattedComponents/SearchResultItem';

function SearchResultScreen({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const searchResults = useSelector((state) => state.searchReducer.searchResults)

    const searchResultComponents = searchResults.map((searchResult) => {
        return(
            <SearchResultItem
                navigation={navigation}
                key={searchResult.key}
                title={searchResult.title} 
                description={searchResult.description} 
                price={searchResult.priceInt + searchResult.priceDec}
                imageURL={searchResult.imageURL}
                ASIN={searchResult.ASIN}
            />
        );
    });

    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, styles.SRContainer]}>
            <ScrollView 
                style={styles.SRScrollView}
                centerContent={false}
                alwaysBounceVertical={true}
                stat
                >
                {searchResultComponents}
            </ScrollView>
        </SafeAreaView>
      
    )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({

    SRScrollView: {
        alignContent: "flex-start",
        marginHorizontal: 20,
        marginBottom: 20
    },
    SRListContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: width,
    },
    SRText: {

    },
    Image: {
        height: '50%',
        width: "auto"
    }
})

export default SearchResultScreen
