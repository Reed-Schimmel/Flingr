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
//import { Provider } from './src/context/GlobalContext';

import AREntery from './src/ar/AREntery';

const Flingr = (props) => {
  return <AREntery />; 

  return (
    //<Provider>
      <SafeAreaView style={styles.container}>
        <HomeScreen/>
      </SafeAreaView>
    //</Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
    backgroundColor: '#FFF'
  },
});

module.exports = Flingr;