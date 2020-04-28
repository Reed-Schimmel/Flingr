import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingButton from '../components/FloatingButton';
import { Context } from '../context/GlobalContext';

//These constants determine how zoomed in the map view is when hovering over a location.
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//Description of the function getCurrentLocation:

// @pre The user allows location services 

// @post the position of the user is found
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
      });
    };

  //const { userAuth, loginError } = useContext(Context)

const MapScreen = (props) => {
  const { /*queryNewBaseLocations,*/ state } = useContext(Context);
  const { userAuth } = state;

  const [name, setName] = useState({username: ''});

  const setUsername = () => {
    setName({username: state.userData.username});
  }
    //Description of the function useEffect:

    // @pre The location of the user is found

    // @post Stores the coordinates of the user
  useEffect(() => {
      getCurrentLocation().then(position => {
          if (position) {
              setStates({
                  region: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                  },
              });
          }
      });
  }, []);

    //Description of the function useState:

    // @pre The Home screen is accessed

    // @post If user rejects location services a default region is given
const [states, setStates] = useState({
  region: {
    latitude: 39,
    longitude: -98,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
});
     
    //const { userAuth, loginError } = useContext(Context)
  return (
    <MapView style={[styles.map, props.style]} region={states.region} 
      showsUserLocation={props.userBaseLocation == false ? true : false}>
        {props.userBaseLocation === true ? 
        <Marker coordinate={states.region}> 
          <FloatingButton title = {state.userData.username} style = {styles.marker}/> 
          <View style = {styles.stick}></View>
        </Marker> : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
    backgroundColor: '#FFF'
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
    backgroundColor: "lightblue",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: "#000",
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
