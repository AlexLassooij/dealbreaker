import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';
import { checkAllPricesForUser } from './firebase';
import { ASINUrlBuilder } from './searchLogic';

export async function setBackgroundEventHandlers() {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'buy') {
          const ASIN = detail.notification.data.ASIN;
          console.log(ASIN);
          
        } else {
          console.log('bruh');
        }
    });
}

export async function openOnAmazon(ASIN) {
    const url = ASINUrlBuilder(ASIN);
          console.log(url);
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          console.log('supported ' + supported);
          if (supported) {
              await Linking.openURL(url); // It will open the URL on browser.
          } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
          }
}

export async function setForegroundEventHandlers() {
    notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'buy') {
          const ASIN = detail.notification.data.ASIN;
          console.log(ASIN);
          const url = ASINUrlBuilder(ASIN);
          console.log(url);
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          console.log('supported ' + supported);
          if (supported) {
              await Linking.openURL(url); // It will open the URL on browser.
          } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        } else {
          console.log('bruh');
        }
    });
}


export async function notifyPriceDecline(ASIN, title) {
    console.log('notifcation triggered')
    await notifee.displayNotification({
      title: 'Price Declined',
      body: 'Your saved item ' + title + ' has decrease in price !',
      ios: {
        categoryId: 'price-decline',
      },
      data : {
        ASIN: ASIN
      }
    });    
  }

export async function setCategories() {
    await notifee.setNotificationCategories([
        {
        id: 'price-decline',
        actions: [
            {
            id: 'view',
            title: 'View in App',
            },
            {
            id: 'buy',
            title: 'Buy on Amazon',
            },
        ],
        },
    ]);
}

const backgroundFetchOptions = {
    minimumFetchInterval: 30,
    stopOnTerminate: false,
    enableHeadless: true,
    startOnBoot: true,
    // Android options
    forceAlarmManager: false,      // <-- Set true to bypass JobScheduler.
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, 
    requiresCharging: false,       
    requiresDeviceIdle: false,    
    requiresBatteryNotLow: false,
    requiresStorageNotLow: false, 
  }
  
export async function configureBackgroundFetch(userEmail) {
    const onEvent = async (taskId) => {
        console.log('[BackgroundFetch] task: ', taskId);
        checkAllPricesForUser(userEmail);
        BackgroundFetch.finish(taskId);
      }
      
      const onTimeout = async (taskId) => {
        console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
        BackgroundFetch.finish(taskId);
      }

    let status = await BackgroundFetch.configure(
        backgroundFetchOptions, 
        onEvent, 
        onTimeout);  
}

