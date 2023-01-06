import { Config } from "react-native-config";
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { fetchPriceByASIN } from "./searchLogic";
import { useDispatch } from 'react-redux';
import { Alert } from "react-native";
import { notifyPriceDecline } from "./notifications";
import SearchResultItem from "../FormattedComponents/SearchResultItem";

const userCollection = 'users';
const itemCollection = 'items';
// const dispatch = useDispatch();

GoogleSignin.configure({
    scopes:['email'],
    webClientId: Config.WEBCLIENT_ID,
});

function getCollection(collection) {
  return firestore().collection(collection);
}

export function getUserFromResult(result) {
  try {
    return result.user;
  } catch(error) {
    const {message} = error;
    Alert.alert(message);
  }
}

export async function getProductWatchItems(user) {
  const items = user.items;
  var itemObjects = [];
  // itemObjects.push(1);
  // ASINs.forEach(async (ASIN) => {
  //   const item = await getCollection(itemCollection).doc(ASIN).get();
  //   console.log(item.data());
  //   itemObjects.push(item.data());
  // });
  // fuck my life 
  for(let i=0; i<items.length; i++){
    const item = await getCollection(itemCollection).doc(items[i]).get();
    console.log(item.data());
    itemObjects[i] = {...item.data(), key: i};
}
  return itemObjects;
}

// export async function signInWithGoogle() {
//     try {
//         GoogleSignin.signIn()
//       .then((data) => {
//       // console.log('data', data);
//       // Create a new Firebase credential with the token
//       const credential = firebase.auth.GoogleAuthProvider.credential(
//           data.idToken,
//       );
//       return auth().signInWithCredential(credential);
//       })
//       .then((result) => {
//         const userResult = getUserFromResult(result);
//         registerUser(userResult)
//         .then((userDict) => {
//           return userDict;
//         });
//       })
//       .catch((error) => {
//       const {message} = error;
//       Alert.alert(message);
//       });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//         alert('Login Cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         alert('Signin in progress');
//       }
//     }
// };

const signOut = async () => {
  try {
    await GoogleSignin.signOut(); 
  } catch (error) {
    console.error(error);
  }
};

function userObjectBuilder(userInfo) {
  return {
    "email": userInfo.email,
    "UID": userInfo.uid,
    "fullName": userInfo.displayName,
    "imageURL": userInfo.photoURL,
    "items": [],
  };
}

// 
export async function registerUser(userResult) {
  const userEmail = userResult.email;
  const userRef = getCollection(userCollection).doc(userEmail)
  userRef.get()
  .then((user) => {
    if (!user.exists) {
      const userObject = userObjectBuilder(userResult);
      console.log('creating new user', userObject);
      userRef
      .set(userObject)
      .then(async () => {
        console.log('New user added under ' + userEmail);
        const userDoc = await userRef.get();
        return userDoc.data();
      })
      .catch((err) => {
        Alert.alert("Error creating new user for " + userEmail + "\n" + err);
      });
    } else {
      console.log('user data 2' + user.data());
      return user.data();
    }
  })
  .catch((err) => {
    Alert.alert("Error fetching user under " + userEmail + "\n" + err);
  })
}

// add item to product watch
export async function addItemToWatchList(userEmail, item) {
  const ASIN = item.ASIN;
  getCollection(itemCollection)
  .doc(ASIN)
  .set(item)
  .then(() => {
    console.log("Added item " + JSON.stringify(item));
    console.log("user email " + userEmail);
    const userRef = getCollection(userCollection).doc(userEmail);
    userRef
    .get()
    .then((user) => {
      let items = user.data().items;
      console.log("items " + items);
      if (!items.includes(ASIN)) {
        userRef
        .update({
          items: [...items, ASIN]
        })
        .catch((err) => {
          Alert.alert("Error adding item " + item + " for user " + userEmail + "\n" + err);
        })      
      } else {
        console.log("Item " + ASIN + " has already been added");
        return false;
      }
      console.log("Item " + ASIN + " successfully added for user " + userEmail + ". \n")
      return true;
    })
  })
  .catch((err) => {
    console.log("Error adding item " + item + " to item collection \n" + err);
  })

  
}

// iteratively check for a price decline for each item on user's product watch
export async function checkAllPricesForUser(userEmail) {
  getCollection(userCollection).doc(userEmail).get()
  .then(async (user) => {
    const userData = user.data();
    const ASINs = await userData.items;
    // items is an array of ASINs
    const itemObjects = getItemObjects(ASINs);
    (await itemObjects).forEach(async (item) => {
      await evaluatePrice(item);
    })
  });
}

// queries all item documents from firestore using the ASINs as the document id
export async function getItemObjects(ASINs) {
  var itemObjects = [];
  for(let i=0; i<ASINs.length; i++){
    const item = await getCollection(itemCollection).doc(ASINs[i]).get();
    console.log(item.data());
    itemObjects[i] = item.data();
}
  return itemObjects;
}

// compares stored price to current price on amazon
// sends notification if there is a decline
// TODO : update stored price if there is a change price
export async function evaluatePrice(item) {
  const ASIN = item.ASIN;
  const previousPrice = parseFloat(item.price);
  const title = item.title.slice(0, 30);
  const newPrice = parseFloat(await fetchPriceByASIN(ASIN));
  console.log('price ' + newPrice);
  const isNewPriceLower = newPrice < previousPrice;

  if (isNewPriceLower) {
    notifyPriceDecline(ASIN, title);
  }   
}



export const signOutOfGoogle = signOut;