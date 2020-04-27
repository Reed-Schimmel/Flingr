import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

import HomeScreen from './src/screens/HomeScreen';
import { Provider as GlobalProvider } from './src/context/GlobalContext';
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);


const Flingr = () => {
  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        {/* <AREntery /> */}
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
});

export default Flingr;