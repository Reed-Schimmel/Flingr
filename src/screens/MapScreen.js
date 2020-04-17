import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native'; //Animate
import MapView, { Marker } from 'react-native-maps';
//import { Context } from '../context/GlobalContext';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

const MapScreen = (region, props) => {
    useEffect(() => {
        getCurrentLocation().then(position => {
            if (position) {
                setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    },
                });
            }
        })
    }, []);

    const [state, setState] = useState({
        region: {
            latitude: 39,
            longitude: -98,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
    })

    const [base, setBase] = useState({
        message: true
    })
     
    //const { userAuth, loginError } = useContext(Context)
    return (
            <MapView style={[styles.map, props.style]} region={state.region} showsUserLocation={true}>
                <Marker coordinate={state.region}/>
            </MapView>
       )
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
});

export default MapScreen;