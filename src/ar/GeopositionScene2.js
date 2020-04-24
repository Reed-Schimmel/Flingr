import React, { Component, useState, /*useContext,*/ } from 'react';
import {
  ViroARScene,
  ViroCamera,
  ViroBox,
  ViroConstants,
} from 'react-viro';
// import { Context } from '../context/GlobalContext';

export default class GeopositionScene extends Component {
  constructor() {
    super();

    this.state = {
      tracking: undefined
    };

    this.sceneRef = React.createRef();
  }

  render() {
    const { tracking } = this.state;

    return (
      <ViroARScene
        ref={this.sceneRef}
        physicsWorld={{ gravity: [0, -9.81, 0] }}
        onTrackingUpdated={(state, reason) => {
          if (state === ViroConstants.TRACKING_NORMAL && !tracking) {
            // Setup camera and shizz
          }
          this.setState({ tracking: { state, reason } });
        }}
      >
        <ViroCamera
          position={[0, 0, 0]}
          rotation={[45, 0, 0]}
          active={true}
        />
        <ViroBox
          position={[0, 1, 0]} scale={[.5, .5, .5]}
        // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
        />
      </ViroARScene>
    );
  }
}

module.exports = GeopositionScene;
