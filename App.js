import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

import AREntery from './src/ar/AREntery';

const Flingr = (props) => {
  return <AREntery />; 
      return (
      <SafeAreaView style={styles.container}>
        <Text>Hello World</Text>
      </SafeAreaView>
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
