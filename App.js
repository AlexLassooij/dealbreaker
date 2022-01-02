/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './src/Reducers/Reducer';
import { StyleSheet, AppRegistry } from "react-native";
import AppNavigator from './src/AppNavigator';

const store = createStore(AppReducer);

function App() {
  return (
    <Provider store={store}>
        <AppNavigator/>
    </Provider>
  )
}


AppRegistry.registerComponent('dealbreaker', () => App);


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    color: "#5ea23a"
  },
});

export default App;
