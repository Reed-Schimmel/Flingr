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

const AREntry = () => {
  const { state, launchFling, uploadJSONblob } = useContext(Context);
  const { userData, userAuth: { uid } } = state;
  const { homeLatitude, homeLongitude, baseJsonBlob } = userData;

  // const [base, setBase] = useState(undefined);
  const [inPosition, setInPosition] = useState(false);

  // useEffect(() => {
  //   AsyncStorage.getItem('base').then(data => {
  //     setBase(JSON.parse(data));
  //     Alert.alert(data);
  //   }).catch(e => console.log(e));
  // }, []);

  // return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: GeopositionScene }} />;

  const baseCoords = (homeLatitude === 0 && homeLongitude === 0)
    ? undefined : { latitude: homeLatitude, longitude: homeLongitude };

  if (!inPosition) return (
    <SceneAligner setInPosition={setInPosition} alignHeading={0} alignCoords={baseCoords} />
    // <SceneAligner setInPosition={setInPosition} alignHeading={0} alignCoords={{ latitude: 38.942431, longitude: -94.63794 }} />
  );

  // if (base === undefined) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Loading</Text></View>; // TODO remove or change when loading from firebase
  else if (baseCoords === undefined) return (
    <ViroARSceneNavigator
      initialScene={{ scene: SetBaseScene, passProps: { saveBase: (jsonStr) => uploadJSONblob(jsonStr, uid) } }}
    />
  );
  else if (baseCoords !== undefined) return (
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene, passProps: { base: JSON.parse(baseJsonBlob) } }}
    />
  );
  else if (/*FIRE!*/ false) return ( //eslint-disable-line
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene, passProps: { saveLaunch: (coords) => launchFling({ coords }, uid) } }}
    />
  );
};

export default AREntry;
module.exports = AREntry;
