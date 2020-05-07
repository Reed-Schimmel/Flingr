import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

import HomeScreen from './src/screens/HomeScreen';
import { Provider as GlobalProvider } from './src/context/GlobalContext';
import firebaseConfig from './firebaseConfig.json';

// console.disableYellowBox = true;

firebase.initializeApp(firebaseConfig);

const Flingr = () => {
  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Flingr;
