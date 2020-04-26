'use strict';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  ViroAmbientLight,
  ViroARScene,
  Viro3DObject,
  ViroLightingEnvironment,
} from 'react-viro';

export default class FireProjectileScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundAnchor: { anchorId: undefined },
      base: undefined,
    };

    // Component references
    this.sceneRef = undefined;
    this.ball = undefined;

    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }))
    // AsyncStorage.getItem('base').then(base => this.plane.setNativeProps(JSON.parse(base)) )
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }));
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        // anchorDetectionTypes='PlanesHorizontal'
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component; }}
      // rotation={this.state.heading} https://github.com/viromedia/viro/issues/118#issuecomment-352500764
      >
        <ViroAmbientLight color={'#FFFFFF'} intensity={10} castsShadow={true} />
        <ViroLightingEnvironment source={require('./res/ibl_envr.hdr')} />


        {/* A Single Ball we have spawned in our scene */}
        <Viro3DObject ref={(obj) => { this.ball = obj }}
          source={require('./res/object_basketball_pbr.vrx')}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, 1.0]}
          rotation={[0, 0, 0]}
          resources={[
            require('./res/blinn1_Base_Color.png'),
            require('./res/blinn1_Metallic.png'),
            require('./res/blinn1_Roughness.png'),
            require('./res/blinn1_Normal_OpenGL.png')]}
          type="VRX"
          physicsBody={{ friction: 0.6, type: 'Dynamic', mass: 4, enabled: true, useGravity: true, shape: { type: 'Sphere', params: [0.14] }, restitution: 0.65 }}
          viroTag="BallTag"
        // onClick={this.state.controllerConfig == CONTROLLER_PUSH ? this.onItemPushImpulse("BallTag") : undefined}
        // onDrag={this.state.controllerConfig == CONTROLLER_GRIP ? () => { } : undefined}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // Ready to fire!
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert('Lost tracking!');
    }
  }
}

}

module.exports = FireProjectileScene;
