import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Modal, Text, View, Alert } from 'react-native'; //Animate
import MapScreen from './MapScreen';
import FloatingButton from '../components/FloatingButton';
//import AREntery from '../ar/AREntery'
import { Context } from '../context/GlobalContext';
import AuthenticationModal from '../components/AuthenticationModal';
const HomeScreen = () => {
  const [base, setBases] = useState({isPin: false});

  const { wipeContext, /*setBaseLocation*/ state, setCoords } = useContext(Context);
  const { /*setBaseError*/ userAuth } = state;

  let accuracy = 5; // meters of gps accuracy

  useEffect(() => {
    // Watch to GPS changes and keep the global content updated
    // Set GPS watching and update context https://reactnative.dev/docs/geolocation.html#watchposition
    navigator.geolocation.watchPosition((position) => { // eslint-disable-line no-undef
      accuracy = position.coords.accuracy;
      setCoords(position);
    }, (e) => {
      console.log('GPS error', e);
      // if (e.PERMISSION_DENIED) navigator.geolocation.requestAuthorization();
    }, {
      enableHighAccuracy: true,
      distanceFilter: 1.2 * accuracy, // meters - should be higher than accuracy
      // maximumAge: 1000, //ms
      // timeout: 200000,
    });
    return () => navigator.geolocation.stopObserving(); // eslint-disable-line no-undef
  }, []);

  const setBase = () => {
    if(base.isPin == false)
    {
      Alert.alert('Important', 'Are you sure you would like to set your base at your current location?',
        [
          {text: 'Yes', onPress: () => {setBases({isPin: true});}, style: 'OK'},
          {text: 'No', onPress: () => {setBases({isPin: false});}, style: 'cancel'}
        ]);
    }
    else{
      //<AREntery/>
      return(<View><Text>ar screen</Text></View>);
    }
  };

  const logout = () => {
    wipeContext();
  };
  
  const showAuthModal = !userAuth;

  return (
  //login popup, ar button, map screen, mini map style
    <>
      {showAuthModal ? null : <FloatingButton title="Log Out" onPress={logout} style = {styles.FloatingButton}/>}
          
      <MapScreen userBaseLocation = {base.isPin}/>
      
      {showAuthModal ? null : <FloatingButton title={[base.isPin == true ? 'Fire' : 'Set Base']} 
        onPress={setBase}/>}

      <Modal 
        animationType="fade"
        transparent={true}
        visible={showAuthModal}
      >
        <AuthenticationModal />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'red'
  },
  FloatingButton: {
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    position: 'relative',
    bottom: 0,
    left: 10,
    height: 50,
    width: 75,
  },
});

export default HomeScreen;

