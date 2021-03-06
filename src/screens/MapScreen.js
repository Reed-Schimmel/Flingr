import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; //Animate
import MapView, { Marker } from 'react-native-maps';
import { Context } from '../context/GlobalContext';
import FloatingButton from '../components/FloatingButton';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = (props) => { // TODO: very slow buttons bug
  const { /*queryNewBaseLocations,*/ state } = useContext(Context);
  const { /*renderedBases, queryBasesError,*/ coords } = state;
  
  const [region, setRegion] = useState({
    latitude: coords.latitude || 39,
    longitude: coords.longitude || -98,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    //queryNewBaseLocations(region);
    //console.log(state.userData)
    // update region state every time the global context has new coords
    setRegion({
      latitude: coords.latitude || region.latitude,
      longitude: coords.longitude || region.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  }, [coords.latitude === null]);

  return (
    <MapView style={[styles.map, props.style]} region={region} 
      showsUserLocation={props.userBaseLocation === true ? false : true}>
      {
        props.userBaseLocation === true 
          ? <Marker coordinate={region} title = {state.userData.username}>
            <FloatingButton style = {styles.marker}/>
            <View style = {styles.stick}/></Marker> 
          : null
      }
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
  marker: {
    position: 'relative',
    right: 0,
    bottom: 0,
    height: 50,
    width: 100,
    top: -25,
    borderRadius: 50,
    zIndex: 0,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
  },
  stick: {
    position: 'relative',
    top: -35,
    left: 45,
    backgroundColor: 'lightblue',
    width: 5,
    height: 50,
  },
});

export default MapScreen;