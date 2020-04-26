'use strict';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  ViroBox,
  ViroARPlane,
  ViroAmbientLight,
  ViroARScene,
  ViroQuad,
} from 'react-viro';

const compareAnchors = (anc1, anc2) => {
  if (anc1 === undefined || anc2 === undefined) return false;

  // Below are the keys to properties I think is important when comparing two anchors
  const keys = ['center', 'height', 'width', 'position', 'rotation', 'alignment'];

  // One anchor is of the saved base, and the other is from the AR tracking system
  // if the property is a string then the values must be exact
  // if the property is a number then they need to be within a margin of error

  const margin = 0.10;

  const percDiff = (a, b) => {
    const avg = ((a + b) / 2) || 1; // make 1 if avg is 0
    const diff = Math.abs(a - b) / avg;
    return diff;
  };

  return keys.every((key) => {
    if (typeof anc1[key] === 'string') {
      return anc1[key] === anc2[key];

    } else if (typeof anc1[key] === 'number') {
      return percDiff(anc1[key], anc2[key]) <= margin; // must be 10% alike

    } else if (typeof anc1[key] === 'object') {
      // this SHOULD  be an array of length 3, like center, rotation, and position
      return anc1[key].every((num, i) => percDiff(num, anc2[key][i]) <= margin);
    }
  });
};

export default class ViewBaseScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundAnchor: { anchorId: undefined },
      base: undefined,
    };

    this._onAnchorFound = this._onAnchorFound.bind(this);
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
        <ViroARPlane
          key='basePlane'
          ref={(component) => { this.plane = component; /*console.log(this.plane);*/ }}
          onAnchorFound={this._onAnchorFound}
          anchorId={this.state.foundAnchor.anchorId}
          visible={this.state.foundAnchor.anchorId !== undefined}
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
        </ViroARPlane>
      </ViroARScene>
    );
  }

  _onAnchorFound(foundAnchor) {
    if (foundAnchor.type != 'plane'
      || this.state.foundAnchor.anchorId !== undefined) {
      return;
    }

    // conditions to match foundAnchor to the base's anchor
    if (compareAnchors(foundAnchor, this.state.base)) this.setState({ foundAnchor });

    // console.log(foundAnchor, this.props.base);
    // this.plane.setNativeProps({ 'pauseUpdates': true });
  }

}

module.exports = ViewBaseScene;
