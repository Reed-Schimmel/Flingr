import React, { useState, useContext } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  //Animate
} from 'react-native';
// import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from './src/context/GlobalContext';
import RegisterScreen from './src/screens/RegisterScreen';

const Flingr = (props) => {

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {/* <HomeScreen/> */}
        {/* <LoginScreen /> */}
        <RegisterScreen />
      </SafeAreaView>
    </Provider>
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