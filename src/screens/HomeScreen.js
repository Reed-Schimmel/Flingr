import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    //Animate
} from 'react-native';
import MapScreen from './MapScreen';
import { Context } from '../context/GlobalContext';

export default (props) => {
  
    const { state } = useContext(Context);
    console.log(state);
    return (
//login popup, ar button, map screen, mini map style
        <MapScreen/>
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