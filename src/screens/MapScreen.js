import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; //Animate
import MapView, { Marker } from 'react-native-maps';
import { Context } from '../context/GlobalContext';
import FloatingButton from '../components/FloatingButton';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
//   });
// };

const MapScreen = (props) => {
//   const {state} = useContext(Context);

//   const [states, setState] = useState({
//     region: {
//       latitude: 39,
//       longitude: -98,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     },
//   });

//   useEffect(() => {
//     getCurrentLocation().then(position => {
//       if (position) {
//         setState({
//           region: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//           },
//         });
//       }
//     });
//   }, []);

  return (
    <MapView style={[styles.map, props.style]} region={states.region} showsUserLocation={props.userBaseLocation === false ? true : false}>
      {props.userBaseLocation === true 
        ? <Marker coordinate={states.region}> 
            <FloatingButton title = {state.userData.username} style = {styles.marker}/> 
            <View style = {styles.stick}></View>
          </Marker> 
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