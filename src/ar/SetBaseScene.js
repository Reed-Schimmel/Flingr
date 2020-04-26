'use strict';
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import {
  ViroARScene,
  // ViroText,
  ViroConstants,
  // ViroNode,
  // ViroARPlane,
  ViroBox,
  ViroARPlaneSelector,
  ViroQuad,
  ViroAmbientLight,
  // ViroProps,
  // ViroMaterials
} from 'react-viro';

export default class SetBaseScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: 'Initializing AR...',
      foundPlane: false,
      heading: 0.0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
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

        <ViroARPlaneSelector ref={(component) => { this.plane = component; }}
          maxPlanes={1}
          onPlaneSelected={(plane) => {
            // get plane info,
            // get camera info
            // call func
            // func: find geo and heading, translate



            AsyncStorage.setItem('base', JSON.stringify(plane)).then(() => console.log('set', plane));
            // AsyncStorage.setItem('base', JSON.stringify(this.plane.props)).then(() => console.log('set'));
            // show button to set base
            // this.setState({ foundPlane: true });
          }}
          // onAnchorFound={anc => console.log(anc)}
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
            ref={(component) => { this.floorSurface = component; }} /*onCollision={this._onFloorCollide}*/ materials={'ground'}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!'
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert('Lost tracking!');
    }
  }
}

module.exports = SetBaseScene;