import React, { useState, /*useContext*/ } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
// import { Context } from '../context/GlobalContext';

import GeopositionScene from './GeopositionScene';
// import InitialARScene from './HelloWorldSceneAR';
// import SetBaseScene from './SetBaseScene';
// import ViewBaseScene from './ViewBaseScene';
// import GeopositionScene from './GeopositionScene2';
import BasicARPhysicsSample from './BasicPhysicsSample';
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: 'API_KEY_HERE',
};

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
  // const { buttonTitle, buttonAction } = state;

  // const [scene, setScene] = useState(SET_BASE);

  return (
    <ViroARSceneNavigator {...sharedProps}
      initialScene={{ scene: GeopositionScene }}
      // worldAlignment='Camera'
    />
  );
};

export default AREntry;
module.exports = AREntry;
