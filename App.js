import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  //Animate
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
// import LoginScreen from './src/screens/LoginScreen';
import { Provider as GlobalProvider } from './src/context/GlobalContext';
// import RegisterScreen from './src/screens/RegisterScreen';

const Flingr = () => {

  console.log('hello');

  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
        {/* <LoginScreen /> */}
        {/* <RegisterScreen /> */}
      </SafeAreaView>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
    backgroundColor: '#FFF'
  },
})

export default Flingr;