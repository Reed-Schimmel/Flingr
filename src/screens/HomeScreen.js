import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, StatusBar, Modal, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'; //Animate
import MapScreen from './MapScreen';
import LoginScreen from './LoginScreen'
import FloatingButton from '../components/FloatingButton';
//import AREntery from '../ar/AREntery'
import { Context } from '../context/GlobalContext';

const HomeScreen = (props) => {
  const [isModalVisible, setModalVisibility] = useState(false)
  const [base, setBases] = useState({ isPin: false })

  const { setBaseLocation, state } = useContext(Context);
  // const { setBaseError } = state;

  const getMod = () => {
    if (isModalVisible === false)
      setModalVisibility(true);
    else
      setModalVisibility(false);
  }
  const setBase = () => {
    if (base.isPin === false) {
      Alert.alert("Important", "Are you sure you would like to set your base at your current location?",
        [
          { text: "Yes", onPress: () => { setBases({ isPin: true }) }, style: 'OK' },
          { text: "No", onPress: () => { setBases({ isPin: false }) }, style: "cancel" }
        ]);
    }
    else {
      //<AREntery/>
      return (<View><Text>ar screen</Text></View>)
    }
  }
  //const { userAuth, loginError } = useContext(Context)
  return (
    //login popup, ar button, map screen, mini map style
    <>
      <FloatingButton title="Log Out" onPress={getMod} style={styles.FloatingButton} />

      <MapScreen />

      <FloatingButton title={[base.isPin == true ? "Fire" : "Set Base"]}
        onPress={setBase} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}>
        <LoginScreen />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  minimap: {
    height: 100,
    width: 100,
    flex: 1
  },
  modal: {
    backgroundColor: "red"
  },
  FloatingButton: {
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
    position: 'relative',
    bottom: 0,
    left: 10,
    height: 50,
    width: 75,
  }
});

export default HomeScreen;








