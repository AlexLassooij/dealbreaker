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
import { AppRegistry } from "react-native";
import AppNavigator from './src/AppNavigator';
import { setCategories, setBackgroundEventHandlers, setForegroundEventHandlers } from './src/backend/notifications';



const store = createStore(AppReducer);

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

export default App;
