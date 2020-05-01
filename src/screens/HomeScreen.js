import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Modal, Alert, Platform, PermissionsAndroid, Text } from 'react-native';
import MapScreen from './MapScreen';
import FloatingButton from '../components/FloatingButton';
import AuthenticationModal from '../components/AuthenticationModal';
import AREntry from '../ar/AREntery';
import { Context } from '../context/GlobalContext';

const requestLocationPermission = async () => {
  // https://stackoverflow.com/questions/54305731/no-location-provider-available-permission-denied-in-react-native
  if (Platform.OS !== 'android' || Platform.Version < 23) return;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'This App needs access to your location ' +
          'so we can know where you are.'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use locations ');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
// g@g.com, password
const HomeScreen = () => {
  const [base, setBases] = useState({ isPin: false });
  const { wipeContext, setBaseLocation, state, setCoords, setARscreen } = useContext(Context);
  const { setBaseError, userAuth, coords, uploadError, fireError, loginError, ARscreen } = state;

  let accuracy = 5; // meters of gps accuracy

  useEffect(() => {
    // Watch to GPS changes and keep the global content updated
    // Set GPS watching and update context https://reactnative.dev/docs/geolocation.html#watchposition
    const watchGPS = (position) => {
      accuracy = position.coords.accuracy;
      setCoords(position);
    };

    const gpsOptions = {
      enableHighAccuracy: true,
      distanceFilter: 1.2 * accuracy, // meters - should be higher than accuracy
      maximumAge: 1000, //ms
      timeout: 200000,
    };

    navigator.geolocation.watchPosition(watchGPS, async (e) => { // eslint-disable-line no-undef
      console.log('GPS error', e);
      if (e.PERMISSION_DENIED) {
        await requestLocationPermission(); // Get permission and try again.
        navigator.geolocation.getCurrentPosition(watchGPS, undefined, gpsOptions); // eslint-disable-line no-undef
      }
    }, gpsOptions);
    return () => navigator.geolocation.stopObserving(); // eslint-disable-line no-undef
  }, []);

  const setBase = () => {
    if (state.userData.baseLatitude === 0) {

      state.userData.baseLatitude = coords.latitude;
      setBaseLocation(coords.latitude, coords.longitude, state.userAuth.uid);

      Alert.alert('Important', 'Are you sure you would like to set your base at your current location?',
        [
          { text: 'Yes', onPress: () => {
            setBases({ isPin: true });
            setARscreen('setBase');
          }, style: 'OK' },
          { text: 'No', onPress: () => { setBases({ isPin: false }); }, style: 'cancel' }
        ]);
    }
    else if (base.isPin === false && state.userData.baseLatitude === 0) {
      setBases({ isPin: true });
    }
  };

  const logout = () => {
    wipeContext();
  };

  const showAuthModal = !userAuth;
  if (ARscreen) {
    return (
      <AREntry
        setBase={ARscreen === 'setBase'}
        launch={ARscreen === 'launch'}
        viewBase={ARscreen === 'viewBase'}
      />);
  }

  return (
    //login popup, ar button, map screen, mini map style
    <>
      {showAuthModal ? null : <FloatingButton title="Log Out" onPress={logout} style = {styles.FloatingButton}/>}
          
      <MapScreen userBaseLocation = {base.isPin}/>
      <Text>{fireError + uploadError + loginError + setBaseError}</Text>
      
      {showAuthModal ? null : <FloatingButton title={[state.userData.baseLatitude === 0 ? 'Set Base' : 'Fire']}
        onPress={state.userData.baseLatitude === 0 ? setBase : (() => setARscreen('launch'))} />}

      {(!showAuthModal && state.userData.baseLatitude !== 0) ? (
        <FloatingButton
          title="View Base"
          onPress={() => setARscreen('viewBase')}
          style={{ left: 30, right: undefined }}
        />) : null}

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

