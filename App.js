import React, { useState, useContext } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  //Animate
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { Provider as GlobalProvider } from './src/context/GlobalContext';

import AREntery from './src/ar/AREntery';

const Flingr = (props) => {
  return <AREntery />; 

  console.log('hello');

  return (
   <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen/>
      </SafeAreaView>
    </GlobalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
    backgroundColor: '#FFF'
  },
});

export default Flingr;