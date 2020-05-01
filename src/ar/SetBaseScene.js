'use strict';
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import {
  ViroARScene,
  ViroConstants,
  ViroBox,
  ViroARPlaneSelector,
  ViroQuad,
  ViroAmbientLight,
  ViroMaterials,
} from 'react-viro';

export default class SetBaseScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tracking: undefined,
      intensity: 10,
      color: '#FFFFFF',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onFloorCollide = this._onFloorCollide.bind(this);
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component; }}
        onAmbientLightUpdate={lighting => this.setState({ ...lighting })}
      >
        <ViroAmbientLight color={this.state.color} intensity={this.state.intensity} />
        <ViroARPlaneSelector ref={(component) => { this.planeSelector = component; }}
          maxPlanes={5}
          dragType='FixedToWorld'
        >
          <ViroBox
            position={[0, 1, 0]} scale={[.5, .5, .5]}
            physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
            ref={(component) => { this.box = component; }}
          />
          <ViroQuad position={[0, 0, 0]} scale={[1, 1, 1]} rotation={[-90, 0, 0]} physicsBody={{ type: 'Static', restitution: 0.75 }}
            arShadowReceiver={true}
            // onClickState={this.state.controllerConfig == CONTROLLER_PULL ? this.onItemPullForce('Surface') : undefined}
            ref={(component) => { this.floorSurface = component; }} onCollision={this._onFloorCollide} materials={'ground'}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  async _onFloorCollide() {
    let data = await this.box.getTransformAsync();
    AsyncStorage.setItem('base', JSON.stringify(data.position));
    // TODO: set position
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: state });
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert('Lost tracking!');
      this.setState({ tracking: state });
    }
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

module.exports = SetBaseScene;