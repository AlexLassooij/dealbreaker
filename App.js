/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './src/Reducers/Reducer';
import { StyleSheet, AppRegistry } from "react-native";
import AppNavigator from './src/AppNavigator';
import BackgroundFetch from "react-native-background-fetch";
import { setCategories, setBackgroundEventHandlers, setForegroundEventHandlers } from './src/backend/notifications';



const store = createStore(AppReducer);

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

function App() {
  useEffect(() => {
    setCategories();
    setBackgroundEventHandlers();
    setForegroundEventHandlers();
  }, []);

  return (
    <Provider store={store}>
        <AppNavigator/>
    </Provider>
  )
}


AppRegistry.registerComponent('dealbreaker', () => App);

// // Step 1:  Configure BackgroundFetch as usual.
// let status = await BackgroundFetch.configure(
// backgroundFetchOptions, 
// onEvent, 
// onTimeout);

// const onEvent = async (taskId) => {
//   console.log('[BackgroundFetch] task: ', taskId);
//   // Do your background work...
//   // IMPORTANT:  You must signal to the OS that your task is complete.
//   BackgroundFetch.finish(taskId);
// }

// const onTimeout = async (taskId) => {
//   console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
//   BackgroundFetch.finish(taskId);
// }

// console.log('[BackgroundFetch] configure status: ', status);

export default App;
