/**
 * @author Reed Schimmel
 * @description Shoot hoops across da world.
 */
import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  ViroAmbientLight,
  ViroARScene,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroConstants,
  ViroMaterials,
  ViroCamera,
} from 'react-viro';

const ballPhysics = { friction: 0.6, type: 'Dynamic', mass: 4, enabled: true, useGravity: false, shape: { type: 'Sphere', params: [0.14] }, restitution: 0.65 };


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
    this.launchBall = this.launchBall.bind(this);
  }
  // TODO: use this.props.saveLaunch({ coords }) to send shizz to firebase

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component; }}
      >
        <ViroAmbientLight color={'#FFFFFF'} intensity={10} castsShadow={true} />
        <ViroLightingEnvironment source={require('./res/ibl_envr.hdr')} />
        <ViroCamera position={[0, 0, 0]} active={true} >
          <Viro3DObject ref={(obj) => { this.ball = obj; }}
            source={require('./res/object_basketball_pbr.vrx')}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            rotation={[0, 0, 0]}
            resources={[
              require('./res/blinn1_Base_Color.png'),
              require('./res/blinn1_Metallic.png'),
              require('./res/blinn1_Roughness.png'),
              require('./res/blinn1_Normal_OpenGL.png')]}
            type="VRX"
            physicsBody={ballPhysics}
            onLoadEnd={() => this.ball.setNativeProps({ 'position': [0, 0, -1] })}
            viroTag="BallTag"
          // highAccuracyEvents={true}
          // onClick={this.state.controllerConfig == CONTROLLER_PUSH ? this.onItemPushImpulse("BallTag") : undefined}
          // onClick={() => this.ball.applyImpulse([0,0,-1],[0,0,-1])}
          // onClick={this.launchBall}
          // onDrag={this.state.controllerConfig == CONTROLLER_GRIP ? () => { } : undefined}
          />
        </ViroCamera>
      </ViroARScene>
    );
  }

  _onInitialized(state/*, reason*/) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // Ready to fire!
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert('Lost tracking!');
    }
  }

  launchBall() { // TODO: fix this shizz
    this.sceneRef.getCameraOrientationAsync().then(({ position }) => {
      const force = 5; // newtons
      const impulse = position.map(axis => axis * force);
      this.ball.setNativeProps({ 'physicsBody': { ...ballPhysics, useGravity: true } }); // turn on gravity
      // Now smack it
      this.ball.applyImpulse(impulse, position); // dis code not werkin'
    });
  }
}

ViroMaterials.createMaterials({
  hud_text_bg: {
    diffuseColor: '#00ffff'
  },
  ground: {
    diffuseColor: '#007CB6E6'
  },
  ground_hit: {
    diffuseColor: '#008141E6'
  },
  cube_color: {
    diffuseColor: '#0021cbE6'
  }
});

module.exports = FireProjectileScene;
