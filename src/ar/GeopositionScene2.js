import React, { Component, /*useState, useContext,*/ } from 'react';
import {
  ViroARScene,
  ViroBox,
  // ViroConstants,
  ViroAmbientLight,
} from 'react-viro';
import CompassHeading from 'react-native-compass-heading';
// import { Context } from '../context/GlobalContext';

export default class GeopositionScene extends Component {
  constructor() {
    super();

    this.state = {
      tracking: { state: null, reason: null },
      yRot: 0,
      ambientLight: { color: '#FFFFFF', intensity: 10 },
    };

    this.sceneRef = undefined;
    this.baseRef = React.createRef();

    this.heading = undefined;
  }

  componentDidMount() {
    CompassHeading.start(5, degree => {
      // console.log(degree);
      this.heading = degree;
    });
    // this.sceneRef.getCameraOrientationAsync().then(({ rotation }) => {
    //   const y = rotation[1];

    // });
  }

  componentWillUnmount() {
    CompassHeading.stop();
  }

  render() {
    const { /*tracking, yRot,*/ ambientLight } = this.state;
    return (
      <ViroARScene
        ref={(component) => this.sceneRef = component }
        physicsWorld={{ gravity: [0, -9.81, 0] }}
        // onTrackingUpdated={(state, reason) => {
        // if (tracking.state === null && state === ViroConstants.TRACKING_NORMAL) {
        // The first time the scene get's it tracking find the compass heading
        // and rotate the scene in the opposite direction so positions of AR objects
        // do not need to correct for compass heading. This is aligning all AR users
        // worlds to point North / South
        // this.setState({ yRot: -1 * this.heading, tracking: { state, reason } });
        // this.baseRef.setNativeProps({ 'pauseUpdates': true }); // TODO might break stuff, maybe make box this?
        // }
        // }}
        onAmbientLightUpdate={(ambientLight) => this.setState({ ambientLight })}
      >
        <ViroAmbientLight color={ambientLight.color} intensity={ambientLight.intensity} castsShadow={true} />
        <ViroBox ref={this.baseRef}
          position={[0, 0, -3]} scale={[.5, .5, .5]}
        // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
        />
      </ViroARScene>
    );
  }
}

module.exports = GeopositionScene;
