import React, { useState, /*useContext,*/ useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import SceneAligner from '../components/SceneAligner';
// import { Context } from '../context/GlobalContext';

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
  // const { state, actions } = useContext(Context);
  // const { userData, coords } = state;

  const [base, setBase] = useState(undefined);
  const [inPosition, setInPosition] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('base').then(data => {
      setBase(JSON.parse(data));
    }).catch(e => console.log(e));
  }, []);

  // return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: GeopositionScene }} />;

  if (!inPosition) return (
    <SceneAligner setInPosition={setInPosition} alignHeading={0} alignCoords={{ latitude: 38.942431, longitude: -94.63794 }} />
  );

  if (base === undefined) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Loading</Text></View>;
  else if (base === null) return (
    <ViroARSceneNavigator
      initialScene={{ scene: SetBaseScene, passProps: { base } }}
    />
  );
  else return (
    <ViroARSceneNavigator
      initialScene={{ scene: ViewBaseScene/*, passProps: { base }*/ }}
    />
  );
};

export default AREntry;
module.exports = AREntry;
