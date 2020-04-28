import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native'; //Animate
import MapView, { Marker } from 'react-native-maps';
import { Context } from '../context/GlobalContext';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = (props) => { // TODO: very slow buttons bug
  const { /*queryNewBaseLocations,*/ state } = useContext(Context);
  const { /*renderedBases, queryBasesError,*/ coords } = state;

  const [region, setRegion] = useState({
    latitude: 39,
    longitude: -98,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    console.log(coords);
    // update region state every time the global context has new coords
    setRegion({
      latitude: coords.latitude || region.latitude,
      longitude: coords.longitude || region.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  }, [coords.latitude === null]);
console.log(state.userData)
  //const { userAuth, loginError } = useContext(Context)
  return (
    <MapView style={[styles.map, props.style]} region={region} showsUserLocation={false}>
      <Marker title = {state.userData.username} coordinate={region} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

