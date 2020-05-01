import React, { useState, useContext, /*useEffect*/ } from 'react';
// import { View, Text, AsyncStorage, Alert } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import SceneAligner from '../components/SceneAligner';
import { Context } from '../context/GlobalContext';

// import GeopositionScene from './GeopositionScene';
// import InitialARScene from './HelloWorldSceneAR';
import SetBaseScene from './SetBaseScene';
import ViewBaseScene from './ViewBaseScene';
// import GeopositionScene from './GeopositionScene2';
// import BasicARPhysicsSample from './BasicPhysicsSample';

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

const AREntry = ({ setBase = false, viewBase = false, launch = false }) => {
  const { state, launchFling, uploadJSONblob } = useContext(Context);
  const { userData, userAuth: { uid } } = state;
  const { baseLatitude, baseLongitude, baseJsonBlob } = userData;

  const [inPosition, setInPosition] = useState(false);

  const baseCoords = (baseLatitude === 0 && baseLongitude === 0)
    ? undefined : { latitude: baseLatitude, longitude: baseLongitude };

  if (!inPosition) return (
    <SceneAligner setInPosition={setInPosition} alignHeading={0} alignCoords={baseCoords} />
  );

  else if (setBase) return (
    <ViroARSceneNavigator
      initialScene={{ scene: SetBaseScene, passProps: { saveBase: (jsonStr) => uploadJSONblob(jsonStr, uid) } }}
    />
  );
  else if (viewBase) return (
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene, passProps: { base: JSON.parse(baseJsonBlob) } }}
    />
  );
  else if (launch) return (
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene, passProps: { saveLaunch: (coords) => launchFling({ coords }, uid) } }}
    />
  );
};

export default AREntry;
module.exports = AREntry;
