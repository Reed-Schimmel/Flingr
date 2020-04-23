'use strict';
import React, { Component } from 'react';
import { StyleSheet, Alert, AsyncStorage } from 'react-native';
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
      base: undefined,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }))
    // AsyncStorage.getItem('base').then(base => this.plane.setNativeProps(JSON.parse(base)) )
    AsyncStorage.getItem('base').then(base => this.setState({base: JSON.parse(base) }) )
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        // anchorDetectionTypes="PlanesHorizontal"
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component }}
      >
        <ViroAmbientLight color={"#FFFFFF"} intensity={10} castsShadow={true} />

        <ViroARPlane
        {...this.state.base}
        ref={(component) => { this.plane = component; console.log(this.plane) }}>
        </ViroARPlane>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert("Lost tracking!");
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
