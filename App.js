import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Flingr = (props) => {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
});

module.exports = Flingr;
