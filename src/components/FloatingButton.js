//Description: This file is to implement the floating button.
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//Description of the function on the right:

// @pre None

//@post function to implement floating button

//@param onPress, title, style
export default ({ onPress, title, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.floatingButton, style]}
  >
    <Text allowFontScaling style={{ color: 'black', fontSize: 20 }}>{title}</Text>
  </TouchableOpacity>
);

// Description of floating button on the page
const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    height: 100,
    width: 100,
    borderRadius: 50,
    zIndex: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  }
});
