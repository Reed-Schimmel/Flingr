'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroNode,
  ViroARPlane,
  ViroBox,
  ViroARPlaneSelector,
  ViroQuad,
  ViroAmbientLight,
  ViroProps
} from 'react-viro';

export default class SetBaseScene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      // controllerConfig: CONTROLLER_GRIP,
      showCollisionBox: false,
      foundPlane: false,
      planePosition: [0, 0, 0],
      planeRotation: [0, 0, 0],
      totalCubes: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    console.log(this.props)
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        // anchorDetectionTypes="PlanesHorizontal"
        physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: this.state.showCollisionBox }} ref={(component) => { this.sceneRef = component }}

      >
        <ViroAmbientLight color={"#FFFFFF"} intensity={10} castsShadow={true} />

        <ViroARPlaneSelector ref={(component) => { this.plane = component }}
          maxPlanes={1}
          onPlaneSelected={(e) => {
            console.log("got em", e);
            // show button to set base
            this.setState({ foundPlane: true });
          }}
          // onAnchorFound={anc => console.log(anc)}
          dragType="FixedToWorld"
          onDrag={(position, source) => {
            // let user drag to reposition
          }}
        >
          <ViroBox
            position={[0, 1, 0]} scale={[.5, .5, .5]}
            physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
          />
          <ViroQuad position={[0, 0, 0]} scale={[1, 1, 1.0]} rotation={[-90, 0, 0]} physicsBody={{ type: 'Static', restitution: 0.75 }}
            arShadowReceiver={true}
            // onClickState={this.state.controllerConfig == CONTROLLER_PULL ? this.onItemPullForce("Surface") : undefined}
            ref={(component) => { this.floorSurface = component }} onCollision={this._onFloorCollide} materials={'ground'} />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = SetBaseScene;
