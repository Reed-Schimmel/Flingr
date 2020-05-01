/**
 * @author: Reed Schimmel
 * @description: Has user align phone north and confirms coords for base.
 */

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import { Context } from '../context/GlobalContext';

export default ({ setInPosition, alignHeading = 0, alignCoords }) => {

  const { state: { coords } } = useContext(Context);

  const [heading, setHeading] = useState(null);

  useEffect(() => {
    CompassHeading.start(1, heading => {
      setHeading(heading);
    });
    return () => CompassHeading.stop();
  }, []);

  const verifyHeading = () => {
    const diff = Math.abs(alignHeading - heading);
    return (diff < 5 || diff > 355); // +- 3 degree margin of error
  };
  const verifyCoords = () => {
    const { longitude, latitude, accuracy } = coords;
    const lonDiff = Math.abs(longitude - alignCoords.longitude);
    const latDiff = Math.abs(latitude - alignCoords.latitude);
    return (lonDiff < accuracy && latDiff < accuracy); // TODO: maybe add a coef to accuracy
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.text}>
        Hold phone portrait style in hand, please aim the camera to {alignHeading}
      </Text>
      <Text style={[styles.text, { margin: 20, color: verifyHeading() ? 'green' : 'red' }]}>
        Heading: {heading}
      </Text>
      {(alignCoords !== undefined) && (<>
        <Text style={styles.text}>
          Please go to the location of your base: Lat: {alignCoords.latitude}, Lon: {alignCoords.longitude}
        </Text>
        <Text style={[styles.text, { margin: 20, color: verifyCoords() ? 'green' : 'red' }]}>
          Your Location - Lat: {coords.latitude}, Lon: {coords.longitude}
        </Text>
      </>)}

      {verifyHeading() && (
        <TouchableOpacity onPress={() => setInPosition(true)} style={styles.button}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>Go to AR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 32, textAlign: 'center' },
  button: {
    width: 200,
    marginVertical: 10,
    paddingVertical: 12,
    // backgroundColor: '#1c313a',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
  },
});
