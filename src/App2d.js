import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ViroFlexView,
} from 'react-viro';

export default (props) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
