import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { getProductWatchItems } from '../backend/firebase.js';

import {
    StyleSheet,
    SafeAreaView,
    useColorScheme,
    ScrollView
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import H1 from '../FormattedComponents/H1.js';
import SearchResultItem from '../FormattedComponents/SearchResultItem.js';



function ProductWatch({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector((state) => state.authReducer.user);
  const userEmail = user.email;
  const [itemObjects, setItemObjects] = useState([])
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userEmail)
      .onSnapshot(async (userSnapshot) => {
        getProductWatchItems(userSnapshot.data())
        .then((itemObjects) => {
          const itemComponents = itemObjects.map((itemObject) => {
            return(
                <SearchResultItem
                    navigation={navigation}
                    key = {itemObject.key}
                    title={itemObject.title} 
                    description={itemObject.description} 
                    price={itemObject.price}
                    imageURL={itemObject.imageURL}
                    ASIN={itemObject.ASIN}
                />
              );
          });
          console.log('components ' + itemComponents)
          setItemObjects(itemComponents);
        })
        .catch((err) => {
          console.log('Error fetching items ' + err);
        })
     
      });
    return () => subscriber();
  }, [userEmail]);

    return (
        <SafeAreaView style={[isDarkMode ? AppStyles.darkBackground : AppStyles.lightBackground, AppStyles.verticalContainerFS]}>
          <H1 style={{
            fontWeight: "bold",
            marginVertical: 50
          }}
              text={'Your products on watch'}
          />
          <ScrollView 
                style={styles.SRScrollView}
                centerContent={false}
                alwaysBounceVertical={true}
                >
                {itemObjects}
            </ScrollView>
          
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  SRScrollView: {
      alignContent: "flex-start",
      marginHorizontal: 20,
      marginBottom: 20
  },
})

export default ProductWatch