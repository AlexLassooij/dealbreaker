import React, { useEffect, useState } from 'react'
import { logout } from '../Reducers/Reducer.js';
import firestore from '@react-native-firebase/firestore';

import H1 from '../FormattedComponents/H1.js';
import SearchResultItem from '../FormattedComponents/SearchResultItem.js';
import { getItemObjects, getProductWatchItems } from '../backend/firebase.js';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    useColorScheme,
    ScrollView
  } from 'react-native';

import { AppStyles } from '../AppStyles';
import { useSelector } from 'react-redux';

function ProductWatch({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector((state) => state.authReducer.user);
  const userEmail = user.email;
  // console.log("userId : " + user.id);
  // console.log("userName : " + user.fullname);
  // console.log("userIdEmail : " + user.email);
  // console.log("userphoto : " + user.photoURL);
  const [itemObjects, setItemObjects] = useState([])

  
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userEmail)
      .onSnapshot(async (userSnapshot) => {
        // const user = documentSnapshot.data();
        // const items = user.items;
        // const itemObjects = await getItemObjects(items);
        // console.log("items in watch " + items);
        // console.log("item objects " + itemObjects)
    
        // console.log('stringified ' + JSON.stringify(itemObjects[0]))
        getProductWatchItems(userSnapshot.data())
        .then((itemObjects) => {
          const itemComponents = itemObjects.map((itemObject) => {
            // const itemData = itemObject[0];
            // const key = itemObject[]
            console.log(itemObject.key)
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

    // Stop listening for updates when no longer required
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