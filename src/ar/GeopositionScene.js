import React, { useRef, useState, /*useContext,*/ } from 'react';
import {
  ViroARScene,
  ViroCamera,
  ViroBox,
  // ViroConstants,
  ViroAmbientLight,
} from 'react-viro';
// import CompassHeading from 'react-native-compass-heading';
// import { Context } from '../context/GlobalContext';

/**
 * The 
 */

const GeopositionScene = ({ /*children,*/ ...otherProps }) => {
  // const { state, actions } = useContext(Context);
  // const { buttonTitle, buttonAction } = state;

  // const [tracking, setTracking] = useState({ state: null, reason: null });
  const [yRot, /*setYRot*/] = useState(0);
  const [ambientLight, /*setAmbientLight*/] = useState({ color: '#FFFFFF', intensity: 10 });

  const sceneRef = useRef();

  return (
    <ViroARScene
      ref={sceneRef}
      physicsWorld={{ gravity: [0, -9.81, 0] }}
      // onTrackingUpdated={(state, reason) => {
      //   if (tracking.state === null && state === ViroConstants.TRACKING_NORMAL) {
      //     // The first time the scene get's it tracking find the compass heading
      //     // and rotate the scene in the opposite direction so positions of AR objects
      //     // do not need to correct for compass heading. This is aligning all AR users
      //     // worlds to point North / South
      //     CompassHeading.start(360, degree => {
      //       CompassHeading.stop(); // TODO: prevent mutifiring
      //       setYRot(-1 * degree);
      //       // setTracking({ state, reason });
      //     });
      //   }
      //   // setTracking({ state, reason });
      // }}
      // onAmbientLightUpdate={(light) => {
      // console.log(light);
      // setAmbientLight() TODO: update light
      // }}
      {...otherProps}
    >
      <ViroAmbientLight color={ambientLight.color} intensity={ambientLight.intensity} castsShadow={true} />
      <ViroCamera
        position={[0, 0, 0]}
        rotation={[0, yRot, 0]}
        active={true}
      />
      <ViroBox
        position={[0, 0, -1]} scale={[.5, .5, .5]}
      // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
      />
      {/* {children} */}
    </ViroARScene>
  );
};

export default GeopositionScene;
module.exports = GeopositionScene;
