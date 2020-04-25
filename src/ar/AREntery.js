import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, AsyncStorage, ViewBase } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import CompassHeading from 'react-native-compass-heading';

// import { Context } from '../context/GlobalContext';

// import GeopositionScene from './GeopositionScene';
// import InitialARScene from './HelloWorldSceneAR';
import SetBaseScene from './SetBaseScene';
import ViewBaseScene from './ViewBaseScene';
import GeopositionScene from './GeopositionScene2';
import BasicARPhysicsSample from './BasicPhysicsSample';

// Set base flow
// 1. confirm world location via gps
// 2. confirm compass
// 3. find world anchor
// 4. place base relative to anchor

// Fire projectile flow
// 1. find world location and orientation (gps & compass)
// 2. display projectile and UI AR
//   a. 3 DoF display (debug)
//   b. KE units input
//   c. show projectile
//   d. fire button
//   e. minimap
// 3. launching animation
// 4. record & upload launch



// const SET_BASE = 'set_base';
// const VIEW_BASE = 'view_base';

const AREntry = () => {
  // const { state, actions } = useContext(Context);
  // const { userData } = state;

  // const [scene, setScene] = useState(SET_BASE);
  const [base, setBase] = useState(undefined);
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('base').then(data => {
      setBase(JSON.parse(data));
      // console.log(data);
    }).catch(e => console.log(e));
  }, []);

  useEffect(() => {
    CompassHeading.start(3, heading => {
      setHeading(heading);
    });
    return () => CompassHeading.stop();
  }, []);

  // return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: GeopositionScene }} />;

  if (heading === null) return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, textAlign: 'center' }}>Hold phone portrait style in hand, please aim the camera north</Text>
      <Text style={{ fontSize: 32, textAlign: 'center', margin: 20 }}>Heading: {heading}</Text>
      <Text style={{ fontSize: 26, textAlign: 'center' }}>North is 0</Text>
    </View>
    // when just about 0 have user click button and then when scene inits succ tell user it's okay to move.
  );

  if (base === undefined) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Loading</Text></View>;
  else if (base === null) return (
    <ViroARSceneNavigator
      initialScene={{ scene: SetBaseScene }}
    // initialScene={{ scene: GeopositionScene }}
    // worldAlignment='Camera'  
    // worldAlignment='GravityAndHeading'
    />
  );
  else return (
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene, passProps: { base } }}
    />
  );
};

export default AREntry;
module.exports = AREntry;
