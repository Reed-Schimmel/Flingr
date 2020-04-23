import React, { useState, useEffect, /*useContext*/ } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native'; //Animate
import MapView, { Marker } from 'react-native-maps';
// import { Context } from '../context/GlobalContext';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

const MapScreen = (props) => {
  // const { queryNewBaseLocations, state } = useContext(Context);
  // const { renderedBases, queryBasesError } = state;

  const [region, setRegion] = useState({
    latitude: 39,
    longitude: -98,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  // const [base, setBase] = useState({
  //   message: true
  // });

  useEffect(() => {
    getCurrentLocation().then(position => {
      if (position) {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        });
      }
    });
  }, []);



  //const { userAuth, loginError } = useContext(Context)
  return (
    <MapView style={[styles.map, props.style]} region={region} showsUserLocation={true}>
      <Marker coordinate={region} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
    backgroundColor: '#FFF'
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;